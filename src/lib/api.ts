const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken') || localStorage.getItem('token');
  }
  return null;
};

// Helper function to make authenticated requests
const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Please log in to access this feature');
  }
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Clear invalid token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
      }
      throw new Error('Session expired. Please log in again');
    }
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Exam Prep API
export const examPrepAPI = {
  async generateQuiz(data: {
    subject?: string;
    topic?: string;
    count?: number;
    difficulty?: string;
    numQuestions?: number;
    content?: string;
    [key: string]: any;
  }) {
    return authFetch(`${API_URL}/exam-prep/quiz/generate`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async summarizeText(data: { text: string }) {
    return authFetch(`${API_URL}/exam-prep/summarize`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getResources() {
    return authFetch(`${API_URL}/exam-prep/resources`);
  },
};

// Auth API
export const authAPI = {
  async register(data: {
    email: string;
    password: string;
    name: string;
    role?: string;
  }) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }
    
    return result;
  },

  async login(data: { email: string; password: string }) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }
    
    return result;
  },

  async verify() {
    return authFetch(`${API_URL}/auth/verify`);
  },
};

// Helper function for file uploads
const authFetchFormData = async (url: string, formData: FormData) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Please log in to access this feature');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Don't set Content-Type - browser will set it with boundary for FormData
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
      }
      throw new Error('Session expired. Please log in again');
    }
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Lost & Found API
export const lostFoundAPI = {
  async getLostItems() {
    return authFetch(`${API_URL}/lost-found/lost`);
  },

  async createLostItem(data: any, images?: File[]) {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    
    // Add images if provided
    if (images && images.length > 0) {
      images.forEach(image => {
        formData.append('images', image);
      });
    }
    
    return authFetchFormData(`${API_URL}/lost-found/lost`, formData);
  },

  async getFoundItems() {
    return authFetch(`${API_URL}/lost-found/found`);
  },

  async createFoundItem(data: any, images?: File[]) {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    
    // Add images if provided
    if (images && images.length > 0) {
      images.forEach(image => {
        formData.append('images', image);
      });
    }
    
    return authFetchFormData(`${API_URL}/lost-found/found`, formData);
  },

  async getMatches() {
    return authFetch(`${API_URL}/lost-found/matches`);
  },

  async getHeatmap() {
    return authFetch(`${API_URL}/lost-found/heatmap`);
  },
};

// Notifications API
export const notificationsAPI = {
  async getNotifications() {
    return authFetch(`${API_URL}/notifications`);
  },

  async getUnreadCount() {
    return authFetch(`${API_URL}/notifications/unread-count`);
  },

  async markAsRead(id: string) {
    return authFetch(`${API_URL}/notifications/${id}/read`, {
      method: 'PUT',
    });
  },
};

// Rewards & Tasks API
export const rewardsAPI = {
  async getTasks(filters?: { category?: string; difficulty?: string; status?: string }) {
    const params = new URLSearchParams(filters as any);
    return authFetch(`${API_URL}/rewards/tasks?${params}`);
  },

  async getCompletedTasks() {
    return authFetch(`${API_URL}/rewards/tasks/completed`);
  },

  async completeTask(taskId: string) {
    return authFetch(`${API_URL}/rewards/tasks/${taskId}/complete`, {
      method: 'POST',
    });
  },

  async getRewards(filters?: { category?: string; status?: string }) {
    const params = new URLSearchParams(filters as any);
    return authFetch(`${API_URL}/rewards/rewards?${params}`);
  },

  async redeemReward(rewardId: string) {
    return authFetch(`${API_URL}/rewards/rewards/${rewardId}/redeem`, {
      method: 'POST',
    });
  },

  async getRedeemedRewards() {
    return authFetch(`${API_URL}/rewards/rewards/redeemed`);
  },

  async getLeaderboard(limit?: number) {
    return authFetch(`${API_URL}/rewards/leaderboard?limit=${limit || 10}`);
  },

  async getStats() {
    return authFetch(`${API_URL}/rewards/stats`);
  },
};

// News API
export const newsAPI = {
  async getNews(filters?: { category?: string; impact?: string }) {
    const params = new URLSearchParams(filters as any);
    return authFetch(`${API_URL}/news?${params}`);
  },

  async getNewsById(id: string) {
    return authFetch(`${API_URL}/news/${id}`);
  },

  async getCriticalNews() {
    return authFetch(`${API_URL}/news/critical/latest`);
  },

  async createNews(data: any) {
    return authFetch(`${API_URL}/news`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Documents API
export const documentsAPI = {
  async getDocuments(filters?: { 
    type?: string; 
    status?: string; 
    field?: string; 
    search?: string 
  }) {
    const params = new URLSearchParams(filters as any);
    return authFetch(`${API_URL}/documents?${params}`);
  },

  async getDocumentById(id: string) {
    return authFetch(`${API_URL}/documents/${id}`);
  },

  async searchWithAI(query: string, userProfile?: any) {
    return authFetch(`${API_URL}/documents/search/ai`, {
      method: 'POST',
      body: JSON.stringify({ query, userProfile }),
    });
  },

  async getScholarships() {
    return authFetch(`${API_URL}/documents/type/scholarships`);
  },

  async getInternships() {
    return authFetch(`${API_URL}/documents/type/internships`);
  },

  async getGrants() {
    return authFetch(`${API_URL}/documents/type/grants`);
  },

  async trackApplication(id: string) {
    return authFetch(`${API_URL}/documents/${id}/apply`, {
      method: 'POST',
    });
  },

  async createDocument(data: any) {
    return authFetch(`${API_URL}/documents`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Profile API
export const profileAPI = {
  async getProfile() {
    return authFetch(`${API_URL}/profile`);
  },

  async updateProfile(data: {
    name?: string;
    bio?: string;
    avatar?: string;
    department?: string;
    enrollmentYear?: number;
  }) {
    return authFetch(`${API_URL}/profile`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async getStats() {
    return authFetch(`${API_URL}/profile/stats`);
  },

  async getActivity(limit?: number) {
    return authFetch(`${API_URL}/profile/activity?limit=${limit || 10}`);
  },

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return authFetch(`${API_URL}/profile/password`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async getAchievements() {
    return authFetch(`${API_URL}/profile/achievements`);
  },
};

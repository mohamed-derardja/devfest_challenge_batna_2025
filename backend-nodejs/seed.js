const mongoose = require('mongoose');
require('dotenv').config();
const Task = require('./models/Task');
const Reward = require('./models/Reward');
const NewsUpdate = require('./models/NewsUpdate');
const Document = require('./models/Document');

// Sample tasks
const sampleTasks = [
  {
    title: 'Complete Online Safety Training',
    description: 'Complete the mandatory online safety training module',
    category: 'academic',
    points: 50,
    difficulty: 'easy',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active',
    requirements: ['Login to learning portal', 'Complete all modules', 'Pass the quiz']
  },
  {
    title: 'Attend Research Seminar',
    description: 'Participate in the weekly research seminar series',
    category: 'academic',
    points: 75,
    difficulty: 'medium',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'active',
    requirements: ['Register in advance', 'Attend full session', 'Submit feedback form']
  },
  {
    title: 'Volunteer for Campus Event',
    description: 'Help organize and run campus orientation for new students',
    category: 'volunteer',
    points: 100,
    difficulty: 'medium',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    status: 'active',
    requirements: ['Sign up sheet', 'Minimum 4 hours commitment', 'Team coordination']
  },
  {
    title: 'Submit Research Paper',
    description: 'Submit your research paper to the annual student conference',
    category: 'research',
    points: 200,
    difficulty: 'hard',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    status: 'active',
    requirements: ['Original research', 'Faculty advisor approval', 'Proper formatting']
  },
  {
    title: 'Join Study Group',
    description: 'Form or join a study group for collaborative learning',
    category: 'study',
    points: 30,
    difficulty: 'easy',
    status: 'active',
    requirements: ['Minimum 3 members', 'Regular meetings', 'Topic focus']
  }
];

// Sample rewards
const sampleRewards = [
  {
    name: 'Campus Cafe Voucher',
    description: '$10 voucher for campus cafeteria',
    category: 'voucher',
    points: 100,
    stock: 50,
    provider: 'Campus Dining Services',
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    status: 'available'
  },
  {
    name: 'Library Late Fee Waiver',
    description: 'One-time waiver for library late fees',
    category: 'service',
    points: 150,
    stock: 20,
    provider: 'University Library',
    validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    status: 'available'
  },
  {
    name: 'University Hoodie',
    description: 'Official university branded hoodie',
    category: 'merchandise',
    points: 500,
    stock: 10,
    provider: 'Campus Store',
    status: 'limited'
  },
  {
    name: 'Priority Course Registration',
    description: 'Early access to course registration next semester',
    category: 'privilege',
    points: 800,
    stock: 5,
    provider: 'Registrar Office',
    status: 'limited'
  },
  {
    name: 'Bookstore Discount 20%',
    description: '20% discount on textbooks and supplies',
    category: 'discount',
    points: 250,
    stock: 30,
    provider: 'Campus Bookstore',
    validUntil: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    status: 'available'
  }
];

// Sample news updates
const sampleNews = [
  {
    title: 'Extended Library Hours for Finals Week',
    content: 'The university library will extend operating hours from December 10-20 to support students during finals. Library will be open 24/7 with full services including study rooms, computer labs, and printing services. Additional staff will be available to assist students.',
    category: 'facility',
    impact: 'medium',
    affectedStudents: 'All Students',
    changes: [
      '24/7 Operations: Dec 10-20',
      'All Study Rooms Available',
      'Extended Tech Support Hours'
    ],
    publishDate: new Date(),
    effectiveDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    tags: ['library', 'finals', 'study']
  },
  {
    title: 'New Academic Integrity Policy',
    content: 'Starting next semester, the university will implement an updated academic integrity policy. All students must complete a mandatory training module. The policy includes stricter guidelines on AI tool usage and collaboration in assignments. Faculty will use advanced plagiarism detection software.',
    category: 'policy',
    impact: 'high',
    affectedStudents: 'All Students',
    changes: [
      'Mandatory Training Required',
      'AI Usage Guidelines Updated',
      'Enhanced Detection Tools'
    ],
    publishDate: new Date(),
    effectiveDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    tags: ['policy', 'academic', 'important']
  },
  {
    title: 'Campus WiFi Upgrade Complete',
    content: 'The campus-wide WiFi infrastructure upgrade has been completed. Students can now enjoy faster speeds, better coverage in dormitories, and improved connectivity in lecture halls. New access points have been installed in previously problematic areas.',
    category: 'facility',
    impact: 'low',
    affectedStudents: 'All Students',
    changes: [
      'Faster Connection Speeds',
      'Better Dorm Coverage',
      'More Access Points'
    ],
    publishDate: new Date(),
    effectiveDate: new Date(),
    tags: ['technology', 'wifi', 'infrastructure']
  }
];

// Sample documents/opportunities
const sampleDocuments = [
  {
    title: 'Google Summer of Code 2025',
    description: 'Global program focused on introducing students to open source software development. Students work with mentoring organizations on coding projects during summer break.',
    type: 'internship',
    provider: 'Google',
    organization: 'Google Open Source',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    location: 'Remote',
    requirements: [
      'Must be 18 years or older',
      'Enrolled in university',
      'Programming experience required'
    ],
    benefits: [
      'Stipend: $1500-$6000',
      'Mentorship from industry experts',
      'Certificate of completion'
    ],
    url: 'https://summerofcode.withgoogle.com',
    duration: '12 weeks',
    field: 'Computer Science',
    eligibility: ['Undergraduate', 'Graduate'],
    rating: 4.8,
    applicants: 15420,
    tags: ['coding', 'opensource', 'summer'],
    status: 'active'
  },
  {
    title: 'Fulbright Student Program',
    description: 'Premier international educational exchange program, offering grants for individually designed study/research projects or English Teaching Assistantships.',
    type: 'scholarship',
    provider: 'U.S. Department of State',
    organization: 'Fulbright Commission',
    deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    location: 'Various Countries',
    requirements: [
      'U.S. citizenship required',
      "Bachelor's degree before grant period",
      'Language proficiency',
      'Good academic standing'
    ],
    benefits: [
      'Full tuition coverage',
      'Living stipend',
      'Travel allowance',
      'Health insurance'
    ],
    url: 'https://us.fulbrightonline.org',
    amount: 'Full funding',
    duration: '1 year',
    field: 'All Disciplines',
    eligibility: ['Graduate', 'Recent Graduate'],
    rating: 4.9,
    applicants: 8500,
    tags: ['scholarship', 'international', 'prestigious'],
    status: 'active'
  },
  {
    title: 'National Science Foundation REU',
    description: 'Research Experiences for Undergraduates (REU) program offers summer research opportunities in various science and engineering fields at universities across the US.',
    type: 'research',
    provider: 'National Science Foundation',
    organization: 'NSF',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    location: 'United States',
    requirements: [
      'Undergraduate student',
      'U.S. citizen or permanent resident',
      'Strong academic record',
      'Interest in research'
    ],
    benefits: [
      'Stipend: $5000-$7000',
      'Housing provided',
      'Travel allowance',
      'Research experience'
    ],
    url: 'https://www.nsf.gov/reu',
    duration: '10 weeks',
    field: 'STEM',
    eligibility: ['Undergraduate'],
    rating: 4.7,
    applicants: 12000,
    tags: ['research', 'summer', 'STEM'],
    status: 'active'
  },
  {
    title: 'Microsoft Learn Student Ambassador',
    description: 'Build technical and career skills while making a difference in your community. Get access to exclusive Microsoft resources and connect with a global network.',
    type: 'internship',
    provider: 'Microsoft',
    organization: 'Microsoft',
    location: 'Remote',
    requirements: [
      'Active student',
      'Minimum 16 years old',
      'Passion for technology',
      'Community leadership'
    ],
    benefits: [
      'Microsoft certifications',
      'Azure credits',
      'Exclusive events access',
      'Networking opportunities'
    ],
    url: 'https://studentambassadors.microsoft.com',
    duration: 'Ongoing',
    field: 'Technology',
    eligibility: ['Undergraduate', 'Graduate'],
    rating: 4.6,
    applicants: 25000,
    tags: ['technology', 'microsoft', 'community'],
    status: 'active'
  },
  {
    title: 'Rhodes Scholarship',
    description: 'The oldest and most celebrated international fellowship award. Full funding for graduate study at the University of Oxford.',
    type: 'scholarship',
    provider: 'Rhodes Trust',
    organization: 'University of Oxford',
    deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    location: 'Oxford, United Kingdom',
    requirements: [
      'Outstanding academic record',
      'Leadership qualities',
      'Commitment to service',
      'Age 18-24'
    ],
    benefits: [
      'Full tuition',
      'Annual stipend: £17,310',
      'Travel grants',
      'All Oxford college fees'
    ],
    url: 'https://www.rhodeshouse.ox.ac.uk',
    amount: 'Full funding + stipend',
    duration: '2-3 years',
    field: 'All Disciplines',
    eligibility: ['Undergraduate Senior', 'Recent Graduate'],
    rating: 5.0,
    applicants: 2500,
    tags: ['scholarship', 'prestigious', 'oxford', 'international'],
    status: 'active'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Task.deleteMany({});
    await Reward.deleteMany({});
    await NewsUpdate.deleteMany({});
    await Document.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert sample data
    await Task.insertMany(sampleTasks);
    console.log(`✅ Inserted ${sampleTasks.length} tasks`);

    await Reward.insertMany(sampleRewards);
    console.log(`✅ Inserted ${sampleRewards.length} rewards`);

    await NewsUpdate.insertMany(sampleNews);
    console.log(`✅ Inserted ${sampleNews.length} news updates`);

    await Document.insertMany(sampleDocuments);
    console.log(`✅ Inserted ${sampleDocuments.length} documents/opportunities`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

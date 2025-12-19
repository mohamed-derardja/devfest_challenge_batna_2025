'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  X, 
  Sparkles, 
  FileText,
  MapPin,
  Calendar,
  Clock,
  User,
  Building
} from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function DocumentChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI document assistant. I can help you find certificates, documents, and guide you through university procedures. Try asking me something!",
      timestamp: new Date(),
      suggestions: [
        "Where do I get a certificate of scholarship?",
        "How to apply for student ID card?",
        "Where is the registration office?",
        "Document requirements for graduation"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const exampleResponses: Record<string, { answer: string; steps?: string[]; location?: string; office?: string; hours?: string }> = {
    "scholarship certificate": {
      answer: "To get your Certificate of Scholarship, follow these steps:",
      steps: [
        "Go to the Scholarships Office (Bureau des Bourses) on the 1st floor of the Administration Building",
        "Bring your student ID card and scholarship reference number",
        "Submit a written request at the front desk",
        "Processing time: 2-3 business days",
        "Collect your certificate from the same office"
      ],
      location: "Administration Building, 1st Floor, Room 103",
      office: "Bureau des Bourses (Scholarships Office)",
      hours: "Sunday-Thursday: 9:00 AM - 4:00 PM"
    },
    "student id": {
      answer: "For Student ID Card issuance or renewal:",
      steps: [
        "Visit the Student Services Office (Bureau des Affaires Estudiantes)",
        "Required documents: Birth certificate, 2 passport photos, registration proof",
        "Pay the fee of 500 DA at the treasury (Trésorerie)",
        "Submit documents with payment receipt",
        "Card will be ready in 5-7 business days"
      ],
      location: "Main Campus, Student Services Building, Ground Floor",
      office: "Bureau des Affaires Estudiantes",
      hours: "Sunday-Thursday: 8:30 AM - 3:30 PM"
    },
    "registration": {
      answer: "The Registration Office (Bureau d'Inscription) handles enrollment:",
      steps: [
        "Located in the Administration Building, 2nd Floor",
        "Bring original documents: Baccalaureate, birth certificate, residence certificate",
        "Complete the registration form",
        "Pay registration fees at the treasury",
        "Submit all documents with payment receipt"
      ],
      location: "Administration Building, 2nd Floor, Room 205",
      office: "Bureau d'Inscription (Registration Office)",
      hours: "Sunday-Thursday: 9:00 AM - 4:00 PM (Extended during registration period)"
    },
    "graduation documents": {
      answer: "For Graduation Certificate and Transcript:",
      steps: [
        "Ensure all exams are completed and passed",
        "Visit the Exams and Graduation Office (Bureau des Examens et Diplômes)",
        "Submit: Student ID, completed studies attestation, debt clearance certificate",
        "Processing time: 15-30 days for temporary certificate",
        "Official diploma: 3-6 months"
      ],
      location: "Faculty Building, 3rd Floor",
      office: "Bureau des Examens et Diplômes",
      hours: "Sunday-Thursday: 9:00 AM - 3:00 PM"
    },
    "transcript": {
      answer: "To request your Academic Transcript (Relevé de Notes):",
      steps: [
        "Go to the Academic Records Office (Bureau de la Scolarité)",
        "Submit a written request with student ID",
        "Official transcript: 500 DA fee",
        "Processing: 48 hours for unofficial, 5 days for official with stamp",
        "Collect from the same office with receipt"
      ],
      location: "Faculty Building, 1st Floor, Room 115",
      office: "Bureau de la Scolarité",
      hours: "Sunday-Thursday: 9:00 AM - 4:00 PM"
    }
  };

  const generateBotResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    // Match user query to example responses
    for (const [key, data] of Object.entries(exampleResponses)) {
      if (input.includes(key)) {
        let response = `${data.answer}\n\n`;
        
        if (data.steps) {
          data.steps.forEach((step, idx) => {
            response += `${idx + 1}. ${step}\n`;
          });
        }
        
        response += `\n📍 **Location:** ${data.location}`;
        response += `\n🏢 **Office:** ${data.office}`;
        response += `\n⏰ **Hours:** ${data.hours}`;
        
        return {
          content: response,
          suggestions: [
            "What documents do I need?",
            "How long does it take?",
            "Any fees required?",
            "Ask another question"
          ]
        };
      }
    }
    
    // Default response
    return {
      content: "I can help you with:\n\n• Certificate of Scholarship (Attestation de Bourse)\n• Student ID Card (Carte d'Étudiant)\n• Registration procedures\n• Graduation documents\n• Academic transcripts\n• Office locations and hours\n\nPlease ask about any of these topics!",
      suggestions: [
        "Where do I get a certificate of scholarship?",
        "How to apply for student ID card?",
        "Where is the registration office?",
        "Document requirements for graduation"
      ]
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      const botMessage: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[90] w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center group"
          >
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 right-0 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Need help? Ask me!
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[90] w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            style={{ height: '600px', maxHeight: 'calc(100vh - 100px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Document Assistant</h3>
                    <p className="text-xs text-indigo-100">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl p-4 ${
                      message.type === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-white border border-slate-200'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                      <p className={`text-[10px] mt-2 ${message.type === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.type === 'bot' && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

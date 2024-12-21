// CVChatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, ArrowLeft } from 'lucide-react';
import { nlpUtils, ConversationContext } from './chatbot-utils';
import { ResponseGenerator } from './responseGenerator';
import { WELCOME_MESSAGE, END_MESSAGE, createCategories } from './chatbot-data';

const CVChatbot = () => {
  // State management
  const [messages, setMessages] = useState([{ type: 'bot', content: WELCOME_MESSAGE }]);
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  
  // Initialize context and response generator
  const context = useRef(new ConversationContext()).current;
  const responseGenerator = useRef(new ResponseGenerator(createCategories())).current;
  const messagesEndRef = useRef(null);
  const categories = createCategories();

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateResponse = (query) => {
    // Check for end chat commands
    if (query.toLowerCase().match(/bye|goodbye|end|thank/)) {
      return END_MESSAGE;
    }

    // Generate base response using the response generator
    let response = responseGenerator.generateResponse(query);

    // Add follow-up if appropriate
    const topics = nlpUtils.identifyTopics(query);
    if (topics.length > 0) {
      const followUp = context.generateFollowUp(topics[0]);
      if (followUp) {
        response += `\n\n${followUp}`;
      }
    }

    return response;
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
    context.addMessage(message);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: inputValue.trim() };
    addMessage(userMessage);
    setIsTyping(true);

    // Clear input and simulate typing delay
    setInputValue('');
    
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const botMessage = { type: 'bot', content: response };
      addMessage(botMessage);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleCategorySelect = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    setSelectedCategory(categoryId);

    addMessage({ 
      type: 'user', 
      content: `Tell me about ${category.name}` 
    });
    
    addMessage({ 
      type: 'bot', 
      content: `Here are specific questions about ${category.name}:` 
    });
  };

  const handleQuestionClick = (question) => {
    addMessage({ type: 'user', content: question.text });
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(question.text);
      addMessage({ type: 'bot', content: response });
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    addMessage({ 
      type: 'bot', 
      content: 'Please select a category to learn more:' 
    });
  };

  return (
    <div className="min-h-[800px] w-full max-w-2xl mx-auto p-4">
      <div className="h-full bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="border-b border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="/mohamed-photo.jpg" 
                alt="Mohamed Amin" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <h2 className="text-xl font-semibold">
                Mohamed Amin AI Assistant
              </h2>
            </div>
            <a 
              href="/Mohamed_Amin_CV.pdf" 
              download
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </div>
        </div>

        <div className="flex flex-col h-[700px]">
          <div className="flex-grow overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <React.Fragment key={index}>
                  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[80%] ${
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Bot className="h-5 w-5 text-gray-700" />
                        )}
                      </div>
                      <div className={`rounded-lg px-4 py-2 ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      } whitespace-pre-line`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                  
                  {message.type === 'bot' && index === messages.length - 1 && !isTyping && (
                    <div className="mt-4 grid grid-cols-1 gap-2">
                      {selectedCategory ? (
                        <>
                          <button
                            className="flex items-center px-4 py-2 text-left text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
                            onClick={handleBackToCategories}
                          >
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Categories
                          </button>
                          {categories
                            .find(cat => cat.id === selectedCategory)
                            .questions.map((question, qIndex) => (
                              <button
                                key={qIndex}
                                className="px-4 py-2 text-left text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
                                onClick={() => handleQuestionClick(question)}
                              >
                                {question.text}
                              </button>
                            ))}
                        </>
                      ) : (
                        categories.map(category => (
                          <button
                            key={category.id}
                            className="px-4 py-2 text-left text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
                            onClick={() => handleCategorySelect(category.id)}
                          >
                            {category.icon} {category.name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-gray-700" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="animate-pulse">Typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question or select a category above..."
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleSendMessage}
                className="px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVChatbot;
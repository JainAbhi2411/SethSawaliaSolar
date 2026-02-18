import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User, Sparkles, Sun, TrendingUp, Shield } from 'lucide-react';
import { contactQueriesAPI } from '@/db/api';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

interface QuoteData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  systemSize: string;
  message: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    systemSize: '',
    message: ''
  });
  const [isCollectingQuote, setIsCollectingQuote] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addBotMessage(
          "Hello! 👋 I'm your Solar Assistant. I can help you with:\n\n" +
          "1️⃣ Information about our services\n" +
          "2️⃣ Get a free quote\n" +
          "3️⃣ Answer questions about solar energy\n\n" +
          "What would you like to know?"
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    handleBotResponse(reply);
  };

  const handleBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for quote request
    if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      setIsCollectingQuote(true);
      setConversationStep(1);
      addBotMessage("Great! I'd love to help you get a quote. Let me collect some information.\n\nFirst, what's your name?");
      return;
    }

    // Check for service inquiries
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
      addBotMessage(
        "We offer comprehensive solar solutions:\n\n" +
        "🏠 Residential Rooftop Solar\n" +
        "🏢 Commercial Solar Solutions\n" +
        "🔧 Solar Panel Maintenance\n" +
        "📐 System Design & Consultation\n" +
        "🌿 Energy Efficiency Solutions\n" +
        "🔋 Solar Battery Storage\n\n" +
        "Would you like details about any specific service?"
      );
      return;
    }

    // Check for residential solar
    if (lowerMessage.includes('residential') || lowerMessage.includes('home') || lowerMessage.includes('house')) {
      addBotMessage(
        "Our Residential Solar Solutions include:\n\n" +
        "✅ Custom rooftop installations\n" +
        "✅ Government subsidy support (up to ₹78,000)\n" +
        "✅ Net metering setup\n" +
        "✅ 25-year warranty\n" +
        "✅ Starting from ₹52,000 per kW\n\n" +
        "Installation takes 15-20 days. Would you like a free quote?"
      );
      return;
    }

    // Check for commercial solar
    if (lowerMessage.includes('commercial') || lowerMessage.includes('business') || lowerMessage.includes('factory')) {
      addBotMessage(
        "Our Commercial Solar Solutions offer:\n\n" +
        "✅ Systems from 10kW to 1MW+\n" +
        "✅ Tax benefits (Accelerated Depreciation)\n" +
        "✅ ROI in 3-5 years\n" +
        "✅ Starting from ₹45,000 per kW\n" +
        "✅ Flexible financing options\n\n" +
        "Perfect for offices, factories, warehouses, and retail spaces. Interested in a quote?"
      );
      return;
    }

    // Check for maintenance
    if (lowerMessage.includes('maintenance') || lowerMessage.includes('cleaning') || lowerMessage.includes('repair')) {
      addBotMessage(
        "Our Maintenance Services include:\n\n" +
        "✅ Professional panel cleaning\n" +
        "✅ Performance monitoring\n" +
        "✅ Electrical health checks\n" +
        "✅ Fault troubleshooting\n" +
        "✅ ₹15-25 per panel or AMC from ₹5,000/year\n\n" +
        "Same-day service available! Want to schedule a visit?"
      );
      return;
    }

    // Check for savings/benefits
    if (lowerMessage.includes('saving') || lowerMessage.includes('benefit') || lowerMessage.includes('advantage')) {
      addBotMessage(
        "Solar Energy Benefits:\n\n" +
        "💰 Reduce bills by up to 90%\n" +
        "🌍 Reduce carbon footprint\n" +
        "⚡ Energy independence\n" +
        "📈 Increase property value\n" +
        "💵 Government subsidies available\n" +
        "🔒 Protection from rising electricity costs\n\n" +
        "Jaipur gets 300+ sunny days - perfect for solar! Ready to get started?"
      );
      return;
    }

    // Check for location/contact
    if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('contact')) {
      addBotMessage(
        "📍 Location: Jaipur, Rajasthan, India\n\n" +
        "📞 Phone:\n" +
        "+91-7014235836\n" +
        "+91-9928567308\n\n" +
        "📧 Email:\n" +
        "enterprisessethsawaliya@gmail.com\n\n" +
        "We serve all areas of Jaipur. Would you like to schedule a free site visit?"
      );
      return;
    }

    // Default response
    addBotMessage(
      "I'm here to help! You can ask me about:\n\n" +
      "• Our solar services\n" +
      "• Pricing and quotes\n" +
      "• Installation process\n" +
      "• Maintenance services\n" +
      "• Government subsidies\n" +
      "• Energy savings\n\n" +
      "Or type 'quote' to get a free quote!"
    );
  };

  const handleQuoteStepResponse = (value: string) => {
    switch (conversationStep) {
      case 1: // Name
        setQuoteData(prev => ({ ...prev, name: value }));
        setConversationStep(2);
        addBotMessage(`Nice to meet you, ${value}! 😊\n\nWhat's your email address?`);
        break;
      case 2: // Email
        setQuoteData(prev => ({ ...prev, email: value }));
        setConversationStep(3);
        addBotMessage("Great! What's your phone number?");
        break;
      case 3: // Phone
        setQuoteData(prev => ({ ...prev, phone: value }));
        setConversationStep(4);
        addBotMessage(
          "Perfect! What type of property do you have?\n\n" +
          "1️⃣ Residential (Home/Villa)\n" +
          "2️⃣ Commercial (Office/Shop)\n" +
          "3️⃣ Industrial (Factory/Warehouse)"
        );
        break;
      case 4: // Property Type
        const propertyType = value.includes('1') || value.toLowerCase().includes('residential') || value.toLowerCase().includes('home')
          ? 'Residential'
          : value.includes('2') || value.toLowerCase().includes('commercial') || value.toLowerCase().includes('office')
          ? 'Commercial'
          : value.includes('3') || value.toLowerCase().includes('industrial') || value.toLowerCase().includes('factory')
          ? 'Industrial'
          : value;
        setQuoteData(prev => ({ ...prev, propertyType }));
        setConversationStep(5);
        addBotMessage(
          "Excellent! What system size are you interested in?\n\n" +
          "• Small (1-5 kW)\n" +
          "• Medium (5-20 kW)\n" +
          "• Large (20-50 kW)\n" +
          "• Extra Large (50+ kW)\n" +
          "• Not sure"
        );
        break;
      case 5: // System Size
        setQuoteData(prev => ({ ...prev, systemSize: value }));
        setConversationStep(6);
        addBotMessage("Almost done! Any specific requirements or questions? (Or type 'none')");
        break;
      case 6: // Message
        setQuoteData(prev => ({ ...prev, message: value === 'none' ? '' : value }));
        submitQuote({ ...quoteData, message: value === 'none' ? '' : value });
        break;
    }
  };

  const submitQuote = async (data: QuoteData) => {
    try {
      await contactQueriesAPI.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        property_type: data.propertyType,
        system_size: data.systemSize,
        budget: null,
        timeline: null,
        roof_type: null,
        message: data.message || 'Quote request from chatbot'
      });

      addBotMessage(
        `🎉 Thank you, ${data.name}!\n\n` +
        "Your quote request has been submitted successfully. Our team will contact you within 24 hours.\n\n" +
        "In the meantime, feel free to explore our website or ask me any questions!"
      );

      toast.success('Quote request submitted successfully!');
      
      // Reset
      setIsCollectingQuote(false);
      setConversationStep(0);
      setQuoteData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        systemSize: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Failed to submit quote:', error);
      const errorMessage = error?.message || 'There was an error submitting your request.';
      addBotMessage(
        `I'm sorry, ${errorMessage} Please try again or contact us directly at +91-7014235836.`
      );
      toast.error('Failed to submit quote request');
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);

    if (isCollectingQuote) {
      handleQuoteStepResponse(inputValue);
    } else {
      handleBotResponse(inputValue);
    }

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            size="lg"
            className="h-16 w-16 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 bg-gradient-to-br from-primary via-primary to-secondary group relative overflow-hidden"
            onClick={() => setIsOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <MessageCircle className="w-7 h-7 relative z-10" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
          </Button>
        )}

        {/* Chatbot Window */}
        {isOpen && (
          <Card className="w-[calc(100vw-2rem)] max-w-[420px] h-[calc(100vh-6rem)] max-h-[680px] shadow-2xl border border-border/50 flex flex-col animate-slide-up overflow-hidden backdrop-blur-sm bg-background/95">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground px-5 py-4 flex items-center justify-between shrink-0 border-b border-primary-foreground/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 bg-background/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg ring-2 ring-primary-foreground/20">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-primary animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-tight">Solar Assistant</h3>
                  <div className="flex items-center gap-1.5 text-xs opacity-90">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online • Typically replies instantly</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full h-9 w-9 transition-all hover:rotate-90"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-muted/30 to-background">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-end gap-2.5 animate-fade-in ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md ${
                    message.type === 'bot' 
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground' 
                      : 'bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground'
                  }`}>
                    {message.type === 'bot' ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                  </div>
                  <div className="flex flex-col gap-1 max-w-[75%]">
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-sm ${
                        message.type === 'bot'
                          ? 'bg-background border border-border/50 rounded-tl-sm'
                          : 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-tr-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                    </div>
                    <span className={`text-[10px] text-muted-foreground px-1 ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-end gap-2.5 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-md">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                  <div className="bg-background border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies (shown initially) */}
            {messages.length === 1 && !isCollectingQuote && (
              <div className="px-5 py-3 border-t bg-muted/30 space-y-2.5 shrink-0">
                <p className="text-xs font-medium text-muted-foreground">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                    onClick={() => handleQuickReply('Get a quote')}
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Get Quote
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                    onClick={() => handleQuickReply('Tell me about services')}
                  >
                    <Sun className="w-3.5 h-3.5 mr-1.5" />
                    Services
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                    onClick={() => handleQuickReply('What are the savings?')}
                  >
                    <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                    Savings
                  </Button>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="px-5 py-4 border-t bg-background shrink-0">
              <div className="flex gap-2.5">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 h-11 text-sm border-border/50 focus:border-primary transition-colors"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="shrink-0 h-11 w-11 rounded-full bg-gradient-to-br from-primary to-secondary hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-4.5 h-4.5" />
                </Button>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <Shield className="w-3 h-3 text-muted-foreground" />
                <p className="text-[10px] text-muted-foreground">
                  Secure & confidential • Powered by Seth Sawalia Solar
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </>
  );
};

export default Chatbot;
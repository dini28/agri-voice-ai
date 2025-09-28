import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Send, Volume2, Languages, Sprout, Bot, User, Settings, Menu, Minimize2, Maximize2 } from 'lucide-react';
import { backendService } from '@/services/backendService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language?: string;
}

interface ChatInterfaceProps {
  onSendMessage?: (message: string, language: string) => Promise<string>;
  isProcessing?: boolean;
}

// Mock function for demo purposes
const mockSendMessage = async (message: string, language: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  return `I understand you asked "${message}" in ${language}. This is AgriBot's response with helpful agricultural advice!`;
};

export default function ChatInterface({
  onSendMessage,
  isProcessing: externalProcessing = false
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m AgriBot, your smart agricultural assistant. I can help you with farming and agriculture-related questions. Feel free to ask in your preferred language.',
      sender: 'bot',
      timestamp: new Date(),
      language: 'en'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [internalProcessing, setInternalProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState<boolean>(false);

  const isProcessing = externalProcessing || internalProcessing;

  // Check backend availability
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const isReady = await backendService.checkReady();
        setBackendAvailable(isReady);
        if (!isReady) {
          console.warn('Backend service is not available, using mock responses');
        }
      } catch (error) {
        console.error('Failed to check backend availability:', error);
        setBackendAvailable(false);
      }
    };

    checkBackend();
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Memoized language configuration
  const languages = useMemo(() => [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'pn', name: 'ਪੰਜਾਬੀ' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'mr', name: 'मराठी' },
  ], []);

  // Memoized placeholder text mapping
  const placeholderText = useMemo(() => {
    const placeholders: Record<string, string> = {
      en: "Ask me anything about farming...",
      hi: "खेती के बारे में कुछ भी पूछें...",
      pn: "ਖੇਤੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...",
      ta: "விவசாயம் பற்றி எதையும் கேளுங்கள்...",
      te: "వ్యవసాయం గురించి ఏదైనా అడగండి...",
      kn: "ಕೃಷಿಯ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ...",
      mr: "शेतीबद्दल काहीही विचारा..."
    };
    return placeholders[selectedLanguage] || placeholders.en;
  }, [selectedLanguage]);

  // Optimized scroll function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Effect for scrolling when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages.length, scrollToBottom]);

  // Optimized speech recognition setup
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
    }

    const recognition = recognitionRef.current;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = selectedLanguage === 'en' ? 'en-IN' : `${selectedLanguage}-IN`;

    const handleResult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    const handleError = () => setIsListening(false);
    const handleEnd = () => setIsListening(false);

    recognition.onresult = handleResult;
    recognition.onerror = handleError;
    recognition.onend = handleEnd;

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
  }, [selectedLanguage]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Optimized message sending
  const handleSendMessage = useCallback(async () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setInternalProcessing(true);

    try {
      let botResponse: string;

      if (onSendMessage) {
        botResponse = await onSendMessage(trimmedInput, selectedLanguage);
      } else if (backendAvailable) {
        const response = await backendService.sendMessage(trimmedInput, selectedLanguage);
        if (response.success && response.data) {
          botResponse = response.data;
        } else {
          throw new Error(response.error || 'Failed to get response from AI service');
        }
      } else {
        botResponse = await mockSendMessage(trimmedInput, selectedLanguage);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        language: selectedLanguage
      };

      setMessages(prev => [...prev, botMessage]);
      speakText(botResponse, selectedLanguage);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        language: selectedLanguage
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setInternalProcessing(false);
    }
  }, [inputText, selectedLanguage, isProcessing, onSendMessage, backendAvailable]);

  // Optimized speech recognition toggle
  const toggleListening = useCallback(() => {
    if (!recognitionRef.current || isProcessing) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition error:', error);
        setIsListening(false);
      }
    }
  }, [isListening, isProcessing]);

  // Optimized text-to-speech
  const speakText = useCallback((text: string, language: string) => {
    if (!('speechSynthesis' in window)) return;

    // Cancel any existing speech
    speechSynthesis.cancel();

    setIsSpeaking(true);

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.lang = language === 'en' ? 'en-IN' : `${language}-IN`;
    utteranceRef.current.rate = 0.9;
    utteranceRef.current.pitch = 1;

    const handleEnd = () => setIsSpeaking(false);
    const handleError = () => setIsSpeaking(false);

    utteranceRef.current.onend = handleEnd;
    utteranceRef.current.onerror = handleError;

    speechSynthesis.speak(utteranceRef.current);
  }, []);

  // Optimized keyboard handler
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Optimized time formatter
  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  // Memoized message components to prevent unnecessary re-renders
  const messageComponents = useMemo(() => {
    return messages.map((message) => (
      <div
        key={message.id}
        className={`flex gap-4 max-w-4xl mx-auto ${message.sender === 'user' ? "justify-end" : "justify-start"}`}
      >
        {message.sender === 'bot' && (
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 border-2 border-white">
            <Sprout className="h-6 w-6 text-white" />
          </div>
        )}

        <div
          className={`max-w-[75%] ${message.sender === 'user'
            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
            : "bg-white border border-gray-200 text-gray-800 shadow-sm"
            } rounded-3xl px-6 py-4 relative`}
        >
          <p className="text-sm leading-relaxed break-words">{message.text}</p>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-opacity-20 border-current">
            <span className={`text-xs ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
              {formatTime(message.timestamp)}
            </span>
            {message.sender === 'bot' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakText(message.text, message.language || selectedLanguage)}
                className="h-7 w-7 p-0 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full"
                title="Play audio"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {message.sender === 'user' && (
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 border-2 border-white">
            <User className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
    ));
  }, [messages, selectedLanguage, speakText, formatTime]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AgriNova</h1>
              <p className="text-sm text-gray-600">Smart Agricultural Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm appearance-none cursor-pointer min-w-[140px]"
              >
              </select>
              <Languages className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="rounded-xl hover:bg-gray-100"
            >
              {isMinimized ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      {!isMinimized && (
        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6">
          {/* Messages Area */}
          <ScrollArea className="flex-1 py-8">
            <div className="space-y-6">
              {messageComponents}

              {isProcessing && (
                <div className="flex justify-start max-w-4xl mx-auto">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 border-2 border-white">
                    <Sprout className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4 bg-white border border-gray-200 rounded-3xl px-6 py-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-sm text-gray-500 ml-2">AgriBot is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="sticky bottom-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder={placeholderText}
                      className="bg-white border-gray-300 rounded-2xl py-4 px-6 pr-24 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm text-base resize-none"
                      disabled={isProcessing}
                    />

                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                      <Button
                        onClick={toggleListening}
                        variant="ghost"
                        size="icon"
                        className={`rounded-xl h-10 w-10 ${isListening
                          ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
                          : "hover:bg-gray-100"
                          }`}
                        disabled={isProcessing || !recognitionRef.current}
                        title={isListening ? "Stop listening" : "Start voice input"}
                      >
                        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </Button>

                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim() || isProcessing}
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl h-10 w-10 shadow-lg transition-all duration-200 disabled:opacity-50"
                        title="Send message"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-green-500" />
                  <span>Voice & multilingual support enabled</span>
                  {isSpeaking && (
                    <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-700 border-green-200">
                      <Volume2 className="h-3 w-3 animate-pulse" />
                      <span>Speaking...</span>
                    </Badge>
                  )}
                </div>

                <div className="text-xs text-gray-400">
                  Press Enter to send • Shift+Enter for new line
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
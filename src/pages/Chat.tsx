import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Send, Volume2, Languages, Sprout, User, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { backendService } from '@/services/backendService';

// Types
interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    language?: string;
}

interface Language {
    code: string;
    name: string;
}

interface ChatInterfaceProps {
    onSendMessage?: (message: string, language: string) => Promise<string>;
    isProcessing?: boolean;
}

// Constants
const LANGUAGES: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'pn', name: 'ਪੰਜਾਬੀ' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'mr', name: 'मराठी' },
];

const PLACEHOLDER_TEXTS: Record<string, string> = {
    en: "Ask me anything about farming...",
    hi: "खेती के बारे में कुछ भी पूछें...",
    pn: "ਖੇਤੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...",
    ta: "விவசாயம் பற்றி எதையும் கேளுங்கள்...",
    te: "వ్యవసాయం గురించి ఏదైనా అడగండి...",
    kn: "ಕೃಷಿಯ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ...",
    mr: "शेतीबद्दल काहीही विचारा..."
};

// Language to locale mapping for speech recognition and synthesis
const LANGUAGE_LOCALES: Record<string, string> = {
    en: 'en-US',
    hi: 'hi-IN',
    pn: 'pa-IN', // Fixed: 'pn-IN' is not a valid locale, changed to 'pa-IN' for Punjabi
    ta: 'ta-IN',
    te: 'te-IN',
    kn: 'kn-IN',
    mr: 'mr-IN'
};

const INITIAL_MESSAGE: Message = {
    id: '1',
    text: 'Hello! I\'m AgriBot, your smart agricultural assistant. I can help you with farming and agriculture-related questions. Feel free to ask in your preferred language.',
    sender: 'bot',
    timestamp: new Date(),
    language: 'en'
};

// Custom hooks
const useSpeechRecognition = (language: string) => {
    const recognitionRef = useRef<any>(null);
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        // Check if speech recognition is supported
        const hasSupport = typeof window !== 'undefined' &&
            ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
        setIsSupported(hasSupport);

        if (!hasSupport) {
            return;
        }

        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

        if (!recognitionRef.current && SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
        }

        const recognition = recognitionRef.current;
        if (recognition) {
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            // Use the language locale mapping with fallback
            recognition.lang = LANGUAGE_LOCALES[language] || 'en-US';
        }

        return () => {
            if (recognition) {
                recognition.onresult = null;
                recognition.onerror = null;
                recognition.onend = null;
                recognition.onstart = null;
            }
        };
    }, [language]);

    const startListening = useCallback((onResult: (transcript: string) => void) => {
        if (!recognitionRef.current || !isSupported) return false;

        const recognition = recognitionRef.current;

        // Clear any existing listeners
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
        recognition.onstart = null;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            if (event.results && event.results.length > 0 && event.results[0].length > 0) {
                const transcript = event.results[0][0].transcript;
                if (transcript && transcript.trim()) {
                    onResult(transcript.trim());
                }
            }
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        try {
            recognition.start();
            return true;
        } catch (error) {
            console.error('Speech recognition start error:', error);
            setIsListening(false);
            return false;
        }
    }, [isSupported]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            try {
                recognitionRef.current.stop();
            } catch (error) {
                console.error('Error stopping speech recognition:', error);
            }
        }
        setIsListening(false);
    }, [isListening]);

    return { isListening, isSupported, startListening, stopListening };
};

const useSpeechSynthesis = () => {
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    }, []);

    const speak = useCallback((text: string, language: string) => {
        if (!isSupported || !text.trim()) return;

        // Cancel any existing speech
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(true);

        utteranceRef.current = new SpeechSynthesisUtterance(text);
        // Use the language locale mapping with fallback
        utteranceRef.current.lang = LANGUAGE_LOCALES[language] || 'en-US';
        utteranceRef.current.rate = 0.9;
        utteranceRef.current.pitch = 1;
        utteranceRef.current.volume = 0.8;

        utteranceRef.current.onend = () => {
            setIsSpeaking(false);
            utteranceRef.current = null;
        };

        utteranceRef.current.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            setIsSpeaking(false);
            utteranceRef.current = null;
        };

        try {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.speak(utteranceRef.current);
            }
        } catch (error) {
            console.error('Error starting speech synthesis:', error);
            setIsSpeaking(false);
        }
    }, [isSupported]);

    const stopSpeaking = useCallback(() => {
        if (isSpeaking && typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [isSpeaking]);

    useEffect(() => {
        return () => {
            if (utteranceRef.current && typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    return { isSpeaking, isSupported, speak, stopSpeaking };
};

// Mock function for demo
const mockSendMessage = async (message: string, language: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const languageName = LANGUAGES.find(lang => lang.code === language)?.name || 'English';
    return `I understand you asked "${message}" in ${languageName}. This is AgriBot's response with helpful agricultural advice!`;
};

// Message component
const MessageBubble = React.memo(({
    message,
    onSpeak,
    formatTime
}: {
    message: Message;
    onSpeak: (text: string, language: string) => void;
    formatTime: (date: Date) => string;
}) => (
    <div className={`flex gap-2 sm:gap-4 w-full ${message.sender === 'user' ? "justify-end" : "justify-start"} px-2 sm:px-0`}>
        {message.sender === 'bot' && (
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 border-2 border-white">
                <Sprout className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
        )}

        <div className={`max-w-[85%] sm:max-w-[75%] ${message.sender === 'user'
            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
            : "bg-white border border-gray-200 text-gray-800 shadow-sm"
            } rounded-2xl sm:rounded-3xl px-3 sm:px-6 py-3 sm:py-4 relative`}>
            <p className="text-sm sm:text-sm leading-relaxed break-words">{message.text}</p>
            <div className="flex items-center justify-between mt-2 sm:mt-3 pt-1 sm:pt-2 border-t border-opacity-20 border-current">
                <span className={`text-xs ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                </span>
                {message.sender === 'bot' && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSpeak(message.text, message.language || 'en')}
                        className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full"
                        title="Play audio"
                    >
                        <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                )}
            </div>
        </div>

        {message.sender === 'user' && (
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 border-2 border-white">
                <User className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
        )}
    </div>
));

MessageBubble.displayName = 'MessageBubble';

// Main component
const Chat = ({
    onSendMessage,
    isProcessing: externalProcessing = false
}: ChatInterfaceProps) => {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [inputText, setInputText] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [internalProcessing, setInternalProcessing] = useState(false);
    const [backendAvailable, setBackendAvailable] = useState<boolean>(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
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

    // Custom hooks
    const { isListening, isSupported: speechRecognitionSupported, startListening, stopListening } = useSpeechRecognition(selectedLanguage);
    const { isSpeaking, isSupported: speechSynthesisSupported, speak, stopSpeaking } = useSpeechSynthesis();

    // Memoized values
    const placeholderText = useMemo(() =>
        PLACEHOLDER_TEXTS[selectedLanguage] || PLACEHOLDER_TEXTS.en,
        [selectedLanguage]
    );

    const formatTime = useCallback((date: Date) => {
        try {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (error) {
            return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }, []);

    const currentLanguageName = useMemo(() =>
        LANGUAGES.find(lang => lang.code === selectedLanguage)?.name || 'English',
        [selectedLanguage]
    );

    // Effects
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages.length]);

    // Handlers
    const handleSendMessage = useCallback(async () => {
        const trimmedInput = inputText.trim();
        if (!trimmedInput || isProcessing) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
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
                // Use mock function as fallback
                botResponse = await mockSendMessage(trimmedInput, selectedLanguage);
            }

            const botMessage: Message = {
                id: `bot-${Date.now()}`,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date(),
                language: selectedLanguage
            };

            setMessages(prev => [...prev, botMessage]);

            // Use setTimeout to ensure the speak function is called after state update
            setTimeout(() => {
                speak(botResponse, selectedLanguage);
            }, 100);

        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                text: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
                sender: 'bot',
                timestamp: new Date(),
                language: selectedLanguage
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setInternalProcessing(false);
        }
    }, [inputText, selectedLanguage, isProcessing, onSendMessage, backendAvailable, speak]);

    const toggleListening = useCallback(() => {
        if (isProcessing) return;

        if (isListening) {
            stopListening();
        } else {
            const success = startListening((transcript) => {
                setInputText(transcript);
            });
            if (!success) {
                console.warn('Failed to start speech recognition');
            }
        }
    }, [isListening, isProcessing, startListening, stopListening]);

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    // Safe language change handler
    const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = e.target.value;
        if (LANGUAGES.some(lang => lang.code === newLanguage)) {
            setSelectedLanguage(newLanguage);
            // Stop any ongoing speech when language changes
            if (isSpeaking) {
                stopSpeaking();
            }
            if (isListening) {
                stopListening();
            }
        }
    }, [isSpeaking, isListening, stopSpeaking, stopListening]);

    // Memoized message list
    const messageComponents = useMemo(() =>
        messages.map((message) => (
            <MessageBubble
                key={message.id}
                message={message}
                onSpeak={speak}
                formatTime={formatTime}
            />
        )),
        [messages, speak, formatTime]
    );

    return (
        <div className="min-h-screen py-2 bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 flex flex-col">
            {/* Chat Container */}
            <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-3 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6">
                {/* Control Bar */}
                <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm mb-4 sm:mb-6 px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        {/* Enhanced Logo */}
                        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group">
                            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-lime-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                    <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
                                </div>
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Sprout className="h-5 w-5 lg:h-6 lg:w-6 text-white drop-shadow-sm" />
                                    <Leaf className="absolute -top-1 -right-1 h-3 w-3 text-white/80 animate-pulse" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    AgriNova
                                </h1>
                                <p className="text-xs lg:text-sm text-muted-foreground font-medium">
                                    Agricultural Assistant
                                </p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Language Selector */}
                            <div className="relative">
                                <select
                                    value={selectedLanguage}
                                    onChange={handleLanguageChange}
                                    className="bg-white border border-gray-300 rounded-lg sm:rounded-xl px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm appearance-none cursor-pointer min-w-[80px] sm:min-w-[120px]"
                                >
                                    {LANGUAGES.map(lang => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                                <Languages className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 mb-4 sm:mb-6">
                    <div className="space-y-4 sm:space-y-6 pb-4">
                        {messageComponents}

                        {isProcessing && (
                            <div className="flex justify-start w-full px-2 sm:px-0">
                                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 border-2 border-white">
                                    <Sprout className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                                </div>
                                <div className="ml-2 sm:ml-4 bg-white border border-gray-200 rounded-2xl sm:rounded-3xl px-3 sm:px-6 py-3 sm:py-4 shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                        <span className="text-xs sm:text-sm text-gray-500 ml-2">AgriBot is thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-6">
                    <div className="flex gap-2 sm:gap-3 items-end">
                        <div className="flex-1">
                            <div className="relative">
                                <Input
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder={placeholderText}
                                    className="bg-white border-gray-300 rounded-xl sm:rounded-2xl py-2 sm:py-3 px-3 sm:px-5 pr-16 sm:pr-20 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm text-sm sm:text-base"
                                    disabled={isProcessing}
                                />

                                <div className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                                    {speechRecognitionSupported && (
                                        <Button
                                            onClick={toggleListening}
                                            variant="ghost"
                                            size="icon"
                                            className={`rounded-lg sm:rounded-xl h-7 w-7 sm:h-8 sm:w-8 ${isListening
                                                ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
                                                : "hover:bg-gray-100"
                                                }`}
                                            disabled={isProcessing}
                                            title={isListening ? "Stop listening" : "Start voice input"}
                                        >
                                            {isListening ? <MicOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Mic className="h-3 w-3 sm:h-4 sm:w-4" />}
                                        </Button>
                                    )}

                                    {isSpeaking && speechSynthesisSupported && (
                                        <Button
                                            onClick={stopSpeaking}
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-lg sm:rounded-xl h-7 w-7 sm:h-8 sm:w-8 bg-orange-500 text-white hover:bg-orange-600"
                                            title="Stop speaking"
                                        >
                                            <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                        </Button>
                                    )}

                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!inputText.trim() || isProcessing}
                                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-lg sm:rounded-xl h-7 w-7 sm:h-8 sm:w-8 shadow-lg transition-all duration-200 disabled:opacity-50"
                                        title="Send message"
                                    >
                                        <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 gap-2 sm:gap-0">
                        <div className="flex items-center gap-2">
                            <Languages className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                            <span className="text-xs sm:text-sm">
                                Current: {currentLanguageName} • {speechRecognitionSupported && speechSynthesisSupported
                                    ? "Voice & multilingual support"
                                    : speechRecognitionSupported
                                        ? "Voice input available"
                                        : speechSynthesisSupported
                                            ? "Voice output available"
                                            : "Multilingual support"
                                }
                            </span>
                            {isSpeaking && (
                                <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-700 border-green-200 text-xs">
                                    <Volume2 className="h-2 w-2 sm:h-3 sm:w-3 animate-pulse" />
                                    <span>Speaking...</span>
                                </Badge>
                            )}
                            {isListening && (
                                <Badge variant="secondary" className="flex items-center gap-1 bg-red-100 text-red-700 border-red-200 text-xs">
                                    <Mic className="h-2 w-2 sm:h-3 sm:w-3 animate-pulse" />
                                    <span>Listening...</span>
                                </Badge>
                            )}
                        </div>

                        <div className="text-xs text-gray-400">
                            Press Enter to send
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
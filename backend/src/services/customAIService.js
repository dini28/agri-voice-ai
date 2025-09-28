import axios from 'axios';
import { AIServiceInterface, AIResponse } from './aiServiceInterface.js';
import { logger } from '../utils/logger.js';

/**
 * Custom AI Service Template
 * This template can be easily modified to integrate with your personal AI model
 * 
 * To use this with your own AI model:
 * 1. Update the baseUrl to point to your AI model's API endpoint
 * 2. Modify the request format in sendMessage() to match your API
 * 3. Update the response parsing logic to handle your model's response format
 * 4. Adjust the system prompts as needed
 */
export class CustomAIService extends AIServiceInterface {
  constructor(config) {
    super(config);
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://ai.google.dev/gemini-api/docs/pricing#gemini-2.5-pro';
    this.model = config.model || 'gemini-2.5-pro';
    this.maxTokens = config.maxTokens || 1000;
    this.temperature = config.temperature || 0.7;
    this.timeout = config.timeout || 30000;
  }

  async initialize() {
    try {
      if (!this.apiKey || this.apiKey.trim() === '') {
        throw new Error('Custom AI API key is required');
      }

      // Test the API key with a simple request
      await this.isAvailable();
      this.isInitialized = true;
      logger.info('Custom AI service initialized successfully');
      return true;
    } catch (error) {
      logger.error('Failed to initialize Custom AI service:', error.message);
      throw error;
    }
  }

  async isAvailable() {
    try {
      // Test endpoint - modify this based on your API
      const response = await axios.get(
        `${this.baseUrl}/health`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );
      return response.status === 200;
    } catch (error) {
      logger.error('Custom AI service availability check failed:', error.message);
      return false;
    }
  }

  getServiceInfo() {
    return {
      name: 'Custom AI Model',
      model: this.model,
      version: '1.0.0',
      provider: 'Custom',
      baseUrl: this.baseUrl,
      maxTokens: this.maxTokens,
      temperature: this.temperature,
      supportedLanguages: this.getSupportedLanguages()
    };
  }

  getSystemPrompt(language) {
    // Customize these prompts for your specific AI model
    const prompts = {
      hi: `आप AgriBot हैं, एक मित्रवत और जानकार कृषि क्षेत्र के लिए AI सहायक हैं। आप सरल भाषा में बात करते हैं। तकनीकी शब्दजाल से बचें जब तक कि न पूछा जाए। फसलों, कीटों, उर्वरकों, और सरकारी योजनाओं पर व्यावहारिक सलाह दें। भारतीय कृषि पद्धतियों के अनुकूल उत्तर दें।`,
      en: `You are AgriBot, a friendly and knowledgeable AI assistant for the agriculture sector. Speak in simple language. Avoid jargon unless asked. Provide region-specific, practical advice on crops, pests, fertilizers, and government schemes for Indian farmers.`,
      ta: `நீங்கள் AgriBot, விவசாயத் துறைக்கான நட்பான மற்றும் அறிவுள்ள AI உதவியாளர். எளிய மொழியில் பேசுங்கள். இந்திய விவசாயிகளுக்கு பயிர்கள், பூச்சிகள், உரங்கள் மற்றும் அரசு திட்டங்கள் குறித்து நடைமுறை ஆலோசனை வழங்குங்கள்.`,
      te: `మీరు AgriBot, వ్యవసాయ రంగానికి స్నేహపూర్వక మరియు జ్ఞానవంతమైన AI సహాయకుడు. సులభమైన భాషలో మాట్లాడండి. భారతీయ రైతులకు పంటలు, కీటకాలు, ఎరువులు మరియు ప్రభుత్వ పథకాలపై ఆచరణాత్మక సలహా ఇవ్వండి.`,
      kn: `ನೀವು AgriBot, ಕೃಷಿ ಕ್ಷೇತ್ರಕ್ಕಾಗಿ ಸ್ನೇಹಪರ ಮತ್ತು ಜ್ಞಾನವುಳ್ಳ AI ಸಹಾಯಕರಾಗಿದ್ದೀರಿ. ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ. ಭಾರತೀಯ ರೈತರಿಗೆ ಬೆಳೆಗಳು, ಕೀಟಗಳು, ರಸಗೊಬ್ಬರಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಪ್ರಾಯೋಗಿಕ ಸಲಹೆ ನೀಡಿ.`,
      mr: `तुम्ही AgriBot आहात, कृषी क्षेत्रासाठी मैत्रीपूर्ण आणि ज्ञानी AI सहाय्यक. सोप्या भाषेत बोला. भारतीय शेतकऱ्यांना पिके, किडे, खते आणि सरकारी योजनांबद्दल व्यावहारिक सल्ला द्या.`,
      pn: `ਤੁਸੀਂ AgriBot ਹੋ, ਖੇਤੀਬਾੜੀ ਖੇਤਰ ਲਈ ਇੱਕ ਦੋਸਤਾਨਾ ਅਤੇ ਗਿਆਨਵਾਨ AI ਸਹਾਇਕ। ਸਧਾਰਨ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲੋ। ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਫਸਲਾਂ, ਕੀਟਾਂ, ਖਾਦਾਂ, ਅਤੇ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਬਾਰੇ ਵਿਹਾਰਕ ਸਲਾਹ ਦਿਓ।`
    };

    return prompts[language] || prompts.en;
  }

  async sendMessage(message, language = 'en', options = {}) {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!this.isValidLanguage(language)) {
        return AIResponse.error(`Unsupported language: ${language}`);
      }

      const systemPrompt = this.getSystemPrompt(language);
      const languageNames = {
        hi: 'Hindi',
        en: 'English',
        ta: 'Tamil',
        te: 'Telugu',
        kn: 'Kannada',
        mr: 'Marathi',
        pn: 'Punjabi'
      };

      // Customize this request format based on your AI model's API
      const requestBody = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `${message}\n\nPlease respond in ${languageNames[language] || 'English'} language.`
          }
        ],
        max_tokens: this.maxTokens,
        temperature: this.temperature,
        // Add any other parameters your model supports
        ...options
      };

      const startTime = Date.now();

      // Customize the API call based on your model's endpoint
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`, // Adjust endpoint as needed
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: this.timeout
        }
      );

      const processingTime = Date.now() - startTime;

      // Customize response parsing based on your model's response format
      if (response.data.choices && response.data.choices.length > 0) {
        const choice = response.data.choices[0];

        if (choice.finish_reason === 'content_filter') {
          return AIResponse.error(
            'Response blocked due to content filtering. Please rephrase your question.',
            { processingTime, finishReason: choice.finish_reason }
          );
        }

        const content = choice.message?.content;
        if (content) {
          return AIResponse.success(
            content.trim(),
            {
              processingTime,
              finishReason: choice.finish_reason,
              model: this.model,
              language,
              usage: response.data.usage // Include token usage if available
            }
          );
        }
      }

      return AIResponse.error(
        'No valid response received from Custom AI API',
        { processingTime }
      );

    } catch (error) {
      logger.error('Custom AI API error:', error.message);

      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        if (status === 401) {
          return AIResponse.error('Invalid API key. Please check your configuration.');
        } else if (status === 429) {
          return AIResponse.error('Rate limit exceeded. Please try again later.');
        } else if (status === 400) {
          return AIResponse.error(`Bad request: ${errorData?.error?.message || 'Invalid request format'}`);
        } else {
          return AIResponse.error(`API Error: ${status} - ${errorData?.error?.message || error.message}`);
        }
      } else if (error.code === 'ECONNABORTED') {
        return AIResponse.error('Request timeout. Please try again.');
      } else {
        return AIResponse.error(`Network error: ${error.message}`);
      }
    }
  }
}

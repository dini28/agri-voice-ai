import axios from 'axios';
import { AIServiceInterface, AIResponse } from './aiServiceInterface.js';
import { logger } from '../utils/logger.js';

export class GeminiService extends AIServiceInterface {
  constructor(config) {
    super(config);
    this.apiKey = config.apiKey;
    this.baseUrl = 'https://ai.google.dev/gemini-api/docs/pricing#gemini-2.5-pro';
    this.model = config.model || 'gemini-2.5-pro';
    this.maxTokens = config.maxTokens || 1000;
    this.temperature = config.temperature || 0.7;
  }

  async initialize() {
    try {
      if (!this.apiKey || this.apiKey.trim() === '') {
        throw new Error('Gemini API key is required');
      }

      // Test the API key with a simple request
      await this.isAvailable();
      this.isInitialized = true;
      logger.info('Gemini service initialized successfully');
      return true;
    } catch (error) {
      logger.error('Failed to initialize Gemini service:', error.message);
      throw error;
    }
  }

  async isAvailable() {
    try {
      const response = await axios.get(
        `${this.baseUrl}?key=${this.apiKey}`,
        { timeout: 10000 }
      );
      return response.status === 200;
    } catch (error) {
      logger.error('Gemini service availability check failed:', error.message);
      return false;
    }
  }

  getServiceInfo() {
    return {
      name: 'Google Gemini',
      model: this.model,
      version: '2.0-flash',
      provider: 'Google',
      maxTokens: this.maxTokens,
      temperature: this.temperature,
      supportedLanguages: this.getSupportedLanguages()
    };
  }

  getSystemPrompt(language) {
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

      const fullPrompt = `${systemPrompt}

User Question: ${message}

Instructions:
- Respond in ${languageNames[language] || 'English'} language
- Provide specific, actionable advice
- Keep responses concise but comprehensive
- Use simple language that farmers can easily understand
- Focus on practical solutions for Indian agriculture
- Include relevant government schemes if applicable`;

      const requestBody = {
        contents: [{
          parts: [{ text: fullPrompt }]
        }],
        generationConfig: {
          temperature: this.temperature,
          topK: 40,
          topP: 0.8,
          maxOutputTokens: this.maxTokens,
          candidateCount: 1
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      };

      const startTime = Date.now();
      const response = await axios.post(
        `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000
        }
      );

      const processingTime = Date.now() - startTime;

      if (response.data.candidates && response.data.candidates.length > 0) {
        const candidate = response.data.candidates[0];

        if (candidate.finishReason === 'SAFETY') {
          return AIResponse.error(
            'Response blocked due to safety concerns. Please rephrase your question.',
            { processingTime, finishReason: candidate.finishReason }
          );
        }

        const content = candidate.content?.parts?.[0]?.text;
        if (content) {
          return AIResponse.success(
            content.trim(),
            {
              processingTime,
              finishReason: candidate.finishReason,
              model: this.model,
              language
            }
          );
        }
      }

      return AIResponse.error(
        'No valid response received from Gemini API',
        { processingTime }
      );

    } catch (error) {
      logger.error('Gemini API error:', error.message);

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

export interface GeminiResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://ai.google.dev/gemini-api/docs/pricing#gemini-2.5-pro';
  private model = 'gemini-2.5-pro';

  constructor(apiKey: string) {
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('Gemini API key is required');
    }
    this.apiKey = apiKey;
  }

  private getSystemPrompt(language: string): string {
    const prompts: Record<string, string> = {
      hi: `आप AgriBot हैं, एक मित्रवत और जानकार कृषि क्षेत्र के लिए AI सहायक हैं। आप सरल भाषा में बात करते हैं। तकनीकी शब्दजाल से बचें जब तक कि न पूछा जाए। फसलों, कीटों, उर्वरकों, और सरकारी योजनाओं पर व्यावहारिक सलाह दें। भारतीय कृषि पद्धतियों के अनुकूल उत्तर दें।`,
      en: `You are AgriBot, a friendly and knowledgeable AI assistant for the agriculture sector. Speak in simple language. Avoid jargon unless asked. Provide region-specific, practical advice on crops, pests, fertilizers, and government schemes for Indian farmers.`,
      ta: `நீங்கள் AgriBot, விவசாயத் துறைக்கான நட்பான மற்றும் அறிவுள்ள AI உதவியாளர். எளிய மொழியில் பேசுங்கள். இந்திய விவசாயிகளுக்கு பயிர்கள், பூச்சிகள், உரங்கள் மற்றும் அரசு திட்டங்கள் குறித்து நடைமுறை ஆலோசனை வழங்குங்கள்.`,
      te: `మీరు AgriBot, వ్యవసాయ రంగానికి స్నేహపూర్వక మరియు జ్ఞానవంతమైన AI సహాయకుడు. సులభమైన భాషలో మాట్లాడండి. భారతీయ రైతులకు పంటలు, కీటకాలు, ఎరువులు మరియు ప్రభుత్వ పథకాలపై ఆచరణాత్మక సలహా ఇవ్వండి.`,
      kn: `ನೀವು AgriBot, ಕೃಷಿ ಕ್ಷೇತ್ರಕ್ಕಾಗಿ ಸ್ನೇಹಪರ ಮತ್ತು ಜ್ಞಾನವುಳ್ಳ AI ಸಹಾಯಕರಾಗಿದ್ದೀರಿ. ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ. ಭಾರತೀಯ ರೈತರಿಗೆ ಬೆಳೆಗಳು, ಕೀಟಗಳು, ರಸಗೊಬ್ಬರಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಪ್ರಾಯೋಗಿಕ ಸಲಹೆ ನೀಡಿ.`,
      mr: `तुम्ही AgriBot आहात, कृषी क्षेत्रासाठी मैत्रीपूर्ण आणि ज्ञानी AI सहाय्यक. सोप्या भाषेत बोला. भारतीय शेतकऱ्यांना पिके, किडे, खते आणि सरकारी योजनांबद्दल व्यावहारिक सल्ला द्या.`
    };

    return prompts[language] || prompts.en;
  }

  async sendMessage(userMessage: string, language: string = 'en'): Promise<GeminiResponse> {
    try {
      const systemPrompt = this.getSystemPrompt(language);
      const languageNames: Record<string, string> = {
        hi: 'Hindi',
        en: 'English',
        ta: 'Tamil',
        te: 'Telugu',
        kn: 'Kannada',
        mr: 'Marathi'
      };

      const fullPrompt = `${systemPrompt}

User Question: ${userMessage}

Instructions:
- Respond in ${languageNames[language] || 'English'} language
- Provide specific, actionable advice
- Keep responses concise but comprehensive
- Use simple language that farmers can easily understand`;

      const requestBody = {
        contents: [{
          parts: [{ text: fullPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.8,
          maxOutputTokens: 1000,
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

      const response = await fetch(`${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error?.message || response.statusText;

        if (response.status === 401) {
          return {
            success: false,
            error: 'Invalid API key. Please check your configuration.'
          };
        }

        return {
          success: false,
          error: `API Error: ${response.status} - ${errorMessage}`
        };
      }

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];

        if (candidate.finishReason === 'SAFETY') {
          return {
            success: false,
            error: 'Response blocked due to safety concerns. Please rephrase your question.'
          };
        }

        const content = candidate.content?.parts?.[0]?.text;
        if (content) {
          return {
            success: true,
            data: content.trim()
          };
        }
      }

      return {
        success: false,
        error: 'No valid response received from the AI service.'
      };

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      };
    }
  }

}
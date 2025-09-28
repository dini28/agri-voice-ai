import { API_CONFIG, getBackendUrl, getApiKey } from '@/config/api';

export interface BackendResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface ChatMessage {
  message: string;
  language: string;
  options?: Record<string, any>;
}

export interface ChatResponse {
  message: string;
  language: string;
  processingTime: number;
  metadata?: Record<string, any>;
}

export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
}

export interface ServiceInfo {
  name: string;
  model: string;
  version: string;
  provider: string;
  supportedLanguages: string[];
}

export class BackendService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = getBackendUrl();
    this.apiKey = getApiKey();
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<BackendResponse> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Backend request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Send a message to the AI service
   */
  async sendMessage(
    message: string,
    language: string = 'en',
    options: Record<string, any> = {}
  ): Promise<{ success: boolean; data?: string; error?: string }> {
    const response = await this.makeRequest<ChatResponse>('/api/chat/message', {
      method: 'POST',
      body: JSON.stringify({
        message,
        language,
        options,
      }),
    });

    if (response.success && response.data) {
      return {
        success: true,
        data: response.data.message,
      };
    }

    return {
      success: false,
      error: response.error || 'Failed to get response from AI service',
    };
  }

  /**
   * Get supported languages
   */
  async getLanguages(): Promise<{ success: boolean; data?: LanguageInfo[]; error?: string }> {
    const response = await this.makeRequest<{ languages: LanguageInfo[] }>('/api/chat/languages');

    if (response.success && response.data) {
      return {
        success: true,
        data: response.data.languages,
      };
    }

    return {
      success: false,
      error: response.error || 'Failed to get supported languages',
    };
  }

  /**
   * Get AI service information
   */
  async getServiceInfo(): Promise<{ success: boolean; data?: ServiceInfo; error?: string }> {
    const response = await this.makeRequest<{ currentService: ServiceInfo }>('/api/chat/service-info');

    if (response.success && response.data) {
      return {
        success: true,
        data: response.data.currentService,
      };
    }

    return {
      success: false,
      error: response.error || 'Failed to get service information',
    };
  }

  /**
   * Test the AI service
   */
  async testService(language: string = 'en'): Promise<{ success: boolean; data?: string; error?: string }> {
    const response = await this.makeRequest<{ response: string }>('/api/chat/test', {
      method: 'POST',
      body: JSON.stringify({ language }),
    });

    if (response.success && response.data) {
      return {
        success: true,
        data: response.data.response,
      };
    }

    return {
      success: false,
      error: response.error || 'Failed to test AI service',
    };
  }

  /**
   * Check if the backend is healthy
   */
  async checkHealth(): Promise<{ success: boolean; data?: any; error?: string }> {
    const response = await this.makeRequest('/api/health');

    if (response.success) {
      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: false,
      error: response.error || 'Backend health check failed',
    };
  }

  /**
   * Check if the backend is ready
   */
  async checkReady(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health/ready`, {
        headers: {
          'X-API-Key': this.apiKey,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Create singleton instance
export const backendService = new BackendService();

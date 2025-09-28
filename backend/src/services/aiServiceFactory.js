import { GeminiService } from './geminiService.js';
import { CustomAIService } from './customAIService.js';
import { logger } from '../utils/logger.js';

export class AIServiceFactory {
  constructor() {
    this.services = new Map();
    this.defaultService = null;
  }

  registerService(name, service, isDefault = false) {
    this.services.set(name, service);
    if (isDefault) {
      this.defaultService = name;
    }
    logger.info(`Registered AI service: ${name}`);
  }

  getService(name) {
    return this.services.get(name) || null;
  }

  getDefaultService() {
    return this.defaultService ? this.services.get(this.defaultService) : null;
  }

  getAllServices() {
    return this.services;
  }

  getServiceInfo(name) {
    const service = this.getService(name);
    return service ? service.getServiceInfo() : null;
  }

  async isServiceAvailable(name) {
    const service = this.getService(name);
    if (!service) return false;

    try {
      return await service.isAvailable();
    } catch (error) {
      logger.error(`Error checking availability for service ${name}:`, error.message);
      return false;
    }
  }

  async getAvailableServices() {
    const available = [];

    for (const [name, service] of this.services) {
      try {
        const isAvailable = await service.isAvailable();
        if (isAvailable) {
          available.push(name);
        }
      } catch (error) {
        logger.error(`Error checking availability for service ${name}:`, error.message);
      }
    }

    return available;
  }
}

export function createAIServiceFactory() {
  const factory = new AIServiceFactory();
  const aiService = process.env.AI_SERVICE || 'gemini';

  try {
    if (process.env.GEMINI_API_KEY) {
      const geminiConfig = {
        apiKey: process.env.GEMINI_API_KEY,
        model: process.env.GEMINI_MODEL || 'gemini-2.5-pro',
        maxTokens: parseInt(process.env.GEMINI_MAX_TOKENS) || 1000,
        temperature: parseFloat(process.env.GEMINI_TEMPERATURE) || 0.7
      };

      const geminiService = new GeminiService(geminiConfig);
      factory.registerService('gemini', geminiService, aiService === 'gemini');
      logger.info('Gemini service registered');
    }

    if (process.env.CUSTOM_AI_API_KEY) {
      const customConfig = {
        apiKey: process.env.CUSTOM_AI_API_KEY,
        baseUrl: process.env.CUSTOM_AI_BASE_URL,
        model: process.env.CUSTOM_AI_MODEL || 'your-model-name',
        maxTokens: parseInt(process.env.CUSTOM_AI_MAX_TOKENS) || 1000,
        temperature: parseFloat(process.env.CUSTOM_AI_TEMPERATURE) || 0.7,
        timeout: parseInt(process.env.CUSTOM_AI_TIMEOUT) || 30000
      };

      const customService = new CustomAIService(customConfig);
      factory.registerService('custom', customService, aiService === 'custom');
      logger.info('Custom AI service registered');
    }

    logger.info(`AI Service Factory initialized with ${factory.services.size} services`);
    logger.info(`Default service: ${factory.defaultService || 'none'}`);
    logger.info(`Active service: ${aiService}`);
  } catch (error) {
    logger.error('Error initializing AI Service Factory:', error.message);
  }

  return factory;
}

export const aiServiceFactory = createAIServiceFactory();
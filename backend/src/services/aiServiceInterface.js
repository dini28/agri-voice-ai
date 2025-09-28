export class AIResponse {
  constructor(success, data, error, metadata = {}) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.metadata = metadata;
    this.timestamp = new Date().toISOString();
  }

  static success(data, metadata = {}) {
    return new AIResponse(true, data, null, metadata);
  }

  static error(error, metadata = {}) {
    return new AIResponse(false, null, error, metadata);
  }
}

export class AIServiceInterface {
  constructor(config) {
    this.config = config;
    this.isInitialized = false;
  }

  async initialize() {
    throw new Error('initialize() method must be implemented by subclass');
  }

  async sendMessage(message, language = 'en', options = {}) {
    throw new Error('sendMessage() method must be implemented by subclass');
  }

  getServiceInfo() {
    throw new Error('getServiceInfo() method must be implemented by subclass');
  }

  async isAvailable() {
    throw new Error('isAvailable() method must be implemented by subclass');
  }

  getSupportedLanguages() {
    return ['en', 'hi', 'ta', 'te', 'kn', 'mr', 'pn'];
  }

  isValidLanguage(language) {
    return this.getSupportedLanguages().includes(language);
  }
}
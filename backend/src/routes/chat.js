import express from 'express';
import { body, validationResult } from 'express-validator';
import { aiServiceFactory } from '../services/aiServiceFactory.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

const validateMessage = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters'),
  body('language')
    .optional()
    .isIn(['en', 'hi', 'ta', 'te', 'kn', 'mr', 'pn'])
    .withMessage('Invalid language code'),
  body('options')
    .optional()
    .isObject()
    .withMessage('Options must be an object')
];

router.post('/message', validateMessage, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array(),
        timestamp: new Date().toISOString()
      });
    }

    const { message, language = 'en', options = {} } = req.body;
    const startTime = Date.now();

    logger.info('Chat message received', {
      language,
      messageLength: message.length,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    const aiService = aiServiceFactory.getDefaultService();
    if (!aiService) {
      logger.error('No AI service available');
      return res.status(503).json({
        success: false,
        error: 'AI service unavailable',
        message: 'No AI service is currently configured or available',
        timestamp: new Date().toISOString()
      });
    }

    const response = await aiService.sendMessage(message, language, options);
    const processingTime = Date.now() - startTime;

    if (response.success) {
      logger.info('Chat message processed successfully', {
        language,
        processingTime,
        responseLength: response.data?.length || 0
      });

      return res.json({
        success: true,
        data: {
          message: response.data,
          language,
          processingTime,
          metadata: response.metadata
        },
        timestamp: new Date().toISOString()
      });
    } else {
      logger.error('Chat message processing failed', {
        language,
        error: response.error,
        processingTime
      });

      return res.status(500).json({
        success: false,
        error: response.error,
        message: 'Failed to process your message. Please try again.',
        processingTime,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    logger.error('Chat message error:', error.message);

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An unexpected error occurred while processing your message',
      timestamp: new Date().toISOString()
    });
  }
});

router.get('/languages', (req, res) => {
  try {
    const aiService = aiServiceFactory.getDefaultService();
    const supportedLanguages = aiService ? aiService.getSupportedLanguages() : ['en'];

    const languageInfo = {
      en: { name: 'English', nativeName: 'English' },
      hi: { name: 'Hindi', nativeName: 'हिंदी' },
      ta: { name: 'Tamil', nativeName: 'தமிழ்' },
      te: { name: 'Telugu', nativeName: 'తెలుగు' },
      kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
      mr: { name: 'Marathi', nativeName: 'मराठी' },
      pn: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
    };

    const languages = supportedLanguages.map(code => ({
      code,
      ...languageInfo[code]
    }));

    res.json({
      success: true,
      data: {
        languages,
        defaultLanguage: 'en'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Languages endpoint error:', error.message);

    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve supported languages',
      timestamp: new Date().toISOString()
    });
  }
});

router.get('/service-info', (req, res) => {
  try {
    const aiService = aiServiceFactory.getDefaultService();

    if (!aiService) {
      return res.status(503).json({
        success: false,
        error: 'AI service unavailable',
        message: 'No AI service is currently configured',
        timestamp: new Date().toISOString()
      });
    }

    const serviceInfo = aiService.getServiceInfo();
    const availableServices = aiServiceFactory.getAllServices();

    res.json({
      success: true,
      data: {
        currentService: serviceInfo,
        availableServices: Array.from(availableServices.keys()),
        totalServices: availableServices.size
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Service info endpoint error:', error.message);

    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve service information',
      timestamp: new Date().toISOString()
    });
  }
});

router.post('/test', async (req, res) => {
  try {
    const testMessage = 'Hello, can you help me with farming advice?';
    const language = req.body.language || 'en';

    logger.info('AI service test requested', { language });

    const aiService = aiServiceFactory.getDefaultService();
    if (!aiService) {
      return res.status(503).json({
        success: false,
        error: 'AI service unavailable',
        message: 'No AI service is currently configured',
        timestamp: new Date().toISOString()
      });
    }

    const response = await aiService.sendMessage(testMessage, language);

    res.json({
      success: response.success,
      data: {
        testMessage,
        language,
        response: response.data,
        error: response.error,
        metadata: response.metadata
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('AI service test error:', error.message);

    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to test AI service',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
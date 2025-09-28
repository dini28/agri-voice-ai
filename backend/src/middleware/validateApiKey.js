import { logger } from '../utils/logger.js';

export const validateApiKey = (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'] ||
      req.headers['authorization']?.replace('Bearer ', '') ||
      req.query.apiKey;

    if (!apiKey) {
      logger.warn('API key validation failed: No API key provided', {
        ip: req.ip,
        url: req.url,
        method: req.method
      });

      return res.status(401).json({
        success: false,
        error: 'API key required',
        message: 'Please provide a valid API key in the X-API-Key header, Authorization header, or as a query parameter',
        timestamp: new Date().toISOString()
      });
    }

    if (!isValidApiKeyFormat(apiKey)) {
      logger.warn('API key validation failed: Invalid format', {
        ip: req.ip,
        url: req.url,
        method: req.method,
        apiKeyPrefix: apiKey.substring(0, 8) + '...'
      });

      return res.status(401).json({
        success: false,
        error: 'Invalid API key format',
        message: 'The provided API key does not have a valid format',
        timestamp: new Date().toISOString()
      });
    }

    req.apiKey = apiKey;

    logger.debug('API key validation successful', {
      ip: req.ip,
      url: req.url,
      method: req.method,
      apiKeyPrefix: apiKey.substring(0, 8) + '...'
    });

    next();
  } catch (error) {
    logger.error('API key validation error:', error.message);

    return res.status(500).json({
      success: false,
      error: 'API key validation failed',
      message: 'An error occurred while validating the API key',
      timestamp: new Date().toISOString()
    });
  }
};

function isValidApiKeyFormat(apiKey) {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }

  const trimmedKey = apiKey.trim();

  if (trimmedKey.length < 10) {
    return false;
  }

  const invalidPatterns = [
    /^test$/i,
    /^demo$/i,
    /^example$/i,
    /^your.*key$/i,
    /^api.*key$/i,
    /^replace.*with.*your.*key$/i
  ];

  return !invalidPatterns.some(pattern => pattern.test(trimmedKey));
}

export const apiKeyRateLimit = (req, res, next) => {
  next();
};
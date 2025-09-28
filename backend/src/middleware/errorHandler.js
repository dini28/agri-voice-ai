import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res) => {
  logger.error('Unhandled error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types
  switch (err.name) {
    case 'ValidationError':
      statusCode = 400;
      message = `Validation Error: ${err.message}`;
      break;
    case 'UnauthorizedError':
      statusCode = 401;
      message = 'Unauthorized: Invalid API key';
      break;
    case 'RateLimitError':
      statusCode = 429;
      message = 'Too many requests, please try again later';
      break;
  }

  // Handle connection errors
  if (err.code === 'ECONNREFUSED') {
    statusCode = 503;
    message = 'Service temporarily unavailable';
  } else if (err.code === 'ENOTFOUND') {
    statusCode = 503;
    message = 'External service unavailable';
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
    requestId: req.id || 'unknown',
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err
    })
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The requested route ${req.method} ${req.originalUrl} does not exist`,
    timestamp: new Date().toISOString(),
    availableRoutes: [
      'GET /api/health',
      'POST /api/chat/message',
      'GET /api/chat/languages'
    ]
  });
};
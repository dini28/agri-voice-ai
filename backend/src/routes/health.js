import express from 'express';
import { aiServiceFactory } from '../services/aiServiceFactory.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        ai: 'checking...'
      }
    };

    res.json({
      success: true,
      data: health,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Health check error:', error.message);

    res.status(500).json({
      success: false,
      error: 'Health check failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

router.get('/detailed', async (req, res) => {
  try {
    const startTime = Date.now();

    const aiService = aiServiceFactory.getDefaultService();
    let aiServiceStatus = 'unavailable';
    let aiServiceInfo = null;
    let aiServiceResponseTime = null;

    if (aiService) {
      try {
        const aiStartTime = Date.now();
        const isAvailable = await aiService.isAvailable();
        aiServiceResponseTime = Date.now() - aiStartTime;

        if (isAvailable) {
          aiServiceStatus = 'healthy';
          aiServiceInfo = aiService.getServiceInfo();
        } else {
          aiServiceStatus = 'unhealthy';
        }
      } catch (error) {
        logger.error('AI service health check failed:', error.message);
        aiServiceStatus = 'error';
      }
    }

    const availableServices = await aiServiceFactory.getAvailableServices();
    const allServices = Array.from(aiServiceFactory.getAllServices().keys());

    const health = {
      status: aiServiceStatus === 'healthy' ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      responseTime: Date.now() - startTime,
      services: {
        ai: {
          status: aiServiceStatus,
          responseTime: aiServiceResponseTime,
          info: aiServiceInfo,
          availableServices,
          totalServices: allServices.length
        }
      },
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        cpuUsage: process.cpuUsage()
      }
    };

    const statusCode = health.status === 'healthy' ? 200 : 503;

    res.status(statusCode).json({
      success: health.status === 'healthy',
      data: health,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Detailed health check error:', error.message);

    res.status(500).json({
      success: false,
      error: 'Health check failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

router.get('/ready', async (req, res) => {
  try {
    const aiService = aiServiceFactory.getDefaultService();

    if (!aiService) {
      return res.status(503).json({
        success: false,
        error: 'Not ready',
        message: 'AI service not configured',
        timestamp: new Date().toISOString()
      });
    }

    const isAvailable = await aiService.isAvailable();

    if (isAvailable) {
      res.json({
        success: true,
        status: 'ready',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({
        success: false,
        status: 'not ready',
        message: 'AI service is not available',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    logger.error('Readiness check error:', error.message);

    res.status(503).json({
      success: false,
      status: 'not ready',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

router.get('/live', (req, res) => {
  res.json({
    success: true,
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
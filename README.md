# 🌱 AgriNova - Agricultural Voice AI Chatbot

A comprehensive agricultural assistance platform featuring a multilingual voice-enabled chatbot powered by AI. Built with React frontend and Node.js backend, designed to help farmers with crop advice, pest management, and agricultural guidance.

## ✨ Features

- 🤖 **AI-Powered Chatbot**: Intelligent agricultural assistance using Gemini AI or custom models
- 🎤 **Voice Interface**: Speech-to-text and text-to-speech in multiple languages
- 🌍 **Multilingual Support**: 7 Indian languages (English, Hindi, Tamil, Telugu, Kannada, Marathi, Punjabi)
- 🔄 **Easy AI Model Switching**: Seamlessly switch between Gemini and your custom AI models
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔒 **Secure API**: Backend with API key validation and rate limiting
- 📊 **Health Monitoring**: Comprehensive backend monitoring and logging
- 🚀 **Production Ready**: Complete with error handling, logging, and deployment guides

## 🏗️ Architecture

```
AgriNova/
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── services/      # API services
│   │   ├── pages/         # Page components
│   │   └── ...
│   └── package.json
├── backend/           # Node.js + Express
│   ├── src/
│   │   ├── services/      # AI service implementations
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Express middleware
│   │   └── ...
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- Gemini API key (or your custom AI model API key)

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd agri-voice-ai-main

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Backend

```bash
# Copy environment template
cp backend/env.example backend/.env

# Edit backend configuration
notepad backend/.env  # Windows
nano backend/.env     # Linux/Mac
```

**Required backend configuration:**
```env
# AI Service Configuration
AI_SERVICE=gemini
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 3. Configure Frontend

```bash
# Copy environment template
cp frontend.env.example .env

# Edit frontend configuration
notepad .env  # Windows
nano .env     # Linux/Mac
```

**Required frontend configuration:**
```env
VITE_BACKEND_URL=http://localhost:3001
VITE_API_KEY=agrinova-default-key
```

### 4. Start the Application

**Option A: Using startup scripts (Recommended)**

Windows:
```bash
# Start backend
start-backend.bat

# In another terminal, start frontend
npm run dev
```

Linux/Mac:
```bash
# Start backend
chmod +x start-backend.sh
./start-backend.sh

# In another terminal, start frontend
npm run dev
```

**Option B: Manual startup**

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

## 🔧 Configuration

### Backend Configuration

The backend supports multiple AI services and can be easily configured:

#### Using Gemini (Default)
```env
AI_SERVICE=gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash
GEMINI_MAX_TOKENS=1000
GEMINI_TEMPERATURE=0.7
```

#### Using Custom AI Model
```env
AI_SERVICE=custom
CUSTOM_AI_API_KEY=your_custom_api_key
CUSTOM_AI_BASE_URL=https://your-ai-model-api.com/v1
CUSTOM_AI_MODEL=your-model-name
```

### Frontend Configuration

```env
VITE_BACKEND_URL=http://localhost:3001
VITE_API_KEY=agrinova-default-key
```

## 🤖 AI Model Integration

### Switching AI Models

The backend is designed to easily switch between different AI models:

1. **Gemini Integration**: Ready to use with Google's Gemini API
2. **Custom AI Models**: Template provided for easy integration

### Adding Your Custom AI Model

1. **Configure environment variables:**
   ```env
   AI_SERVICE=custom
   CUSTOM_AI_API_KEY=your_api_key
   CUSTOM_AI_BASE_URL=https://your-api-endpoint.com/v1
   CUSTOM_AI_MODEL=your-model-name
   ```

2. **Modify the custom service:**
   Edit `backend/src/services/customAIService.js` to match your API format.

3. **Restart the backend:**
   ```bash
   cd backend
   npm run dev
   ```

## 📡 API Documentation

### Health Endpoints
- `GET /api/health` - Basic health check
- `GET /api/health/detailed` - Detailed health with AI service status
- `GET /api/health/ready` - Readiness probe
- `GET /api/health/live` - Liveness probe

### Chat Endpoints
- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/languages` - Get supported languages
- `GET /api/chat/service-info` - Get AI service information
- `POST /api/chat/test` - Test AI service

### Example API Usage

```bash
# Send a chat message
curl -X POST http://localhost:3001/api/chat/message \
  -H "Content-Type: application/json" \
  -H "X-API-Key: agrinova-default-key" \
  -d '{
    "message": "How to grow tomatoes in summer?",
    "language": "en"
  }'

# Test AI service
curl -X POST http://localhost:3001/api/chat/test \
  -H "Content-Type: application/json" \
  -H "X-API-Key: agrinova-default-key" \
  -d '{"language": "en"}'
```

## 🧪 Testing

### Test Backend
```bash
cd backend
node test-backend.js
```

### Test Frontend
```bash
npm run test
```

## 🚀 Deployment

### Backend Deployment

#### Using PM2
```bash
cd backend
npm install -g pm2
pm2 start src/server.js --name "agrinova-backend"
pm2 save
pm2 startup
```

#### Using Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### Frontend Deployment

```bash
# Build for production
npm run build

# Deploy the dist/ folder to your hosting service
```

## 🐛 Troubleshooting

### Common Issues

1. **"Backend service is not available"**
   - Check if backend is running on port 3001
   - Verify `VITE_BACKEND_URL` in frontend .env
   - Check backend logs

2. **"AI service unavailable"**
   - Verify your API key in backend .env
   - Test with `/api/health/detailed` endpoint
   - Check network connectivity

3. **CORS errors**
   - Ensure `FRONTEND_URL` in backend .env matches your frontend URL
   - Check browser console for specific errors

4. **Voice features not working**
   - Ensure HTTPS in production (required for microphone access)
   - Check browser permissions for microphone access

### Debug Mode

Set `LOG_LEVEL=debug` in your backend `.env` file for detailed logging.

## 📁 Project Structure

```
agri-voice-ai-main/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ...
│   │   ├── services/         # API services
│   │   │   ├── backendService.ts
│   │   │   └── geminiService.ts
│   │   ├── pages/            # Page components
│   │   ├── config/           # Configuration
│   │   └── ...
│   └── package.json
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── services/         # AI service implementations
│   │   │   ├── aiServiceInterface.js
│   │   │   ├── geminiService.js
│   │   │   ├── customAIService.js
│   │   │   └── aiServiceFactory.js
│   │   ├── routes/           # API routes
│   │   │   ├── chat.js
│   │   │   └── health.js
│   │   ├── middleware/       # Express middleware
│   │   ├── utils/            # Utility functions
│   │   └── server.js
│   ├── logs/                 # Log files
│   ├── package.json
│   └── README.md
├── start-backend.bat         # Windows startup script
├── start-backend.sh          # Linux/Mac startup script
├── frontend.env.example      # Frontend environment template
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for providing the AI capabilities
- React and Vite for the frontend framework
- Node.js and Express for the backend
- All the open-source libraries used in this project

## 📞 Support

For support and questions:
- Check the troubleshooting section
- Review the backend logs
- Open an issue on GitHub
- Check the API health endpoint: `http://localhost:3001/api/health/detailed`

---

**Happy Farming! 🌱🤖**

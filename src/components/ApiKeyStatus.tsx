import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Key } from 'lucide-react';
import { isApiKeyConfigured } from '@/config/api';

interface ApiKeyStatusProps {
  className?: string;
}

export const ApiKeyStatus: React.FC<ApiKeyStatusProps> = ({ className = '' }) => {
  const isConfigured = isApiKeyConfigured();

  if (isConfigured) {
    return (
      <Badge 
        variant="secondary" 
        className={`flex items-center gap-1 bg-green-100 text-green-700 border-green-200 ${className}`}
      >
        <CheckCircle className="h-3 w-3" />
        <span>API Key Configured</span>
      </Badge>
    );
  }

  return (
    <Alert className={`border-orange-200 bg-orange-50 ${className}`}>
      <AlertCircle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          <span>
            Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.
          </span>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyStatus;

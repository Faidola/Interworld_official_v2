
import React from 'react';
import LoginForm from '@/components/LoginForm';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="absolute top-4 left-4">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao início</span>
        </Link>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;

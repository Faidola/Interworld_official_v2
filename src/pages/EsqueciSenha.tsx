
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EsqueciSenha = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular envio do email
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000);
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
        <div className="absolute top-4 left-4">
          <Link 
            to="/login" 
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao login</span>
          </Link>
        </div>

        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Email Enviado!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Enviamos um link de recuperação para seu email:
            </p>
            <p className="font-medium text-gray-900 bg-gray-50 p-2 rounded">
              {email}
            </p>
            <p className="text-sm text-gray-500">
              Verifique sua caixa de entrada e spam. O link expira em 24 horas.
            </p>
            <div className="pt-4 space-y-3">
              <Link to="/login">
                <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-800 hover:to-blue-500">
                  Voltar ao Login
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => setIsEmailSent(false)}
                className="w-full"
              >
                Tentar outro email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link 
          to="/login" 
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao login</span>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-900 to-blue-400 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Recuperar Senha
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Digite seu email para receber o link de recuperação
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email cadastrado
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Link de Recuperação
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Lembrou da senha?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                Fazer login
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Dicas de segurança:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Verifique sua caixa de spam</li>
              <li>• O link expira em 24 horas</li>
              <li>• Use uma senha forte e única</li>
              <li>• Nunca compartilhe suas credenciais</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EsqueciSenha;

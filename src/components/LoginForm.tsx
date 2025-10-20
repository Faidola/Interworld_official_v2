
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff, User, Building, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'school'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Adicionado para login de admin
    if (email === 'adm@gmail.com' && password === '12345678') {
      toast({
        title: "Login de Administrador",
        description: "Acesso administrativo concedido.",
      });
      navigate('/admin');
      return;
    }

    const isMockUser = (email === 'teste@gmail.com' || email === 'escola@gmail.com') && password === '12345678';

    if (isMockUser) {
      let mockName = 'Usuário Teste';
      if (email === 'escola@gmail.com') mockName = 'Escola Teste';

      const isProfileComplete = userType === 'student'; // Students don't need to fill a profile card initially

      localStorage.setItem('userData', JSON.stringify({
        id: `mock-id-${userType}`,
        email: email,
        userType: userType,
        name: mockName,
        loginTime: new Date().toISOString(),
        profileComplete: isProfileComplete
      }));
      localStorage.setItem('isLoggedIn', 'true');

      toast({
        title: "Login de teste realizado com sucesso!",
        description: "Bem-vindo ao modo de teste.",
      });

      navigate('/');
      return;
    }

    setIsLoading(true);

    try {
      // Validação básica de senha
      if (password.length < 8) {
        toast({
          title: "Senha muito fraca",
          description: "A senha deve ter pelo menos 8 caracteres.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Mapear userType para nivelAcesso
      const nivelAcesso = userType === 'student' ? 'INTERCAMBISTA' : 'ESCOLA';

      // Chamada para API de login
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: password
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        
        // Verificar se o nível de acesso corresponde ao tipo selecionado
        if (userData.nivelAcesso === nivelAcesso) {
          // Salvar dados do usuário no localStorage
          localStorage.setItem('userData', JSON.stringify({
            id: userData.id,
            email: userData.email,
            userType: userType,
            name: userData.nome,
            loginTime: new Date().toISOString()
          }));
          localStorage.setItem('isLoggedIn', 'true');

          // Salvar o token JWT retornado pela API
          if (userData.token) {
            localStorage.setItem('authToken', userData.token);
          }

          toast({
            title: "Login realizado com sucesso!",
            description: `Bem-vindo${userType === 'student' ? '' : userType === 'school' ? 'a' : ''} ao InterWorld`,
          });

          // Redirecionar para dashboard
          navigate('/');
        } else {
          toast({
            title: "Tipo de usuário incorreto",
            description: "Selecione o tipo correto de usuário para fazer login.",
            variant: "destructive",
          });
        }
      } else {
        const errorData = await response.text();
        toast({
          title: "Erro no login",
          description: errorData || "Verifique suas credenciais e tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast({
        title: "Erro no login",
        description: "Erro de conexão. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      userType === 'school' 
        ? 'bg-gradient-to-br from-teal-50 via-white to-cyan-50' 
        : 'bg-gradient-to-br from-blue-50 via-white to-green-50'
    }`}>
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              userType === 'school'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-500'
                : 'bg-gradient-to-r from-blue-600 to-green-500'
            }`}>
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Bem-vindo de volta!
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {userType === 'student' ? 'Acesse sua área do aluno' : 'Acesse sua área institucional'}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Type Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setUserType('student')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                  userType === 'student'
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Estudante</span>
              </button>
              {!isMobile && (
                <>
                  <button
                    type="button"
                    onClick={() => setUserType('school')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                      userType === 'school'
                        ? 'bg-white shadow-sm text-teal-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Building className="h-4 w-4" />
                    <span className="text-sm font-medium">Escola</span>
                  </button>
                </>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
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
                    maxLength={254}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12"
                    maxLength={128}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
                </label>
                <Link to="/esqueci-senha" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  Esqueci a senha
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 text-white font-semibold ${
                  userType === 'student'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                    : userType === 'school'
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
                } disabled:opacity-50`}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              {isMobile ? (
                  <p className="text-sm text-gray-600">
                    Ainda não tem conta?
                    <Link to="/cadastro-estudante" className="ml-1 text-blue-600 hover:text-blue-700 hover:underline font-medium">
                      Cadastre-se
                    </Link>
                  </p>
              ) : (
                <p className="text-sm text-gray-600">
                  {userType === 'student' ? 'Ainda não tem conta?' : 'Primeira vez aqui?'}
                  <Link to={
                    userType === 'student' ? '/cadastro-estudante' : '/cadastro-escola'
                  } className="ml-1 text-blue-600 hover:text-blue-700 hover:underline font-medium">
                    {userType === 'student' ? 'Cadastre-se' : 'Registre sua instituição'}
                  </Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Problemas para acessar?{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

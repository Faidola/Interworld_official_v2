
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Building, Home, Globe, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ComecarAgora = () => {
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

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Como você quer{' '}
            <span className="bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
              começar?
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escolha o caminho ideal para sua jornada internacional
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-900 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Sou Estudante
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                Cadastre-se para descobrir oportunidades de intercâmbio personalizadas para seu perfil
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-900" />
                  <span className="text-sm text-gray-700">Acesso a 50+ países</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">500+ programas disponíveis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-sm text-gray-700">Comunidade de 10k+ estudantes</span>
                </div>
              </div>

              <Link to="/cadastro-estudante" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white">
                  Cadastrar como Estudante
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hidden md:block hover:shadow-xl transition-all duration-300 border-0 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Sou Instituição
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                Registre sua escola ou instituição para oferecer programas de intercâmbio
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-900" />
                  <span className="text-sm text-gray-700">Alcance global</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Acesso a estudantes qualificados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  <span className="text-sm text-gray-700">Gestão simplificada</span>
                </div>
              </div>

              <Link to="/cadastro-escola" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white">
                  Cadastrar Instituição
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Já tem uma conta?</p>
          <Link to="/login">
            <Button variant="outline" size="lg">
              Fazer Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComecarAgora;

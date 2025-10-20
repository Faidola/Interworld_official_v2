
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building, Users, Globe, TrendingUp, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SouEscola = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mb-6">
            <Building className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Parceria{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
              Educacional
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conecte sua instituição a estudantes do mundo todo e expanda seus horizontes educacionais através da nossa plataforma
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Alcance Global</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Conecte-se com estudantes de todo o Brasil interessados em programas internacionais
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Crescimento</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Aumente suas matrículas com nossa rede de estudantes qualificados e motivados
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Segurança</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Plataforma segura com verificação de estudantes e processo transparente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Como funciona para instituições?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cadastro da Instituição</h3>
                  <p className="text-gray-600">
                    Registre sua escola ou universidade em nossa plataforma com informações detalhadas
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Criação de Programas</h3>
                  <p className="text-gray-600">
                    Adicione seus programas de intercâmbio com detalhes sobre vagas, requisitos e prazos
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Gestão de Candidatos</h3>
                  <p className="text-gray-600">
                    Receba e gerencie candidaturas de estudantes interessados em seus programas
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Acompanhamento</h3>
                  <p className="text-gray-600">
                    Monitore o progresso dos estudantes durante todo o período do intercâmbio
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Benefícios da Parceria</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Visibilidade internacional</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Acesso a estudantes qualificados</span>
                </li>
                <li className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Ferramentas de gestão integradas</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Headphones className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Suporte dedicado</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Processo seguro e transparente</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-600 to-blue-600 text-white max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
              <p className="mb-6">
                Cadastre sua instituição e comece a conectar-se com estudantes do mundo todo
              </p>
              <div className="space-y-4">
                <Link to="/cadastro-escola">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8">
                    Cadastrar Instituição
                  </Button>
                </Link>
                <p className="text-sm text-green-100">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-white hover:underline font-medium">
                    Fazer login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SouEscola;

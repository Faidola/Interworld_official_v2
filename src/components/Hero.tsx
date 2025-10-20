
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe2, Users, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

// Função para verificar se o usuário está logado
const isUserLoggedIn = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn === 'true';
};

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 text-center">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Seu{' '}
              <span className="bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
                intercâmbio
              </span>{' '}
              começa aqui
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Conectamos estudantes a oportunidades únicas de intercâmbio ao redor do mundo. 
              Acompanhe sua jornada acadêmica internacional em tempo real.
            </p>
            
            {!isUserLoggedIn() && (
              !isMobile ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/comecar-agora">
                    <Button size="lg" className="bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white px-8 py-3">
                      Começar Agora
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/sou-escola">
                    <Button variant="outline" size="lg" className="px-8 py-3">
                      Sou uma Escola
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link to="/login">
                  <Button size="lg" className="w-full bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white">
                    Acessar Minha Área
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )
            )}
          </div>

          <div className="flex items-center justify-center p-4">
            <img 
              src="/logo2.png" 
              alt="InterWorld Logo" 
              className="bg-white rounded-full object-contain w-64 h-64 md:w-72 md:h-72 shadow-xl"
            />
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 w-full max-w-3xl">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto flex items-center justify-center mb-2">
                <Globe2 className="h-8 w-8 text-blue-900" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Países</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-blue-900" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10k+</div>
              <div className="text-sm text-gray-600">Estudantes</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto flex items-center justify-center mb-2">
                <BookOpen className="h-8 w-8 text-blue-900" />
              </div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Programas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

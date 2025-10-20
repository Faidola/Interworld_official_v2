
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';  
import CountryCarousel from '@/components/CountryCarousel';
import CandidateButton from '@/components/CandidateButton';
import { Link } from 'react-router-dom';

// Função para verificar se o usuário está logado
const isUserLoggedIn = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn === 'true';
};

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <CountryCarousel />
      
      {/* Seção de chamada para ação - só aparece se não estiver logado */}
      {!isUserLoggedIn() && (
        <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Junte-se a milhares de estudantes que já transformaram suas vidas através do intercâmbio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CandidateButton className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white font-semibold rounded-lg transition-all">
                Candidatar-se Agora
              </CandidateButton>
              <Link to="/fale-consultor">
                <button className="px-8 py-3 border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-semibold rounded-lg transition-all">
                  Falar com Consultor
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">InterWorld</h3>
              <p className="text-gray-400 text-sm">
                Conectando estudantes brasileiros às melhores oportunidades educacionais do mundo.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
                <li><Link to="/paises" className="hover:text-white transition-colors">Países</Link></li>
                <li><Link to="/programas" className="hover:text-white transition-colors">Programas</Link></li>
                <li><Link to="/quem-somos" className="hover:text-white transition-colors">Quem Somos</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="font-semibold mb-4">Central de Ajuda</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/fale-consultor" className="hover:text-blue-400 transition-colors">Suporte</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>contato@interworld.com</li>
                <li>+55 (11) 99999-9999</li>
                <li>São Paulo, SP - Brasil</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 InterWorld. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

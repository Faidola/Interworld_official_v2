
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import ProgramsSection from '@/components/ProgramsSection';

const Programas = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-gradient-to-r from-blue-900 to-blue-400 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Programas Disponíveis
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore oportunidades únicas de intercâmbio com acomodação e estágios incluídos
          </p>
        </div>
      </div>

      <div className="py-8">
        <ProgramsSection />
      </div>

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
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Início</Link></li>
                <li><Link to="/paises" className="hover:text-blue-400 transition-colors">Países</Link></li>
                <li><Link to="/programas" className="hover:text-blue-400 transition-colors">Programas</Link></li>
                <li><Link to="/quem-somos" className="hover:text-blue-400 transition-colors">Quem Somos</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="font-semibold mb-4">Central de Ajuda</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/fale-consultor" className="hover:text-blue-400 transition-colors">Suporte</a></li>
              </ul>
            </div>
            <div>
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

export default Programas;

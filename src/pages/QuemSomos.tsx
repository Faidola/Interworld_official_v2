
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Award, Globe } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';

import RafaFoto from '@/assets/team/rafa.foto.png';
import MahFoto from '@/assets/team/mah.foto.png';
import BrunoFoto from '@/assets/team/bruno.foto.png';
import GabrielFoto from '@/assets/team/gabriel.foto.png';
import ViktorFoto from '@/assets/team/viktor.foto.png';
import ViniciosFoto from '@/assets/team/vinicios.foto.png';

const teamMembers = [
  {
    name: 'Rafael Leite',
    role: 'CEO e Fundador',
    bio: 'Ex-intercambista na Universidade de Harvard',
    image: RafaFoto,
    gradient: 'from-blue-900 to-blue-600',
  },
  {
    name: 'Maria Freire',
    role: 'Diretora de Programas',
    bio: 'MBA pela London Business School',
    image: MahFoto,
    gradient: 'from-blue-600 to-blue-400',
  },
  {
    name: 'Bruno Alves',
    role: 'Diretor de Relacionamento',
    bio: 'Mestrado na Universidade de Toronto',
    image: BrunoFoto,
    gradient: 'from-blue-400 to-blue-300',
  },
  {
    name: 'Gabriel Batista',
    role: 'Consultor Educacional',
    bio: 'Especialista em programas na América do Norte',
    image: GabrielFoto,
    gradient: 'from-green-500 to-green-300',
  },
  {
    name: 'Viktor Hanry',
    role: 'Consultor Educacional',
    bio: 'Especialista em programas na Europa',
    image: ViktorFoto,
    gradient: 'from-yellow-500 to-yellow-300',
  },
  {
    name: 'Vinicios Marques',
    role: 'Consultor Educacional',
    bio: 'Especialista em programas na Oceania',
    image: ViniciosFoto,
    gradient: 'from-red-500 to-red-300',
  },
];

const QuemSomos = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-gradient-to-r from-blue-900 to-blue-400 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Quem Somos
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Conheça nossa história e nossa missão de transformar vidas através da educação internacional
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
                <p className="text-gray-600 mb-4">
                  O grupo InterWorld nasceu em 2023 com o propósito de democratizar o acesso à educação internacional para estudantes brasileiros. Inspirados pela crescente demanda por programas de intercâmbio e pela importância da imersão cultural no desenvolvimento acadêmico e profissional, nossa equipe é composta por jovens que acreditam no poder transformador das experiências internacionais.
                </p>
                <p className="text-gray-600 mb-4">
                  Desde nossa fundação, temos trabalhado para oferecer aos estudantes as ferramentas e o suporte necessários para realizarem seus sonhos de estudar no exterior. Acreditamos que o intercâmbio não é apenas uma oportunidade de aprendizado de novos idiomas, mas também uma forma de ampliar horizontes, vivenciar diferentes culturas e adquirir competências essenciais para um mundo globalizado.
                </p>
                <p className="text-gray-600">
                  Nosso objetivo é facilitar o acesso a programas de intercâmbio acadêmico e cultural, conectando estudantes brasileiros com as melhores oportunidades educacionais ao redor do mundo. Queremos promover uma educação de qualidade e contribuir para a formação de cidadãos globais, preparados para fazer a diferença em suas comunidades e no cenário internacional.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-900">10k+</div>
                    <div className="text-sm text-gray-600">Estudantes Atendidos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400">50+</div>
                    <div className="text-sm text-gray-600">Países Parceiros</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Programas Disponíveis</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-500">95%</div>
                    <div className="text-sm text-gray-600">Taxa de Sucesso</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Target className="h-12 w-12 text-blue-900 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Nossa Missão</h3>
                  <p className="text-gray-600">
                    Democratizar o acesso à educação internacional de qualidade, proporcionando oportunidades transformadoras para estudantes brasileiros.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Nossa Visão</h3>
                  <p className="text-gray-600">
                    Ser a principal referência em intercâmbios educacionais, conectando talentos brasileiros às melhores oportunidades globais.
                  </p>
                </CardContent>
              </Card>
            
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Nossa Equipe</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <div key={member.name} className="text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                    <p className="text-gray-500 text-xs mt-2">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default QuemSomos;

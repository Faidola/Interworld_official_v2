
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Heart, Award } from 'lucide-react';

const team = [
  {
    name: 'Dr. Marina Santos',
    role: 'CEO & Fundadora',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    description: '15 anos de experiência em educação internacional'
  },
  {
    name: 'Carlos Oliveira',
    role: 'Diretor de Parcerias',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    description: 'Especialista em relações institucionais globais'
  },
  {
    name: 'Ana Rodriguez',
    role: 'Head de Tecnologia',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    description: 'Engenheira de software com foco em EdTech'
  }
];

const values = [
  {
    icon: Target,
    title: 'Missão',
    description: 'Democratizar o acesso à educação internacional de qualidade',
    color: 'text-blue-600 bg-blue-100'
  },
  {
    icon: Heart,
    title: 'Valores',
    description: 'Transparência, excelência e transformação através da educação',
    color: 'text-red-600 bg-red-100'
  },
  {
    icon: Award,
    title: 'Visão',
    description: 'Ser a principal plataforma de intercâmbio da América Latina',
    color: 'text-green-600 bg-green-100'
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Quem{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Somos
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Somos uma equipe apaixonada por educação internacional, dedicada a conectar estudantes 
            brasileiros às melhores oportunidades acadêmicas ao redor do mundo.
          </p>
        </div>

        {/* Story */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Nossa História
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Fundada em 2020, a EduGlobal nasceu do sonho de tornar a educação internacional 
                    mais acessível e transparente para estudantes brasileiros. Nossa jornada começou 
                    quando percebemos que muitos talentos ficavam limitados por falta de informação 
                    e orientação adequada.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Hoje, já conectamos mais de 10.000 estudantes a programas de intercâmbio em 
                    mais de 50 países, sempre priorizando a qualidade, transparência e o sucesso 
                    de cada participante.
                  </p>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl p-6 transform rotate-3">
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=300&fit=crop" 
                      alt="Estudantes internacionais"
                      className="rounded-xl transform -rotate-3 shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Nossos Pilares
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-gray-50">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Nossa Equipe
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all group border-0">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 group-hover:scale-105 transition-transform"
                    />
                    <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-green-500 border-0 text-white">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Pronto para sua jornada internacional?
              </h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Junte-se a milhares de estudantes que já transformaram suas vidas através da educação internacional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Começar Agora
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Falar com Consultor
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

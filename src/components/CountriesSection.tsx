
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const countries = [
  {
    name: 'Estados Unidos',
    flag: '🇺🇸',
    students: '2.5k+',
    universities: '150+',
    climate: 'Variado',
    description: 'Tecnologia e inovação de ponta',
    gradient: 'from-red-500 to-blue-600',
    route: '/pais/estados-unidos'
  },
  {
    name: 'Canadá',
    flag: '🇨🇦',
    students: '1.8k+',
    universities: '80+',
    climate: 'Temperado',
    description: 'Educação de qualidade mundial',
    gradient: 'from-red-600 to-red-800',
    route: '/pais/canada'
  },
  {
    name: 'Reino Unido',
    flag: '🇬🇧',
    students: '2.1k+',
    universities: '120+',
    climate: 'Oceânico',
    description: 'Tradição acadêmica secular',
    gradient: 'from-blue-700 to-red-600',
    route: '/pais/reino-unido'
  },
  {
    name: 'Austrália',
    flag: '🇦🇺',
    students: '1.2k+',
    universities: '60+',
    climate: 'Tropical/Temperado',
    description: 'Lifestyle único e natureza exuberante',
    gradient: 'from-green-600 to-blue-500',
    route: '/pais/australia'
  },
  {
    name: 'Alemanha',
    flag: '🇩🇪',
    students: '1.5k+',
    universities: '90+',
    climate: 'Continental',
    description: 'Engenharia e pesquisa avançada',
    gradient: 'from-gray-800 to-red-600',
    route: '/pais/alemanha'
  },
  {
    name: 'França',
    flag: '🇫🇷',
    students: '1.3k+',
    universities: '70+',
    climate: 'Oceânico/Continental',
    description: 'Arte, cultura e gastronomia',
    gradient: 'from-blue-600 to-red-600',
    route: '/pais/franca'
  }
];

const CountriesSection = () => {
  return (
    <section id="countries" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Destinos dos{' '}
            <span className="bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
              Sonhos
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore nossos países parceiros e descubra onde sua jornada acadêmica internacional pode te levar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <Link key={index} to={country.route}>
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white h-full">
                <CardContent className="p-6">
                  <div className={`bg-gradient-to-r ${country.gradient} rounded-2xl p-6 mb-4 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 text-6xl opacity-20">
                      {country.flag}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{country.name}</h3>
                    <p className="text-sm opacity-90">{country.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-900" />
                        <span className="text-sm text-gray-600">Estudantes</span>
                      </div>
                      <span className="font-semibold text-gray-900">{country.students}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-600">Universidades</span>
                      </div>
                      <span className="font-semibold text-gray-900">{country.universities}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Clima</span>
                      </div>
                      <span className="font-semibold text-gray-900">{country.climate}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-blue-900 hover:text-blue-400 font-medium text-sm group-hover:underline transition-all">
                      Ver programas disponíveis →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;

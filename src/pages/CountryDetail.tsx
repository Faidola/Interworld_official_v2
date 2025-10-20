
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, DollarSign, Calendar, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CandidateButton from '@/components/CandidateButton';
import estadosUnidosImg from '@/assets/estados-unidos.jpg';
import canadaImg from '@/assets/canada.png';
import reinoUnidoImg from '@/assets/reino-unido.jpg';
import australiaImg from '@/assets/australia.jpg';
import alemanhaImg from '@/assets/Alemanha.png';
import francaImg from '@/assets/franca.jpg';

const languagePrograms = [
  {
    title: 'Curso de Idioma - 4 semanas',
    duration: '4 semanas',
    price: 'US$ 1,550',
    vacancies: 15,
    deadline: '2025-12-31',
    requirements: ['Nível Básico', 'Passaporte Válido']
  },
  {
    title: 'Curso de Idioma - 8 semanas',
    duration: '8 semanas',
    price: 'US$ 2,900',
    vacancies: 10,
    deadline: '2025-12-31',
    requirements: ['Nível Básico', 'Passaporte Válido', 'Visto de Estudante']
  },
  {
    title: 'Curso de Idioma - 12 semanas',
    duration: '12 semanas',
    price: 'US$ 4,200',
    vacancies: 8,
    deadline: '2025-12-31',
    requirements: ['Nível Intermediário', 'Passaporte Válido', 'Visto de Estudante']
  }
];

const countryData = {
  'estados-unidos': {
    name: 'Estados Unidos',
    flag: '🇺🇸',
    description: 'O país da inovação e diversidade cultural, oferecendo oportunidades únicas em tecnologia, negócios e artes.',
    image: estadosUnidosImg,
    states: [
      {
        name: 'Califórnia',
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Centro da tecnologia mundial e inovação.',
        programs: languagePrograms.slice(0, 2)
      },
      {
        name: 'Nova York',
        image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Capital financeira mundial e centro cultural.',
        programs: languagePrograms
      }
    ]
  },
  'canada': {
    name: 'Canadá',
    flag: '🇨🇦',
    description: 'País conhecido pela qualidade de vida excepcional e sistema educacional de alto padrão.',
    image: canadaImg,
    states: [
      {
        name: 'Ontário',
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Província mais populosa com Toronto e Ottawa.',
        programs: languagePrograms
      },
      {
        name: 'British Columbia',
        image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Costa oeste com Vancouver e natureza exuberante.',
        programs: languagePrograms.slice(0, 2)
      }
    ]
  },
  'reino-unido': {
    name: 'Reino Unido',
    flag: '🇬🇧',
    description: 'Berço da tradição acadêmica com universidades centenárias e excelência em pesquisa.',
    image: reinoUnidoImg,
    states: [
      {
        name: 'Inglaterra',
        image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Lar de Oxford, Cambridge e Londres.',
        programs: languagePrograms
      }
    ]
  },
  'australia': {
    name: 'Austrália',
    flag: '🇦🇺',
    description: 'Combinação única de excelência acadêmica e estilo de vida descontraído.',
    image: australiaImg,
    states: [
      {
        name: 'New South Wales',
        image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Sydney e suas praias mundialmente famosas.',
        programs: languagePrograms
      }
    ]
  },
  'alemanha': {
    name: 'Alemanha',
    flag: '🇩🇪',
    description: 'Potência em engenharia e pesquisa, com muitas universidades gratuitas.',
    image: alemanhaImg,
    states: [
      {
        name: 'Bayern',
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Munique e tradição em engenharia.',
        programs: languagePrograms
      }
    ]
  },
  'franca': {
    name: 'França',
    flag: '🇫🇷',
    description: 'Centro mundial de arte, cultura e gastronomia com tradição acadêmica sólida.',
    image: francaImg,
    states: [
      {
        name: 'Île-de-France',
        image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Paris, a cidade luz e centro cultural.',
        programs: languagePrograms
      }
    ]
  }
};

const CountryDetail = () => {
  const { countrySlug } = useParams();
  const country = countryData[countrySlug as keyof typeof countryData];

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">País não encontrado</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao início</span>
          </Link>
        </div>
      </div>

      {/* Hero section - Reduced height */}
      <div 
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${country.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-2">{country.flag}</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{country.name}</h1>
            <p className="text-sm md:text-base max-w-xl mx-auto px-4">
              {country.description}
            </p>
          </div>
        </div>
      </div>

      {/* States/Regions section - Compressed */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Programas por Região
        </h2>

        <div className="space-y-6">
          {country.states.map((state, stateIndex) => (
            <div key={stateIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/4">
                  <img 
                    src={state.image} 
                    alt={state.name}
                    className="h-32 md:h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-3/4 p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">{state.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{state.description}</p>

                  <div className="grid gap-4">
                    {state.programs.map((program, programIndex) => (
                      <Card key={programIndex} className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{program.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {program.duration}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              {program.vacancies} vagas
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Investimento</p>
                              <div className="flex items-baseline gap-1">
                                <DollarSign className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-bold text-gray-900">
                                  {program.price}
                                </span>
                              </div>
                            </div>
                            <div>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500 mb-1">Requisitos</p>
                            <div className="flex flex-wrap gap-1">
                              {program.requirements.map((req, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <CandidateButton 
                            className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white text-sm h-9"
                            size="sm"
                            icon={<GraduationCap className="h-4 w-4 mr-2" />}
                          >
                            Candidatar-se
                          </CandidateButton>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CandidateButton from '@/components/CandidateButton';
import { Calendar, MapPin, Users, DollarSign, Clock, GraduationCap, Home, Briefcase, Loader2 } from 'lucide-react';
import programaService, { ProgramaIntercambio } from '@/services/programaService';

const programsStatic = [
  {
    id: 1,
    title: 'Inglês Intensivo em Nova York',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    duration: '4 semanas',
    vacancies: 15,
    deadline: '2025-12-31',
    price: 'US$ 1,850',
    requirements: ['Nível Básico', 'Visto de Turista'],
    description: 'Aprenda inglês no coração da Big Apple. Aulas dinâmicas com foco em conversação e cultura local.',
    level: 'Curso de Idioma',
    scholarship: false,
    housing: {
      type: 'Casa de Família',
      description: 'Acomodação em casa de família americana com café da manhã incluído',
      price: 'US$ 320/semana',
      facilities: ['Wi-Fi', 'Café da manhã', 'Quarto individual']
    },
    internship: null
  },
  {
    id: 2,
    title: 'Inglês Geral em Londres',
    country: 'Reino Unido',
    flag: '🇬🇧',
    duration: '8 semanas',
    vacancies: 10,
    deadline: '2025-12-31',
    price: 'US$ 3,200',
    requirements: ['Nível Intermediário', 'Passaporte Válido'],
    description: 'Desenvolva sua fluência em um ambiente acadêmico tradicional e explore a capital britânica.',
    level: 'Curso de Idioma',
    scholarship: true,
    housing: {
      type: 'Residência Estudantil',
      description: 'Residência universitária no centro de Londres com outros estudantes internacionais',
      price: 'US$ 280/semana',
      facilities: ['Wi-Fi', 'Cozinha compartilhada', 'Quarto individual', 'Área de estudos']
    },
    internship: {
      available: true,
      description: 'Oportunidade de estágio em empresas locais após completar 6 semanas do curso',
      duration: '4-8 semanas',
      areas: ['Marketing', 'Turismo', 'Educação']
    }
  },
  {
    id: 3,
    title: 'Francês e Cultura em Paris',
    country: 'França',
    flag: '🇫🇷',
    duration: '12 semanas',
    vacancies: 8,
    deadline: '2025-11-30',
    price: 'US$ 4,500',
    requirements: ['Nível Básico de Francês', 'Visto de Estudante'],
    description: 'Imersão completa na língua e cultura francesa na cidade mais charmosa do mundo.',
    level: 'Curso de Idioma',
    scholarship: false,
    housing: {
      type: 'Apartamento Compartilhado',
      description: 'Apartamento compartilhado com outros estudantes no quartier Latin',
      price: 'US$ 350/semana',
      facilities: ['Wi-Fi', 'Cozinha completa', 'Quarto individual', 'Próximo ao metrô']
    },
    internship: {
      available: true,
      description: 'Estágio remunerado em empresas francesas após 8 semanas de curso',
      duration: '6-12 semanas',
      areas: ['Gastronomia', 'Fashion', 'Arte e Cultura', 'Negócios']
    }
  },
  {
    id: 4,
    title: 'Alemão para Negócios em Berlim',
    country: 'Alemanha',
    flag: '🇩🇪',
    duration: '8 semanas',
    vacancies: 12,
    deadline: '2025-10-31',
    price: 'US$ 3,500',
    requirements: ['Nível Intermediário de Alemão', 'Visto Schengen'],
    description: 'Curso focado em linguagem de negócios para impulsionar sua carreira no mercado europeu.',
    level: 'Curso de Idioma',
    scholarship: true,
    housing: {
      type: 'Studio Privado',
      description: 'Studio privado mobiliado em bairro jovem e moderno de Berlim',
      price: 'US$ 400/semana',
      facilities: ['Wi-Fi', 'Cozinha própria', 'Banheiro privativo', 'Área de trabalho']
    },
    internship: {
      available: true,
      description: 'Programa de estágio em startups e empresas alemãs com possibilidade de contratação',
      duration: '8-16 semanas',
      areas: ['Tecnologia', 'Engenharia', 'Finanças', 'Startups']
    }
  }
];

// Função auxiliar para obter emoji da bandeira do país
const getFlagEmoji = (country: string): string => {
  const flagMap: { [key: string]: string } = {
    'Estados Unidos': '🇺🇸',
    'Reino Unido': '🇬🇧',
    'França': '🇫🇷',
    'Alemanha': '🇩🇪',
    'Canadá': '🇨🇦',
    'Austrália': '🇦🇺',
    'Espanha': '🇪🇸',
    'Itália': '🇮🇹',
    'Portugal': '🇵🇹',
  };
  return flagMap[country] || '🌎';
};

// Função para converter dados da API para o formato do card
const convertProgramToCard = (programa: ProgramaIntercambio) => {
  let housing = null;
  let internship = null;

  // Parse acomodação
  if (programa.acomodacao) {
    try {
      const acomodacoes = JSON.parse(programa.acomodacao);
      if (acomodacoes && acomodacoes.length > 0) {
        const ac = acomodacoes[0];
        housing = {
          type: ac.tipo || 'Acomodação',
          description: ac.descricao || '',
          price: ac.precoSemanal ? `US$ ${ac.precoSemanal}/semana` : programa.acomodacaoPreco || '',
          facilities: ac.comodidades || []
        };
      }
    } catch (e) {
      console.error('Erro ao parsear acomodação:', e);
    }
  }

  // Parse estágio
  if (programa.infoEstagio) {
    try {
      const estagio = JSON.parse(programa.infoEstagio);
      if (estagio) {
        internship = {
          available: true,
          description: estagio.descricao || '',
          duration: estagio.duracao || '',
          areas: estagio.areas || []
        };
      }
    } catch (e) {
      console.error('Erro ao parsear estágio:', e);
    }
  }

  return {
    id: programa.id,
    title: programa.titulo,
    country: programa.pais,
    flag: getFlagEmoji(programa.pais),
    vacancies: programa.vagasDisponiveis,
    price: `US$ ${programa.preco?.toFixed(2).replace('.', ',')}`,
    description: programa.descricao,
    level: programa.idioma?.nome ? `Curso de ${programa.idioma.nome}` : 'Curso de Idioma',
    scholarship: false, // Não temos essa informação no banco
    housing,
    internship,
    requirements: [] // Não temos essa informação no banco
  };
};

const ProgramsSection = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const data = await programaService.listarTodos();
        const formattedPrograms = data
          .filter(p => p.statusPrograma === 'ATIVO')
          .map(convertProgramToCard);
        
        // Se não houver programas do backend, usa os estáticos
        if (formattedPrograms.length === 0) {
          setPrograms(programsStatic);
        } else {
          setPrograms(formattedPrograms);
        }
      } catch (err) {
        console.error('Erro ao buscar programas:', err);
        setError('Não foi possível carregar os programas. Mostrando programas de exemplo.');
        setPrograms(programsStatic);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <section id="programs" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Programas{' '}
            <span className="bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
              Disponíveis
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore oportunidades únicas de intercâmbio e programas acadêmicos ao redor do mundo
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Carregando programas...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-4 px-4 mb-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">{error}</p>
          </div>
        )}

        {!loading && (
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program) => (
            <Card key={program.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{program.flag}</span>
                    <div>
                      <CardTitle className="text-lg leading-tight">{program.title}</CardTitle>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {program.country}
                      </p>
                    </div>
                  </div>
                  {program.scholarship && (
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      Bolsa
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {program.level}
                  </Badge>
                  {program.duration && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {program.duration}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    {program.vacancies} vagas
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {program.description}
                </p>

                {/* Informações de Moradia */}
                {program.housing ? (
                  <div className="border rounded-lg p-3 bg-blue-50">
                    <h4 className="font-semibold text-sm flex items-center mb-2">
                      <Home className="h-4 w-4 mr-2 text-blue-600" />
                      Acomodação: {program.housing.type}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">{program.housing.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-blue-700">{program.housing.price}</span>
                      <div className="flex flex-wrap gap-1">
                        {program.housing.facilities.map((facility, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg p-3 bg-gray-50">
                    <p className="text-xs text-gray-500 italic flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Informações de acomodação não disponíveis
                    </p>
                  </div>
                )}

                {/* Informações de Estágio */}
                {program.internship ? (
                  <div className="border rounded-lg p-3 bg-green-50">
                    <h4 className="font-semibold text-sm flex items-center mb-2">
                      <Briefcase className="h-4 w-4 mr-2 text-green-600" />
                      Oportunidade de Estágio
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">{program.internship.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs"><strong>Duração:</strong> {program.internship.duration}</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-600">Áreas:</span>
                        {program.internship.areas.map((area, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg p-3 bg-gray-50">
                    <p className="text-xs text-gray-500 italic flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Programa focado em estudos - sem estágio disponível
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Investimento</p>
                    <div className="flex items-baseline gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-lg font-bold text-gray-900">
                        {program.price}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">USD</p>
                  </div>
                  <div>
                  </div>
                </div>

                {program.requirements && program.requirements.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Requisitos</p>
                    <div className="flex flex-wrap gap-1">
                      {program.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <div className="flex-1">
                    <CandidateButton 
                      className="w-full bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-800 hover:to-blue-300 text-white text-sm h-9"
                      size="sm"
                    >
                      Candidatar-se
                    </CandidateButton>
                  </div>
                  <Link to="/precos">
                    <Button variant="outline" className="text-sm h-9 px-3">
                      <GraduationCap className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/precos">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
            >
              Ver Todos os Programas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;

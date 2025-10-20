
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import estadosUnidosImg from '@/assets/estados-unidos.jpg';
import canadaImg from '@/assets/canada.png';
import reinoUnidoImg from '@/assets/reino-unido.jpg';
import australiaImg from '@/assets/australia.jpg';
import alemanhaImg from '@/assets/Alemanha.png';
import francaImg from '@/assets/franca.jpg';

const countries = [
  {
    name: 'Estados Unidos',
    flag: '🇺🇸',
    students: '2.5k+',
    image: estadosUnidosImg,
    description: 'Tecnologia e inovação de ponta',
    route: '/pais/estados-unidos'
  },
  {
    name: 'Canadá',
    flag: '🇨🇦',
    students: '1.8k+',
    image: canadaImg,
    description: 'Educação de qualidade mundial',
    route: '/pais/canada'
  },
  {
    name: 'Reino Unido',
    flag: '🇬🇧',
    students: '2.1k+',
    image: reinoUnidoImg,
    description: 'Tradição acadêmica secular',
    route: '/pais/reino-unido'
  },
  {
    name: 'Austrália',
    flag: '🇦🇺',
    students: '1.2k+',
    image: australiaImg,
    description: 'Lifestyle único e natureza exuberante',
    route: '/pais/australia'
  },
  {
    name: 'Alemanha',
    flag: '🇩🇪',
    students: '1.5k+',
    image: alemanhaImg,
    description: 'Engenharia e pesquisa avançada',
    route: '/pais/alemanha'
  },
  {
    name: 'França',
    flag: '🇫🇷',
    students: '1.3k+',
    image: francaImg,
    description: 'Arte, cultura e gastronomia',
    route: '/pais/franca'
  }
];

const CountryCarousel = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Destinos Populares
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Descubra os países mais procurados pelos nossos estudantes
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-1">
            {countries.map((country, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <Link to={country.route}>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white h-full overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={country.image} 
                        alt={country.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 text-3xl">{country.flag}</div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{country.name}</h3>
                        <p className="text-sm opacity-90">{country.description}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-600">Estudantes</span>
                        </div>
                        <span className="font-semibold text-gray-900">{country.students}</span>
                      </div>
                      <div className="mt-3">
                        <span className="text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:underline transition-all">
                          Ver programas →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center mt-8">
          <Link to="/paises">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Ver Todos os Países
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CountryCarousel;

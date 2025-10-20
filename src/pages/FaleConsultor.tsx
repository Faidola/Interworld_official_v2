import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FaleConsultor = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    pais: '',
    mensagem: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    // Aqui seria a lógica para enviar os dados para o backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fale com nosso{' '}
            <span className="bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
              Consultor
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa equipe especializada está pronta para ajudar você a encontrar o programa de intercâmbio ideal
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
                Entre em Contato
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pais">País de Interesse</Label>
                  <select
                    id="pais"
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Selecione um país</option>
                    <option value="estados-unidos">Estados Unidos</option>
                    <option value="canada">Canadá</option>
                    <option value="reino-unido">Reino Unido</option>
                    <option value="australia">Austrália</option>
                    <option value="alemanha">Alemanha</option>
                    <option value="franca">França</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Conte-nos sobre seus objetivos e dúvidas sobre intercâmbio..."
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nossos Canais</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-900" />
                    <div>
                      <p className="font-medium text-gray-900">Telefone</p>
                      <p className="text-gray-600">+55 (11) 99999-9999</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">contato@interworld.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-medium text-gray-900">Endereço</p>
                      <p className="text-gray-600">São Paulo, SP - Brasil</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-r from-blue-900 to-blue-400 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Por que escolher nosso suporte?</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Consultores especializados em intercâmbio</li>
                  <li>• Atendimento personalizado para seu perfil</li>
                  <li>• Suporte durante todo o processo</li>
                  <li>• Parcerias com as melhores instituições</li>
                  <li>• Experiência de mais de 10 anos no mercado</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaleConsultor;

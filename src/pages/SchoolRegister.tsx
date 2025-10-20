
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Mail, Lock, Phone, MapPin, ArrowLeft, Eye, EyeOff, Globe } from 'lucide-react';
import PasswordStrengthIndicator, { isPasswordStrong } from '@/components/PasswordStrengthIndicator';
import { useToast } from '@/hooks/use-toast';


const SchoolRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    usuario: '',
    nome: '',
    email: '',
    descricao: '',
    infoEscola: '',
    pais: '',
    regiao: '',
    telefone: '',
    website: '',
    foto: '',
    avalicao: '',
    indentificacaoEscola: '',
    password: '',
    confirmPassword: '',
    codigoPostal: '',
    estado: '',
    cidade: '',
    enderecoCompleto: '',
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Funções de formatação
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplicar formatação baseada no nome do campo
    switch (name) {
      case 'telefone':
        formattedValue = formatPhone(value);
        break;
      case 'codigoPostal':
        formattedValue = formatCEP(value);
        break;
      case 'indentificacaoEscola':
        formattedValue = formatCNPJ(value);
        break;
      default:
        formattedValue = value;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação das senhas
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    // Validação de senha forte
    if (!isPasswordStrong(formData.password)) {
      toast({
        title: "Senha muito fraca",
        description: "Sua senha deve atender a todos os requisitos de segurança.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Criar o usuário
      const userData = {
        nome: formData.nome,
        email: formData.email,
        senha: formData.password,
      };

      const userResponse = await fetch('http://localhost:8081/api/usuarios/novo-escola', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (userResponse.status !== 201) {
        const error = await userResponse.json().catch(() => null);
        console.error('Erro ao criar usuário:', error);
        throw new Error('Erro ao criar usuário');
      }

      const user = await userResponse.json();

      // Criar a escola
      const escolaData = {
        usuario: user,
        nome: formData.nome,
        descricao: formData.descricao,
        infoEscola: formData.infoEscola,
        pais: formData.pais,
        regiao: formData.regiao,
        telefone: formData.telefone,
        website: formData.website,
        foto: formData.foto,
        avalicao: formData.avalicao,
        indentificacaoEscola: formData.indentificacaoEscola,
        codigoPostal: formData.codigoPostal,
        estado: formData.estado,
        cidade: formData.cidade,
        enderecoCompleto: formData.enderecoCompleto,
      };

      const escolaResponse = await fetch('http://localhost:8081/api/escolas/novo-escola', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(escolaData),
      });

      if (escolaResponse.status === 201) {
        toast({
          title: "Sucesso!",
          description: "Cadastro realizado com sucesso!",
        });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const error = await escolaResponse.json().catch(() => null);
        console.error('Erro ao cadastrar escola:', error);
        throw new Error('Erro ao cadastrar escola');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      toast({
        title: "Erro",
        description: "Erro ao realizar cadastro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4">
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao início</span>
        </Link>
      </div>

      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Cadastro de Instituição
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Registre sua instituição e ofereça oportunidades de intercâmbio
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados da Instituição */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Dados da Instituição</h3>

                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da Instituição</Label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Nome completo da instituição"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="indentificacaoEscola">CNPJ</Label>
                    <Input
                      id="indentificacaoEscola"
                      name="indentificacaoEscola"
                      placeholder="00.000.000/0000-00"
                      value={formData.indentificacaoEscola}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="website"
                        name="website"
                        placeholder="www.instituicao.com"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    placeholder="Descreva sua instituição e os programas oferecidos"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={4}
                  />
                </div>
              </div>

              {/* Contato */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contato</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Institucional</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="contato@instituicao.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="telefone"
                        name="telefone"
                        placeholder="(11) 99999-9999"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Localização</h3>

                <div className="space-y-2">
                  <Label htmlFor="enderecoCompleto">Endereço Completo</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="enderecoCompleto"
                      name="enderecoCompleto"
                      placeholder="Rua, número, complemento"
                      value={formData.enderecoCompleto}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      name="cidade"
                      placeholder="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado/Província</Label>
                    <Input
                      id="estado"
                      name="estado"
                      placeholder="Estado ou Província"
                      value={formData.estado}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pais">País</Label>
                    <Input
                      id="pais"
                      name="pais"
                      placeholder="País"
                      value={formData.pais}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="codigoPostal">CEP/Código Postal</Label>
                    <Input
                      id="codigoPostal"
                      name="codigoPostal"
                      placeholder="Ex: 00000-000 ou 12345, SW1A 1AA"
                      value={formData.codigoPostal}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Acesso</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirme sua senha"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="space-y-4 pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-white font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  Registrar Instituição
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Já tem uma conta?
                    <Link to="/login" className="ml-1 text-green-600 hover:text-green-700 hover:underline font-medium">
                      Faça login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchoolRegister;

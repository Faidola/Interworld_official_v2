import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Calendar, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PasswordStrengthIndicator, { isPasswordStrong } from '@/components/PasswordStrengthIndicator';

const StudentRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    rg: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  // Funções de formatação
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatRG = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
  };

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

  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplicar formatação baseada no nome do campo
    switch (name) {
      case 'cpf':
        formattedValue = formatCPF(value);
        break;
      case 'rg':
        formattedValue = formatRG(value);
        break;
      case 'telefone':
        formattedValue = formatPhone(value);
        break;
      case 'cep':
        formattedValue = formatCEP(value);
        break;
      case 'dataNascimento':
        formattedValue = formatDate(value);
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
      
      // Primeiro, criar o usuário
      const userData = {
        nome: formData.nome,
        email: formData.email,
        senha: formData.password
      };

      const userResponse = await fetch('http://localhost:8081/api/usuarios/novo-estudante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (userResponse.status !== 201) {
        throw new Error('Erro ao criar usuário');
      }

      const user = await userResponse.json();

      // Preparar dados para enviar ao backend
      const estudanteData = {
        usuario: user,
        nome: formData.nome,
        dataNascimento: formData.dataNascimento,
        cpf: formData.cpf,
        rg: formData.rg,
        telefone: formData.telefone,
        endereco: formData.endereco,
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep,
        statusEstudante: "ATIVO"
      };

      const estudanteResponse = await fetch('http://localhost:8081/api/estudantes/novo-estudante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(estudanteData),
      });
      console.log(estudanteData);
      
      if (estudanteResponse.status === 201 || userResponse.status === 201) {
        toast({
          title: "Sucesso!",
          description: "Cadastro realizado com sucesso!",
        });
        
        // Redirecionar para login após cadastro bem-sucedido
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error('Erro no servidor');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="absolute top-4 left-4">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao início</span>
        </Link>
      </div>

      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Cadastro de Estudante
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Crie sua conta e comece sua jornada de intercâmbio
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Dados Pessoais</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      name="nome"
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={handleInputChange}
                      maxLength={100} // Limite padrão para nomes
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="dataNascimento"
                        name="dataNascimento"
                        type="text"
                        placeholder="dd/mm/aaaa"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                        className="pl-10"
                        maxLength={10} // Conforme a tabela VARCHAR(10) - formato DD/MM/AAAA
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      maxLength={14} // Conforme a tabela VARCHAR(14)
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rg">RG</Label>
                    <Input
                      id="rg"
                      name="rg"
                      placeholder="00.000.000-0"
                      value={formData.rg}
                      onChange={handleInputChange}
                      maxLength={12} // Conforme a tabela VARCHAR(12)
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contato */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contato</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        maxLength={254} // Limite RFC para emails
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
                        maxLength={20} // Conforme a tabela VARCHAR(20)
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Endereço</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Completo</Label>
                  <Input
                    id="endereco"
                    name="endereco"
                    placeholder="Rua, número, complemento"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    maxLength={200} // Conforme a tabela VARCHAR(200)
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      name="cidade"
                      placeholder="Sua cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      maxLength={100} // Conforme a tabela VARCHAR(100)
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input
                      id="estado"
                      name="estado"
                      placeholder="UF"
                      value={formData.estado}
                      onChange={handleInputChange}
                      maxLength={2} // Conforme a tabela VARCHAR(2)
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      name="cep"
                      placeholder="00000-000"
                      value={formData.cep}
                      onChange={handleInputChange}
                      maxLength={9} // Conforme a tabela VARCHAR(9)
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Senha com Indicador de Força */}
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
                        maxLength={128} // Limite para senhas
                        minLength={8} // Mínimo de segurança
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
                    <PasswordStrengthIndicator password={formData.password} />
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
                        maxLength={128}
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
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-sm text-red-600">As senhas não coincidem</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="space-y-4 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading || !isPasswordStrong(formData.password)}
                  className="w-full h-12 text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
                >
                  {isLoading ? 'Cadastrando...' : 'Criar Conta'}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Já tem uma conta?
                    <Link to="/login" className="ml-1 text-blue-600 hover:text-blue-700 hover:underline font-medium">
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

export default StudentRegister;

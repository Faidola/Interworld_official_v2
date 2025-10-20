
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Globe, DollarSign, FileText, Calendar, BookOpen, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CandidatarSe = () => {
  const [formData, setFormData] = useState({
    // Dados Pessoais
    nomeCompleto: '',
    dataNascimento: '',
    cpf: '',
    rg: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    
    // Dados Familiares
    salarioFamiliar: '',
    composicaoFamiliar: '',
    profissaoPais: '',
    
    // Dados Acadêmicos
    nivelEnsino: '',
    instituicaoAtual: '',
    mediaGeral: '',
    anoFormacao: '',
    
    // Intercâmbio
    paisDestino: '',
    tipoPrograma: '',
    duracaoPreferida: '',
    dataInicio: '',
    
    // Idiomas
    nivelIngles: '',
    outrosIdiomas: '',
    certificacoes: '',
    
    // Documentos
    passaporte: false,
    historico: false,
    cartaMotivacao: false,
    recomendacao: false
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let formattedValue = value;

    // Aplicar formatação baseada no nome do campo (apenas para inputs de texto)
    if (type !== 'checkbox' && type !== 'date') {
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
          if (type === 'text') {
            formattedValue = formatDate(value);
          }
          break;
        default:
          formattedValue = value;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : formattedValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Aqui seria enviado para o backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="absolute top-4 left-4 z-10">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao início</span>
        </Link>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-green-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Candidatar-se ao Intercâmbio
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Preencha todas as informações necessárias para sua candidatura
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Informações Importantes */}
        <Card className="mb-8 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Documentos Necessários</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Passaporte válido (ou em processo de emissão)</li>
                  <li>• Histórico escolar completo</li>
                  <li>• Carta de motivação (mínimo 500 palavras)</li>
                  <li>• Duas cartas de recomendação</li>
                  <li>• Comprovante de renda familiar</li>
                  <li>• Certificado de proficiência em inglês (se houver)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Dados Pessoais</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                <Input
                  id="nomeCompleto"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                <Input
                  id="dataNascimento"
                  name="dataNascimento"
                  type="text"
                  placeholder="dd/mm/aaaa"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  maxLength={10}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="rg">RG *</Label>
                <Input
                  id="rg"
                  name="rg"
                  value={formData.rg}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="endereco">Endereço Completo *</Label>
                <Input
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="estado">Estado *</Label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecione o estado</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="RS">Rio Grande do Sul</option>
                  {/* Adicionar outros estados */}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Dados Familiares */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>Dados Familiares e Financeiros</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salarioFamiliar">Renda Familiar Mensal *</Label>
                <select
                  id="salarioFamiliar"
                  name="salarioFamiliar"
                  value={formData.salarioFamiliar}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecione a faixa</option>
                  <option value="ate-2">Até R$ 2.000</option>
                  <option value="2-5">R$ 2.001 - R$ 5.000</option>
                  <option value="5-10">R$ 5.001 - R$ 10.000</option>
                  <option value="10-20">R$ 10.001 - R$ 20.000</option>
                  <option value="acima-20">Acima de R$ 20.000</option>
                </select>
              </div>
              <div>
                <Label htmlFor="composicaoFamiliar">Composição Familiar *</Label>
                <Input
                  id="composicaoFamiliar"
                  name="composicaoFamiliar"
                  value={formData.composicaoFamiliar}
                  onChange={handleInputChange}
                  placeholder="Ex: Pai, mãe e 2 filhos"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="profissaoPais">Profissão dos Pais/Responsáveis *</Label>
                <Input
                  id="profissaoPais"
                  name="profissaoPais"
                  value={formData.profissaoPais}
                  onChange={handleInputChange}
                  placeholder="Descreva a profissão dos pais ou responsáveis"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Dados Acadêmicos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                <span>Dados Acadêmicos</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nivelEnsino">Nível de Ensino Atual *</Label>
                <select
                  id="nivelEnsino"
                  name="nivelEnsino"
                  value={formData.nivelEnsino}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="ensino-medio">Ensino Médio</option>
                  <option value="graduacao">Graduação</option>
                  <option value="pos-graduacao">Pós-graduação</option>
                  <option value="mestrado">Mestrado</option>
                  <option value="doutorado">Doutorado</option>
                </select>
              </div>
              <div>
                <Label htmlFor="instituicaoAtual">Instituição de Ensino *</Label>
                <Input
                  id="instituicaoAtual"
                  name="instituicaoAtual"
                  value={formData.instituicaoAtual}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="mediaGeral">Média Geral *</Label>
                <Input
                  id="mediaGeral"
                  name="mediaGeral"
                  value={formData.mediaGeral}
                  onChange={handleInputChange}
                  placeholder="Ex: 8.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="anoFormacao">Ano de Formação Previsto</Label>
                <Input
                  id="anoFormacao"
                  name="anoFormacao"
                  type="number"
                  value={formData.anoFormacao}
                  onChange={handleInputChange}
                  placeholder="2025"
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferências de Intercâmbio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span>Preferências de Intercâmbio</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paisDestino">País de Destino *</Label>
                <select
                  id="paisDestino"
                  name="paisDestino"
                  value={formData.paisDestino}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecione o país</option>
                  <option value="estados-unidos">Estados Unidos</option>
                  <option value="canada">Canadá</option>
                  <option value="reino-unido">Reino Unido</option>
                  <option value="australia">Austrália</option>
                  <option value="alemanha">Alemanha</option>
                  <option value="franca">França</option>
                </select>
              </div>
              <div>
                <Label htmlFor="tipoPrograma">Tipo de Programa *</Label>
                <select
                  id="tipoPrograma"
                  name="tipoPrograma"
                  value={formData.tipoPrograma}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="ensino-medio">Ensino Médio</option>
                  <option value="graduacao">Graduação</option>
                  <option value="pos-graduacao">Pós-graduação</option>
                  <option value="idiomas">Curso de Idiomas</option>
                  <option value="profissionalizante">Curso Profissionalizante</option>
                </select>
              </div>
              <div>
                <Label htmlFor="duracaoPreferida">Duração Preferida *</Label>
                <select
                  id="duracaoPreferida"
                  name="duracaoPreferida"
                  value={formData.duracaoPreferida}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="3-meses">3 meses</option>
                  <option value="6-meses">6 meses</option>
                  <option value="1-ano">1 ano</option>
                  <option value="2-anos">2 anos</option>
                  <option value="4-anos">4 anos</option>
                </select>
              </div>
              <div>
                <Label htmlFor="dataInicio">Data de Início Pretendida</Label>
                <Input
                  id="dataInicio"
                  name="dataInicio"
                  type="month"
                  value={formData.dataInicio}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Idiomas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-orange-600" />
                <span>Conhecimento de Idiomas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nivelIngles">Nível de Inglês *</Label>
                <select
                  id="nivelIngles"
                  name="nivelIngles"
                  value={formData.nivelIngles}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Selecione o nível</option>
                  <option value="basico">Básico</option>
                  <option value="intermediario">Intermediário</option>
                  <option value="avancado">Avançado</option>
                  <option value="fluente">Fluente</option>
                </select>
              </div>
              <div>
                <Label htmlFor="certificacoes">Certificações de Idioma</Label>
                <Input
                  id="certificacoes"
                  name="certificacoes"
                  value={formData.certificacoes}
                  onChange={handleInputChange}
                  placeholder="Ex: TOEFL, IELTS, Cambridge"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="outrosIdiomas">Outros Idiomas</Label>
                <Input
                  id="outrosIdiomas"
                  name="outrosIdiomas"
                  value={formData.outrosIdiomas}
                  onChange={handleInputChange}
                  placeholder="Mencione outros idiomas que você fala"
                />
              </div>
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-red-600" />
                <span>Documentos Disponíveis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="passaporte"
                    checked={formData.passaporte}
                    onChange={handleInputChange}
                    className="rounded border-gray-300"
                  />
                  <span>Possuo passaporte válido</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="historico"
                    checked={formData.historico}
                    onChange={handleInputChange}
                    className="rounded border-gray-300"
                  />
                  <span>Histórico escolar atualizado</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="cartaMotivacao"
                    checked={formData.cartaMotivacao}
                    onChange={handleInputChange}
                    className="rounded border-gray-300"
                  />
                  <span>Carta de motivação pronta</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="recomendacao"
                    checked={formData.recomendacao}
                    onChange={handleInputChange}
                    className="rounded border-gray-300"
                  />
                  <span>Cartas de recomendação</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              type="submit"
              size="lg"
              className="px-12 py-3 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
            >
              Enviar Candidatura
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidatarSe;

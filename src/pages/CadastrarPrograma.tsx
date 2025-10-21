import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Save, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import programaService from '@/services/programaService';
import escolaService from '@/services/escolaService';

interface Acomodacao {
  id: string;
  tipo: string;
  descricao: string;
  precoSemanal: string;
  comodidades: string[];
}

interface Estagio {
  id: string;
  disponivel: boolean;
  descricao: string;
  duracao: string;
  areas: string[];
  remunerado: boolean;
  requisitos: string;
}

const CadastrarPrograma = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    pais: '',
    cidade: '',
    vagasDisponiveis: '',
    preco: '',
    idioma: '1', // ID do idioma (padrão: Inglês)
    statusPrograma: 'ATIVO'
  });

  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
  const [estagio, setEstagio] = useState<Estagio>({
    id: '1',
    disponivel: false,
    descricao: '',
    duracao: '',
    areas: [],
    remunerado: false,
    requisitos: ''
  });

  const [novaComodidade, setNovaComodidade] = useState('');
  const [novaArea, setNovaArea] = useState('');

  const tiposAcomodacao = [
    { value: 'CASA_FAMILIA', label: 'Casa de Família' },
    { value: 'RESIDENCIA', label: 'Residência Estudantil' },
    { value: 'APARTAMENTO', label: 'Apartamento Compartilhado' },
    { value: 'STUDIO', label: 'Studio Privado' }
  ];

  const idiomas = [
    { value: '1', label: 'Inglês' },
    { value: '2', label: 'Espanhol' },
    { value: '3', label: 'Francês' },
    { value: '4', label: 'Alemão' },
    { value: '5', label: 'Italiano' },
    { value: '6', label: 'Mandarim' },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addAcomodacao = () => {
    const novaAcomodacao: Acomodacao = {
      id: Date.now().toString(),
      tipo: '',
      descricao: '',
      precoSemanal: '',
      comodidades: []
    };
    setAcomodacoes(prev => [...prev, novaAcomodacao]);
  };

  const removeAcomodacao = (id: string) => {
    setAcomodacoes(prev => prev.filter(ac => ac.id !== id));
  };

  const updateAcomodacao = (id: string, field: string, value: string | string[]) => {
    setAcomodacoes(prev => prev.map(ac => 
      ac.id === id ? { ...ac, [field]: value } : ac
    ));
  };

  const addComodidade = (acomodacaoId: string) => {
    if (novaComodidade.trim()) {
      updateAcomodacao(acomodacaoId, 'comodidades', [
        ...acomodacoes.find(ac => ac.id === acomodacaoId)?.comodidades || [],
        novaComodidade.trim()
      ]);
      setNovaComodidade('');
    }
  };

  const removeComodidade = (acomodacaoId: string, comodidade: string) => {
    const acomodacao = acomodacoes.find(ac => ac.id === acomodacaoId);
    if (acomodacao) {
      updateAcomodacao(acomodacaoId, 'comodidades', 
        acomodacao.comodidades.filter(c => c !== comodidade)
      );
    }
  };

  const addArea = () => {
    if (novaArea.trim()) {
      setEstagio(prev => ({
        ...prev,
        areas: [...prev.areas, novaArea.trim()]
      }));
      setNovaArea('');
    }
  };

  const removeArea = (area: string) => {
    setEstagio(prev => ({
      ...prev,
      areas: prev.areas.filter(a => a !== area)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.titulo || !formData.descricao || !formData.pais || !formData.cidade || !formData.vagasDisponiveis || !formData.preco) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (!userData?.id) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado como escola para cadastrar um programa.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Buscar o ID da escola baseado no usuário logado
      let escolaId;
      try {
        const escola = await escolaService.buscarPorUsuarioId(parseInt(userData.id));
        escolaId = escola.id;
      } catch (error) {
        // Fallback: usar o ID do usuário como ID da escola (temporário)
        console.warn('Não foi possível buscar escola pelo usuário. Usando ID do usuário como fallback.');
        escolaId = parseInt(userData.id);
      }
      // Formatar acomodação
      const acomodacaoFormatada = acomodacoes.length > 0 
        ? JSON.stringify(acomodacoes.map(ac => ({
            tipo: ac.tipo,
            descricao: ac.descricao,
            precoSemanal: ac.precoSemanal,
            comodidades: ac.comodidades
          })))
        : undefined;

      // Formatar estágio
      const estagioFormatado = estagio.disponivel
        ? JSON.stringify({
            descricao: estagio.descricao,
            duracao: estagio.duracao,
            areas: estagio.areas,
            remunerado: estagio.remunerado,
            requisitos: estagio.requisitos
          })
        : undefined;

      // Preparar dados para envio
      const programaData = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        idioma_id: parseInt(formData.idioma),
        pais: formData.pais,
        cidade: formData.cidade,
        duracaoSemanas: 4, // Valor padrão, pode ser adicionado ao formulário depois
        vagasDisponiveis: parseInt(formData.vagasDisponiveis),
        preco: parseFloat(formData.preco),
        moeda: 'USD',
        nivelIdioma: 'Básico', // Valor padrão, pode ser adicionado ao formulário depois
        tipoPrograma: 'CURSO_IDIOMA',
        temBolsa: false,
        escola_id: escolaId,
        dataCadastro: new Date().toISOString(),
        acomodacao: acomodacaoFormatada,
        acomodacaoPreco: acomodacoes.length > 0 ? acomodacoes[0].precoSemanal : undefined,
        infoEstagio: estagioFormatado,
        statusPrograma: formData.statusPrograma
      };

      await programaService.criar(programaData);
      
      toast({
        title: "Sucesso",
        description: "Programa cadastrado com sucesso!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao cadastrar programa:', error);
      toast({
        title: "Erro",
        description: "Erro ao cadastrar programa. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Cadastrar Programa de Intercâmbio
            </h1>
            <p className="text-gray-600">
              Preencha as informações do seu programa de intercâmbio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titulo">Título do Programa *</Label>
                    <Input
                      id="titulo"
                      value={formData.titulo}
                      onChange={(e) => handleInputChange('titulo', e.target.value)}
                      placeholder="Ex: Inglês Intensivo em Nova York"
                    />
                  </div>
                  <div>
                    <Label htmlFor="idioma">Idioma do Programa *</Label>
                    <Select value={formData.idioma} onValueChange={(value) => handleInputChange('idioma', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        {idiomas.map(idioma => (
                          <SelectItem key={idioma.value} value={idioma.value}>
                            {idioma.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                    placeholder="Descreva o programa em detalhes..."
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pais">País *</Label>
                    <Input
                      id="pais"
                      value={formData.pais}
                      onChange={(e) => handleInputChange('pais', e.target.value)}
                      placeholder="Ex: Estados Unidos"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Input
                      id="cidade"
                      value={formData.cidade}
                      onChange={(e) => handleInputChange('cidade', e.target.value)}
                      placeholder="Ex: Nova York"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vagasDisponiveis">Vagas Disponíveis *</Label>
                    <Input
                      id="vagasDisponiveis"
                      type="number"
                      value={formData.vagasDisponiveis}
                      onChange={(e) => handleInputChange('vagasDisponiveis', e.target.value)}
                      placeholder="Ex: 15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="preco">Preço (USD) *</Label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      value={formData.preco}
                      onChange={(e) => handleInputChange('preco', e.target.value)}
                      placeholder="Ex: 1850.00"
                    />
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Acomodações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Acomodações
                  <Button type="button" onClick={addAcomodacao} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Acomodação
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {acomodacoes.map((acomodacao) => (
                  <div key={acomodacao.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Acomodação {acomodacoes.indexOf(acomodacao) + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAcomodacao(acomodacao.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Tipo de Acomodação</Label>
                        <Select value={acomodacao.tipo} onValueChange={(value) => updateAcomodacao(acomodacao.id, 'tipo', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {tiposAcomodacao.map(tipo => (
                              <SelectItem key={tipo.value} value={tipo.value}>
                                {tipo.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Preço Semanal</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={acomodacao.precoSemanal}
                          onChange={(e) => updateAcomodacao(acomodacao.id, 'precoSemanal', e.target.value)}
                          placeholder="Ex: 320.00"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        value={acomodacao.descricao}
                        onChange={(e) => updateAcomodacao(acomodacao.id, 'descricao', e.target.value)}
                        placeholder="Descreva a acomodação..."
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label>Comodidades</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {acomodacao.comodidades.map((comodidade, idx) => (
                          <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                            {comodidade}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeComodidade(acomodacao.id, comodidade)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={novaComodidade}
                          onChange={(e) => setNovaComodidade(e.target.value)}
                          placeholder="Adicionar comodidade"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addComodidade(acomodacao.id))}
                        />
                        <Button
                          type="button"
                          onClick={() => addComodidade(acomodacao.id)}
                          size="sm"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {acomodacoes.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    Nenhuma acomodação adicionada. Clique em "Adicionar Acomodação" para começar.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Estágio */}
            <Card>
              <CardHeader>
                <CardTitle>Oportunidade de Estágio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="estagioDisponivel"
                    checked={estagio.disponivel}
                    onCheckedChange={(checked) => setEstagio(prev => ({ ...prev, disponivel: checked as boolean }))}
                  />
                  <Label htmlFor="estagioDisponivel">Oferece oportunidade de estágio</Label>
                </div>

                {estagio.disponivel && (
                  <>
                    <div>
                      <Label>Descrição do Estágio</Label>
                      <Textarea
                        value={estagio.descricao}
                        onChange={(e) => setEstagio(prev => ({ ...prev, descricao: e.target.value }))}
                        placeholder="Descreva a oportunidade de estágio..."
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Duração</Label>
                        <Input
                          value={estagio.duracao}
                          onChange={(e) => setEstagio(prev => ({ ...prev, duracao: e.target.value }))}
                          placeholder="Ex: 4-8 semanas"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="estagioRemunerado"
                          checked={estagio.remunerado}
                          onCheckedChange={(checked) => setEstagio(prev => ({ ...prev, remunerado: checked as boolean }))}
                        />
                        <Label htmlFor="estagioRemunerado">Estágio remunerado</Label>
                      </div>
                    </div>

                    <div>
                      <Label>Áreas de Estágio</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {estagio.areas.map((area, idx) => (
                          <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                            {area}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeArea(area)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={novaArea}
                          onChange={(e) => setNovaArea(e.target.value)}
                          placeholder="Adicionar área"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArea())}
                        />
                        <Button
                          type="button"
                          onClick={addArea}
                          size="sm"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Requisitos do Estágio</Label>
                      <Textarea
                        value={estagio.requisitos}
                        onChange={(e) => setEstagio(prev => ({ ...prev, requisitos: e.target.value }))}
                        placeholder="Ex: Completar 6 semanas do curso, Nível intermediário..."
                        rows={2}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar Programa'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastrarPrograma;

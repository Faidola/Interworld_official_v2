import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, Home, Briefcase, MapPin, Clock, DollarSign, Info, ExternalLink, Edit, Eye, EyeOff } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import programaService, { ProgramaIntercambio } from '@/services/programaService';
import escolaService from '@/services/escolaService';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Course {
  id: number;
  name: string;
  vacancies: number;
  duration: string;
  price: string;
  deadline: string;
  description: string;
  requirements: string;
  housing: {
    type: string;
    description: string;
    price: string;
    facilities: string;
  };
  internship: {
    available: boolean;
    description: string;
    duration: string;
    areas: string;
  };
}

const SchoolDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [programas, setProgramas] = useState<ProgramaIntercambio[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingPrograma, setEditingPrograma] = useState<ProgramaIntercambio | null>(null);
  const { toast } = useToast();
  const { userData } = useAuth();
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    name: '',
    vacancies: '',
    duration: '',
    price: '',
    deadline: '',
    description: '',
    requirements: '',
    housingType: '',
    housingDescription: '',
    housingPrice: '',
    housingFacilities: '',
    internshipAvailable: false,
    internshipDescription: '',
    internshipDuration: '',
    internshipAreas: ''
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      vacancies: '',
      duration: '',
      price: '',
      deadline: '',
      description: '',
      requirements: '',
      housingType: '',
      housingDescription: '',
      housingPrice: '',
      housingFacilities: '',
      internshipAvailable: false,
      internshipDescription: '',
      internshipDuration: '',
      internshipAreas: ''
    });
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.vacancies || !formData.housingType) return;
    
    const newCourse: Course = {
      id: Date.now(),
      name: formData.name.trim(),
      vacancies: parseInt(formData.vacancies, 10),
      duration: formData.duration,
      price: formData.price,
      deadline: formData.deadline,
      description: formData.description,
      requirements: formData.requirements,
      housing: {
        type: formData.housingType,
        description: formData.housingDescription,
        price: formData.housingPrice,
        facilities: formData.housingFacilities
      },
      internship: {
        available: formData.internshipAvailable,
        description: formData.internshipDescription,
        duration: formData.internshipDuration,
        areas: formData.internshipAreas
      }
    };
    
    setCourses([...courses, newCourse]);
    resetForm();
    setShowForm(false);
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  // Carregar programas da escola
  const loadProgramas = async () => {
    if (!userData?.id) return;
    
    setIsLoading(true);
    try {
      const escola = await escolaService.buscarPorUsuarioId(parseInt(userData.id));
      const todosProgramas = await programaService.listarTodos();
      const programasEscola = todosProgramas.filter(p => p.escola?.id === escola.id);
      setProgramas(programasEscola);
    } catch (error) {
      console.error('Erro ao carregar programas:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar programas da escola.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Inativar programa
  const handleInativarPrograma = async (programa: ProgramaIntercambio) => {
    if (!programa.id) return;
    
    setIsLoading(true);
    try {
      const programaAtualizado = {
        ...programa,
        statusPrograma: programa.statusPrograma === 'ATIVO' ? 'INATIVO' : 'ATIVO'
      };
      
      await programaService.atualizar(programa.id, programaAtualizado);
      await loadProgramas();
      
      toast({
        title: "Sucesso",
        description: `Programa ${programa.statusPrograma === 'ATIVO' ? 'inativado' : 'ativado'} com sucesso!`
      });
    } catch (error) {
      console.error('Erro ao alterar status do programa:', error);
      toast({
        title: "Erro",
        description: "Erro ao alterar status do programa.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Deletar programa
  const handleDeletarPrograma = async (programaId: number) => {
    setIsLoading(true);
    try {
      await programaService.deletar(programaId);
      await loadProgramas();
      
      toast({
        title: "Sucesso",
        description: "Programa deletado com sucesso!"
      });
    } catch (error) {
      console.error('Erro ao deletar programa:', error);
      toast({
        title: "Erro",
        description: "Erro ao deletar programa.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProgramas();
  }, [userData]);

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Painel da Escola</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Gerenciar Programas</h3>
              <div className="flex gap-2">
                <Link to="/cadastrar-programa">
                  <Button 
                    variant="outline"
                    className="border-teal-600 text-teal-600 hover:bg-teal-50"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Cadastro Completo
                  </Button>
                </Link>
                <Button 
                  onClick={() => setShowForm(!showForm)}
                  className="bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {showForm ? 'Cancelar' : 'Novo Programa'}
                </Button>
              </div>
            </div>

            {showForm && (
              <Card className="border-2 border-teal-200 bg-teal-50/50">
                <CardHeader>
                  <CardTitle className="text-lg text-teal-800">Adicionar Novo Programa</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddCourse} className="space-y-6">
                    
                    {/* Informações Básicas do Programa */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 border-b pb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2" />
                        Informações Básicas
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="course-name">Nome do Programa *</Label>
                <Input
                  id="course-name"
                            placeholder="Ex: Inglês Intensivo em Londres"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
                        <div className="space-y-2">
                          <Label htmlFor="course-vacancies">Número de Vagas *</Label>
                <Input
                  id="course-vacancies"
                  type="number"
                            placeholder="Ex: 15"
                            value={formData.vacancies}
                            onChange={(e) => handleInputChange('vacancies', e.target.value)}
                  required
                />
              </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="course-duration">Duração</Label>
                          <Select onValueChange={(value) => handleInputChange('duration', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a duração" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2-semanas">2 semanas</SelectItem>
                              <SelectItem value="4-semanas">4 semanas</SelectItem>
                              <SelectItem value="6-semanas">6 semanas</SelectItem>
                              <SelectItem value="8-semanas">8 semanas</SelectItem>
                              <SelectItem value="12-semanas">12 semanas</SelectItem>
                              <SelectItem value="16-semanas">16 semanas</SelectItem>
                              <SelectItem value="24-semanas">24 semanas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="course-price">Preço (USD)</Label>
                          <Input
                            id="course-price"
                            placeholder="Ex: US$ 2,500"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="course-description">Descrição do Programa</Label>
                        <Textarea
                          id="course-description"
                          placeholder="Descreva o programa, metodologia, objetivos, etc."
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="course-requirements">Requisitos</Label>
                        <Textarea
                          id="course-requirements"
                          placeholder="Ex: Nível básico de inglês, Passaporte válido, Visto de estudante"
                          value={formData.requirements}
                          onChange={(e) => handleInputChange('requirements', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Informações de Acomodação */}
                    <div className="space-y-4 border-t pt-4">
                      <h4 className="font-semibold text-gray-800 border-b pb-2 flex items-center">
                        <Home className="h-4 w-4 mr-2 text-blue-600" />
                        Informações de Acomodação *
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="housing-type">Tipo de Acomodação *</Label>
                          <Select onValueChange={(value) => handleInputChange('housingType', value)} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="casa-familia">Casa de Família</SelectItem>
                              <SelectItem value="residencia-estudantil">Residência Estudantil</SelectItem>
                              <SelectItem value="apartamento-compartilhado">Apartamento Compartilhado</SelectItem>
                              <SelectItem value="studio-privado">Studio Privado</SelectItem>
                              <SelectItem value="hotel-pousada">Hotel/Pousada</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="housing-price">Preço por Semana (USD)</Label>
                          <Input
                            id="housing-price"
                            placeholder="Ex: US$ 280"
                            value={formData.housingPrice}
                            onChange={(e) => handleInputChange('housingPrice', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="housing-description">Descrição da Acomodação</Label>
                        <Textarea
                          id="housing-description"
                          placeholder="Descreva a acomodação, localização, ambiente, etc."
                          value={formData.housingDescription}
                          onChange={(e) => handleInputChange('housingDescription', e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="housing-facilities">Facilidades Incluídas</Label>
                        <Input
                          id="housing-facilities"
                          placeholder="Ex: Wi-Fi, Café da manhã, Quarto individual, Cozinha"
                          value={formData.housingFacilities}
                          onChange={(e) => handleInputChange('housingFacilities', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Informações de Estágio */}
                    <div className="space-y-4 border-t pt-4">
                      <h4 className="font-semibold text-gray-800 border-b pb-2 flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-green-600" />
                        Oportunidades de Estágio
                      </h4>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="internship-available"
                          checked={formData.internshipAvailable}
                          onCheckedChange={(checked) => handleInputChange('internshipAvailable', checked as boolean)}
                        />
                        <Label htmlFor="internship-available">Este programa oferece oportunidades de estágio</Label>
                      </div>

                      {formData.internshipAvailable && (
                        <div className="space-y-4 ml-6 border-l-2 border-green-200 pl-4">
                          <div className="space-y-2">
                            <Label htmlFor="internship-description">Descrição do Programa de Estágio</Label>
                            <Textarea
                              id="internship-description"
                              placeholder="Descreva as oportunidades de estágio, como funciona o processo, etc."
                              value={formData.internshipDescription}
                              onChange={(e) => handleInputChange('internshipDescription', e.target.value)}
                              rows={2}
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="internship-duration">Duração do Estágio</Label>
                              <Select onValueChange={(value) => handleInputChange('internshipDuration', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a duração" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="4-semanas">4 semanas</SelectItem>
                                  <SelectItem value="6-semanas">6 semanas</SelectItem>
                                  <SelectItem value="8-semanas">8 semanas</SelectItem>
                                  <SelectItem value="12-semanas">12 semanas</SelectItem>
                                  <SelectItem value="16-semanas">16 semanas</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="internship-areas">Áreas de Atuação</Label>
                              <Input
                                id="internship-areas"
                                placeholder="Ex: Marketing, Turismo, Educação, Tecnologia"
                                value={formData.internshipAreas}
                                onChange={(e) => handleInputChange('internshipAreas', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600"
                      >
                <PlusCircle className="h-4 w-4 mr-2" />
                        Adicionar Programa
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setShowForm(false)}
                      >
                        Cancelar
              </Button>
                    </div>
            </form>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Programas Cadastrados</h3>
              <Button 
                onClick={loadProgramas} 
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                {isLoading ? 'Carregando...' : 'Atualizar'}
              </Button>
            </div>
            
            {/* Programas da API */}
            {programas.length > 0 && (
              <div className="space-y-4 mb-6">
                <h4 className="text-md font-medium text-gray-700">Programas Oficiais</h4>
                <div className="grid gap-4">
                  {programas.map((programa) => (
                    <Card key={programa.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-lg text-gray-900">{programa.titulo}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {programa.cidade}, {programa.pais}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                ${programa.preco}
                              </span>
                              <Badge variant={programa.statusPrograma === 'ATIVO' ? 'default' : 'secondary'}>
                                {programa.statusPrograma}
                              </Badge>
                              <Badge variant="outline">{programa.vagasDisponiveis} vagas</Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingPrograma(programa)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleInativarPrograma(programa)}
                              className={programa.statusPrograma === 'ATIVO' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                            >
                              {programa.statusPrograma === 'ATIVO' ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                              {programa.statusPrograma === 'ATIVO' ? 'Inativar' : 'Ativar'}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => programa.id && handleDeletarPrograma(programa.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-3">{programa.descricao}</p>

                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Informações de Acomodação */}
                          {programa.acomodacao && (
                            <div className="border rounded-lg p-3 bg-blue-50">
                              <h5 className="font-medium text-sm flex items-center mb-2 text-blue-800">
                                <Home className="h-4 w-4 mr-2" />
                                Acomodação Disponível
                              </h5>
                              <p className="text-xs text-gray-600">
                                {programa.acomodacaoPreco && `$${programa.acomodacaoPreco}/semana`}
                              </p>
                            </div>
                          )}

                          {/* Informações de Estágio */}
                          {programa.infoEstagio && (
                            <div className="border rounded-lg p-3 bg-green-50">
                              <h5 className="font-medium text-sm flex items-center mb-2 text-green-800">
                                <Briefcase className="h-4 w-4 mr-2" />
                                Estágio Disponível
                              </h5>
                              <p className="text-xs text-gray-600">
                                Informações de estágio disponíveis
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Programas locais (antigos) */}
            {courses.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-700">Programas Rascunho</h4>
              <div className="grid gap-4">
                {courses.map((course) => (
                  <Card key={course.id} className="border-l-4 border-l-teal-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">{course.name}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {course.duration || 'Duração não especificada'}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {course.price || 'Preço não especificado'}
                            </span>
                            <Badge variant="secondary">{course.vacancies} vagas</Badge>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {course.description && (
                        <p className="text-sm text-gray-700 mb-3">{course.description}</p>
                      )}

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Informações de Moradia */}
                        <div className="border rounded-lg p-3 bg-blue-50">
                          <h5 className="font-medium text-sm flex items-center mb-2 text-blue-800">
                            <Home className="h-4 w-4 mr-2" />
                            Acomodação: {course.housing.type.replace('-', ' ')}
                          </h5>
                          {course.housing.description && (
                            <p className="text-xs text-gray-600 mb-2">{course.housing.description}</p>
                          )}
                          <div className="flex items-center justify-between text-sm">
                            {course.housing.price && (
                              <span className="font-medium text-blue-700">{course.housing.price}/semana</span>
                            )}
                            {course.housing.facilities && (
                              <div className="flex flex-wrap gap-1">
                                {course.housing.facilities.split(',').map((facility, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {facility.trim()}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Informações de Estágio */}
                        <div className={`border rounded-lg p-3 ${
                          course.internship.available ? 'bg-green-50' : 'bg-gray-50'
                        }`}>
                          <h5 className={`font-medium text-sm flex items-center mb-2 ${
                            course.internship.available ? 'text-green-800' : 'text-gray-600'
                          }`}>
                            <Briefcase className="h-4 w-4 mr-2" />
                            {course.internship.available ? 'Estágio Disponível' : 'Sem Estágio'}
                          </h5>
                          {course.internship.available ? (
                            <>
                              {course.internship.description && (
                                <p className="text-xs text-gray-600 mb-2">{course.internship.description}</p>
                              )}
                              <div className="space-y-1 text-xs">
                                {course.internship.duration && (
                                  <p><strong>Duração:</strong> {course.internship.duration}</p>
                                )}
                                {course.internship.areas && (
                                  <div className="flex flex-wrap gap-1">
                                    <span className="text-gray-600">Áreas:</span>
                                    {course.internship.areas.split(',').map((area, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {area.trim()}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <p className="text-xs text-gray-500 italic">
                              Programa focado exclusivamente em estudos
                            </p>
                          )}
                        </div>
                      </div>

                      {(course.requirements || course.deadline) && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            {course.requirements && (
                              <div>
                                <span className="font-medium text-gray-700">Requisitos:</span>
                                <p className="text-gray-600">{course.requirements}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              </div>
            )}
            
            {/* Mensagem quando não há programas */}
            {programas.length === 0 && courses.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <PlusCircle className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-gray-900">Nenhum programa cadastrado</h4>
                    <p className="text-sm text-gray-500 max-w-sm">
                      Adicione seu primeiro programa de intercâmbio com informações completas de curso, moradia e estágio.
                    </p>
                    <Link to="/cadastrar-programa">
                      <Button className="mt-4 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Criar Primeiro Programa
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Dialog de Edição de Programa */}
      <Dialog open={!!editingPrograma} onOpenChange={() => setEditingPrograma(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Programa</DialogTitle>
          </DialogHeader>
          {editingPrograma && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Título</Label>
                  <Input
                    value={editingPrograma.titulo}
                    onChange={(e) => setEditingPrograma({...editingPrograma, titulo: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Preço (USD)</Label>
                  <Input
                    type="number"
                    value={editingPrograma.preco}
                    onChange={(e) => setEditingPrograma({...editingPrograma, preco: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>País</Label>
                  <Input
                    value={editingPrograma.pais}
                    onChange={(e) => setEditingPrograma({...editingPrograma, pais: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Cidade</Label>
                  <Input
                    value={editingPrograma.cidade}
                    onChange={(e) => setEditingPrograma({...editingPrograma, cidade: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label>Vagas Disponíveis</Label>
                <Input
                  type="number"
                  value={editingPrograma.vagasDisponiveis}
                  onChange={(e) => setEditingPrograma({...editingPrograma, vagasDisponiveis: parseInt(e.target.value)})}
                />
              </div>
              
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={editingPrograma.descricao}
                  onChange={(e) => setEditingPrograma({...editingPrograma, descricao: e.target.value})}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPrograma(null)}>
              Cancelar
            </Button>
            <Button 
              onClick={async () => {
                if (editingPrograma?.id) {
                  setIsLoading(true);
                  try {
                    await programaService.atualizar(editingPrograma.id, editingPrograma);
                    await loadProgramas();
                    setEditingPrograma(null);
                    toast({
                      title: "Sucesso",
                      description: "Programa atualizado com sucesso!"
                    });
                  } catch (error) {
                    toast({
                      title: "Erro",
                      description: "Erro ao atualizar programa.",
                      variant: "destructive"
                    });
                  } finally {
                    setIsLoading(false);
                  }
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchoolDashboard;

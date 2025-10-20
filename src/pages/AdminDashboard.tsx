import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Shield, 
  Users, 
  Edit, 
  Search,
  LogOut,
  User,
  Building,
  Globe,
  Phone,
  MapPin,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  nivelAcesso: string;
  ativo: boolean;
  dataCriacao: string;
}

interface UsuarioAPI {
  id?: string;
  idUsuario?: string;
  nome: string;
  email: string;
  nivelAcesso?: string;
  ativo?: boolean;
  dataCriacao?: string;
  createdAt?: string;
  statusUsuario?: string; // Adicionado para consistência com o backend
}

interface UsuarioDTO {
  nome: string;
  email: string;
  nivelAcesso: string;
}

interface Escola {
  id: number;
  nome: string;
  descricao: string;
  pais: string;
  regiao: string;
  telefone: string;
  website: string;
  foto?: string;
  avalicao: number;
  statusEscola: string; // ATIVO ou INATIVO
  identificacaoEscola?: string;
  codigoPostal?: string;
  estado?: string;
  cidade?: string;
  enderecoCompleto?: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
}

interface Estudante {
  id: number;
  nome: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  statusEstudante: string; // ATIVO ou INATIVO
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
}

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
  const [escolas, setEscolas] = useState<Escola[]>([]);
  const [filteredEscolas, setFilteredEscolas] = useState<Escola[]>([]);
  const [estudantes, setEstudantes] = useState<Estudante[]>([]);
  const [filteredEstudantes, setFilteredEstudantes] = useState<Estudante[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermEscolas, setSearchTermEscolas] = useState('');
  const [searchTermEstudantes, setSearchTermEstudantes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('usuarios');
  const [userToEdit, setUserToEdit] = useState<Usuario | null>(null);
  const [editFormData, setEditFormData] = useState<UsuarioDTO>({ nome: '', email: '', nivelAcesso: '' });
  const { toast } = useToast();

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };

  // Função para carregar usuários da API
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Chamada para a API real na porta 8081
      const response = await fetch('http://localhost:8081/api/usuarios', {
        method: 'GET',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const users: UsuarioAPI[] = await response.json();
      
      // Mapear os dados da API para o formato esperado
      const mappedUsers: Usuario[] = users.map((user: UsuarioAPI) => ({
        id: user.id || user.idUsuario || '',
        nome: user.nome,
        email: user.email,
        nivelAcesso: user.nivelAcesso || 'INTERCAMBISTA',
        ativo: user.ativo !== undefined ? user.ativo : (user.statusUsuario === 'ATIVO'),
        dataCriacao: user.dataCriacao || user.createdAt || new Date().toISOString()
      }));
      
      setUsuarios(mappedUsers);
      toast({
        title: "Usuários carregados",
        description: `${mappedUsers.length} usuários encontrados.`,
      });
      
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar lista de usuários. Verifique se o backend está rodando na porta 8081 e se a autenticação está correta.",
        variant: "destructive",
      });
      
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Função para carregar escolas da API
  const loadEscolas = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8081/api/escolas', {
        method: 'GET',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const escolasData: Escola[] = await response.json();
      setEscolas(escolasData);
      
      toast({
        title: "Escolas carregadas",
        description: `${escolasData.length} escolas encontradas.`,
      });
      
    } catch (error) {
      console.error('Erro ao carregar escolas:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar lista de escolas. Verifique se o backend está rodando na porta 8081.",
        variant: "destructive",
      });
      
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Função para carregar estudantes da API
  const loadEstudantes = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8081/api/estudantes', {
        method: 'GET',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const estudantesData: Estudante[] = await response.json();
      setEstudantes(estudantesData);
      
      toast({
        title: "Estudantes carregados",
        description: `${estudantesData.length} estudantes encontrados.`,
      });
      
    } catch (error) {
      console.error('Erro ao carregar estudantes:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar lista de estudantes. Verifique se o backend está rodando na porta 8081.",
        variant: "destructive",
      });
      
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Função para recarregar todos os dados
  const refreshAllData = useCallback(async () => {
    if (isAuthenticated) {
      await Promise.all([
        loadUsers(),
        loadEscolas(),
        loadEstudantes()
      ]);
    }
  }, [isAuthenticated, loadUsers, loadEscolas, loadEstudantes]);

  // Efeito para carregar dados na inicialização
  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Efeito para recarregar dados quando mudar de aba (para sincronização)
  useEffect(() => {
    if (isAuthenticated) {
      // Pequeno delay para garantir que novos dados sejam refletidos
      const timer = setTimeout(() => {
        refreshAllData();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, refreshAllData, isAuthenticated]);

  useEffect(() => {
    // Filtrar usuários baseado no termo de busca
    if (!usuarios) return;
    const filtered = usuarios.filter(user => 
      (user.nome?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
    setFilteredUsuarios(filtered);
  }, [searchTerm, usuarios]);

  useEffect(() => {
    // Filtrar escolas baseado no termo de busca
    if (!escolas) return;
    const filtered = escolas.filter(escola => 
      (escola.nome?.toLowerCase() || '').includes(searchTermEscolas.toLowerCase()) ||
      (escola.usuario?.email?.toLowerCase() || '').includes(searchTermEscolas.toLowerCase()) ||
      (escola.pais?.toLowerCase() || '').includes(searchTermEscolas.toLowerCase())
    );
    setFilteredEscolas(filtered);
  }, [searchTermEscolas, escolas]);

  useEffect(() => {
    // Filtrar estudantes baseado no termo de busca
    if (!estudantes) return;
    const filtered = estudantes.filter(estudante => 
      (estudante.nome?.toLowerCase() || '').includes(searchTermEstudantes.toLowerCase()) ||
      (estudante.usuario?.email?.toLowerCase() || '').includes(searchTermEstudantes.toLowerCase()) ||
      (estudante.cpf?.toLowerCase() || '').includes(searchTermEstudantes.toLowerCase())
    );
    setFilteredEstudantes(filtered);
  }, [searchTermEstudantes, estudantes]);

  const handleOpenEditModal = (user: Usuario) => {
    setUserToEdit(user);
    setEditFormData({
      nome: user.nome,
      email: user.email,
      nivelAcesso: user.nivelAcesso,
    });
  };

  const handleUpdateUser = async () => {
    if (!userToEdit) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8081/api/usuarios/${userToEdit.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const updatedUser = await response.json();

      setUsuarios(prev => prev.map(u => (u.id === userToEdit.id ? { ...u, ...updatedUser } : u)));
      setUserToEdit(null);

      toast({
        title: "Usuário atualizado",
        description: `Os dados de ${updatedUser.nome} foram atualizados.`,
      });

    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o usuário.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar credenciais do admin
    if (email === 'adm@gmail.com' && password === '12345678') {
      setIsAuthenticated(true);
      toast({
        title: "Acesso autorizado",
        description: "Bem-vindo ao painel administrativo!",
      });
    } else {
      toast({
        title: "Acesso negado",
        description: "Credenciais inválidas para administrador.",
        variant: "destructive",
      });
    }
  };

  const toggleUserStatus = async (user: Usuario) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`http://localhost:8081/api/usuarios/${user.id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ativo: !user.ativo })
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      // Atualizar o status do usuário na lista local
      setUsuarios(prev => prev.map(u => 
        u.id === user.id ? { ...u, ativo: !u.ativo } : u
      ));
      
      toast({
        title: "Status alterado",
        description: `${user.nome} foi ${user.ativo ? 'inativado' : 'ativado'}.`,
      });
      
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      toast({
        title: "Erro",
        description: "Erro ao alterar status do usuário. Verifique se o backend está funcionando.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const toggleEscolaStatus = async (escola: Escola) => {
    setIsLoading(true);
    
    try {
      const endpoint = escola.statusEscola === 'ATIVO' 
        ? `http://localhost:8081/api/escolas/inativar/${escola.id}`
        : `http://localhost:8081/api/escolas/update/${escola.id}`;
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: escola.statusEscola !== 'ATIVO' ? JSON.stringify({
          ...escola,
          statusEscola: 'ATIVO'
        }) : undefined
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      // Recarregar dados para sincronização
      await refreshAllData();
      
      toast({
        title: "Status alterado",
        description: `${escola.nome} foi ${escola.statusEscola === 'ATIVO' ? 'inativada' : 'ativada'}.`,
      });
      
    } catch (error) {
      console.error('Erro ao alterar status da escola:', error);
      toast({
        title: "Erro",
        description: "Erro ao alterar status da escola. Verifique se o backend está funcionando.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const toggleEstudanteStatus = async (estudante: Estudante) => {
    setIsLoading(true);
    
    try {
      const endpoint = estudante.statusEstudante === 'ATIVO' 
        ? `http://localhost:8081/api/estudantes/inativar/${estudante.id}`
        : `http://localhost:8081/api/estudantes/ativar/${estudante.id}`;
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: estudante.statusEstudante !== 'ATIVO' ? JSON.stringify({
          ...estudante,
          statusEstudante: 'ATIVO'
        }) : undefined
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      // Recarregar dados para sincronização
      await refreshAllData();
      
      toast({
        title: "Status alterado",
        description: `${estudante.nome} foi ${estudante.statusEstudante === 'ATIVO' ? 'inativado' : 'ativado'}.`,
      });
      
    } catch (error) {
      console.error('Erro ao alterar status do estudante:', error);
      toast({
        title: "Erro",
        description: "Erro ao alterar status do estudante. Verifique se o backend está funcionando.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setUsuarios([]);
    setFilteredUsuarios([]);
    setEscolas([]);
    setFilteredEscolas([]);
    setEstudantes([]);
    setFilteredEstudantes([]);
    setSearchTerm('');
    setSearchTermEscolas('');
    setSearchTermEstudantes('');
  };

  // Tela de login do admin
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4 relative">
        <div className="absolute top-4 left-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao início</span>
          </Link>
        </div>
        <Card className="shadow-2xl border-0 w-full max-w-md">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Acesso Administrativo
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Faça login para acessar o painel de administração
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email do Administrador</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="adm@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12"
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

              <Button
                type="submit"
                className="w-full h-12 text-white font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                Acessar Painel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard administrativo
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4">
      {/* Header */}
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-gray-600">Gerenciamento de usuários do sistema</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total de Usuários</p>
                  <p className="text-2xl font-bold text-gray-900">{usuarios.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total de Escolas</p>
                  <p className="text-2xl font-bold text-gray-900">{escolas.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Total de Estudantes</p>
                  <p className="text-2xl font-bold text-gray-900">{estudantes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Estudantes Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {estudantes.filter(e => e.statusEstudante === 'ATIVO').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sistema de Abas */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usuarios" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Usuários ({usuarios.length})</span>
            </TabsTrigger>
            <TabsTrigger value="escolas" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Escolas ({escolas.length})</span>
            </TabsTrigger>
            <TabsTrigger value="estudantes" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Estudantes ({estudantes.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* Aba de Usuários */}
          <TabsContent value="usuarios" className="mt-6">
            {/* Busca de Usuários */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar usuários por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lista de usuários */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Lista de Usuários ({filteredUsuarios.length})</span>
                  <Button 
                    onClick={loadUsers} 
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                  >
                    {isLoading ? 'Carregando...' : 'Atualizar'}
                  </Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Carregando usuários...</p>
                  </div>
                ) : filteredUsuarios.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Nenhum usuário encontrado.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredUsuarios.map((user) => (
                      <div
                        key={user.id}
                        className={`p-4 border rounded-lg ${
                          user.ativo ? 'bg-white' : 'bg-gray-50 opacity-75'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                user.ativo ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{user.nome}</h3>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    user.nivelAcesso === 'ESCOLA' 
                                      ? 'bg-teal-100 text-teal-800' 
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {user.nivelAcesso}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Criado em: {new Date(user.dataCriacao).toLocaleDateString('pt-BR')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => handleOpenEditModal(user)}
                              variant="outline"
                              size="sm"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Alterar
                            </Button>

                            <Button
                              onClick={() => toggleUserStatus(user)}
                              variant="outline"
                              size="sm"
                              className={user.ativo ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                            >
                              <Shield className="h-4 w-4 mr-1" />
                              {user.ativo ? 'Inativar' : 'Ativar'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Escolas */}
          <TabsContent value="escolas" className="mt-6">
            {/* Busca de Escolas */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar escolas por nome, país ou email..."
                    value={searchTermEscolas}
                    onChange={(e) => setSearchTermEscolas(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lista de escolas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Lista de Escolas ({filteredEscolas.length})</span>
                  <Button 
                    onClick={refreshAllData} 
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                  >
                    {isLoading ? 'Sincronizando...' : 'Sincronizar Dados'}
                  </Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Carregando escolas...</p>
                  </div>
                ) : filteredEscolas.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Nenhuma escola encontrada.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEscolas.map((escola) => (
                      <div
                        key={escola.id}
                        className={`p-4 border rounded-lg ${
                          escola.statusEscola === 'ATIVO' ? 'bg-white' : 'bg-gray-50 opacity-75'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                escola.statusEscola === 'ATIVO' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{escola.nome}</h3>
                                <p className="text-sm text-gray-600">{escola.usuario?.email}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{escola.pais}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Phone className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{escola.telefone}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Globe className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{escola.website}</span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{escola.descricao}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => toggleEscolaStatus(escola)}
                              variant="outline"
                              size="sm"
                              className={escola.statusEscola === 'ATIVO' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              {escola.statusEscola === 'ATIVO' ? 'Inativar' : 'Ativar'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Estudantes */}
          <TabsContent value="estudantes" className="mt-6">
            {/* Busca de Estudantes */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar estudantes por nome, email ou CPF..."
                    value={searchTermEstudantes}
                    onChange={(e) => setSearchTermEstudantes(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lista de estudantes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Lista de Estudantes ({filteredEstudantes.length})</span>
                  <Button 
                    onClick={refreshAllData} 
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                  >
                    {isLoading ? 'Sincronizando...' : 'Sincronizar Dados'}
                  </Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Carregando estudantes...</p>
                  </div>
                ) : filteredEstudantes.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Nenhum estudante encontrado.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEstudantes.map((estudante) => (
                      <div
                        key={estudante.id}
                        className={`p-4 border rounded-lg ${
                          estudante.statusEstudante === 'ATIVO' ? 'bg-white' : 'bg-gray-50 opacity-75'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                estudante.statusEstudante === 'ATIVO' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{estudante.nome}</h3>
                                <p className="text-sm text-gray-600">{estudante.usuario?.email}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <User className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">CPF: {estudante.cpf}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Phone className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{estudante.telefone}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{estudante.cidade}, {estudante.estado}</span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Nascimento: {new Date(estudante.dataNascimento).toLocaleDateString('pt-BR')} | 
                                  Endereço: {estudante.endereco}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => toggleEstudanteStatus(estudante)}
                              variant="outline"
                              size="sm"
                              className={estudante.statusEstudante === 'ATIVO' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              {estudante.statusEstudante === 'ATIVO' ? 'Inativar' : 'Ativar'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog de Edição de Usuário */}
      <Dialog open={!!userToEdit} onOpenChange={() => setUserToEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Altere os dados do usuário abaixo. Clique em salvar para aplicar as mudanças.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={editFormData.nome}
                onChange={(e) => setEditFormData({ ...editFormData, nome: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nivelAcesso" className="text-right">
                Nível
              </Label>
              <Select
                value={editFormData.nivelAcesso}
                onValueChange={(value) => setEditFormData({ ...editFormData, nivelAcesso: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o nível de acesso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INTERCAMBISTA">INTERCAMBISTA</SelectItem>
                  <SelectItem value="ESCOLA">ESCOLA</SelectItem>
                  <SelectItem value="SENHORIO">SENHORIO</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleUpdateUser} disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminDashboard;

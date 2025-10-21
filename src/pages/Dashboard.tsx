
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Building, Home, Settings, LogOut, Menu, X, PlusCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import StudentDashboard from '@/components/StudentDashboard';
import SchoolDashboard from '@/components/SchoolDashboard';
import EditProfile from '@/components/EditProfile';
import ChangePassword from '@/components/ChangePassword';
import Preferences from '@/components/Preferences';
import { useTranslation } from 'react-i18next';

type SettingsView = 'main' | 'profile' | 'password' | 'preferences';

interface UserData {
  id: string;
  email: string;
  userType: 'student' | 'school';
  name: string;
  loginTime: string;
  profileComplete: boolean;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [settingsView, setSettingsView] = useState<SettingsView>('main');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserData = localStorage.getItem('userData');

    if (!isLoggedIn || !storedUserData) {
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(storedUserData);
      setUserData(user);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleProfileSave = (newData: Partial<UserData>) => {
    if (!userData) return;
    const updatedUserData = { ...userData, ...newData, profileComplete: true };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/');
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderSettingsContent = () => {
    switch (settingsView) {
      case 'profile':
        return <EditProfile userData={userData} onBack={() => setSettingsView('main')} onSave={(newData) => { handleProfileSave(newData); setSettingsView('main'); }} />;
      case 'password':
        return <ChangePassword onBack={() => setSettingsView('main')} />;
      case 'preferences':
        return <Preferences onBack={() => setSettingsView('main')} />;
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configurações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Informações da Conta</h4>
                <p className="text-sm text-gray-600">Email: {userData.email}</p>
                <p className="text-sm text-gray-600">
                  Tipo: {isSchool ? 'Instituição' : 'Estudante'}
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm" onClick={() => setSettingsView('profile')}>
                  Editar Perfil
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm" onClick={() => setSettingsView('password')}>
                  Alterar Senha
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm" onClick={() => setSettingsView('preferences')}>
                  Preferências
                </Button>
              </div>
              <div className="pt-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm text-red-600 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair da Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  const isSchool = userData.userType === 'school';
  
  const themeColors = isSchool 
    ? {
        primary: 'from-teal-600 to-cyan-500',
        bg: 'from-teal-50 via-white to-cyan-50',
        accent: 'text-teal-600',
        button: 'from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800'
      }
    : {
        primary: 'from-blue-600 to-green-500',
        bg: 'from-blue-50 via-white to-green-50',
        accent: 'text-blue-600',
        button: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
      };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeColors.bg}`}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 bg-gradient-to-r ${themeColors.primary} rounded-full flex items-center justify-center`}>
                {isSchool ? <Building className="h-5 w-5 text-white" /> : <User className="h-5 w-5 text-white" />}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('dashboardTitle')}</h1>
                <p className="text-sm text-gray-600">
                  {isSchool ? t('schoolPanel') : t('studentPanel')}
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Início
                </Button>
              </Link>
              {userData.userType === 'student' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className={showSettings ? themeColors.accent : ''}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t('settings')}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t py-4 space-y-2">
              <Link to="/">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="h-4 w-4 mr-2" />
                  Início
                </Button>
              </Link>
              {userData.userType === 'student' && (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setShowSettings(!showSettings);
                    setShowMobileMenu(false);
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t('settings')}
                </Button>
              )}
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!userData.profileComplete && userData.userType === 'school' ? (
          <div className="w-full max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Formulário de Perfil */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Adicione informações do seu intercâmbio</CardTitle>
                    <p className="text-gray-600">
                      Para adicionar seu intercâmbio, por favor, preencha as informações abaixo.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <EditProfile
                      userData={userData}
                      onBack={handleLogout} // O botão "Cancelar" fará logout
                      onSave={handleProfileSave}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Acesso Rápido aos Programas */}
              <div className="lg:col-span-1">
                <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-teal-800">Acesso Rápido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Você pode cadastrar programas mesmo com o perfil incompleto.
                    </p>
                    <div className="space-y-3">
                      <Link to="/cadastrar-programa">
                        <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Cadastrar Programa
                        </Button>
                      </Link>
                      <Link to="/programas">
                        <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver Programas
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Welcome Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {t('hello', { name: userData.name })}
                  </CardTitle>
                    <p className="text-gray-600">
                      {isSchool
                        ? t('schoolWelcome')
                        : t('studentWelcome')}
                    </p>
                </CardHeader>
              </Card>

              {userData.userType === 'student' && <StudentDashboard userData={userData} />}
              {userData.userType === 'school' && <SchoolDashboard />}


            </div>

            {/* Settings Sidebar - só aparece quando ativado e para estudantes */}
            {showSettings && userData.userType === 'student' && (
              <div className="lg:col-span-1">
                {renderSettingsContent()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

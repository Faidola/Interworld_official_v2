
import React, { useState } from 'react';
import { Menu, X, User, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, userData, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderUserActions = () => {
    if (loading) {
      return <div className="w-28 h-10 bg-gray-200 rounded-lg animate-pulse" />;
    }

     if (isLoggedIn && userData) {
       return (
         <div className="flex items-center gap-3">
           <span className="text-sm font-medium text-gray-700 hidden lg:block">
             {userData.name}
           </span>
           <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                 <Avatar className="h-10 w-10">
                   <AvatarImage src="/placeholder.svg" alt={userData.name} />
                   <AvatarFallback>{getInitials(userData.name)}</AvatarFallback>
                 </Avatar>
               </Button>
             </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userData.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userData.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Meu Painel</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>
         </div>
       );
    }

    return (
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/login">
          <Button variant="outline" className="flex items-center space-x-2">
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </Button>
        </Link>
        <Link to="/comecar-agora">
          <Button className="bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-800 hover:to-blue-500">
            Cadastre-se
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 mt-4">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="logo.jpg"
              alt="InterWorld logo"
             className="w-[100px] h-[100px] object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
              InterWorld
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`transition-colors ${
                  isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Início
              </Link>
              <Link 
                to="/paises" 
                className={`transition-colors ${
                  isActive('/paises') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Países
              </Link>
              <Link 
                to="/programas" 
                className={`transition-colors ${
                  isActive('/programas') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Programas
              </Link>
              <Link 
                to="/quem-somos" 
                className={`transition-colors ${
                  isActive('/quem-somos') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Quem Somos
              </Link>
            </nav>
          )}

          {/* User Actions */}
          {!isMobile && renderUserActions()}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 mt-4">
              <Link 
                to="/" 
                className={`transition-colors py-2 ${
                  isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Início
              </Link>
              <Link 
                to="/paises" 
                className={`transition-colors py-2 ${
                  isActive('/paises') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Países
              </Link>
              <Link 
                to="/programas" 
                className={`transition-colors py-2 ${
                  isActive('/programas') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Programas
              </Link>
              <Link 
                to="/quem-somos" 
                className={`transition-colors py-2 ${
                  isActive('/quem-somos') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Quem Somos
              </Link>
            </nav>
            <div className="mt-4 space-y-2 border-t pt-4">
              {isLoggedIn && userData ? (
                <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={userData.name} />
                      <AvatarFallback>{getInitials(userData.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{userData.name}</span>
                      <Link to="/dashboard" className="text-xs text-blue-600">Ver painel</Link>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Button>
                  </Link>
                  <Link to="/comecar-agora">
                    <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-800 hover:to-blue-500">
                      Cadastre-se
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

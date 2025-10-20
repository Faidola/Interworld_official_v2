import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

interface CandidateButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'sm' | 'lg' | 'default';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const CandidateButton: React.FC<CandidateButtonProps> = ({ 
  className = '', 
  variant = 'default',
  size = 'default',
  children,
  icon
}) => {
  const { isLoggedIn, loading } = useAuth();

  // Se ainda está carregando o status de auth, mostra botão desabilitado
  if (loading) {
    return (
      <Button 
        disabled
        className={className}
        variant={variant}
        size={size}
      >
        {icon}
        {children}
      </Button>
    );
  }

  // Se usuário não está logado, direciona para login
  if (!isLoggedIn) {
    return (
      <Link to="/login">
        <Button 
          className={className}
          variant={variant}
          size={size}
        >
          {icon}
          {children}
        </Button>
      </Link>
    );
  }

  // Se usuário está logado, direciona para formulário de candidatura
  return (
    <Link to="/candidatar-se">
      <Button 
        className={className}
        variant={variant}
        size={size}
      >
        {icon}
        {children}
      </Button>
    </Link>
  );
};

export default CandidateButton;

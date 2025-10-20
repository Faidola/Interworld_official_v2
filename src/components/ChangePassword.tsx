import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

interface ChangePasswordProps {
  onBack: () => void;
}

const ChangePassword = ({ onBack }: ChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Erro',
        description: 'As novas senhas não coincidem.',
        variant: 'destructive',
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: 'Senha muito fraca',
        description: 'A nova senha deve ter pelo menos 8 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Obter dados do usuário do localStorage
      const storedUserData = localStorage.getItem('userData');
      if (!storedUserData) {
        throw new Error('Dados do usuário não encontrados');
      }

      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData.id;

      // Fazer UPDATE da senha no banco de dados
      const response = await fetch(`http://localhost:8081/api/users/${userId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          senhaAtual: currentPassword,
          novaSenha: newPassword
        }),
      });

      if (response.ok) {
        toast({
          title: 'Sucesso',
          description: 'Senha alterada com sucesso!',
        });
        
        // Limpar campos
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        onBack();
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao alterar senha');
      }
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      toast({
        title: 'Erro ao alterar senha',
        description: error instanceof Error ? error.message : 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alterar Senha</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova Senha</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            <PasswordStrengthIndicator password={newPassword} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="ghost" onClick={onBack} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Alterando...' : 'Salvar Alterações'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ChangePassword;

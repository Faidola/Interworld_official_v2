import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface EditStudentProfileProps {
  onBack: () => void;
  onSave: (data: { name: string }) => void;
  userData: { name: string; email: string; id?: string };
}

const EditStudentProfile = ({ onBack, onSave, userData }: EditStudentProfileProps) => {
  const [name, setName] = useState(userData.name);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Obter dados do usuário do localStorage
      const storedUserData = localStorage.getItem('userData');
      if (!storedUserData) {
        throw new Error('Dados do usuário não encontrados');
      }

      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData.id;

      // Fazer UPDATE no banco de dados
      const response = await fetch(`http://localhost:8081/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          nome: name,
          email: userData.email
        }),
      });

      if (response.ok) {
        // Atualizar localStorage com novos dados
        const updatedUserData = { ...parsedUserData, name };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        
        toast({
          title: 'Perfil atualizado',
          description: 'Suas informações foram salvas com sucesso.',
        });
        
        onSave({ name });
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast({
        title: 'Erro ao atualizar',
        description: error instanceof Error ? error.message : 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Editar Perfil do Estudante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={userData.email} disabled />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="ghost" onClick={onBack} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default EditStudentProfile;

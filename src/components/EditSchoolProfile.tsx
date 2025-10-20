import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Camera } from 'lucide-react';
import { Building } from 'lucide-react';

interface EditSchoolProfileProps {
  onBack: () => void;
  onSave: () => void;
  userData: { name: string; email: string };
}

const EditSchoolProfile = ({ onBack, onSave, userData }: EditSchoolProfileProps) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicionar lógica de validação e envio de dados aqui
    onSave();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoPreview(URL.createObjectURL(file));
      // Aqui você também pode adicionar a lógica para fazer o upload do arquivo
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Informações da Escola:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={photoPreview || undefined} alt="Foto da escola" />
              <AvatarFallback>
                <Building className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Label htmlFor="school-photo" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
                <Camera className="h-4 w-4 mr-2" />
                <span>Adicionar Foto</span>
              </Label>
              <Input id="school-photo" type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
              <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="school-name">Nome da Escola</Label>
            <Input id="school-name" defaultValue={userData.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school-email">Email de Contato</Label>
            <Input id="school-email" type="email" defaultValue={userData.email} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school-pais">País</Label>
              <Input id="school-pais" placeholder="Ex: Irlanda" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school-regiao">Região</Label>
              <Input id="school-regiao" placeholder="Ex: Dublin" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school-telefone">Telefone</Label>
              <Input id="school-telefone" type="tel" placeholder="+353 12 345 6789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school-website">Website</Label>
              <Input id="school-website" type="url" placeholder="https://suaescola.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="school-address">Endereço</Label>
            <Input id="school-address" placeholder="Ex: 123 Main St, Dublin" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school-description">Descrição</Label>
            <Textarea id="school-description" placeholder="Fale um pouco sobre a escola..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="ghost" onClick={onBack}>
            Cancelar
          </Button>
          <Button type="submit">Adicionar Intercâmbio</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default EditSchoolProfile;

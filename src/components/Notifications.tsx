import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface NotificationsProps {
  onBack: () => void;
}

const Notifications = ({ onBack }: NotificationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Notificações por Email</Label>
          <Switch id="email-notifications" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications">Notificações Push</Label>
          <Switch id="push-notifications" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="sms-notifications">Notificações por SMS</Label>
          <Switch id="sms-notifications" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="button" variant="ghost" onClick={onBack}>
          Voltar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Notifications;

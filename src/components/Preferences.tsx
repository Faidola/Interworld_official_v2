import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

interface PreferencesProps {
  onBack: () => void;
}

const Preferences = ({ onBack }: PreferencesProps) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preferences')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="language">{t('language')}</Label>
          <select
            id="language"
            className="border rounded-md p-2"
            value={i18n.language}
            onChange={handleLanguageChange}
          >
            <option value="pt">{t('portuguese')}</option>
            <option value="en">{t('english')}</option>
          </select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="button" variant="ghost" onClick={onBack}>
          {t('back')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Preferences;


import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
  showIndicator?: boolean;
}

interface PasswordRule {
  text: string;
  test: (password: string) => boolean;
}

const passwordRules: PasswordRule[] = [
  {
    text: "Pelo menos 8 caracteres",
    test: (password) => password.length >= 8
  },
  {
    text: "Uma letra minúscula",
    test: (password) => /[a-z]/.test(password)
  },
  {
    text: "Uma letra maiúscula",
    test: (password) => /[A-Z]/.test(password)
  },
  {
    text: "Um número",
    test: (password) => /\d/.test(password)
  },
  {
    text: "Um caractere especial (!@#$%^&*)",
    test: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }
];

export const getPasswordStrength = (password: string): { score: number; level: string; color: string } => {
  const passedRules = passwordRules.filter(rule => rule.test(password)).length;
  
  if (passedRules === 0) return { score: 0, level: "Muito fraca", color: "bg-red-500" };
  if (passedRules <= 2) return { score: 20, level: "Fraca", color: "bg-red-400" };
  if (passedRules <= 3) return { score: 40, level: "Razoável", color: "bg-yellow-500" };
  if (passedRules <= 4) return { score: 70, level: "Boa", color: "bg-blue-500" };
  return { score: 100, level: "Muito forte", color: "bg-green-500" };
};

export const isPasswordStrong = (password: string): boolean => {
  return passwordRules.every(rule => rule.test(password));
};

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ 
  password, 
  showIndicator = true 
}) => {
  const strength = getPasswordStrength(password);

  if (!showIndicator || !password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Barra de força */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${strength.score}%` }}
        />
      </div>
      
      {/* Nível da senha */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Força da senha:
        </span>
        <span className={`text-sm font-semibold ${
          strength.score >= 70 ? 'text-green-600' : 
          strength.score >= 40 ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {strength.level}
        </span>
      </div>

      {/* Requisitos */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-600 mb-1">Requisitos:</p>
        {passwordRules.map((rule, index) => {
          const isValid = rule.test(password);
          return (
            <div key={index} className="flex items-center space-x-2">
              {isValid ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <X className="h-3 w-3 text-red-400" />
              )}
              <span className={`text-xs ${
                isValid ? 'text-green-600' : 'text-gray-500'
              }`}>
                {rule.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;

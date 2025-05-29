
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface RegisterFormProps {
  onRegister: (userData: any) => void;
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onRegister, onSwitchToLogin }: RegisterFormProps) => {
  const [userType, setUserType] = useState<'normal' | 'business'>('normal');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    whatsapp: '',
    socialLink: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular registro
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        ...formData,
        type: userType
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      onRegister(userData);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Agora você pode criar seus CVs!",
      });
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Cadastrar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-x-2">
          <Button
            type="button"
            variant={userType === 'normal' ? 'default' : 'outline'}
            onClick={() => setUserType('normal')}
            size="sm"
          >
            Usuário Normal
          </Button>
          <Button
            type="button"
            variant={userType === 'business' ? 'default' : 'outline'}
            onClick={() => setUserType('business')}
            size="sm"
          >
            Negociante
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          {userType === 'business' && (
            <>
              <div>
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  placeholder="+258..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="socialLink">Link da Rede Social</Label>
                <Input
                  id="socialLink"
                  value={formData.socialLink}
                  onChange={(e) => setFormData({...formData, socialLink: e.target.value})}
                  placeholder="https://..."
                  required
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:underline"
            >
              Já tem conta? Faça login aqui
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Edit, Trash2, MessageSquare, BarChart, LogOut } from 'lucide-react';

const Perfil = () => {
  const [user, setUser] = useState<any>(null);
  const [cvs, setCvs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/auth');
      return;
    }
    
    setUser(JSON.parse(userData));
    
    // Carregar CVs salvos
    const savedCvs = localStorage.getItem('userCvs') || '[]';
    setCvs(JSON.parse(savedCvs));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDeleteCv = (cvId: string) => {
    const updatedCvs = cvs.filter(cv => cv.id !== cvId);
    setCvs(updatedCvs);
    localStorage.setItem('userCvs', JSON.stringify(updatedCvs));
  };

  const handleSupport = () => {
    window.open('https://api.whatsapp.com/send?phone=258841524822&text=Ol%C3%A1%2C%20preciso%20de%20suporte%20com%20meu%20perfil.', '_blank');
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações do Usuário */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Nome:</p>
                  <p className="text-gray-600">{user.name}</p>
                </div>
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div>
                  <p className="font-medium">Tipo de Conta:</p>
                  <p className="text-gray-600">{user.type === 'business' ? 'Negociante' : 'Usuário Normal'}</p>
                </div>
                
                {user.type === 'business' && (
                  <>
                    <div>
                      <p className="font-medium">Localização:</p>
                      <p className="text-gray-600">{user.location}</p>
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp:</p>
                      <p className="text-gray-600">{user.whatsapp}</p>
                    </div>
                    <div>
                      <p className="font-medium">Rede Social:</p>
                      <a href={user.socialLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        Ver Perfil
                      </a>
                    </div>
                  </>
                )}

                <div className="pt-4 space-y-2">
                  <Button onClick={handleSupport} className="w-full" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Suporte WhatsApp
                  </Button>
                  <Button onClick={() => navigate('/criar-cv')} className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Criar Novo CV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CVs do Usuário */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Meus CVs ({cvs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cvs.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">Você ainda não criou nenhum CV</p>
                    <Button onClick={() => navigate('/criar-cv')}>
                      Criar Primeiro CV
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cvs.map((cv, index) => (
                      <div key={cv.id || index} className="border rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">CV #{index + 1}</h3>
                          <p className="text-sm text-gray-600">
                            Criado em: {new Date(cv.createdAt || Date.now()).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            Ver
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteCv(cv.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="w-5 h-5 mr-2" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{cvs.length}</div>
                    <div className="text-sm text-gray-600">CVs Criados</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-gray-600">Downloads</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">0</div>
                    <div className="text-sm text-gray-600">Visualizações</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;

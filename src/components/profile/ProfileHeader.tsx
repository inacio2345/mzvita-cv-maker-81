
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Calendar, Mail } from 'lucide-react';
import { UserProfile } from '@/hooks/useUserProfile';

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditPhoto: () => void;
}

const ProfileHeader = ({ profile, onEditPhoto }: ProfileHeaderProps) => {
  return (
    <Card className="mb-6 md:mb-8">
      <CardContent className="p-4 md:p-8">
        <div className="flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg">
              <AvatarImage 
                src={profile.foto_perfil_url} 
                alt={profile.nome_completo} 
              />
              <AvatarFallback className="text-xl md:text-2xl bg-gradient-to-r from-google-blue to-google-green text-white">
                {profile.nome_completo?.charAt(0).toUpperCase() || profile.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 md:w-10 md:h-10 p-0"
              onClick={onEditPhoto}
            >
              <Camera className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {profile.nome_completo || 'Nome não informado'}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4">
              {profile.profissao || 'Profissão não informada'}
            </p>
            
            <div className="flex flex-col space-y-3 md:space-y-2 text-sm md:text-base text-gray-500">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{profile.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Membro desde {new Date(profile.data_criacao).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;

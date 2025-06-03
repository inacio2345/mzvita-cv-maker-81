
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Edit2 } from 'lucide-react';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import CVsSection from '@/components/profile/CVsSection';
import StatsSection from '@/components/profile/StatsSection';
import PreferencesSection from '@/components/profile/PreferencesSection';
import SecuritySection from '@/components/profile/SecuritySection';
import IntegrationsSection from '@/components/profile/IntegrationsSection';
import EditProfileModal from '@/components/profile/EditProfileModal';

const ProfessionalProfile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const [showEditModal, setShowEditModal] = useState(false);

  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <p className="text-gray-500">Carregando perfil...</p>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Edit Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Perfil Profissional
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Gerencie suas informações, CVs e configurações
              </p>
            </div>
            <Button
              onClick={() => setShowEditModal(true)}
              className="bg-google-blue hover:bg-blue-600 w-full sm:w-auto"
              size="sm"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          </div>

          {/* Profile Header */}
          <ProfileHeader 
            profile={profile} 
            onEditPhoto={() => setShowEditModal(true)} 
          />

          {/* Content Grid - Mobile First Responsive */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
            {/* Main Content - Full width on mobile, 2 columns on desktop */}
            <div className="xl:col-span-2 space-y-6 md:space-y-8">
              <CVsSection />
              <StatsSection profile={profile} />
            </div>

            {/* Sidebar - Full width on mobile, 1 column on desktop */}
            <div className="space-y-6 md:space-y-8">
              <PreferencesSection profile={profile} />
              <SecuritySection profile={profile} />
              <IntegrationsSection profile={profile} />
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profile={profile}
      />
    </div>
  );
};

export default ProfessionalProfile;

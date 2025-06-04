
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Camera, User } from 'lucide-react';

interface PhotoUploadFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const PhotoUploadForm = ({ data, onUpdate }: PhotoUploadFormProps) => {
  const [preview, setPreview] = useState<string | null>(data.personalData?.photo || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('A imagem deve ter no máximo 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        setPreview(photoUrl);
        onUpdate({
          personalData: {
            ...data.personalData,
            photo: photoUrl
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    onUpdate({
      personalData: {
        ...data.personalData,
        photo: null
      }
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6 sm:mb-8">
        <Camera className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-blue-600" />
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Adicionar Foto</h3>
        <p className="text-gray-600 text-sm sm:text-base px-2">
          Adicione uma foto profissional para dar um toque pessoal ao seu CV
        </p>
      </div>

      <Card className="p-4 sm:p-6 lg:p-8">
        <div className="text-center">
          {preview ? (
            <div className="relative inline-block">
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg overflow-hidden mx-auto mb-4 shadow-lg">
                <img
                  src={preview}
                  alt="Preview da foto"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemovePhoto}
                className="absolute -top-2 -right-2 rounded-full w-6 h-6 sm:w-8 sm:h-8 p-0"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          ) : (
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 border-2 border-dashed border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-xs sm:text-sm">Nenhuma foto selecionada</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Button
              onClick={triggerFileInput}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
              size="default"
            >
              <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {preview ? 'Alterar Foto' : 'Selecionar Foto'}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              <p className="mb-2 font-medium">Dicas para uma boa foto:</p>
              <ul className="text-left space-y-1 pl-4">
                <li>• Use uma foto recente e profissional</li>
                <li>• Prefira fundos neutros ou claros</li>
                <li>• Certifique-se de que o rosto está bem iluminado</li>
                <li>• Formato recomendado: JPG ou PNG</li>
                <li>• Tamanho máximo: 5MB</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <div className="flex items-start">
          <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1 text-sm sm:text-base">Opcional mas Recomendado</h4>
            <p className="text-xs sm:text-sm text-blue-700">
              Adicionar uma foto profissional aumenta significativamente suas chances de ser notado pelos recrutadores. 
              A foto será automaticamente posicionada no local correto do template escolhido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadForm;

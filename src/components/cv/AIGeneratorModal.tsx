import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';

export type AIFieldType = 'about' | 'experience' | 'education' | 'skills' | 'general';

interface AIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (text: string) => void;
  fieldType: AIFieldType;
  initialDraft?: string;
}

const fieldTypeLabels: Record<AIFieldType, string> = {
  about: 'Resumo Profissional',
  experience: 'Experiência Profissional',
  education: 'Formação Académica',
  skills: 'Habilidades',
  general: 'Texto Geral'
};

export const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({
  isOpen,
  onClose,
  onApply,
  fieldType,
  initialDraft = ''
}) => {
  const [prompt, setPrompt] = useState(initialDraft);
  const [tone, setTone] = useState('Profissional e Objetivo');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync initial draft when modal opens
  useEffect(() => {
    if (isOpen) {
      setPrompt(initialDraft);
      setGeneratedText('');
    }
  }, [isOpen, initialDraft]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Escreva um rascunho ou ideia primeiro.');
      return;
    }

    setIsLoading(true);
    setGeneratedText('');

    try {
      const { data, error } = await supabase.functions.invoke('generate-cv-text', {
        body: { prompt, tone, fieldType }
      });

      if (error) {
        throw new Error(error.message || 'Erro ao comunicar com o assistente.');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setGeneratedText(data.text);
    } catch (err: any) {
      console.error('AI Gen error:', err);
      toast.error(err.message || 'Falha ao gerar o texto. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    onApply(generatedText);
    onClose();
    toast.success('Texto aplicado ao CV com sucesso!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] w-[95%] p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-indigo-600">
            <Sparkles className="w-5 h-5" />
            Assistente IA - {fieldTypeLabels[fieldType]}
          </DialogTitle>
          <DialogDescription>
            Deixe a Inteligência Artificial transformar as suas ideias num texto profissional e polido.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <Label>O que quer dizer? (Rascunho)</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: trabalhei 5 anos como gestor, fazia relatórios e ajudava a equipa..."
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Tom do Texto</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha um tom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Profissional e Objetivo">Profissional e Objetivo</SelectItem>
                <SelectItem value="Executivo e Liderança">Executivo e Liderança</SelectItem>
                <SelectItem value="Criativo e Dinâmico">Criativo e Dinâmico</SelectItem>
                <SelectItem value="Técnico e Analítico">Técnico e Analítico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                A Gerar Texto Mágico...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                {generatedText ? 'Gerar Novamente' : 'Escrever com IA'}
              </>
            )}
          </Button>

          {generatedText && (
            <div className="flex flex-col gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Label className="text-emerald-600 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Resultado Final
              </Label>
              <Textarea
                value={generatedText}
                onChange={(e) => setGeneratedText(e.target.value)}
                className="min-h-[120px] border-emerald-200 bg-emerald-50/30 focus-visible:ring-emerald-500"
              />
              <p className="text-[10px] text-slate-500 text-right">
                Pode editar o resultado final acima antes de aplicar.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="mt-2 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button 
            onClick={handleApply} 
            disabled={!generatedText.trim()}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
          >
            Aplicar ao Currículo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

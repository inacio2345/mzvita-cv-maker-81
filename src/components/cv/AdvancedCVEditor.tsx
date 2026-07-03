import React from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Eye, EyeOff, RotateCcw, Save, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTranslatedTitles } from '@/services/translationService';
import { aiService } from '@/services/aiService';
import { useSubscription } from '@/hooks/useSubscription';
import { CVData } from '@/services/cvService';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { LayoutConfig } from '@/services/cvService';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

interface FontConfig {
  primary: string;
  headings: string;
}

interface AdvancedCVEditorProps {
  layoutConfig: LayoutConfig;
  colors?: ColorPalette;
  fonts?: FontConfig;
  onReorderSections: (newOrder: string[]) => void;
  onToggleVisibility: (sectionId: string) => void;
  onUpdateStyle: (type: 'colors' | 'fonts' | 'spacing' | 'sectionTitles', value: any) => void;
  onReset: () => void;
  onSave: () => void;
  isDirty?: boolean;
  cvData: CVData;
  onUpdateCVData: (updates: Partial<CVData>) => void;
}

const SECTION_LABELS: Record<string, string> = {
  header: 'Cabeçalho',
  about: 'Perfil',
  experience: 'Experiência',
  education: 'Formação',
  skills: 'Habilidades',
  languages: 'Idiomas',
  references: 'Referências',
};

const AVAILABLE_FONTS = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Merriweather', label: 'Merriweather' },
  { value: 'Playfair Display', label: 'Playfair' },
];

const RibbonDivider = () => (
  <div className="self-stretch w-px bg-slate-200 mx-1 shrink-0" />
);

const RibbonGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1 shrink-0">
    <div className="flex items-start gap-1.5 flex-1">
      {children}
    </div>
    <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 text-center select-none">
      {label}
    </span>
  </div>
);

const AdvancedCVEditor = ({
  layoutConfig,
  colors = { primary: '#000000', secondary: '#666666', accent: '#000000', text: '#333333', background: '#ffffff' },
  fonts = { primary: 'Times New Roman', headings: 'Times New Roman' },
  onReorderSections,
  onToggleVisibility,
  onUpdateStyle,
  onReset,
  onSave,
  isDirty = false,
  cvData,
  onUpdateCVData,
}: AdvancedCVEditorProps) => {
  const { toast } = useToast();
  const { isPremiumActive } = useSubscription();
  const [isTranslating, setIsTranslating] = React.useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleSave = () => {
    onSave();
    toast({ title: 'Alterações salvas!', description: 'Seu progresso foi salvo.' });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = layoutConfig.sectionsOrder.indexOf(active.id as string);
      const newIndex = layoutConfig.sectionsOrder.indexOf(over.id as string);
      onReorderSections(arrayMove(layoutConfig.sectionsOrder, oldIndex, newIndex));
    }
  };

  const handleAITranslate = async () => {
    if (!isPremiumActive) {
      toast({
        title: 'Funcionalidade Premium',
        description: 'A tradução automática é exclusiva dos planos Mensal e Anual.',
      });
      return;
    }
    try {
      setIsTranslating(true);
      toast({ title: 'A traduzir CV...', description: 'Aguarde alguns segundos.' });
      const translatedData = await aiService.translateCV(cvData);
      onUpdateStyle('sectionTitles', getTranslatedTitles('en'));
      onUpdateCVData(translatedData);
      toast({ title: 'Tradução concluída!', description: 'Currículo traduzido com sucesso.' });
    } catch (error: any) {
      toast({ title: 'Erro na tradução', description: error.message, variant: 'destructive' });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleAddCustomSection = () => {
    const newSection = {
      id: `custom-${Date.now()}`,
      title: 'Nova Secção',
      items: [{ id: Date.now().toString(), title: 'Item de Exemplo', description: '' }],
    };
    onUpdateCVData({ customSections: [...(cvData.customSections || []), newSection] });
    toast({ title: 'Secção adicionada!', description: 'Edite o título directamente no CV.' });
  };

  return (
    <div className="w-full bg-white border-b print:hidden" style={{ height: '110px', minHeight: '110px', maxHeight: '110px' }}>
      {/* Single compact ribbon row — overflow-x-scroll keeps scrollbar space reserved, preventing layout shift */}
      <div
        className="flex items-center gap-0 px-3"
        style={{ height: '110px', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}
      >

        {/* GROUP: Secções */}
        <RibbonGroup label="Secções">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={layoutConfig.sectionsOrder} strategy={rectSortingStrategy}>
              <div className="flex flex-row gap-1.5 items-center flex-nowrap">
                {layoutConfig.sectionsOrder.map((sectionId) => (
                  <SectionPill
                    key={sectionId}
                    id={sectionId}
                    label={SECTION_LABELS[sectionId] || sectionId}
                    isHidden={layoutConfig.hiddenSections.includes(sectionId)}
                    onToggleVisibility={() => onToggleVisibility(sectionId)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <button
            onClick={handleAddCustomSection}
            title="Adicionar Secção"
            className="h-7 w-7 shrink-0 flex items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors text-base leading-none"
          >
            +
          </button>
        </RibbonGroup>

        <RibbonDivider />

        {/* GROUP: Cores */}
        <RibbonGroup label="Cores">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <div className="relative shrink-0" title="Cor Primária">
                <input
                  type="color"
                  value={colors.primary}
                  onChange={(e) => onUpdateStyle('colors', { ...colors, primary: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 p-0.5"
                  style={{ WebkitAppearance: 'none' }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-slate-600 leading-none">Primária</span>
                <span className="text-[9px] text-slate-400 font-mono">{colors.primary}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="relative shrink-0" title="Cor Secundária">
                <input
                  type="color"
                  value={colors.secondary}
                  onChange={(e) => onUpdateStyle('colors', { ...colors, secondary: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 p-0.5"
                  style={{ WebkitAppearance: 'none' }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-slate-600 leading-none">Secundária</span>
                <span className="text-[9px] text-slate-400 font-mono">{colors.secondary}</span>
              </div>
            </div>
          </div>
        </RibbonGroup>

        <RibbonDivider />

        {/* GROUP: Tipografia */}
        <RibbonGroup label="Tipografia">
          <div className="flex flex-col gap-1 w-36">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase w-10 shrink-0">Títulos</span>
              <Select
                value={fonts.headings}
                onValueChange={(value) => onUpdateStyle('fonts', { ...fonts, headings: value })}
              >
                <SelectTrigger className="h-7 text-[11px] bg-slate-50 border-slate-200 px-2 flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_FONTS.map((font) => (
                    <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase w-10 shrink-0">Texto</span>
              <Select
                value={fonts.primary}
                onValueChange={(value) => onUpdateStyle('fonts', { ...fonts, primary: value })}
              >
                <SelectTrigger className="h-7 text-[11px] bg-slate-50 border-slate-200 px-2 flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_FONTS.map((font) => (
                    <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </RibbonGroup>

        <RibbonDivider />

        {/* GROUP: Tamanho do texto */}
        <RibbonGroup label="Texto">
          <div className="flex flex-col items-center gap-1 w-24">
            <div className="flex items-center justify-between w-full">
              <span className="text-[9px] text-slate-500">Tam.</span>
              <span className="text-[10px] font-mono font-bold text-slate-700">
                {Math.round((layoutConfig.spacing?.fontSize || 1) * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={70}
              max={130}
              step={1}
              value={(layoutConfig.spacing?.fontSize || 1) * 100}
              onChange={(e) =>
                onUpdateStyle('spacing', { ...layoutConfig.spacing, fontSize: Number(e.target.value) / 100 })
              }
              className="w-full h-1.5 accent-blue-500 cursor-pointer"
            />
            <div className="flex items-center justify-between w-full">
              <span className="text-[9px] text-slate-500">Espaç.</span>
              <span className="text-[10px] font-mono font-bold text-slate-700">
                {layoutConfig.spacing?.sectionSpacing === 'compact' ? 'Comp.' :
                 layoutConfig.spacing?.sectionSpacing === 'wide' ? 'Amplo' : 'Normal'}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={50}
              value={layoutConfig.spacing?.sectionSpacing === 'compact' ? 0 : layoutConfig.spacing?.sectionSpacing === 'wide' ? 100 : 50}
              onChange={(e) => {
                const v = Number(e.target.value);
                onUpdateStyle('spacing', { ...layoutConfig.spacing, sectionSpacing: v === 0 ? 'compact' : v === 100 ? 'wide' : 'normal' });
              }}
              className="w-full h-1.5 accent-blue-500 cursor-pointer"
            />
          </div>
        </RibbonGroup>

        <RibbonDivider />

        {/* GROUP: Idioma */}
        <RibbonGroup label="Idioma">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <button
                onClick={() => onUpdateStyle('sectionTitles', getTranslatedTitles('pt'))}
                className="text-lg leading-none hover:scale-110 transition-transform" title="Português"
              >🇵🇹</button>
              <button
                onClick={() => onUpdateStyle('sectionTitles', getTranslatedTitles('en'))}
                className="text-lg leading-none hover:scale-110 transition-transform" title="English"
              >🇺🇸</button>
            </div>
            <button
              onClick={handleAITranslate}
              disabled={isTranslating}
              className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50 whitespace-nowrap"
              title="Traduzir CV inteiro com IA"
            >
              {isTranslating
                ? <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                : <Sparkles className="w-3 h-3" />}
              IA
            </button>
          </div>
        </RibbonGroup>

        <RibbonDivider />

        {/* GROUP: Acções */}
        <RibbonGroup label="Acções">
          <div className="flex flex-col gap-1">
            <Button
              size="sm"
              onClick={handleSave}
              className="h-7 px-3 text-[11px] bg-blue-600 hover:bg-blue-700 text-white font-bold"
            >
              <Save className="w-3 h-3 mr-1" />
              Salvar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-7 px-3 text-[11px] text-slate-500 hover:text-slate-800"
              title="Restaurar Padrões"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>
        </RibbonGroup>

      </div>
    </div>
  );
};

// Compact pill for drag-and-drop section reordering
interface SectionPillProps {
  id: string;
  label: string;
  isHidden: boolean;
  onToggleVisibility: () => void;
}

const SectionPill = ({ id, label, isHidden, onToggleVisibility }: SectionPillProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-semibold select-none shrink-0 transition-all',
        isDragging
          ? 'shadow-lg border-blue-400 bg-blue-50 text-blue-700 scale-105 z-50'
          : isHidden
          ? 'border-dashed border-slate-300 bg-slate-50 text-slate-400'
          : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50'
      )}
    >
      <button
        className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-blue-400 transition-colors"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-3 h-3" />
      </button>
      <span className={cn('whitespace-nowrap', isHidden && 'line-through')}>{label}</span>
      <button
        onClick={onToggleVisibility}
        className="text-slate-300 hover:text-blue-500 transition-colors"
      >
        {isHidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
      </button>
    </div>
  );
};

export default AdvancedCVEditor;

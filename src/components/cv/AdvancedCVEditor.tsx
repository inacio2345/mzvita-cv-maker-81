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
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Eye, EyeOff, RotateCcw, Save, Layers, Palette, LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
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
  onUpdateStyle: (type: 'colors' | 'fonts' | 'spacing', value: any) => void;
  onReset: () => void;
  onSave: () => void;
  isDirty?: boolean;
}

const SECTION_LABELS: Record<string, string> = {
  header: 'Cabeçalho',
  about: 'Perfil / Sobre Mim',
  experience: 'Experiência Profissional',
  education: 'Formação Académica',
  skills: 'Habilidades Técnicas',
  languages: 'Idiomas',
  references: 'Referências',
};

const AVAILABLE_FONTS = [
  { value: 'Inter', label: 'Inter (Moderno)' },
  { value: 'Roboto', label: 'Roboto (Padrão)' },
  { value: 'Open Sans', label: 'Open Sans (Limpo)' },
  { value: 'Lato', label: 'Lato (Equilibrado)' },
  { value: 'Poppins', label: 'Poppins (Geométrico)' },
  { value: 'Merriweather', label: 'Merriweather (Serifado)' },
  { value: 'Playfair Display', label: 'Playfair (Elegante)' },
];

const AdvancedCVEditor = ({
  layoutConfig,
  colors = { primary: '#000000', secondary: '#666666', accent: '#000000', text: '#333333', background: '#ffffff' },
  fonts = { primary: 'Inter', headings: 'Poppins' },
  onReorderSections,
  onToggleVisibility,
  onUpdateStyle,
  onReset,
  onSave,
  isDirty = false,
}: AdvancedCVEditorProps) => {
  const { toast } = useToast();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleSave = () => {
    onSave();
    toast({
      title: "Alterações salvas!",
      description: "Seu progresso foi salvo com sucesso.",
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = layoutConfig.sectionsOrder.indexOf(active.id as string);
      const newIndex = layoutConfig.sectionsOrder.indexOf(over.id as string);
      const newOrder = arrayMove(layoutConfig.sectionsOrder, oldIndex, newIndex);
      onReorderSections(newOrder);
    }
  };

  const visibleSections = layoutConfig.sectionsOrder.filter(
    s => !layoutConfig.hiddenSections.includes(s)
  );
  const hiddenSections = layoutConfig.sectionsOrder.filter(
    s => layoutConfig.hiddenSections.includes(s)
  );

  return (
    <Card className="p-0 bg-white border-0 shadow-lg h-full flex flex-col print:hidden">
      {/* Header Fixo */}
      <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-google-blue" />
          <h3 className="font-semibold text-lg text-slate-800">Editor</h3>
          {isDirty && (
            <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
              Não salvo
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-slate-500 hover:text-slate-700 h-8"
            title="Restaurar Padrões"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-google-blue hover:bg-blue-600 h-8 font-medium text-white"
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Salvar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="structure" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-2 bg-slate-50/50 border-b">
          <TabsList className="w-full grid grid-cols-2 bg-slate-200/50">
            <TabsTrigger value="structure" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Estrutura
            </TabsTrigger>
            <TabsTrigger value="style" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Palette className="w-4 h-4 mr-2" />
              Estilo
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Estrutura */}
        <TabsContent value="structure" className="flex-1 overflow-y-auto p-4 m-0 space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-700 mb-4">
            Arraste os blocos para reordenar as seções do seu currículo.
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={layoutConfig.sectionsOrder}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {layoutConfig.sectionsOrder.map((sectionId) => (
                  <SectionItem
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

          {hiddenSections.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="text-sm text-slate-500">
                <p className="mb-2 font-medium">Ocultos no Currículo:</p>
                <div className="flex flex-wrap gap-2">
                  {hiddenSections.map(s => (
                    <Badge key={s} variant="outline" className="text-xs bg-slate-50 text-slate-500">
                      {SECTION_LABELS[s] || s}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </TabsContent>

        {/* Tab Estilo */}
        <TabsContent value="style" className="flex-1 overflow-y-auto p-4 m-0 space-y-6">
          {/* Cores */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-slate-900 border-b pb-2">Cores do Tema</h4>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <div className="relative">
                  <Input
                    type="color"
                    value={colors.primary}
                    onChange={(e) => onUpdateStyle('colors', { ...colors, primary: e.target.value })}
                    className="w-10 h-10 p-1 rounded cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium">Cor Primária</Label>
                  <p className="text-xs text-slate-500">Títulos, destaques e barras laterais</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <div className="relative">
                  <Input
                    type="color"
                    value={colors.secondary}
                    onChange={(e) => onUpdateStyle('colors', { ...colors, secondary: e.target.value })}
                    className="w-10 h-10 p-1 rounded cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium">Cor Secundária</Label>
                  <p className="text-xs text-slate-500">Subtítulos e elementos menores</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Tipografia */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-slate-900 border-b pb-2">Tipografia</h4>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Fonte dos Títulos</Label>
                <Select
                  value={fonts.headings}
                  onValueChange={(value) => onUpdateStyle('fonts', { ...fonts, headings: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Selecione uma fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_FONTS.map(font => (
                      <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Fonte do Texto</Label>
                <Select
                  value={fonts.primary}
                  onValueChange={(value) => onUpdateStyle('fonts', { ...fonts, primary: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Selecione uma fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_FONTS.map(font => (
                      <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Espaçamento */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-semibold text-sm text-slate-900">Configurações de Layout</h4>
              <Badge variant="outline" className="text-[10px]">Em breve</Badge>
            </div>

            <div className="space-y-4 opacity-50 pointer-events-none filter grayscale">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-xs">Margens</Label>
                  <span className="text-xs text-slate-500">Padrão</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-xs">Espaçamento entre seções</Label>
                  <span className="text-xs text-slate-500">Médio</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </div>
            <p className="text-[10px] text-center text-slate-400">
              Controles de espaçamento estarão disponíveis na próxima atualização.
            </p>
          </div>

        </TabsContent>
      </Tabs>
    </Card>
  );
};

// Sub-component for sortable section items
interface SectionItemProps {
  id: string;
  label: string;
  isHidden: boolean;
  onToggleVisibility: () => void;
}

const SectionItem = ({ id, label, isHidden, onToggleVisibility }: SectionItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 shadow-sm transition-all hover:border-blue-200 group",
        isDragging && "shadow-xl z-50 opacity-90 scale-105 border-blue-400 bg-blue-50",
        isHidden && "opacity-60 bg-slate-50 border-dashed"
      )}
    >
      <button
        className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-blue-500 p-1 -ml-1 rounded transition-colors"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <span className={cn(
        "flex-1 font-medium text-sm text-slate-700",
        isHidden && "line-through text-slate-400"
      )}>
        {label}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 hover:bg-slate-100"
        onClick={onToggleVisibility}
      >
        {isHidden ? (
          <EyeOff className="w-4 h-4 text-slate-400" />
        ) : (
          <Eye className="w-4 h-4 text-google-blue" />
        )}
      </Button>
    </div>
  );
};

export default AdvancedCVEditor;

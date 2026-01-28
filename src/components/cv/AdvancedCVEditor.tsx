
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
import { Eye, EyeOff, RotateCcw, Save, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LayoutConfig, DEFAULT_SECTIONS_ORDER } from '@/services/cvService';
import { cn } from '@/lib/utils';

interface AdvancedCVEditorProps {
  layoutConfig: LayoutConfig;
  onReorderSections: (newOrder: string[]) => void;
  onToggleVisibility: (sectionId: string) => void;
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

const AdvancedCVEditor = ({
  layoutConfig,
  onReorderSections,
  onToggleVisibility,
  onReset,
  onSave,
  isDirty = false,
}: AdvancedCVEditorProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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
    <Card className="p-4 bg-muted/50 print:hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Editor de Blocos</h3>
          {isDirty && (
            <Badge variant="secondary" className="text-xs">
              Alterações não salvas
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-muted-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Restaurar
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            disabled={!isDirty}
          >
            <Save className="w-4 h-4 mr-1" />
            Salvar
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Arraste as seções para reordenar. Clique no ícone do olho para ocultar/mostrar.
      </p>

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
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">Seções ocultas: {hiddenSections.length}</p>
            <div className="flex flex-wrap gap-2">
              {hiddenSections.map(s => (
                <Badge key={s} variant="outline" className="text-xs">
                  {SECTION_LABELS[s] || s}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

// Sub-component for sortable section items
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

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
        "flex items-center gap-3 p-3 bg-background rounded-lg border",
        isDragging && "shadow-lg z-50 opacity-90",
        isHidden && "opacity-50"
      )}
    >
      <button
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <span className={cn("flex-1 font-medium", isHidden && "line-through")}>
        {label}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onToggleVisibility}
      >
        {isHidden ? (
          <EyeOff className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Eye className="w-4 h-4 text-primary" />
        )}
      </Button>
    </div>
  );
};

export default AdvancedCVEditor;

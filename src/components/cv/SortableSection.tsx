
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SortableSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isHidden?: boolean;
  isAdvancedMode?: boolean;
  onToggleVisibility?: () => void;
  className?: string;
}

const SortableSection = ({
  id,
  title,
  children,
  isHidden = false,
  isAdvancedMode = false,
  onToggleVisibility,
  className
}: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id, disabled: !isAdvancedMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (!isAdvancedMode) {
    // Simple mode - just render children
    return (
      <div className={cn("cv-section", className, isHidden && "hidden")}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "cv-section relative group",
        isAdvancedMode && "border-2 border-dashed border-transparent hover:border-primary/30 rounded-lg transition-all",
        isDragging && "z-50 shadow-lg",
        isHidden && "opacity-40",
        className
      )}
    >
      {/* Section controls */}
      <div className={cn(
        "absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
        "print:hidden"
      )}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-grab active:cursor-grabbing bg-white shadow-sm border"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </Button>
        
        {onToggleVisibility && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm border"
            onClick={onToggleVisibility}
          >
            {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Section label */}
      <div className={cn(
        "absolute -top-3 left-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity",
        "print:hidden"
      )}>
        {title}
      </div>

      {children}
    </div>
  );
};

export default SortableSection;

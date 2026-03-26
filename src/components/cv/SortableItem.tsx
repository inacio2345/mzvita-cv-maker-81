
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  isAdvancedMode?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

const SortableItem = ({
  id,
  children,
  isAdvancedMode = false,
  onEdit,
  onDelete,
  className
}: SortableItemProps) => {
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
    return <div className={cn("cv-item", className)}>{children}</div>;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "cv-item relative group",
        isAdvancedMode && "border border-dashed border-transparent hover:border-primary/20 rounded transition-all",
        isDragging && "z-50 shadow-md",
        className
      )}
    >
      {/* Item controls */}
      <div className={cn(
        "absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
        "print:hidden"
      )}>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 cursor-grab active:cursor-grabbing bg-white shadow-sm border"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-3 w-3" />
        </Button>
        
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-white shadow-sm border"
            onClick={onEdit}
          >
            <Pencil className="h-3 w-3" />
          </Button>
        )}
        
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-white shadow-sm border text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>

      {children}
    </div>
  );
};

export default SortableItem;

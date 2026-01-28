
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  isAdvancedMode?: boolean;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

const InlineEdit = ({
  value,
  onSave,
  multiline = false,
  className,
  placeholder = 'Clique para editar...',
  isAdvancedMode = false,
  as: Component = 'span'
}: InlineEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isAdvancedMode) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onSave(editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (!isAdvancedMode) {
    return <Component className={className}>{value || placeholder}</Component>;
  }

  if (isEditing) {
    if (multiline) {
      return (
        <Textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn(
            "min-h-[60px] resize-none bg-white/90 border-primary",
            className
          )}
          placeholder={placeholder}
        />
      );
    }

    return (
      <Input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          "h-auto py-1 bg-white/90 border-primary",
          className
        )}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Component
      onClick={handleClick}
      className={cn(
        className,
        "cursor-pointer hover:bg-primary/10 rounded px-1 -mx-1 transition-colors",
        !value && "text-muted-foreground italic"
      )}
    >
      {value || placeholder}
    </Component>
  );
};

export default InlineEdit;

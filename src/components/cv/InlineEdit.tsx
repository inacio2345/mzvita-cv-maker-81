
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  isAdvancedMode?: boolean;
  maxLength?: number;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

const InlineEdit = ({
  value,
  onSave,
  multiline = false,
  className,
  placeholder = 'Clique para editar...',
  isAdvancedMode = false,
  maxLength,
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
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      if (maxLength && val.length > maxLength) return;
      setEditValue(val);
    };

    const charCount = editValue.length;
    const WrapperElement = (Component === 'span' || Component === 'p') ? 'span' : 'div';

    return (
      <WrapperElement className="relative w-full block">
        {multiline ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn(
              "min-h-[80px] resize-none bg-white/90 border-primary shadow-sm focus:ring-2 focus:ring-primary text-base",
              className
            )}
            placeholder={placeholder}
            style={{ fontSize: '16px' }}
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={editValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn(
              "h-auto min-h-[44px] py-2 bg-white/90 border-primary shadow-sm focus:ring-2 focus:ring-primary text-base",
              className
            )}
            placeholder={placeholder}
            style={{ fontSize: '16px' }}
          />
        )}
        {maxLength && (
          <span className={`absolute right-1 -bottom-4 text-[10px] font-medium ${charCount >= maxLength ? 'text-red-500' : 'text-slate-400'}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </WrapperElement>
    );
  }

  const WrapperElement = (Component === 'span' || Component === 'p') ? 'span' : 'div';

  return (
    <WrapperElement className="group relative inline-block w-full">
      <Component
        onClick={handleClick}
        className={cn(
          className,
          "cursor-pointer rounded px-1 -mx-1 transition-all duration-200 border-b border-dashed border-transparent",
          "hover:bg-black/5 hover:border-black/20",
          "active:bg-black/10 active:scale-[0.99]",
          "min-h-[32px] inline-flex items-center relative",
          !value && "text-muted-foreground italic bg-yellow-50/50 border-yellow-200"
        )}
      >
        {value || placeholder}
        {isAdvancedMode && (
          <span className="inline-flex ml-2 opacity-40 group-hover:opacity-100 sm:opacity-0 transition-opacity">
            <Pencil className="w-3 h-3 text-slate-400" />
          </span>
        )}
      </Component>
    </WrapperElement>
  );
};

export default InlineEdit;

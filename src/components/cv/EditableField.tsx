
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Check, X, Plus } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
  showAddButton?: boolean;
  onAdd?: () => void;
  addButtonText?: string;
}

const EditableField = ({ 
  value, 
  onSave, 
  placeholder = "Clique para editar...", 
  className = "",
  multiline = false,
  showAddButton = false,
  onAdd,
  addButtonText = "Adicionar"
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (multiline) {
        (inputRef.current as HTMLTextAreaElement).select();
      } else {
        (inputRef.current as HTMLInputElement).select();
      }
    }
  }, [isEditing, multiline]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className={`relative ${className}`}>
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border border-blue-300 rounded resize-none min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
          />
        )}
        
        <div className="flex gap-1 mt-2">
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Check className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`cursor-pointer transition-all duration-200 ${
          !value ? 'text-gray-400 italic' : ''
        } ${isHovered ? 'bg-blue-50 rounded p-1' : ''} print:bg-transparent`}
        onClick={handleEdit}
      >
        {value || placeholder}
      </div>
      
      {(isHovered || !value) && (
        <div className="absolute -top-2 -right-2 print:hidden">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleEdit}
            className="w-6 h-6 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          >
            <Pencil className="w-3 h-3" />
          </Button>
        </div>
      )}
      
      {showAddButton && onAdd && (
        <div className="mt-2 print:hidden">
          <Button
            size="sm"
            variant="outline"
            onClick={onAdd}
            className="border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Plus className="w-3 h-3 mr-1" />
            {addButtonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditableField;

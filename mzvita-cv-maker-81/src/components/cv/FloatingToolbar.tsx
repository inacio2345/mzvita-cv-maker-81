import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  Palette, 
  ChevronDown, 
  X,
  Type as FontIcon,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface FloatingToolbarProps {
  position: { x: number, y: number };
  onClose: () => void;
  onStyleChange: (style: any) => void;
  activeElement: {
    type: 'text' | 'container' | 'photo';
    id: string;
    currentStyle?: any;
  };
}

const CV_FONTS = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Outfit', value: 'Outfit, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Playfair Display', value: 'Playfair Display, serif' },
  { name: 'Merriweather', value: 'Merriweather, serif' },
  { name: 'Nunito', value: 'Nunito, sans-serif' },
];

const PRESET_COLORS = [
  '#000000', '#ffffff', '#4285f4', '#34a853', '#fbbc04', '#ea4335',
  '#1e293b', '#64748b', '#7c3aed', '#db2777', '#2563eb', '#059669'
];

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ 
  position, 
  onClose, 
  onStyleChange,
  activeElement
}) => {
  return (
    <div 
      className="fixed z-[9999] flex items-center gap-1 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-blue-100/50 animate-in fade-in zoom-in duration-200"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y - 60}px`,
        transform: 'translateX(-50%)' 
      }}
    >
      {/* Type-specific controls */}
      {activeElement.type === 'text' && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 px-3 gap-2 hover:bg-slate-100 rounded-xl">
                <FontIcon className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-bold text-slate-700 truncate max-w-[80px]">
                  {activeElement.currentStyle?.fontFamily?.split(',')[0] || 'Inter'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto rounded-2xl p-2 shadow-2xl border-blue-50 custom-scrollbar">
              <div className="grid grid-cols-1 gap-1">
                {CV_FONTS.map((font) => (
                  <DropdownMenuItem 
                    key={font.name}
                    className="flex justify-between items-center px-4 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 group"
                    onClick={() => onStyleChange({ fontFamily: font.value })}
                  >
                    <span style={{ fontFamily: font.value }} className="text-sm">
                      {font.name}
                    </span>
                    {activeElement.currentStyle?.fontFamily === font.value && (
                      <div className="w-1.5 h-1.5 rounded-full bg-google-blue" />
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-[1px] h-6 bg-slate-100 mx-1" />
        </>
      )}

      {/* Common: Color Picker */}
      {(activeElement.type === 'text' || activeElement.type === 'container') && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-slate-100 rounded-xl relative">
              <Palette className="w-4 h-4 text-slate-600" />
              <div 
                className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: activeElement.currentStyle?.color || activeElement.currentStyle?.backgroundColor || '#000000' }}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 rounded-2xl p-3 shadow-2xl border-blue-50">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Cores Sugeridas</h4>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  className={cn(
                    "w-8 h-8 rounded-lg border-2 border-transparent transition-all hover:scale-110 active:scale-95",
                    (activeElement.currentStyle?.color === color || activeElement.currentStyle?.backgroundColor === color) && "border-google-blue"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => onStyleChange({ 
                    [activeElement.type === 'text' ? 'color' : 'backgroundColor']: color 
                  })}
                />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Photo CRUD */}
      {activeElement.type === 'photo' && (
        <>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 px-3 gap-2 hover:bg-red-50 text-red-500 rounded-xl"
            onClick={() => onStyleChange({ action: 'delete' })}
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-xs font-bold">Apagar Foto</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 px-3 gap-2 hover:bg-slate-100 text-slate-600 rounded-xl"
            onClick={() => onStyleChange({ action: 'toggleVisibility' })}
          >
            <ImageIcon className="w-4 h-4" />
            <span className="text-xs font-bold">
              {activeElement.currentStyle?.visible ? 'Ocultar' : 'Mostrar'}
            </span>
          </Button>
        </>
      )}

      <div className="w-[1px] h-6 bg-slate-100 mx-1" />

      <Button 
        variant="ghost" 
        size="sm" 
        className="h-9 w-9 p-0 hover:bg-slate-100 rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onClose();
        }}
      >
        <X className="w-4 h-4 text-slate-400" />
      </Button>
    </div>
  );
};

export default FloatingToolbar;

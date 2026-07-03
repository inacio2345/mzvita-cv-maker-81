import React from 'react';
import { CVData, LayoutConfig } from '@/services/cvService';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus, Trash2, Palette, Type, AlertCircle, Sparkles } from 'lucide-react';
import { AIGeneratorModal, AIFieldType } from './AIGeneratorModal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AVAILABLE_FONTS = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Merriweather', label: 'Merriweather' },
  { value: 'Playfair Display', label: 'Playfair' },
];

interface CVFormEditorProps {
  cvData: CVData;
  onUpdateCVData: (updates: Partial<CVData>) => void;
  colors?: { primary: string; secondary: string; accent: string; text: string; background: string };
  fonts?: { primary: string; headings: string };
  layoutConfig?: LayoutConfig;
  onUpdateStyle?: (type: 'colors' | 'fonts' | 'spacing' | 'sectionTitles', value: any) => void;
}

const LimitInput = ({ value, onChange, maxLength, placeholder, className, ...props }: any) => {
  const len = (value || '').length;
  const isNear = len >= maxLength * 0.9;
  const isMax = len >= maxLength;
  
  return (
    <div className="flex flex-col w-full">
      <Input
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className={cn(className, isMax && "border-red-500 focus-visible:ring-red-500")}
        {...props}
      />
      <div className={cn(
        "text-[10px] text-right font-medium transition-colors mt-0.5",
        isMax ? "text-red-500 font-bold" : isNear ? "text-amber-500" : "text-slate-400"
      )}>
        {len} / {maxLength}
      </div>
    </div>
  );
};

const LimitTextarea = ({ value, onChange, maxLength, placeholder, className, ...props }: any) => {
  const len = (value || '').length;
  const isNear = len >= maxLength * 0.9;
  const isMax = len >= maxLength;
  
  return (
    <div className="flex flex-col w-full">
      <Textarea
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className={cn(className, isMax && "border-red-500 focus-visible:ring-red-500")}
        {...props}
      />
      <div className={cn(
        "text-[10px] text-right font-medium transition-colors mt-0.5",
        isMax ? "text-red-500 font-bold" : isNear ? "text-amber-500" : "text-slate-400"
      )}>
        {len} / {maxLength}
      </div>
    </div>
  );
};

import { SidebarTrigger } from '@/components/ui/sidebar';

const CVFormEditor = ({ 
  cvData, 
  onUpdateCVData,
  colors = { primary: '#000000', secondary: '#666666', accent: '#000000', text: '#333333', background: '#ffffff' },
  fonts = { primary: 'Times New Roman', headings: 'Times New Roman' },
  layoutConfig,
  onUpdateStyle
}: CVFormEditorProps) => {
  const [aiModalOpen, setAiModalOpen] = React.useState(false);
  const [aiField, setAiField] = React.useState<AIFieldType>('general');
  const [aiDraft, setAiDraft] = React.useState('');
  const [aiApplyCallback, setAiApplyCallback] = React.useState<(text: string) => void>(() => () => {});

  const openAI = (field: AIFieldType, draft: string, callback: (text: string) => void) => {
    setAiField(field);
    setAiDraft(draft);
    setAiApplyCallback(() => callback);
    setAiModalOpen(true);
  };

  const handlePersonalChange = (field: string, value: string) => {
    onUpdateCVData({
      personalData: { ...cvData.personalData, [field]: value }
    });
  };

  const handleArrayAdd = (field: 'experience' | 'education' | 'references') => {
    const newItem = field === 'experience'
      ? { id: Date.now().toString(), position: '', company: '', startDate: '', endDate: '', current: false, description: '' }
      : field === 'education'
      ? { id: Date.now().toString(), degree: '', school: '', startDate: '', endDate: '', current: false, description: '' }
      : { id: Date.now().toString(), name: '', position: '', company: '', contact: '' };

    onUpdateCVData({
      [field]: [...(cvData[field] || []), newItem]
    });
  };

  const handleArrayChange = (field: 'experience' | 'education' | 'references', index: number, key: string, value: any) => {
    const newArray = [...(cvData[field] || [])];
    newArray[index] = { ...newArray[index], [key]: value };
    onUpdateCVData({ [field]: newArray });
  };

  const handleArrayRemove = (field: 'experience' | 'education' | 'references', index: number) => {
    const newArray = [...(cvData[field] || [])];
    newArray.splice(index, 1);
    onUpdateCVData({ [field]: newArray });
  };

  return (
    <div className="flex flex-col gap-3 p-0 pt-1">
      <div className="mb-2 px-2 flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Preencha o seu CV</h2>
          <p className="text-xs text-slate-500">
            Insira os seus dados abaixo.
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible defaultValue="personal" className="w-full">
        {/* 1. Personal Data */}
        <AccordionItem value="personal" className="border bg-white rounded-lg px-2.5 sm:px-4 mb-3 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-slate-800">
            Dados Pessoais
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3 sm:pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Nome Completo</Label>
                <LimitInput maxLength={60} 
                  value={cvData.personalData?.fullName || ''} 
                  onChange={(e: any) => handlePersonalChange('fullName', e.target.value)} 
                  placeholder="Ex: João Silva" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Profissão</Label>
                <LimitInput maxLength={80} 
                  value={cvData.personalData?.profession || ''} 
                  onChange={(e: any) => handlePersonalChange('profession', e.target.value)} 
                  placeholder="Ex: Engenheiro de Software" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Email</Label>
                <LimitInput maxLength={80} 
                  value={cvData.personalData?.email || ''} 
                  onChange={(e: any) => handlePersonalChange('email', e.target.value)} 
                  placeholder="Ex: joao@email.com" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Telefone</Label>
                <LimitInput maxLength={40} 
                  value={cvData.personalData?.phone || ''} 
                  onChange={(e: any) => handlePersonalChange('phone', e.target.value)} 
                  placeholder="Ex: +258 84 123 4567" 
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label>Endereço</Label>
                <LimitInput maxLength={100} 
                  value={cvData.personalData?.address || ''} 
                  onChange={(e: any) => handlePersonalChange('address', e.target.value)} 
                  placeholder="Ex: Maputo, Moçambique" 
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 2. Professional Summary */}
        <AccordionItem value="about" className="border bg-white rounded-lg px-2.5 sm:px-4 mb-3 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-slate-800">
            Resumo Profissional
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3 sm:pb-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label>Apresente-se brevemente</Label>
                <Button 
                  type="button"
                  variant="ghost" size="sm" 
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); openAI('about', cvData.about || '', (text) => onUpdateCVData({ about: text })); }}
                  className="h-6 px-2 text-[10px] text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-medium"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Escrever com IA
                </Button>
              </div>
              <LimitTextarea maxLength={600} 
                value={cvData.about || ''} 
                onChange={(e: any) => onUpdateCVData({ about: e.target.value })} 
                placeholder="Escreva um breve resumo sobre o seu perfil, experiências principais e objetivos..."
                className="min-h-[120px]"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 3. Experience */}
        <AccordionItem value="experience" className="border bg-white rounded-lg px-2.5 sm:px-4 mb-3 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-slate-800">
            Experiência Profissional
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3 sm:pb-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              {cvData.experience?.map((exp: any, index: number) => (
                <div key={exp.id || index} className="p-3 sm:p-4 border rounded-md bg-slate-50 relative group">
                  <button 
                    onClick={() => handleArrayRemove('experience', index)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Cargo</Label>
                      <LimitInput maxLength={80} value={exp.position || ''} onChange={(e: any) => handleArrayChange('experience', index, 'position', e.target.value)} placeholder="Ex: Gestor de Projetos" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Empresa</Label>
                      <LimitInput maxLength={80} value={exp.company || ''} onChange={(e: any) => handleArrayChange('experience', index, 'company', e.target.value)} placeholder="Ex: MozTech" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Início</Label>
                      <LimitInput maxLength={30} value={exp.startDate || ''} onChange={(e: any) => handleArrayChange('experience', index, 'startDate', e.target.value)} placeholder="Ex: Jan 2020" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Fim</Label>
                      <LimitInput maxLength={30} value={exp.endDate || ''} onChange={(e: any) => handleArrayChange('experience', index, 'endDate', e.target.value)} placeholder="Ex: Presente" />
                    </div>
                    <div className="flex flex-col gap-1 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Descrição das Atividades</Label>
                        <Button 
                          type="button"
                          variant="ghost" size="sm" 
                          onClick={(e) => { e.stopPropagation(); e.preventDefault(); openAI('experience', exp.description || '', (text) => handleArrayChange('experience', index, 'description', text)); }}
                          className="h-6 px-2 text-[10px] text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-medium"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          Gerar com IA
                        </Button>
                      </div>
                      <LimitTextarea maxLength={500} value={exp.description || ''} onChange={(e: any) => handleArrayChange('experience', index, 'description', e.target.value)} placeholder="Principais tarefas e conquistas..." />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={() => handleArrayAdd('experience')} variant="outline" className="w-full border-dashed border-slate-300 text-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Experiência
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 4. Education */}
        <AccordionItem value="education" className="border bg-white rounded-lg px-2.5 sm:px-4 mb-3 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-slate-800">
            Formação Académica
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3 sm:pb-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              {cvData.education?.map((edu: any, index: number) => (
                <div key={edu.id || index} className="p-3 sm:p-4 border rounded-md bg-slate-50 relative group">
                  <button 
                    onClick={() => handleArrayRemove('education', index)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Curso / Grau</Label>
                      <LimitInput maxLength={80} value={edu.degree || ''} onChange={(e: any) => handleArrayChange('education', index, 'degree', e.target.value)} placeholder="Ex: Licenciatura em Gestão" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Instituição</Label>
                      <LimitInput maxLength={80} value={edu.school || ''} onChange={(e: any) => handleArrayChange('education', index, 'school', e.target.value)} placeholder="Ex: UEM" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Início</Label>
                      <LimitInput maxLength={30} value={edu.startDate || ''} onChange={(e: any) => handleArrayChange('education', index, 'startDate', e.target.value)} placeholder="Ex: 2015" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Fim</Label>
                      <LimitInput maxLength={30} value={edu.endDate || ''} onChange={(e: any) => handleArrayChange('education', index, 'endDate', e.target.value)} placeholder="Ex: 2019" />
                    </div>
                    <div className="flex flex-col gap-1 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Descrição (Opcional)</Label>
                        <Button 
                          type="button"
                          variant="ghost" size="sm" 
                          onClick={(e) => { e.stopPropagation(); e.preventDefault(); openAI('education', edu.description || '', (text) => handleArrayChange('education', index, 'description', text)); }}
                          className="h-6 px-2 text-[10px] text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-medium"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          Melhorar com IA
                        </Button>
                      </div>
                      <LimitTextarea maxLength={300} value={edu.description || ''} onChange={(e: any) => handleArrayChange('education', index, 'description', e.target.value)} placeholder="Notas importantes ou distinções..." />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={() => handleArrayAdd('education')} variant="outline" className="w-full border-dashed border-slate-300 text-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Formação
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 5. Skills */}
        <AccordionItem value="skills" className="border bg-white rounded-lg px-2.5 sm:px-4 mb-3 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-slate-800">
            Habilidades & Idiomas
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3 sm:pb-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <Label>Habilidades Técnicas (separadas por vírgula)</Label>
                  <Button 
                    type="button"
                    variant="ghost" size="sm" 
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); openAI('skills', Array.isArray(cvData.skills) ? cvData.skills.join(', ') : (cvData.skills?.technical?.join(', ') || ''), (text) => {
                      const vals = text.split(',').map(s => s.trim()).filter(Boolean);
                      onUpdateCVData({ skills: Array.isArray(cvData.skills) ? vals : { ...cvData.skills, technical: vals } });
                    }); }}
                    className="h-6 px-2 text-[10px] text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-medium"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Gerar com IA
                  </Button>
                </div>
                <LimitTextarea 
                  maxLength={200}
                  value={Array.isArray(cvData.skills) ? cvData.skills.join(', ') : (cvData.skills?.technical?.join(', ') || '')} 
                  onChange={(e: any) => {
                    const vals = e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean);
                    onUpdateCVData({ skills: Array.isArray(cvData.skills) ? vals : { ...cvData.skills, technical: vals } });
                  }} 
                  placeholder="Ex: Gestão de Projetos, Liderança, Excel Avançado" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Idiomas (separados por vírgula)</Label>
                <LimitTextarea 
                  maxLength={200}
                  value={!Array.isArray(cvData.skills) ? (cvData.skills?.languages?.join(', ') || '') : ''} 
                  onChange={(e: any) => {
                    const vals = e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean);
                    onUpdateCVData({ skills: Array.isArray(cvData.skills) ? cvData.skills : { ...cvData.skills, languages: vals } });
                  }} 
                  placeholder="Ex: Português Nativo, Inglês Fluente" 
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 6. References */}
        <AccordionItem value="references" className="border bg-white rounded-lg px-2.5 sm:px-4 mb-3 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-slate-800">
            Referências (Opcional)
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3 sm:pb-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              {cvData.references?.map((ref: any, index: number) => (
                <div key={ref.id || index} className="p-3 sm:p-4 border rounded-md bg-slate-50 relative group">
                  <button 
                    onClick={() => handleArrayRemove('references', index)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Nome</Label>
                      <LimitInput maxLength={60} value={ref.name || ''} onChange={(e: any) => handleArrayChange('references', index, 'name', e.target.value)} placeholder="Ex: Dr. Carlos Mateus" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Cargo</Label>
                      <LimitInput maxLength={80} value={ref.position || ''} onChange={(e: any) => handleArrayChange('references', index, 'position', e.target.value)} placeholder="Ex: Diretor Geral" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Empresa</Label>
                      <LimitInput maxLength={80} value={ref.company || ''} onChange={(e: any) => handleArrayChange('references', index, 'company', e.target.value)} placeholder="Ex: Banco de Moçambique" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Contacto</Label>
                      <LimitInput maxLength={80} value={ref.contact || ''} onChange={(e: any) => handleArrayChange('references', index, 'contact', e.target.value)} placeholder="Email ou Telefone" />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={() => handleArrayAdd('references')} variant="outline" className="w-full border-dashed border-slate-300 text-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Referência
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 7. Design & Cores */}
        {onUpdateStyle && layoutConfig && (
          <AccordionItem value="design" className="border bg-blue-50/50 rounded-lg px-2.5 sm:px-4 mb-3 shadow-sm border-blue-100">
            <AccordionTrigger className="hover:no-underline font-semibold text-blue-900">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Design & Cores
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="flex flex-col gap-6">
                
                {/* Colors */}
                <div className="flex flex-col gap-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5"><Palette className="w-4 h-4"/> Cores</Label>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 items-center">
                      <input
                        type="color"
                        value={colors.primary}
                        onChange={(e) => onUpdateStyle('colors', { ...colors, primary: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-200 p-0.5"
                      />
                      <span className="text-xs text-slate-500">Primária</span>
                    </div>
                    <div className="flex flex-col gap-1.5 items-center">
                      <input
                        type="color"
                        value={colors.secondary}
                        onChange={(e) => onUpdateStyle('colors', { ...colors, secondary: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-200 p-0.5"
                      />
                      <span className="text-xs text-slate-500">Secundária</span>
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div className="flex flex-col gap-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5"><Type className="w-4 h-4"/> Tipografia</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs text-slate-500">Fonte dos Títulos</Label>
                      <Select value={fonts.headings} onValueChange={(value) => onUpdateStyle('fonts', { ...fonts, headings: value })}>
                        <SelectTrigger className="h-9 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {AVAILABLE_FONTS.map((font) => (
                            <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>{font.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs text-slate-500">Fonte do Texto</Label>
                      <Select value={fonts.primary} onValueChange={(value) => onUpdateStyle('fonts', { ...fonts, primary: value })}>
                        <SelectTrigger className="h-9 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {AVAILABLE_FONTS.map((font) => (
                            <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>{font.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Spacing & Size */}
                <div className="flex flex-col gap-4">
                  <Label className="text-sm font-semibold text-slate-700">Tamanho & Espaçamento</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <Label className="text-xs text-slate-500">Tamanho do Texto</Label>
                      <span className="text-xs font-mono font-bold text-slate-700">{Math.round((layoutConfig.spacing?.fontSize || 1) * 100)}%</span>
                    </div>
                    <input
                      type="range" min={70} max={130} step={1}
                      value={(layoutConfig.spacing?.fontSize || 1) * 100}
                      onChange={(e) => onUpdateStyle('spacing', { ...layoutConfig.spacing, fontSize: Number(e.target.value) / 100 })}
                      className="w-full h-1.5 accent-blue-600 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <Label className="text-xs text-slate-500">Espaçamento das Secções</Label>
                      <span className="text-xs font-mono font-bold text-slate-700">
                        {layoutConfig.spacing?.sectionSpacing === 'compact' ? 'Compacto' : layoutConfig.spacing?.sectionSpacing === 'wide' ? 'Amplo' : 'Normal'}
                      </span>
                    </div>
                    <input
                      type="range" min={0} max={100} step={50}
                      value={layoutConfig.spacing?.sectionSpacing === 'compact' ? 0 : layoutConfig.spacing?.sectionSpacing === 'wide' ? 100 : 50}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        onUpdateStyle('spacing', { ...layoutConfig.spacing, sectionSpacing: v === 0 ? 'compact' : v === 100 ? 'wide' : 'normal' });
                      }}
                      className="w-full h-1.5 accent-blue-600 cursor-pointer"
                    />
                  </div>
                </div>

              </div>
            </AccordionContent>
          </AccordionItem>
        )}

      </Accordion>

      <AIGeneratorModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        onApply={aiApplyCallback}
        fieldType={aiField}
        initialDraft={aiDraft}
      />
    </div>
  );
};

export default CVFormEditor;

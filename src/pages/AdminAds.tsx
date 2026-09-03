import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, Plus, Trash2, Edit2, Save, X, 
  Monitor, Smartphone, Link as LinkIcon, Code, Image as ImageIcon,
  CheckCircle2, AlertCircle, Layout, HelpCircle, Info, Sparkles
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Advertisement } from '@/types/ads';

export const AD_SLOTS = [
  { 
    value: 'header', 
    label: '🖼️ Cabeçalho (Topo da Página)', 
    description: 'Exibido no topo antes do conteúdo.',
    recommendedAdsterra: 'Banner 728x90 no Computador | Banner 320x50 no Telemóvel',
    adsterraType: 'Banner Display',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  { 
    value: 'footer', 
    label: '🖼️ Rodapé Global', 
    description: 'Exibido logo acima do rodapé em todas as páginas.',
    recommendedAdsterra: 'Banner 728x90 no Computador | Banner 320x50 no Telemóvel',
    adsterraType: 'Banner Display',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  { 
    value: 'job_feed_1', 
    label: '📰 Feed de Vagas — Posição 1', 
    description: 'Inserido no meio da lista de vagas (após a 2ª vaga).',
    recommendedAdsterra: 'Bandeira Nativa (NativeBanner_1) ou Banner 300x250',
    adsterraType: 'Anúncio Nativo / Banner Grid',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  { 
    value: 'job_feed_2', 
    label: '📰 Feed de Vagas — Posição 2', 
    description: 'Inserido a meio da lista de vagas (após a 5ª vaga).',
    recommendedAdsterra: 'Bandeira Nativa (NativeBanner_1) ou Banner 300x250',
    adsterraType: 'Anúncio Nativo / Banner Grid',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  { 
    value: 'success_page', 
    label: '📄 Página de Download de CV', 
    description: 'Exibido ao descarregar o currículo em PDF.',
    recommendedAdsterra: 'Bandeira Nativa ou Banner 300x250 / Direct Link',
    adsterraType: 'Banner / SmartLink',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  { 
    value: 'blog_sidebar', 
    label: '📌 Barra Lateral do Blog', 
    description: 'Exibido na barra lateral dos artigos do blog.',
    recommendedAdsterra: 'Banner 300x250 ou Bandeira Nativa',
    adsterraType: 'Banner Sidebar',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  { 
    value: 'blog_content', 
    label: '📖 Meio dos Artigos de Blog', 
    description: 'Inserido entre os parágrafos de artigos.',
    recommendedAdsterra: 'Bandeira Nativa (NativeBanner_1)',
    adsterraType: 'Anúncio Nativo In-Article',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  { 
    value: 'global_social_bar', 
    label: '💬 Global — Social Bar (Adsterra)', 
    description: 'Widget flutuante interativo que simula chat/notificações no rodapé.',
    recommendedAdsterra: 'Código do Social Bar obtido no Adsterra',
    adsterraType: 'Social Bar (Overlay Global)',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  { 
    value: 'global_popunder', 
    label: '⚡ Global — Popunder (Adsterra)', 
    description: 'Abre o anúncio em background em nova aba ao clicar na página.',
    recommendedAdsterra: 'Código do Popunder (Popunder_1 - ID 26763162) obtido no Adsterra',
    adsterraType: 'Popunder (Script Global de Tela Cheia)',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
  },
];

const AdminAds = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentAd, setCurrentAd] = useState<Partial<Advertisement>>({
    title: '',
    slot_name: 'header',
    desktop_type: 'code',
    mobile_type: 'code',
    is_active: true
  });

  useEffect(() => {
    checkAdmin();
  }, [user]);

  const checkAdmin = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      navigate('/');
      return;
    }

    setIsAdmin(true);
    await loadAds();
    setLoading(false);
  };

  const loadAds = async () => {
    const { data, error } = await supabase
      .from('advertisements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Erro ao carregar anúncios', description: error.message, variant: 'destructive' });
    } else {
      setAds(data || []);
    }
  };

  const handleSave = async () => {
    try {
      if (!currentAd.title || !currentAd.slot_name) {
        toast({ title: 'Campos obrigatórios', description: 'Preencha o Título e a Posição do Anúncio', variant: 'destructive' });
        return;
      }

      const adData = {
        title: currentAd.title,
        slot_name: currentAd.slot_name,
        desktop_type: currentAd.desktop_type || 'code',
        desktop_content: currentAd.desktop_content || '',
        mobile_type: currentAd.mobile_type || 'code',
        mobile_content: (currentAd.mobile_content && currentAd.mobile_content.trim() !== '') 
          ? currentAd.mobile_content 
          : (currentAd.desktop_content || ''),
        redirect_url: currentAd.redirect_url || null,
        is_active: currentAd.is_active ?? true,
        updated_at: new Date().toISOString()
      };

      if (currentAd.id) {
        const { error } = await supabase
          .from('advertisements')
          .update(adData)
          .eq('id', currentAd.id);
        if (error) throw error;
        toast({ title: 'Anúncio atualizado com sucesso ✅' });
      } else {
        const { error } = await supabase
          .from('advertisements')
          .insert([adData]);
        if (error) throw error;
        toast({ title: 'Novo anúncio configurado com sucesso ✅' });
      }

      setIsEditing(false);
      loadAds();
    } catch (error: any) {
      toast({ title: 'Erro ao guardar', description: error.message, variant: 'destructive' });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, device: 'desktop' | 'mobile') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('ads_images')
        .upload(fileName, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('ads_images')
        .getPublicUrl(fileName);
        
      if (device === 'desktop') {
        setCurrentAd(prev => ({ ...prev, desktop_content: data.publicUrl, desktop_type: 'image' }));
      } else {
        setCurrentAd(prev => ({ ...prev, mobile_content: data.publicUrl, mobile_type: 'image' }));
      }
      
      toast({ title: 'Upload de imagem concluído ✅' });
    } catch (error: any) {
      toast({ title: 'Erro no upload de imagem', description: error.message, variant: 'destructive' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem a certeza que deseja eliminar permanentemente este anúncio?')) return;
    try {
      const { error } = await supabase.from('advertisements').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Anúncio eliminado com sucesso 🗑️' });
      loadAds();
    } catch (error: any) {
      toast({ title: 'Erro ao eliminar anúncio', description: error.message, variant: 'destructive' });
    }
  };

  const toggleStatus = async (ad: Advertisement) => {
    try {
      const { error } = await supabase
        .from('advertisements')
        .update({ is_active: !ad.is_active })
        .eq('id', ad.id);
      if (error) throw error;
      toast({
        title: !ad.is_active ? 'Anúncio Ativado ✅' : 'Anúncio Oculto ⏸️',
      });
      loadAds();
    } catch (error: any) {
      toast({ title: 'Erro ao alterar estado', description: error.message, variant: 'destructive' });
    }
  };

  const currentSlotObj = AD_SLOTS.find(s => s.value === currentAd.slot_name) || AD_SLOTS[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-2 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900">Admin — Anúncios</h1>
              <p className="text-xs md:text-sm text-slate-500">Gerir banners, scripts Adsterra, Popunder e locais de exibição</p>
            </div>
          </div>
          <Button onClick={() => {
            setCurrentAd({ 
              title: '', 
              slot_name: 'header', 
              desktop_type: 'code', 
              mobile_type: 'code', 
              is_active: true 
            });
            setIsEditing(true);
          }} className="bg-emerald-600 hover:bg-emerald-700 font-bold rounded-xl shadow-md">
            <Plus className="w-4 h-4 mr-2" /> Novo Anúncio
          </Button>
        </div>

        {/* Card Guia Explicativo do Adsterra para o Usuário */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-5 rounded-2xl shadow-lg border border-slate-700/50">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h2 className="font-bold text-base text-white">Como configurar os seus 4 anúncios do Adsterra sem conflitos:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="font-bold text-emerald-400">1. Popunder (Popunder_1 - ID 26763162):</span>
                  <p className="text-slate-300 mt-0.5">Selecione a Posição <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">Global — Popunder</code>. Cole o código no Computador e Telemóvel.</p>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="font-bold text-blue-400">2. Banner 728x90 (728x90_1 - ID 26769938):</span>
                  <p className="text-slate-300 mt-0.5">Selecione a Posição <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">Cabeçalho (Topo)</code>. Cole no campo <strong className="text-white">Versão Computador</strong>.</p>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="font-bold text-blue-400">3. Banner 320x50 (320x50_1 - ID 26769946):</span>
                  <p className="text-slate-300 mt-0.5">Selecione a Posição <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">Cabeçalho (Topo)</code>. Cole no campo <strong className="text-white">Versão Telemóvel</strong>.</p>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="font-bold text-amber-400">4. Bandeira Nativa (NativeBanner_1 - ID 26769959):</span>
                  <p className="text-slate-300 mt-0.5">Selecione a Posição <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">Feed de Vagas — Posição 1</code>. Cole nas duas caixas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isEditing ? (
          <Card className="border-none shadow-xl rounded-2xl overflow-hidden bg-white">
            <CardHeader className="bg-slate-900 text-white p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Layout className="w-5 h-5 text-emerald-400" />
                  {currentAd.id ? 'Editar Anúncio' : 'Configurar Novo Anúncio'}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="text-white hover:bg-white/10 rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Configurações Gerais */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-bold uppercase text-slate-500">Título Interno do Anúncio *</Label>
                    <Input 
                      placeholder="Ex: Adsterra Popunder Global ou Banner Cabeçalho" 
                      value={currentAd.title || ''} 
                      onChange={e => setCurrentAd({...currentAd, title: e.target.value})}
                      className="mt-1 font-medium"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs font-bold uppercase text-slate-500">Posição (Onde este anúncio vai aparecer) *</Label>
                    <select 
                      className="w-full flex h-11 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 mt-1 focus:ring-2 focus:ring-emerald-500"
                      value={currentAd.slot_name || 'header'}
                      onChange={e => setCurrentAd({...currentAd, slot_name: e.target.value})}
                    >
                      {AD_SLOTS.map(s => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Caixa de Recomendação Específica do Slot Selecionado */}
                  <div className={`p-4 rounded-xl border ${currentSlotObj.badgeColor} space-y-1`}>
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Info className="w-4 h-4 shrink-0" />
                      <span>{currentSlotObj.description}</span>
                    </div>
                    <p className="text-xs font-semibold mt-1">
                      👉 <strong>Anúncio Adsterra Recomendado:</strong> {currentSlotObj.recommendedAdsterra}
                    </p>
                  </div>

                  <div>
                    <Label className="text-xs font-bold uppercase text-slate-500">Link de Destino (Opcional - Para Imagens ou SmartLinks)</Label>
                    <div className="relative mt-1">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        className="pl-10 text-sm font-mono" 
                        placeholder="https://..." 
                        value={currentAd.redirect_url || ''} 
                        onChange={e => setCurrentAd({...currentAd, redirect_url: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <Switch 
                      checked={currentAd.is_active} 
                      onCheckedChange={val => setCurrentAd({...currentAd, is_active: val})} 
                    />
                    <div>
                      <Label className="text-sm font-bold text-slate-800">Anúncio Ativo</Label>
                      <p className="text-xs text-slate-400">Ative ou desative sem precisar eliminar</p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                    💡 <strong>Preciso colar o código duas vezes?</strong><br/>
                    Se o seu anúncio for responsivo (como Popunder ou Bandeira Nativa), basta colar na <strong>Versão Computador</strong> e deixar a <strong>Versão Telemóvel em branco</strong>. O MozVita usa a Versão Computador para ambos automaticamente!
                  </div>
                </div>

                {/* Versão Computador (Desktop) */}
                <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-bold text-slate-800 text-sm">Versão Computador (Desktop)</h3>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      type="button"
                      variant={currentAd.desktop_type === 'image' ? 'default' : 'outline'}
                      onClick={() => setCurrentAd({...currentAd, desktop_type: 'image'})}
                      className="flex-1 rounded-lg text-xs font-bold"
                    >
                      <ImageIcon className="w-3.5 h-3.5 mr-1.5" /> Imagem
                    </Button>
                    <Button 
                      size="sm" 
                      type="button"
                      variant={currentAd.desktop_type === 'code' ? 'default' : 'outline'}
                      onClick={() => setCurrentAd({...currentAd, desktop_type: 'code'})}
                      className="flex-1 rounded-lg text-xs font-bold"
                    >
                      <Code className="w-3.5 h-3.5 mr-1.5" /> Script / Adsterra
                    </Button>
                  </div>

                  {currentAd.desktop_type === 'image' && (
                    <div>
                      <Label className="text-[11px] text-slate-500 mb-1 block">Carregar Imagem para Desktop</Label>
                      <Input 
                        type="file" 
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => handleImageUpload(e, 'desktop')}
                        className="text-xs bg-white"
                      />
                    </div>
                  )}

                  <Textarea 
                    rows={6}
                    placeholder={currentAd.desktop_type === 'image' ? "URL da imagem (https://...)..." : "<script type='text/javascript'>\n  atOptions = {\n    'key': '26769938',\n    'format': 'iframe',\n    'height': 90,\n    'width': 728\n  };\n</script>\n<script src='//www.highperformanceformat.com/26769938/invoke.js'></script>"}
                    value={currentAd.desktop_content || ''}
                    onChange={e => setCurrentAd({...currentAd, desktop_content: e.target.value})}
                    className="font-mono text-xs bg-white"
                  />
                </div>

                {/* Versão Telemóvel (Mobile) */}
                <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200 md:col-start-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-slate-800 text-sm">Versão Telemóvel (Mobile)</h3>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      type="button"
                      variant={currentAd.mobile_type === 'image' ? 'default' : 'outline'}
                      onClick={() => setCurrentAd({...currentAd, mobile_type: 'image'})}
                      className="flex-1 rounded-lg text-xs font-bold"
                    >
                      <ImageIcon className="w-3.5 h-3.5 mr-1.5" /> Imagem
                    </Button>
                    <Button 
                      size="sm" 
                      type="button"
                      variant={currentAd.mobile_type === 'code' ? 'default' : 'outline'}
                      onClick={() => setCurrentAd({...currentAd, mobile_type: 'code'})}
                      className="flex-1 rounded-lg text-xs font-bold"
                    >
                      <Code className="w-3.5 h-3.5 mr-1.5" /> Script / Adsterra
                    </Button>
                  </div>

                  {currentAd.mobile_type === 'image' && (
                    <div>
                      <Label className="text-[11px] text-slate-500 mb-1 block">Carregar Imagem para Telemóvel</Label>
                      <Input 
                        type="file" 
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => handleImageUpload(e, 'mobile')}
                        className="text-xs bg-white"
                      />
                    </div>
                  )}

                  <Textarea 
                    rows={6}
                    placeholder={currentAd.mobile_type === 'image' ? "URL da imagem (https://...)..." : "<script type='text/javascript'>\n  atOptions = {\n    'key': '26769946',\n    'format': 'iframe',\n    'height': 50,\n    'width': 320\n  };\n</script>\n<script src='//www.highperformanceformat.com/26769946/invoke.js'></script>"}
                    value={currentAd.mobile_content || ''}
                    onChange={e => setCurrentAd({...currentAd, mobile_content: e.target.value})}
                    className="font-mono text-xs bg-white"
                  />
                </div>

              </div>

              <div className="pt-4 flex gap-3 border-t border-slate-100">
                <Button onClick={handleSave} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 rounded-xl shadow-md">
                  <Save className="w-5 h-5 mr-2" /> Guardar Configuração
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="px-8 py-5 rounded-xl font-bold">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {ads.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                <ImageIcon className="w-16 h-16 mx-auto text-slate-200 mb-4" />
                <p className="text-slate-600 font-bold">Nenhum anúncio cadastrado ainda.</p>
                <p className="text-slate-400 text-sm mt-1">Clique em "Novo Anúncio" para configurar anúncios do Adsterra ou imagens.</p>
              </div>
            ) : (
              ads.map(ad => {
                const slotObj = AD_SLOTS.find(s => s.value === ad.slot_name);
                return (
                  <Card key={ad.id} className="border-none shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all bg-white">
                    <CardContent className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                      
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ad.is_active ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400'}`}>
                          {ad.desktop_type === 'code' ? <Code className="w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-base truncate">{ad.title}</h3>
                            {ad.is_active ? (
                              <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold">ATIVO</Badge>
                            ) : (
                              <Badge variant="outline" className="text-slate-400 text-[10px] font-bold">INATIVO</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <Badge variant="outline" className="text-[10px] uppercase font-mono font-bold bg-slate-50 text-slate-700">
                              {slotObj ? slotObj.label : ad.slot_name}
                            </Badge>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                              <Monitor className="w-3.5 h-3.5 text-slate-400" /> {ad.desktop_type === 'code' ? 'Script Desktop' : 'Imagem Desktop'}
                            </span>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                              <Smartphone className="w-3.5 h-3.5 text-slate-400" /> {ad.mobile_type === 'code' ? 'Script Mobile' : 'Imagem Mobile'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                        <div className="flex items-center gap-2 mr-2">
                          <Switch checked={ad.is_active} onCheckedChange={() => toggleStatus(ad)} />
                          <span className={`text-xs font-bold ${ad.is_active ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {ad.is_active ? 'Visível' : 'Oculto'}
                          </span>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setCurrentAd(ad);
                              setIsEditing(true);
                            }}
                            className="hover:bg-slate-100 text-blue-600 rounded-lg font-bold text-xs"
                          >
                            <Edit2 className="w-4 h-4 mr-1" /> Editar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDelete(ad.id)}
                            className="hover:bg-red-50 text-red-600 rounded-lg font-bold text-xs"
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Apagar
                          </Button>
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAds;

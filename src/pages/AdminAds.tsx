
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
  Monitor, Smartphone, Link as LinkIcon, Code, Image as ImageIcon
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Advertisement, AdType } from '@/types/ads';

const AdminAds = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isEditing, setIsEditing] = useState(false);
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
        toast({ title: 'Campos obrigatórios', description: 'Título e Slot são necessários', variant: 'destructive' });
        return;
      }

      const adData = {
        title: currentAd.title,
        slot_name: currentAd.slot_name,
        desktop_type: currentAd.desktop_type,
        desktop_content: currentAd.desktop_content,
        mobile_type: currentAd.mobile_type,
        mobile_content: currentAd.mobile_content,
        redirect_url: currentAd.redirect_url,
        is_active: currentAd.is_active,
        updated_at: new Date().toISOString()
      };

      if (currentAd.id) {
        const { error } = await supabase
          .from('advertisements')
          .update(adData)
          .eq('id', currentAd.id);
        if (error) throw error;
        toast({ title: 'Anúncio atualizado ✅' });
      } else {
        const { error } = await supabase
          .from('advertisements')
          .insert([adData]);
        if (error) throw error;
        toast({ title: 'Anúncio criado ✅' });
      }

      setIsEditing(false);
      loadAds();
    } catch (error: any) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminar este anúncio permanentemente?')) return;
    try {
      const { error } = await supabase.from('advertisements').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Anúncio eliminado' });
      loadAds();
    } catch (error: any) {
      toast({ title: 'Erro ao eliminar', description: error.message, variant: 'destructive' });
    }
  };

  const toggleStatus = async (ad: Advertisement) => {
    try {
      const { error } = await supabase
        .from('advertisements')
        .update({ is_active: !ad.is_active })
        .eq('id', ad.id);
      if (error) throw error;
      loadAds();
    } catch (error: any) {
      toast({ title: 'Erro ao mudar status', description: error.message, variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-6 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 bg-slate-900 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900">Admin — Anúncios</h1>
              <p className="text-xs md:text-sm text-slate-400">Gerir banners e scripts publicitários</p>
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
          }} className="bg-emerald-600 hover:bg-emerald-700 font-bold rounded-xl">
            <Plus className="w-4 h-4 mr-2" /> Novo Anúncio
          </Button>
        </div>

        {isEditing ? (
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-900 text-white">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold">
                  {currentAd.id ? 'Editar Anúncio' : 'Configurar Novo Anúncio'}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="text-white hover:bg-white/10">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campos Básicos */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-bold uppercase text-slate-400">Título Interno</Label>
                    <Input 
                      placeholder="Ex: Campanha Vodacom Maio" 
                      value={currentAd.title} 
                      onChange={e => setCurrentAd({...currentAd, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold uppercase text-slate-400">Posição (Slot Name)</Label>
                    <select 
                      className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={currentAd.slot_name}
                      onChange={e => setCurrentAd({...currentAd, slot_name: e.target.value})}
                    >
                      <option value="header">Cabeçalho (Topo)</option>
                      <option value="footer">Rodapé</option>
                      <option value="success_page">Página de Sucesso (Download)</option>
                      <option value="sidebar">Barra Lateral (Blog)</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs font-bold uppercase text-slate-400">Link de Destino (Para Imagens)</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        className="pl-10" 
                        placeholder="https://..." 
                        value={currentAd.redirect_url || ''} 
                        onChange={e => setCurrentAd({...currentAd, redirect_url: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Switch 
                      checked={currentAd.is_active} 
                      onCheckedChange={val => setCurrentAd({...currentAd, is_active: val})} 
                    />
                    <Label className="text-sm font-bold">Anúncio Ativo</Label>
                  </div>
                </div>

                {/* Versão Desktop */}
                <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-5 h-5 text-slate-400" />
                    <h3 className="font-bold text-slate-700">Versão Computador</h3>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Button 
                      size="sm" 
                      variant={currentAd.desktop_type === 'image' ? 'default' : 'outline'}
                      onClick={() => setCurrentAd({...currentAd, desktop_type: 'image'})}
                      className="flex-1 rounded-lg"
                    >
                      <ImageIcon className="w-3 h-3 mr-2" /> Imagem
                    </Button>
                    <Button 
                      size="sm" 
                      variant={currentAd.desktop_type === 'code' ? 'default' : 'outline'}
                      onClick={() => setCurrentAd({...currentAd, desktop_type: 'code'})}
                      className="flex-1 rounded-lg"
                    >
                      <Code className="w-3 h-3 mr-2" /> Script/HTML
                    </Button>
                  </div>
                  <Textarea 
                    rows={4}
                    placeholder={currentAd.desktop_type === 'image' ? "Link da Imagem (URL)..." : "<script>...</script>"}
                    value={currentAd.desktop_content || ''}
                    onChange={e => setCurrentAd({...currentAd, desktop_content: e.target.value})}
                    className="font-mono text-xs"
                  />
                </div>

                {/* Versão Mobile */}
                <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100 md:col-start-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-5 h-5 text-slate-400" />
                    <h3 className="font-bold text-slate-700">Versão Telemóvel</h3>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Button 
                      size="sm" 
                      variant={currentAd.mobile_type === 'image' ? 'default' : 'outline'}
                      onClick={() => setCurrentAd({...currentAd, mobile_type: 'image'})}
                      className="flex-1 rounded-lg"
                    >
                      <ImageIcon className="w-3 h-3 mr-2" /> Imagem
                    </Button>
                    <Button 
                      size="sm" 
                      variant={currentAd.mobile_type === 'code' ? 'default' : 'outline'}
                      onClick={() => setCurrentAd({...currentAd, mobile_type: 'code'})}
                      className="flex-1 rounded-lg"
                    >
                      <Code className="w-3 h-3 mr-2" /> Script/HTML
                    </Button>
                  </div>
                  <Textarea 
                    rows={4}
                    placeholder={currentAd.mobile_type === 'image' ? "Link da Imagem (URL)..." : "<script>...</script>"}
                    value={currentAd.mobile_content || ''}
                    onChange={e => setCurrentAd({...currentAd, mobile_content: e.target.value})}
                    className="font-mono text-xs"
                  />
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <Button onClick={handleSave} className="flex-1 bg-slate-900 hover:bg-slate-800 font-bold py-6 rounded-xl">
                  <Save className="w-5 h-5 mr-2" /> Guardar Configuração
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="px-8 py-6 rounded-xl font-bold">
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
                <p className="text-slate-500 font-bold">Ainda não tens anúncios criados.</p>
                <p className="text-slate-400 text-sm">Clica em "Novo Anúncio" para começar a facturar.</p>
              </div>
            ) : (
              ads.map(ad => (
                <Card key={ad.id} className="border-none shadow-md rounded-2xl overflow-hidden group">
                  <CardContent className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ad.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                        {ad.desktop_type === 'code' ? <Code className="w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 truncate">{ad.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px] uppercase font-bold bg-slate-50">
                            {ad.slot_name}
                          </Badge>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase font-bold">
                            <Monitor className="w-3 h-3" /> {ad.desktop_type}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase font-bold">
                            <Smartphone className="w-3 h-3" /> {ad.mobile_type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      <div className="flex items-center gap-2 mr-4">
                        <Switch checked={ad.is_active} onCheckedChange={() => toggleStatus(ad)} />
                        <span className={`text-xs font-bold ${ad.is_active ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {ad.is_active ? 'ATIVO' : 'DESACTIVADO'}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => {
                            setCurrentAd(ad);
                            setIsEditing(true);
                          }}
                          className="hover:bg-slate-100 text-slate-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(ad.id)}
                          className="hover:bg-red-50 text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAds;

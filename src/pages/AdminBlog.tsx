import React, { useState, useEffect } from 'react';
import { 
  Plus, Sparkles, Edit3, Trash2, Eye, Globe, 
  CheckCircle, Clock, BookOpen, Search, ArrowLeft, Loader2, RefreshCw,
  Upload, Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  getAdminBlogPosts, 
  createAdminBlogPost, 
  updateAdminBlogPost, 
  deleteAdminBlogPost, 
  generateAiArticle,
  DbBlogPost 
} from '@/services/blogService';

export default function AdminBlog() {
  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal de IA
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCategory, setAiCategory] = useState('Mercado de Trabalho');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Editor Manual / Formulário
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState<Omit<DbBlogPost, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    slug: '',
    excerpt: '',
    meta_description: '',
    category: 'Mercado de Trabalho',
    author: 'Equipe MozVita',
    read_time: '10 min',
    image: '/blog/sites-emprego.jpg',
    content: '',
    faqs: [],
    featured: false,
    is_published: true
  });

  // Pre-configured public stock images for quick selection
  const stockImages = [
    { label: 'Sites de Emprego', url: '/blog/sites-emprego.jpg' },
    { label: 'Entrevista de Emprego', url: '/blog/entrevista-emprego.jpg' },
    { label: 'CV Profissional', url: '/blog/cv-profissional.jpg' },
    { label: 'Trabalho Remoto', url: '/blog/trabalho-remoto.jpg' },
    { label: 'Carta de Apresentação', url: '/blog/carta-apresentacao-guia.jpg' },
    { label: 'Primeiro Emprego', url: '/blog/primeiro-emprego.jpg' },
    { label: 'CV Estágio', url: '/blog/cv-estagio.jpg' },
    { label: 'ONGs Moçambique', url: '/blog/ongs-mocambique.jpg' },
    { label: 'Salários Altos', url: '/blog/salarios-altos.jpg' },
    { label: 'Banca e Finanças', url: '/blog/banca-financas.jpg' }
  ];

  const categories = [
    "Dicas de CV",
    "Primeiro Emprego",
    "Mercado de Trabalho",
    "Setores",
    "Empreendedorismo",
    "Dicas de Carreira"
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await getAdminBlogPosts();
      setPosts(data);
    } catch (err: any) {
      toast.error('Erro ao carregar artigos do banco de dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      meta_description: '',
      category: 'Mercado de Trabalho',
      author: 'Equipe MozVita',
      read_time: '10 min',
      image: '/blog/sites-emprego.jpg',
      content: '',
      faqs: [],
      featured: false,
      is_published: true
    });
    setShowEditor(true);
  };

  const handleEdit = (post: DbBlogPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      meta_description: post.meta_description || '',
      category: post.category,
      author: post.author,
      read_time: post.read_time,
      image: post.image || '/blog/sites-emprego.jpg',
      content: post.content,
      faqs: post.faqs || [],
      featured: post.featured,
      is_published: post.is_published
    });
    setShowEditor(true);
  };

  // Upload direto da foto (telemóvel ou PC) para o bucket blog-images
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione um ficheiro de imagem válido (PNG, JPG, WEBP).');
      return;
    }

    // Validar tamanho máximo (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem é muito pesada. O tamanho máximo permitido é de 5MB.');
      return;
    }

    setUploadingImage(true);
    const toastId = toast.loading('A carregar imagem para o servidor...');

    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const filePath = `posts/${Date.now()}_${cleanFileName}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        // Fallback: se o bucket blog-images não tiver sido criado ou der erro de RLS, avisar claramente
        console.error('[AdminBlog] Erro upload Storage:', error);
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      if (publicUrlData?.publicUrl) {
        setFormData(prev => ({ ...prev, image: publicUrlData.publicUrl }));
        toast.success('Imagem carregada com sucesso!', { id: toastId });
      } else {
        toast.dismiss(toastId);
      }
    } catch (err: any) {
      console.warn('[AdminBlog] Falha no storage, solicitando URL ou bucket:', err);
      toast.error(`Falha no upload: ${err.message || 'Verifique se o bucket blog-images existe no Supabase'}. Você também pode colar o link direto ou escolher uma foto da galeria.`, { id: toastId });
    } finally {
      setUploadingImage(false);
      // Reset input value so same file can be selected again if needed
      e.target.value = '';
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Tem certeza que deseja apagar o artigo "${title}"?`)) return;
    try {
      await deleteAdminBlogPost(id);
      toast.success('Artigo apagado com sucesso!');
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      toast.error('Erro ao apagar artigo.');
    }
  };

  const handleTogglePublish = async (post: DbBlogPost) => {
    try {
      const updated = await updateAdminBlogPost(post.id, { is_published: !post.is_published });
      setPosts(prev => prev.map(p => p.id === post.id ? updated : p));
      toast.success(`Artigo ${updated.is_published ? 'publicado' : 'despublicado'}!`);
    } catch (err) {
      toast.error('Erro ao atualizar status do artigo.');
    }
  };

  const handleGenerateAi = async () => {
    if (!aiTopic.trim()) {
      toast.error('Informe o tema do artigo.');
      return;
    }

    setIsGeneratingAi(true);
    toast.info('A IA do MozVita está a pesquisar e estruturar o artigo completo (1.000 a 2.000 palavras com técnicas de SEO)...');

    try {
      const generated = await generateAiArticle(aiTopic, aiCategory);
      
      // Preencher o formulário completo
      setFormData({
        title: generated.title,
        slug: generated.slug,
        excerpt: generated.excerpt,
        meta_description: generated.meta_description,
        category: generated.category,
        author: 'Equipe MozVita',
        read_time: generated.read_time,
        image: formData.image || '/blog/sites-emprego.jpg',
        content: generated.content,
        faqs: generated.faqs,
        featured: true,
        is_published: true
      });

      setShowAiModal(false);
      setEditingId(null);
      setShowEditor(true);
      toast.success('Artigo aprofundado gerado com sucesso! Você pode adicionar uma foto e salvar.');
    } catch (err) {
      toast.error('Erro ao gerar artigo com IA.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim() || !formData.content.trim()) {
      toast.error('Preencha pelo menos Título, Slug e Conteúdo.');
      return;
    }

    try {
      if (editingId) {
        const updated = await updateAdminBlogPost(editingId, formData);
        setPosts(prev => prev.map(p => p.id === editingId ? updated : p));
        toast.success('Artigo atualizado com sucesso!');
      } else {
        const created = await createAdminBlogPost(formData);
        setPosts(prev => [created, ...prev]);
        toast.success('Novo artigo publicado no Blog!');
      }
      setShowEditor(false);
    } catch (err: any) {
      toast.error(`Erro ao salvar artigo: ${err.message || 'Slug duplicado ou erro no banco'}`);
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-2 pb-20 px-4 md:px-8 max-w-6xl mx-auto font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-brand-600" />
            Gerenciador de Artigos do Blog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Publique artigos para tráfego orgânico ou use o Assistente IA para gerar conteúdos completos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowAiModal(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold shadow-md gap-2"
          >
            <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
            Gerar Artigo com IA ⚡
          </Button>

          <Button
            onClick={handleOpenNew}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-sm gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Novo Artigo
          </Button>
        </div>
      </div>

      {/* Editor Screen or List Screen */}
      {showEditor ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <button
              onClick={() => setShowEditor(false)}
              className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar à Lista de Artigos
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              {editingId ? 'Editando Artigo' : 'Criando Novo Artigo'}
            </span>
          </div>

          <form onSubmit={handleSavePost} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">Título do Artigo</Label>
                <Input
                  value={formData.title}
                  onChange={e => {
                    const title = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      title,
                      slug: prev.slug || title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    }));
                  }}
                  placeholder="Ex: Como Passar em Entrevistas de Emprego em Moçambique"
                  className="mt-1 font-bold text-base"
                  required
                />
              </div>

              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">Slug da URL (ex: /blog/como-passar...)</Label>
                <Input
                  value={formData.slug}
                  onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
                  placeholder="como-passar-em-entrevistas-mocambique"
                  className="mt-1 font-mono text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">Categoria</Label>
                <select
                  value={formData.category}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full mt-1 h-10 px-3 border border-slate-200 rounded-xl text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">Tempo de Leitura</Label>
                <Input
                  value={formData.read_time}
                  onChange={e => setFormData(prev => ({ ...prev, read_time: e.target.value }))}
                  placeholder="Ex: 8 min"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Seção de Imagem com Upload Direto (Telemóvel ou PC) + Preview + Galeria Rápida */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-brand-600" />
                    Imagem de Destaque do Artigo
                  </Label>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Carregue uma foto do seu telemóvel/computador ou escolha uma imagem do acervo.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 shadow-sm transition-colors">
                    <Upload className="w-3.5 h-3.5 text-brand-600" />
                    <span>{uploadingImage ? 'A carregar foto...' : 'Carregar Foto do Telemóvel / PC'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Preview e URL */}
              <div className="flex flex-col md:flex-row gap-4 items-start">
                {formData.image ? (
                  <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 shrink-0 group">
                    <img
                      src={formData.image}
                      alt="Pré-visualização da capa"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback se URL falhar
                        (e.target as HTMLImageElement).src = '/blog/sites-emprego.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-[11px] font-bold px-2 py-1 bg-black/60 rounded">Pré-visualização</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full md:w-48 h-32 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 bg-white shrink-0">
                    <ImageIcon className="w-8 h-8 stroke-1 mb-1" />
                    <span className="text-[11px]">Sem imagem</span>
                  </div>
                )}

                <div className="flex-1 w-full space-y-2">
                  <div>
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">URL ou Caminho da Imagem</Label>
                    <Input
                      value={formData.image}
                      onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="/blog/sites-emprego.jpg ou https://..."
                      className="mt-1 text-xs font-mono bg-white"
                    />
                  </div>

                  {/* Seletor Rápido de Imagens Pré-instaladas */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-600 block mb-1.5">Sugestões rápidas do sistema:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {stockImages.map(img => (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: img.url }))}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all font-medium ${
                            formData.image === img.url
                              ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {img.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">Resumo Chamativo (Excerpt)</Label>
              <Textarea
                rows={2}
                value={formData.excerpt}
                onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="2 a 3 frases que aparecem no card de listagem do blog..."
                className="mt-1 text-sm"
              />
            </div>

            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">Meta Description para Google SEO (máx 160 caracteres)</Label>
              <Input
                value={formData.meta_description}
                onChange={e => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                placeholder="Aparece nas buscas do Google para incentivar cliques..."
                className="mt-1 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">Conteúdo do Artigo (HTML)</Label>
                <span className="text-[11px] text-slate-400 font-medium">Aceita tags como &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, etc.</span>
              </div>
              <Textarea
                rows={14}
                value={formData.content}
                onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="<p class='lead'>Texto introdutório...</p><h2>Subtítulo</h2><p>Conteúdo...</p>"
                className="mt-1 font-mono text-sm leading-relaxed"
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={checked => setFormData(prev => ({ ...prev, is_published: checked }))}
                    id="publish-switch"
                  />
                  <Label htmlFor="publish-switch" className="text-sm font-bold text-slate-700 cursor-pointer">
                    {formData.is_published ? 'Publicado no Site' : 'Rascunho (Oculto)'}
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={checked => setFormData(prev => ({ ...prev, featured: checked }))}
                    id="featured-switch"
                  />
                  <Label htmlFor="featured-switch" className="text-sm font-bold text-slate-700 cursor-pointer">
                    Artigo em Destaque
                  </Label>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditor(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6"
                >
                  {editingId ? 'Salvar Alterações' : 'Publicar Artigo Agora'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        /* Lista de Artigos */
        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Filtrar por título, categoria ou slug..."
                className="pl-9 h-10 border-slate-200 text-sm"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={loadPosts}
              className="gap-1.5 text-xs font-bold text-slate-600"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Atualizar
            </Button>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Loader2 className="w-8 h-8 text-brand-600 animate-spin mx-auto mb-3" />
              <p className="text-slate-500 font-medium text-sm">Carregando artigos do banco de dados...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">Nenhum artigo dinâmico encontrado</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
                Crie o seu primeiro artigo agora ou use o Assistente IA para gerar um artigo completo automaticamente!
              </p>
              <Button
                onClick={() => setShowAiModal(true)}
                className="mt-4 bg-brand-600 text-white font-bold"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Criar com IA
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              {filteredPosts.map(post => (
                <div key={post.id} className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {post.image && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 hidden sm:block">
                        <img 
                          src={post.image} 
                          alt="" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/blog/sites-emprego.jpg';
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <Badge variant="outline" className="text-xs font-bold bg-slate-50">
                        {post.category}
                      </Badge>
                      <Badge 
                        variant={post.is_published ? "default" : "secondary"}
                        className={`text-[10px] font-black uppercase ${post.is_published ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}
                      >
                        {post.is_published ? 'Publicado' : 'Rascunho'}
                      </Badge>
                      {post.featured && (
                        <Badge className="bg-amber-500 text-white text-[10px] font-black">
                          Destaque
                        </Badge>
                      )}
                      <span className="text-xs text-slate-400 font-mono">
                        /blog/{post.slug}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 truncate">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      title="Ver no site público"
                    >
                      <Eye className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => handleTogglePublish(post)}
                      className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        post.is_published 
                          ? 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' 
                          : 'border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100'
                      }`}
                      title="Alternar publicação"
                    >
                      {post.is_published ? 'Despublicar' : 'Publicar'}
                    </button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                      className="gap-1 text-xs font-bold text-slate-700"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Editar
                    </Button>

                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Apagar artigo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal Assistente IA */}
      <Dialog open={showAiModal} onOpenChange={setShowAiModal}>
        <DialogContent className="max-w-md rounded-3xl p-6">
          <DialogHeader>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white mb-2 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <DialogTitle className="text-xl font-black text-slate-900">
              Assistente IA de Artigos SEO
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs">
              Escreva o tema e a IA do MozVita gera o artigo completo estruturado com títulos, SEO e chamada para criação de CV.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-2">
            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">Tema do Artigo ou Palavra-Chave</Label>
              <Input
                value={aiTopic}
                onChange={e => setAiTopic(e.target.value)}
                placeholder="Ex: Como se preparar para entrevistas no setor bancário em Maputo"
                className="mt-1.5"
                disabled={isGeneratingAi}
              />
            </div>

            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">Categoria</Label>
              <select
                value={aiCategory}
                onChange={e => setAiCategory(e.target.value)}
                className="w-full mt-1.5 h-10 px-3 border border-slate-200 rounded-xl text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                disabled={isGeneratingAi}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="bg-purple-50/70 p-3.5 rounded-xl border border-purple-100 text-xs text-purple-900 space-y-1.5">
              <p className="font-black text-purple-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                O que a IA Sênior do MozVita vai produzir:
              </p>
              <p>✓ <strong>1.000 a 2.000 palavras</strong> com conteúdo aprofundado e prático</p>
              <p>✓ <strong>SEO completo:</strong> Termos em negrito, H2, H3, listas organizadas</p>
              <p>✓ <strong>Realidade de Moçambique:</strong> Províncias, setores e dicas de contratação</p>
              <p>✓ <strong>FAQ Estruturado:</strong> Perguntas frequentes para exibição no Accordion</p>
              <p>✓ <strong>Chamada para Ação:</strong> Botões direcionando para criação de CV e modelos</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowAiModal(false)}
              disabled={isGeneratingAi}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleGenerateAi}
              disabled={isGeneratingAi || !aiTopic.trim()}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md gap-2"
            >
              {isGeneratingAi ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gerando Artigo...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Gerar Artigo Agora
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

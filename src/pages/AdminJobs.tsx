import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    company: '',
    location: '',
    category: 'Logística',
    job_type: 'Tempo Inteiro',
    salary: '',
    description: '',
    application_url: '',
    application_email: '',
    is_active: true
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('partner_jobs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Erro ao buscar vagas.');
      console.error(error);
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        const { error } = await supabase
          .from('partner_jobs')
          .update({
            title: formData.title,
            company: formData.company,
            location: formData.location,
            category: formData.category,
            job_type: formData.job_type,
            salary: formData.salary,
            description: formData.description,
            application_url: formData.application_url,
            application_email: formData.application_email,
            is_active: formData.is_active
          })
          .eq('id', formData.id);
        if (error) throw error;
        toast.success('Vaga atualizada com sucesso!');
      } else {
        const { error } = await supabase
          .from('partner_jobs')
          .insert([{
            title: formData.title,
            company: formData.company,
            location: formData.location,
            category: formData.category,
            job_type: formData.job_type,
            salary: formData.salary,
            description: formData.description,
            application_url: formData.application_url,
            application_email: formData.application_email,
            is_active: formData.is_active
          }]);
        if (error) throw error;
        toast.success('Vaga criada com sucesso!');
      }
      setShowForm(false);
      resetForm();
      fetchJobs();
    } catch (err: any) {
      toast.error(err.message || 'Erro ao guardar vaga.');
    }
  };

  const handleEdit = (job: any) => {
    setFormData({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      category: job.category,
      job_type: job.job_type,
      salary: job.salary || '',
      description: job.description || '',
      application_url: job.application_url || '',
      application_email: job.application_email || '',
      is_active: job.is_active
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem a certeza que deseja apagar esta vaga?')) return;
    
    const { error } = await supabase.from('partner_jobs').delete().eq('id', id);
    if (error) {
      toast.error('Erro ao apagar vaga.');
    } else {
      toast.success('Vaga apagada.');
      fetchJobs();
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      company: '',
      location: '',
      category: 'Logística',
      job_type: 'Tempo Inteiro',
      salary: '',
      description: '',
      application_url: '',
      application_email: '',
      is_active: true
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gerir Vagas de Parceiros</h1>
          <p className="text-sm text-slate-500 mt-1">
            Adicione vagas exclusivas. Elas aparecerão antes das vagas da Google.
          </p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? 'Voltar à Lista' : <><Plus className="w-4 h-4 mr-2" /> Nova Vaga</>}
        </Button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título da Vaga *</label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ex: Analista Financeiro" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Empresa *</label>
                <Input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Ex: Banco Millennium bim" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Localização *</label>
                <Input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Ex: Maputo" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categoria *</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Logística">Logística</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Engenharia">Engenharia</option>
                  <option value="Finanças">Finanças</option>
                  <option value="Tecnologia (TI)">Tecnologia (TI)</option>
                  <option value="Administração">Administração</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Salário (Opcional)</label>
                <Input value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} placeholder="Ex: 50.000 MT - 70.000 MT" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Emprego</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  value={formData.job_type} 
                  onChange={e => setFormData({...formData, job_type: e.target.value})}
                >
                  <option value="Tempo Inteiro">Tempo Inteiro</option>
                  <option value="Meio Tempo">Meio Tempo</option>
                  <option value="Estágio">Estágio</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL de Candidatura (Opcional)</label>
                <Input value={formData.application_url} onChange={e => setFormData({...formData, application_url: e.target.value})} placeholder="Ex: https://empresa.com/vaga" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email de Candidatura (Opcional)</label>
                <Input type="email" value={formData.application_email} onChange={e => setFormData({...formData, application_email: e.target.value})} placeholder="Ex: rh@empresa.com" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Descrição e Requisitos *</label>
              <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Descreva a vaga em detalhe..." rows={6} />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input 
                type="checkbox" 
                id="is_active" 
                checked={formData.is_active} 
                onChange={e => setFormData({...formData, is_active: e.target.checked})} 
                className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
              />
              <label htmlFor="is_active" className="text-sm font-medium">
                Vaga Ativa (Visível ao público)
              </label>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit">{formData.id ? 'Atualizar Vaga' : 'Criar Vaga'}</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Vaga</th>
                  <th className="px-6 py-3">Empresa</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">A carregar vagas...</td>
                  </tr>
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Nenhuma vaga de parceiro cadastrada.</td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-800">{job.title}</td>
                      <td className="px-6 py-3 text-slate-600">{job.company}</td>
                      <td className="px-6 py-3">
                        {job.is_active ? (
                          <span className="inline-flex items-center text-green-700 bg-green-50 px-2 py-1 rounded-full text-xs font-semibold"><CheckCircle className="w-3 h-3 mr-1" /> Ativa</span>
                        ) : (
                          <span className="inline-flex items-center text-slate-500 bg-slate-100 px-2 py-1 rounded-full text-xs font-semibold"><XCircle className="w-3 h-3 mr-1" /> Inativa</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-slate-500">
                        {new Date(job.created_at).toLocaleDateString('pt-PT')}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(job)} className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 mr-1">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)} className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Building2, ChevronRight, HelpCircle, FileText, Bot, CheckCircle2, Lock, UserPlus, LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';
import { getJobs, JobOpportunity } from '@/services/jobsService';
import UniversalAd from '@/components/ads/UniversalAd';

const JobFeed: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Todas');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);
  
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [authGateReason, setAuthGateReason] = useState<string>('');
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);

  // Carregar as vagas do serviço (agora é assíncrono para suportar API no futuro)
  React.useEffect(() => {
    const loadJobs = async () => {
      const fetchedJobs = await getJobs(searchTerm, selectedCity, selectedCategory);
      setJobs(fetchedJobs);
    };
    loadJobs();
  }, [searchTerm, selectedCity, selectedCategory]);

  const cities = ['Todas', 'Maputo', 'Beira', 'Nampula', 'Pemba', 'Inhambane'];
  
  const triggerAuthGate = (reason: string) => {
    setAuthGateReason(reason);
    setShowAuthGate(true);
  };

  const handleApplyClick = (job: JobOpportunity) => {
    if (!user) {
      setSelectedJob(null);
      triggerAuthGate(`Para se candidatar à vaga de "${job.title}" na empresa "${job.company}" com o seu CV do MozVita, crie a sua conta gratuita!`);
      return;
    }
    setSelectedJob(null);
    toast({
      title: 'Candidatura Iniciada! 🚀',
      description: `A redirecionar para a criação da Carta de Apresentação preenchida para a vaga de ${job.title} na ${job.company}.`
    });
    navigate('/carta-apresentacao', { state: { jobTitle: job.title, company: job.company } });
  };

  const askAiAboutJob = (job: JobOpportunity) => {
    setSelectedJob(null);
    navigate('/ia', { state: { initialPrompt: `Como me posso destacar e preparar o meu CV para a vaga de "${job.title}" na empresa "${job.company}" em ${job.location}?` } });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24">
      <SEO 
        title="Vagas Moçambique | MozVita"
        description="Feed de Vagas de Emprego em Moçambique."
        canonical="/vagas"
      />

      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-6">
        <UniversalAd slotName="header" className="mb-2" />
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Oportunidades em Moçambique</h1>
          <p className="text-slate-500 mt-2">Encontre a sua próxima grande oportunidade de carreira.</p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              type="text"
              placeholder="Buscar cargo ou empresa (ex: Logística, Sasol, Contabilidade)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-12 rounded-2xl text-sm border-slate-200 focus:border-slate-400 bg-slate-50/50"
            />
          </div>

          {/* City Filters */}
          <div className="flex flex-wrap gap-1.5">
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedCity === city
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <React.Fragment key={job.id}>
                <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-all bg-white flex flex-col h-full border">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                          {job.category} / {job.type}
                        </span>
                        {job.featured && (
                          <span className="text-xs font-bold text-white bg-brand-500 px-2 py-1 rounded-md ml-2 inline-flex items-center shadow-sm">
                            <Star className="w-3 h-3 mr-1" /> Destaque
                          </span>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors cursor-pointer" onClick={() => setSelectedJob(job)}>
                      {job.title}
                    </CardTitle>
                    <CardDescription className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" /> {job.company} — {job.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between pt-0 pb-4 px-4">
                    <p className="text-slate-600 text-xs line-clamp-2 my-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg">
                        {job.salary}
                      </span>
                      <Button 
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95"
                        onClick={() => {
                          if (job.application_url) {
                            window.open(job.application_url, '_blank');
                          } else if (job.application_email) {
                            window.location.href = `mailto:${job.application_email}?subject=Candidatura à vaga de ${job.title}`;
                          } else {
                            toast({ description: 'Para esta vaga, procure-a diretamente no portal da empresa.' });
                          }
                        }}
                      >
                        Ver Vaga <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {index === 1 && (
                  <div className="col-span-full">
                    <UniversalAd slotName="job_feed_1" />
                  </div>
                )}
                {index === 4 && (
                  <div className="col-span-full">
                    <UniversalAd slotName="job_feed_2" />
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="col-span-full rounded-2xl p-8 text-center border border-slate-200 bg-white">
              <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">Nenhuma vaga encontrada</h3>
            </div>
          )}
        </div>
      </div>

      {/* JOB DETAIL DIALOG MODAL */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        {selectedJob && (
          <DialogContent className="max-w-2xl rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-brand-50 text-brand-700 border-brand-200 text-xs px-3 py-1 font-bold">
                  {selectedJob.category}
                </Badge>
                <Badge variant="outline" className="text-slate-500 text-xs">
                  {selectedJob.type}
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-black text-slate-900 leading-tight">
                {selectedJob.title}
              </DialogTitle>
              <DialogDescription className="text-base font-bold text-slate-700 flex items-center gap-2 mt-1">
                <Building2 className="w-4 h-4 text-brand-600" /> {selectedJob.company} — <MapPin className="w-4 h-4 text-slate-400" /> {selectedJob.location}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 my-4 text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-2">Descrição da Função:</h4>
                <p className="leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-2">Requisitos Exigidos:</h4>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 block">Faixa Salarial Estimada:</span>
                  <span className="text-base font-black text-slate-900">{selectedJob.salary}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-800 block">Prazo de Candidatura:</span>
                  <span className="text-xs font-bold text-slate-900">{selectedJob.deadline}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
              <Button
                size="lg"
                onClick={() => handleApplyClick(selectedJob)}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-black h-13 rounded-2xl shadow-md"
              >
                <FileText className="w-5 h-5 mr-2" /> Candidatar com CV & Criar Carta
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => askAiAboutJob(selectedJob)}
                className="border-2 border-slate-200 hover:bg-slate-50 text-slate-800 font-bold h-13 rounded-2xl"
              >
                <Bot className="w-5 h-5 mr-2 text-brand-600" /> Dicas da IA para esta vaga
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* AUTH GATE DIALOG MODAL */}
      <Dialog open={showAuthGate} onOpenChange={setShowAuthGate}>
        <DialogContent className="max-w-md rounded-3xl p-6 md:p-8 text-center">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center text-white mx-auto mb-4 shadow-xl">
            <Lock className="w-8 h-8" />
          </div>
          <DialogTitle className="text-2xl font-black text-slate-900 mb-2">
            Crie a sua Conta Gratuita 🚀
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600 leading-relaxed mb-6">
            {authGateReason || 'Para candidatar-se a vagas com 1 clique e muito mais, crie a sua conta.'}
          </DialogDescription>

          <div className="space-y-3">
            <Button
              size="lg"
              onClick={() => {
                setShowAuthGate(false);
                navigate('/auth', { state: { isSignUp: true } });
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black h-13 rounded-2xl shadow-lg"
            >
              <UserPlus className="w-5 h-5 mr-2" /> Criar Conta Grátis Agora
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setShowAuthGate(false);
                navigate('/auth');
              }}
              className="w-full border-2 border-slate-200 hover:bg-slate-50 font-bold text-slate-700 h-13 rounded-2xl"
            >
              <LogIn className="w-5 h-5 mr-2 text-brand-600" /> Já tenho conta (Entrar)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobFeed;

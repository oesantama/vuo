'use client';
import { Plus, Github, FolderCode, WifiOff, RefreshCcw, Info, Send, X, Terminal, GitBranch, Zap, Sparkles, Cpu, Lock, Shield, LayoutDashboard, Settings, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useOfflineSync } from '@/lib/offlineSync';
import Link from 'next/link';

export default function Home() {
  const { isOnline, pendingPrompts } = useOfflineSync();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', repo: '' });
  const [projects, setProjects] = useState([
    { id: 'vuo-dev', name: 'CORE_SYSTEM_VUO', repo: 'oesantama/vuo' }
  ]);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.name && newProject.repo) {
      setProjects([...projects, { id: Date.now().toString(), ...newProject }]);
      setNewProject({ name: '', repo: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#00FF41] font-mono selection:bg-[#00FF41] selection:text-black">
      <div className="scanline" />
      
      {/* Matrix HUD - Simplified for clarity */}
      <header className="border-b-2 border-[#00FF41]/30 p-4 md:p-6 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 border border-[#00FF41]/40 animate-pulse">
               <Cpu size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter neon-text">VUO_INTERFACE</h1>
              <p className="text-[10px] opacity-50 tracking-[0.2em]">CONTROL_MODULE_V1</p>
            </div>
          </div>
          <div className="text-right flex items-center gap-4">
             <div className="hidden md:block">
                <span className="text-[9px] opacity-40 block">ENCRYPTION_KEY</span>
                <span className="text-[11px] font-bold tracking-widest text-[#00FF41]">MATRIX_SECURED</span>
             </div>
             <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-[#00FF41] shadow-[0_0_10px_#00FF41]' : 'bg-red-500 shadow-[0_0_10px_red]'}`} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-12 pb-24">
        
        {/* Clear Explanation Box */}
        <section className="cyber-panel p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00FF41] animate-pulse" />
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 opacity-70">
            <Info size={14} />
            Centro de Operaciones
          </div>
          <div className="space-y-4">
            <p className="text-sm leading-relaxed max-w-2xl">
              Bienvenido a la red VUO. Esta es tu plataforma de **Vibe-Coding**. Desde aquí puedes inyectar código mediante IA en tus repositorios y ver los resultados en vivo antes de publicarlos.
            </p>
            <div className="flex gap-4 text-[10px] font-bold opacity-60">
              <span className="flex items-center gap-1"><Shield size={10} /> PROTEGIDO</span>
              <span className="flex items-center gap-1"><Zap size={10} /> RESPUESTA_IA_INSTANTÁNEA</span>
            </div>
          </div>
        </section>

        {/* Repositories */}
        <section className="space-y-8">
          <div className="flex justify-between items-end border-b border-[#00FF41]/20 pb-4">
             <div>
                <h3 className="text-xl font-bold tracking-tighter flex items-center gap-2">
                  <LayoutDashboard size={18} />
                  MIS_REPOSITORIOS
                </h3>
                <p className="text-[10px] opacity-40 uppercase tracking-widest">Entidades clonadas en la nube</p>
             </div>
             <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 border border-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all font-bold text-xs uppercase tracking-widest active:scale-95 shadow-[0_0_15px_rgba(0,255,65,0.1)]"
            >
              [+] AÑADIR_NUEVO
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <div className="cyber-panel p-6 group cursor-pointer transition-all hover:bg-[#00FF41]/5 border border-[#00FF41]/10 hover:border-[#00FF41]/40">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-black border border-[#00FF41]/20 group-hover:bg-[#00FF41] group-hover:text-black transition-all">
                      <FolderCode size={24} />
                    </div>
                    <Github size={16} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 tracking-tight group-hover:neon-text transition-all">{project.name}</h4>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] opacity-30 text-white font-mono uppercase">repositorio_url:</span>
                    <span className="text-[10px] opacity-60 font-mono tracking-tighter truncate">{project.repo}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Documentation / Guidance */}
        <section className="grid md:grid-cols-3 gap-6 pt-12 border-t border-[#00FF41]/20">
          <FeatureCard 
            title="1. CONEXIÓN" 
            desc="Vincula tu repo de GitHub. VUO lo clona en un entorno seguro de ejecución dual." 
            icon={<GitBranch size={20} />}
          />
          <FeatureCard 
            title="2. VIBE-EDIT" 
            desc="Habla con la IA para modificar tu app. Recibe cambios de código y previsualización en vivo." 
            icon={<Sparkles size={20} />}
          />
          <FeatureCard 
            title="3. DESPLIEGUE" 
            desc="Sincroniza y publica tus cambios en la red global con un solo clic una vez validados." 
            icon={<CheckCircle2 size={20} />}
          />
        </section>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="cyber-panel w-full max-w-sm p-8 space-y-8 relative border-2 border-[#00FF41]/50">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold tracking-tighter text-white glow">VINCULAR_PROYECTO</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#00FF41]/40 hover:text-[#00FF41] transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddProject} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 px-1">nombre_del_proceso</label>
                <input 
                  autoFocus
                  required
                  placeholder="Ej: E-Commerce Pro"
                  className="w-full bg-black border-2 border-[#00FF41]/10 p-4 focus:border-[#00FF41] outline-none transition-all placeholder:text-[#00FF41]/20 text-white text-sm"
                  value={newProject.name}
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 px-1">endpoint_github</label>
                <input 
                  required
                  placeholder="usuario/repositorio"
                  className="w-full bg-black border-2 border-[#00FF41]/10 p-4 focus:border-[#00FF41] outline-none transition-all placeholder:text-[#00FF41]/20 text-white text-sm"
                  value={newProject.repo}
                  onChange={e => setNewProject({...newProject, repo: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-[#00FF41] text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-white transition-all active:scale-95 shadow-[0_0_20px_rgba(0,255,65,0.3)]"
              >
                CONFIRMAR_REGISTRO
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="p-6 border border-[#00FF41]/10 bg-[#00FF41]/5 space-y-3">
      <div className="text-[#00FF41] opacity-70 mb-2">{icon}</div>
      <h4 className="text-sm font-bold tracking-widest">{title}</h4>
      <p className="text-[11px] opacity-60 leading-relaxed font-sans">{desc}</p>
    </div>
  );
}

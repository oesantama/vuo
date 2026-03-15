'use client';
import { Plus, Github, FolderCode, WifiOff, RefreshCcw, Info, Send, X, Terminal, GitBranch, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useOfflineSync } from '@/lib/offlineSync';

export default function Home() {
  const { isOnline, pendingPrompts } = useOfflineSync();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', repo: '' });
  const [projects, setProjects] = useState([
    { id: 'poc', name: 'Milla 7 - Logística', repo: 'oscar/milla7-vuo' }
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
    <div className="p-4 md:p-6 space-y-8 animate-slide-up">
      {/* Offline Alert */}
      {!isOnline && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 glass">
          <WifiOff size={20} />
          <div className="text-sm">
            <p className="font-bold">Modo Offline Detectado</p>
            <p className="opacity-80 text-xs">Tus cambios se guardarán localmente y se sincronizarán cuando vuelvas a tener señal.</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gradient">Dashboard</h2>
        <p className="text-slate-400 text-sm">Gestiona tus micro-proyectos con el poder de IA.</p>
      </section>

      {/* Sync Status */}
      {pendingPrompts.length > 0 && isOnline && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 glass">
          <div className="flex items-center gap-3 text-sm font-medium">
            <RefreshCcw size={18} className="animate-spin" />
            <span>{pendingPrompts.length} cambios pendientes de sincronizar</span>
          </div>
          <button className="text-xs font-bold uppercase py-2 px-4 rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400 transition-all">
            Sincronizar
          </button>
        </div>
      )}

      {/* Projects Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Mis Repositorios</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
          >
            <Plus size={18} />
            <span>Añadir</span>
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`}>
              <div className="p-5 rounded-3xl glass-card group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Github size={40} />
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <FolderCode size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-100">{project.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{project.repo}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How it works Section */}
      <section className="pt-4 space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Info size={16} className="text-indigo-400" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">¿Cómo funciona VUO?</h3>
        </div>
        
        <div className="grid gap-3">
          <Step 
            icon={<Plus size={18} />} 
            title="Añade tu Repo" 
            desc="Vincula la URL de tu repositorio de GitHub para empezar." 
          />
          <Step 
            icon={<Zap size={18} />} 
            title="Chat con IA" 
            desc="Pide cambios o nuevas funciones usando lenguaje natural." 
          />
          <Step 
            icon={<GitBranch size={18} />} 
            title="Sincronización" 
            desc="VUO escribe el código y hace el commit/push automáticamente por ti." 
          />
        </div>
      </section>

      {/* Modal for adding projects */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-sm glass rounded-3xl p-6 space-y-6 animate-slide-up border border-white/20">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gradient">Nuevo Proyecto</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nombre del Proyecto</label>
                <input 
                  autoFocus
                  required
                  placeholder="Ej: Milla 7 Logística"
                  className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                  value={newProject.name}
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Repo GitHub (usuario/repo)</label>
                <input 
                  required
                  placeholder="Ej: oesantama/vuo"
                  className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                  value={newProject.repo}
                  onChange={e => setNewProject({...newProject, repo: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                <span>Registrar Proyecto</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl glass border-none bg-indigo-500/5">
      <div className="mt-1 p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-200 text-sm">{title}</h4>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

'use client';
import { Plus, Github, FolderCode, WifiOff, RefreshCcw, Info, Send, X, Terminal, GitBranch, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useOfflineSync } from '@/lib/offlineSync';
import Link from 'next/link';

export default function Home() {
  const { isOnline, pendingPrompts } = useOfflineSync();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', repo: '' });
  const [projects, setProjects] = useState([
    { id: 'vuo-dev', name: 'Sistema VUO - Core', repo: 'oesantama/vuo' }
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
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-10">
        
        {/* Branding & Explanation */}
        <header className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30">
              <Sparkles className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              VUO
            </h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-100">Vibe-Coding Platform</h2>
            <p className="text-slate-400 leading-relaxed">
              VUO es un sistema inteligente que te permite programar y desplegar aplicaciones directamente desde tu servidor. 
              Utiliza IA para escribir código, previsualizar cambios en vivo y sincronizar todo con tu repositorio de GitHub de forma profesional.
            </p>
          </div>
        </header>

        {/* Offline Alert */}
        {!isOnline && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 animate-pulse bg-slate-900/50 backdrop-blur-xl">
            <WifiOff size={20} />
            <div className="text-sm">
              <p className="font-bold">Modo Offline</p>
              <p className="opacity-80">Edita sin conexión. Los cambios se subirán al volver a línea.</p>
            </div>
          </div>
        )}

        {/* Projects Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Tus Proyectos</h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 py-2 px-5 rounded-full bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-400 transition-all text-sm font-bold active:scale-95"
            >
              <Plus size={16} />
              Añadir Repositorio
            </button>
          </div>

          <div className="grid gap-4">
            {projects.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <div className="p-5 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all group overflow-hidden relative">
                  <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <Github size={120} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <FolderCode size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-200">{project.name}</h4>
                        <p className="text-xs text-slate-500 font-mono flex items-center gap-1">
                          <Github size={12} /> {project.repo}
                        </p>
                      </div>
                    </div>
                    <div className="p-2 rounded-full border border-slate-800 group-hover:bg-slate-700">
                      <Zap size={16} className="text-slate-500 group-hover:text-yellow-400" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Guide Section */}
        <section className="pt-6 space-y-6 border-t border-slate-800/50">
          <div className="flex items-center gap-2">
            <Info size={16} className="text-indigo-400" />
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">¿Cómo funciona?</h3>
          </div>
          
          <div className="space-y-4">
            <GuideItem 
              num="01"
              title="Vincula tu Proyecto"
              desc="Añade un repositorio de GitHub que quieras modificar. VUO lo clonará en tu servidor de forma privada."
            />
            <GuideItem 
              num="02"
              title="Vibe-Coding (IA)"
              desc="Entra al editor y pide cambios en lenguaje natural. VUO escribirá el código y te mostrará una previsualización real."
            />
            <GuideItem 
              num="03"
              title="Despliegue Seguro"
              desc="Una vez estés contento con el resultado, dale a 'Desplegar'. Los cambios se subirán a GitHub y se publicarán."
            />
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Nuevo Repositorio</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddProject} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase px-1">Nombre</label>
                <input 
                  autoFocus
                  required
                  placeholder="Ej: Mi App Increíble"
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
                  value={newProject.name}
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase px-1">Repo GitHub</label>
                <input 
                  required
                  placeholder="usuario/repositorio"
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
                  value={newProject.repo}
                  onChange={e => setNewProject({...newProject, repo: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Guardar Proyecto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function GuideItem({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 group">
      <div className="text-2xl font-black text-slate-800 group-hover:text-indigo-900/50 transition-colors tabular-nums">{num}</div>
      <div className="space-y-1">
        <h4 className="font-bold text-slate-200">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

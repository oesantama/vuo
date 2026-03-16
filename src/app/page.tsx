'use client';
import { Plus, Github, FolderCode, WifiOff, RefreshCcw, Info, Send, X, Terminal, GitBranch, Zap, Sparkles, Cpu, Lock, Shield } from 'lucide-react';
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
      
      {/* Header / Cyber HUD */}
      <header className="border-b-2 border-[#00FF41]/30 p-6 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-end">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.4em] text-[#00FF41]/60">
              <Cpu size={12} />
              SYSTEM_V1.0.42_STABLE
            </div>
            <h1 className="text-5xl font-black tracking-tighter neon-text">
              VUO<span className="animate-pulse">_</span>
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] text-[#00FF41]/40 uppercase tracking-widest">Connection Status</p>
            <div className={`text-xs font-bold ${isOnline ? 'text-[#00FF41]' : 'text-red-500 animate-pulse'}`}>
              {isOnline ? 'ENCRYPTED_ONLINE' : 'LINK_OFFLINE_MODE'}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-12 pb-24">
        
        {/* Terminal Intro */}
        <section className="cyber-panel p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#00FF41]/20 pb-2 mb-4">
            <Terminal size={14} />
            <span className="text-xs uppercase tracking-widest">Kernel_Info</span>
          </div>
          <p className="text-sm leading-relaxed opacity-90">
            &gt; Inicializando entorno de Vibe-Coding...<br/>
            &gt; Cargando parámetros de IA (Google Gemini 1.5 Pro)...<br/>
            &gt; VUO permite la manipulación directa de código fuente y despliegue automatizado.
          </p>
        </section>

        {/* Directory Listing */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-l-4 border-[#00FF41] pl-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em]">Directory: /projects</h3>
              <p className="text-[10px] opacity-40 uppercase">Active repositories for neural manipulation</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 border-2 border-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all font-bold text-xs uppercase tracking-widest active:scale-95 shadow-[0_0_15px_rgba(0,255,65,0.2)]"
            >
              [+] NEW_ENTITY
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <div className="cyber-panel p-6 group cursor-pointer transition-all hover:translate-y-[-4px] hover:shadow-[0_10px_30px_rgba(0,255,65,0.15)] relative overflow-hidden ring-1 ring-[#00FF41]/10 hover:ring-[#00FF41]/40">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41]">
                      <FolderCode size={20} />
                    </div>
                    <GitBranch size={16} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-lg font-bold mb-1 tracking-tight group-hover:neon-text transition-all">{project.name}</h4>
                  <p className="text-[10px] opacity-40 font-mono tracking-tighter truncate underline">{project.repo}</p>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-8 h-8 opacity-[0.05] group-hover:opacity-20 transition-opacity pointer-events-none">
                     <Github size={32} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works / Matrix Code Guide */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-l-4 border-[#00FF41]/40 pl-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em]">Protocol_Documentation</h3>
          </div>
          
          <div className="grid gap-4 opacity-70">
            <div className="flex gap-4 items-start">
              <span className="text-xs font-bold border border-[#00FF41]/40 px-2 py-1">01</span>
              <div>
                <h4 className="text-sm font-bold uppercase">Ingress_Repositories</h4>
                <p className="text-xs opacity-60">Conecta tu código a través de Git. VUO crea una interfaz de conexión binaria.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-xs font-bold border border-[#00FF41]/40 px-2 py-1">02</span>
              <div>
                <h4 className="text-sm font-bold uppercase">IA_Transformation</h4>
                <p className="text-xs opacity-60">Usa lenguaje natural para reescribir la realidad de tu app. Gemini modula el código en vivo.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-xs font-bold border border-[#00FF41]/40 px-2 py-1">03</span>
              <div>
                <h4 className="text-sm font-bold uppercase">Universal_Deployment</h4>
                <p className="text-xs opacity-60">Ejecuta el protocolo 'Deploy' para materializar los cambios en la red global.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Futuristic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="cyber-panel w-full max-w-sm p-8 space-y-8 relative border-2 border-[#00FF41]">
            <div className="flex justify-between items-center border-b border-[#00FF41]/30 pb-4">
              <h3 className="text-xl font-black text-white">ADD_NEW_PROCESS</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#00FF41]/40 hover:text-[#00FF41]">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddProject} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-50 px-1">process_label</label>
                <input 
                  autoFocus
                  required
                  className="w-full bg-black border-b-2 border-[#00FF41]/30 p-2 focus:border-[#00FF41] outline-none transition-all placeholder:text-[#00FF41]/10 text-white"
                  value={newProject.name}
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-50 px-1">git_endpoint</label>
                <input 
                  required
                  placeholder="usr/repo"
                  className="w-full bg-black border-b-2 border-[#00FF41]/30 p-2 focus:border-[#00FF41] outline-none transition-all placeholder:text-[#00FF41]/10 text-white"
                  value={newProject.repo}
                  onChange={e => setNewProject({...newProject, repo: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-[#00FF41] text-black font-black uppercase text-sm tracking-widest hover:bg-white transition-all active:scale-95"
              >
                EXECUTE_REGISTRATION
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

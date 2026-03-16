'use client';
import { Plus, Github, FolderCode, WifiOff, RefreshCcw, Info, Send, X, Terminal, GitBranch, Zap, Sparkles, Cpu, Lock, Shield, LayoutDashboard, HelpCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useOfflineSync } from '@/lib/offlineSync';
import Link from 'next/link';

export default function Home() {
  const { isOnline } = useOfflineSync();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', repo: '' });
  const [projects, setProjects] = useState([
    { id: 'vuo-dev', name: 'SISTEMA_VUO_NUCLEO', repo: 'oesantama/vuo' }
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
      
      {/* HUD de Cabecera Profesional */}
      <header className="border-b-2 border-[#00FF41]/20 p-6 bg-black/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 border-2 border-[#00FF41] shadow-[0_0_10px_#00FF41] animate-pulse">
               <Terminal size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter neon-text uppercase">Vuo Matrix Edition</h1>
              <p className="text-[10px] opacity-50 tracking-[0.4em]">PLANTILLA_INTELIGENTE_V2.0</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:block text-right">
                <p className="text-[9px] opacity-40 uppercase">Estatus del Enlace</p>
                <p className="text-xs font-bold tracking-widest">{isOnline ? 'CONEXIÓN_SEGURA' : 'MODO_DESCONECTADO'}</p>
             </div>
             <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-[#00FF41] shadow-[0_0_15px_#00FF41]' : 'bg-red-500'}`} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-12 space-y-16 pb-32">
        
        {/* Sección de Bienvenida y Manual Rápido */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded-full text-[10px] font-bold">
               <Sparkles size={12} /> BIENVENIDO_OPERADOR
            </div>
            <h2 className="text-4xl font-black leading-tight">La Matrix de tu Código,<br/> <span className="neon-text">Bajo tu Control.</span></h2>
            <p className="text-slate-400 font-sans leading-relaxed">
              Vuo no es solo un editor; es un entorno neural donde puedes pedirle a la IA que modifique tu aplicación en tiempo real, probar los cambios en una previsualización segura y publicarlos en la red con un solo clic.
            </p>
            <div className="flex gap-4">
               <button onClick={() => setIsModalOpen(true)} className="px-8 py-3 bg-[#00FF41] text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-lg shadow-[#00FF41]/20">
                  Empezar Ahora
               </button>
            </div>
          </div>
          
          <div className="cyber-panel p-8 bg-[#00FF41]/5 border-[#00FF41]/20 space-y-6">
             <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#00FF41]/20 pb-4">
                <HelpCircle size={16} /> GUÍA_RÁPIDA_DE_USUARIO
             </h3>
             <div className="space-y-4 text-[11px] font-sans">
                <Step num="1" text="Vincula tu repositorio de GitHub usando el botón 'Añadir Nuevo'." />
                <Step num="2" text="Entra al editor y usa el chat para pedir cambios (ej: 'Cambia el color de la página')." />
                <Step num="3" text="Observa la previsualización en vivo en el panel derecho para validar el diseño." />
                <Step num="4" text="Pulsa 'Publicar Cambios' para sincronizar todo con tu servidor real." />
             </div>
          </div>
        </section>

        {/* Listado de Proyectos */}
        <section className="space-y-8">
          <div className="flex justify-between items-end border-b border-[#00FF41]/20 pb-4">
             <h3 className="text-xl font-bold tracking-tighter flex items-center gap-2">
                <LayoutDashboard size={20} /> MIS_PROYECTOS_ACTIVOS
             </h3>
             <button onClick={() => setIsModalOpen(true)} className="text-[10px] font-black hover:neon-text transition-all tracking-widest underline decoration-[#00FF41]/40 decoration-wavy">
                [ GESTIONAR_ENTIDADES ]
             </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <div className="cyber-panel p-8 group cursor-pointer border-[#00FF41]/10 hover:border-[#00FF41]/60 transition-all hover:bg-[#00FF41]/5 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-black border border-[#00FF41]/30 group-hover:shadow-[0_0_15px_#00FF4133]">
                      <FolderCode size={32} />
                    </div>
                    <ArrowRight size={20} className="translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <h4 className="text-xl font-black mb-2 group-hover:neon-text">{project.name}</h4>
                  <p className="text-[10px] opacity-40 font-mono flex items-center gap-1">
                    <Github size={10} /> {project.repo}
                  </p>
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00FF41] group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Modal Futurista */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/98 backdrop-blur-2xl">
          <div className="cyber-panel w-full max-w-md p-10 space-y-10 border-2 border-[#00FF41]/40">
            <div className="flex justify-between items-center border-b border-[#00FF41]/20 pb-6">
              <h3 className="text-2xl font-black neon-text uppercase tracking-tighter">Nueva Conexión</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddProject} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-40 px-1">Identificador del Proyecto</label>
                <input 
                  autoFocus
                  required
                  placeholder="Ej: Dashboard_Analitica"
                  className="w-full bg-black border-2 border-[#00FF41]/10 p-5 focus:border-[#00FF41] outline-none transition-all placeholder:text-[#00FF41]/10 text-white"
                  value={newProject.name}
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-40 px-1">Endpoint de GitHub (usuario/repo)</label>
                <input 
                  required
                  placeholder="vuo/core-system"
                  className="w-full bg-black border-2 border-[#00FF41]/10 p-5 focus:border-[#00FF41] outline-none transition-all placeholder:text-[#00FF41]/10 text-white"
                  value={newProject.repo}
                  onChange={e => setNewProject({...newProject, repo: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full py-5 bg-[#00FF41] text-black font-black uppercase text-sm tracking-[0.4em] hover:bg-white transition-all shadow-[0_10px_30px_#00FF4144]">
                Vincular Ahora
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({ num, text }: { num: string, text: string }) {
  return (
    <div className="flex gap-4 items-start">
       <span className="w-6 h-6 flex items-center justify-center border border-[#00FF41] rounded-sm text-[10px] font-black bg-[#00FF41]/10">{num}</span>
       <p className="flex-1 text-[#00FF41] opacity-70 leading-relaxed font-bold">{text}</p>
    </div>
  );
}

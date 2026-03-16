import { useState, useEffect } from 'react';
import { Plus, Github, FolderCode, WifiOff, RefreshCcw, Info, Send, X, Terminal, GitBranch, Zap, Sparkles, Cpu, Lock, Shield, LayoutDashboard, HelpCircle, ArrowRight, Loader2, Key } from 'lucide-react';
import { useOfflineSync } from '@/lib/offlineSync';
import Link from 'next/link';

export default function Home() {
  const { isOnline } = useOfflineSync();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', repo: '', token: '' });
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (e) {
      console.error("Error cargando proyectos:", e);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.repo) return;

    setIsCreating(true);
    const projectId = newProject.name.toLowerCase().replace(/\s+/g, '-');

    try {
      // 1. Guardar en la base de datos de persistencia
      const resProj = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProject, id: projectId }),
      });

      // 2. Iniciar clonación real
      const resClone = await fetch('/api/git/clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo: newProject.repo, projectId, token: newProject.token }),
      });

      const cloneData = await resClone.json();
      if (cloneData.success) {
        await fetchProjects();
        setIsModalOpen(false);
        setNewProject({ name: '', repo: '', token: '' });
      } else {
        alert("Error de clonación: " + cloneData.error);
      }
    } catch (e: any) {
      alert("Error crítico: " + e.message);
    } finally {
      setIsCreating(false);
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
                  Vincular Nuevo Proyecto
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
             <button onClick={fetchProjects} className="text-[10px] font-black hover:neon-text transition-all tracking-widest flex items-center gap-2">
                <RefreshCcw size={12} className={isLoadingProjects ? 'animate-spin' : ''} /> REFRESCAR_RED
             </button>
          </div>

          {isLoadingProjects ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-30">
               <Loader2 size={40} className="animate-spin mb-4" />
               <p className="text-xs tracking-[0.5em]">CARGANDO_DATOS_NEURALES...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-[#00FF41]/20 text-center space-y-4">
               <p className="text-sm opacity-40">No se detectan entidades vinculadas en este nodo.</p>
               <button onClick={() => setIsModalOpen(true)} className="text-[#00FF41] font-bold underline">[ VINCULAR_PRIMER_PROYECTO ]</button>
            </div>
          ) : (
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
                    <h4 className="text-xl font-black mb-2 group-hover:neon-text uppercase tracking-tighter">{project.name}</h4>
                    <p className="text-[10px] opacity-40 font-mono flex items-center gap-1 overflow-hidden">
                      <Github size={10} /> {project.repo.replace('https://', '')}
                    </p>
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00FF41] group-hover:w-full transition-all duration-500" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal Futurista */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/98 backdrop-blur-2xl">
          <div className="cyber-panel w-full max-w-md p-10 space-y-10 border-2 border-[#00FF41]/40">
            <div className="flex justify-between items-center border-b border-[#00FF41]/20 pb-6">
              <h3 className="text-2xl font-black neon-text uppercase tracking-tighter">Nueva Conexión</h3>
              <button onClick={() => !isCreating && setIsModalOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddProject} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-40 px-1">Identificador del Proyecto</label>
                <input 
                  autoFocus
                  required
                  disabled={isCreating}
                  placeholder="Ej: Dashboard_Analitica"
                  className="w-full bg-black border-2 border-[#00FF41]/10 p-5 focus:border-[#00FF41] outline-none transition-all placeholder:text-[#00FF41]/10 text-white disabled:opacity-30"
                  value={newProject.name}
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-40 px-1">URL de Repositorio (https)</label>
                <input 
                  required
                  disabled={isCreating}
                  placeholder="https://github.com/vuo/core"
                  className="w-full bg-black border-2 border-[#00FF41]/10 p-5 focus:border-[#00FF41] outline-none transition-all placeholder:text-[#00FF41]/10 text-white disabled:opacity-30"
                  value={newProject.repo}
                  onChange={e => setNewProject({...newProject, repo: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-40 px-1 flex items-center gap-2">
                   <Key size={10} /> GitHub Personal Access Token (Opcional)
                </label>
                <input 
                  type="password"
                  disabled={isCreating}
                  placeholder="ghp_xxxxxxxxxxxx"
                  className="w-full bg-black border-2 border-[#00FF41]/10 p-5 focus:border-[#00FF41] outline-none transition-all placeholder:text-[#00FF41]/10 text-white disabled:opacity-30"
                  value={newProject.token}
                  onChange={e => setNewProject({...newProject, token: e.target.value})}
                />
                <p className="text-[9px] opacity-30 italic">Necesario solo para repositorios privados.</p>
              </div>

              <button 
                type="submit" 
                disabled={isCreating}
                className="w-full py-5 bg-[#00FF41] text-black font-black uppercase text-sm tracking-[0.4em] hover:bg-white transition-all shadow-[0_10px_30px_#00FF4144] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isCreating ? <><Loader2 className="animate-spin" /> CLONANDO_ENTIDAD...</> : 'ESTABLECER_CONEXIÓN'}
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

function Step({ num, text }: { num: string, text: string }) {
  return (
    <div className="flex gap-4 items-start">
       <span className="w-6 h-6 flex items-center justify-center border border-[#00FF41] rounded-sm text-[10px] font-black bg-[#00FF41]/10">{num}</span>
       <p className="flex-1 text-[#00FF41] opacity-70 leading-relaxed font-bold">{text}</p>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { Send, ChevronLeft, Github, Smartphone, Laptop, Monitor, CheckCircle2, Terminal as TerminalIcon, ShieldCheck, Zap, Cpu, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProjectEditor({ params }: { params: { id: string } }) {
  const [instruction, setInstruction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [chat, setChat] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: '>>> VUO_NEURAL_INTERFACE_READY. Estableciendo conexión con el núcleo de IA... Esperando instrucciones de código.' }
  ]);

  const handleVibe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim()) return;

    setChat(prev => [...prev, { role: 'user', content: '> ' + instruction }]);
    setIsLoading(true);
    setInstruction('');

    try {
      const res = await fetch('/api/vibe/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction, projectId: params.id }),
      });
      
      const data = await res.json();
      if (data.success) {
        setChat(prev => [...prev, { role: 'ai', content: '>>> MODIFICACIÓN_COMPLETADA. El entorno de previsualización ha sido actualizado.' }]);
        setLastUpdate(Date.now());
      } else {
        setChat(prev => [...prev, { role: 'ai', content: '!!! FALLO_EN_TRANSACCIÓN: ' + data.error }]);
      }
    } catch (e) {
      setChat(prev => [...prev, { role: 'ai', content: '!!! ERROR_DE_RED: La red VUO no responde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeploy = async () => {
    setIsLoading(true);
    setChat(prev => [...prev, { role: 'ai', content: '>>> INICIANDO_PROTOCOLO_DESPLIEGUE_FINAL...' }]);
    try {
      const res = await fetch('/api/git/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: params.id }),
      });
      const data = await res.json();
      if (data.success) {
        setChat(prev => [...prev, { role: 'ai', content: '🚀 DESPLIEGUE_EXITOSO. Los cambios ya son públicos en GitHub.' }]);
      } else {
        setChat(prev => [...prev, { role: 'ai', content: '!!! ERROR_DE_SINCRONIZACIÓN: ' + data.error }]);
      }
    } catch (e) {
      setChat(prev => [...prev, { role: 'ai', content: '!!! TRANSMISIÓN_INTERRUMPIDA.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-[#00FF41] font-mono selection:bg-[#00FF41] selection:text-black overflow-hidden relative">
      <div className="scanline" />

      {/* Industrial Header */}
      <header className="px-6 py-4 bg-black border-b-2 border-[#00FF41]/40 flex justify-between items-center z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 px-3 py-1 border border-[#00FF41]/20 hover:border-[#00FF41] hover:bg-[#00FF41]/10 transition-all text-[10px] tracking-widest">
            <ChevronLeft size={14} /> SALIR_AL_HUD
          </Link>
          <div className="h-4 w-[1px] bg-[#00FF41]/20" />
          <div className="flex items-center gap-3">
             <div className="p-1 px-2 border-2 border-[#00FF41] text-[10px] font-black glow-border">VIBE_EDITOR</div>
             <span className="text-[10px] opacity-40 hidden sm:block tracking-[0.3em]">MODULO_REESCRITURA_BINARIA</span>
          </div>
        </div>
        <button 
          onClick={handleDeploy}
          disabled={isLoading}
          className="px-6 py-2 bg-[#00FF41] text-black font-black hover:bg-white transition-all shadow-[0_0_25px_rgba(0,255,65,0.3)] disabled:opacity-30 text-xs tracking-widest flex items-center gap-2"
        >
          <Zap size={14} fill="currentColor" /> PUBLICAR_CAMBIOS
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Terminal Console */}
        <div className="w-full md:w-[480px] flex flex-col border-r-2 border-[#00FF41]/20 bg-black/40 relative">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide text-[13px] tracking-tight">
            {chat.map((msg, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2 opacity-40">
                   <div className={`w-1 h-1 rounded-full ${msg.role === 'user' ? 'bg-white' : 'bg-[#00FF41]'}`} />
                   <span className="text-[9px] font-bold uppercase">
                     {msg.role === 'user' ? 'SOLICITUD_HUMANA' : 'LOG_SISTEMA_VUO'}
                   </span>
                </div>
                <div className={`p-4 border-l-2 ${
                  msg.role === 'user' 
                  ? 'border-white text-white bg-white/5' 
                  : 'border-[#00FF41] text-[#00FF41] bg-[#00FF41]/5'
                } leading-relaxed font-sans text-sm`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-3 text-[10px] animate-pulse text-[#00FF41]/60">
                 <TerminalIcon size={14} className="animate-spin" />
                 SINTETIZANDO_NUEVA_REALIDAD_DE_CÓDIGO...
              </div>
            )}
          </div>

          <div className="p-6 border-t-2 border-[#00FF41]/20 bg-black/80 backdrop-blur-md">
            <form onSubmit={handleVibe} className="relative group">
              <div className="absolute -top-3 left-4 bg-black px-2 text-[9px] font-bold opacity-40 tracking-widest text-[#00FF41]">INPUT_STREAM</div>
              <textarea 
                rows={3}
                placeholder="Escribe tu instrucción aquí... (ej: 'Crea una sección de productos')"
                className="w-full bg-black border border-[#00FF41]/30 p-4 pt-5 focus:border-[#00FF41] outline-none transition-all placeholder:text-[#00FF41]/20 text-sm resize-none pr-14 font-sans no-scrollbar"
                value={instruction}
                onChange={e => setInstruction(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute bottom-4 right-4 p-3 bg-transparent border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all disabled:opacity-20"
              >
                <Send size={18} />
              </button>
            </form>
            <div className="mt-4 flex items-center gap-2 text-[9px] opacity-30 italic">
               <AlertCircle size={10} />
               Los cambios afectarán directamente a los archivos del repositorio clonado.
            </div>
          </div>
        </div>

        {/* Neural Preview Viewport */}
        <div className="hidden md:flex flex-1 flex-col bg-[#02040a] items-center p-8 overflow-y-auto relative">
          <div className="mb-8 flex items-center justify-between w-full max-w-5xl">
             <div className="flex gap-2 bg-black/80 p-1 border-2 border-[#00FF41]/20">
                <ViewBtn active={viewMode === 'mobile'} onClick={() => setViewMode('mobile')} icon={<Smartphone size={16} />} />
                <ViewBtn active={viewMode === 'tablet'} onClick={() => setViewMode('tablet')} icon={<Laptop size={16} />} />
                <ViewBtn active={viewMode === 'desktop'} onClick={() => setViewMode('desktop')} icon={<Monitor size={16} />} />
             </div>
             <div className="text-[10px] font-bold tracking-[0.2em] border-b border-[#00FF41]/40 pb-1">PREVISUALIZACIÓN_EN_VIVO</div>
          </div>

          <div className={`transition-all duration-700 bg-white shadow-[0_0_80px_rgba(0,255,65,0.08)] relative ${
            viewMode === 'mobile' ? 'w-[375px] h-[750px] rounded-[3rem] border-[14px] border-[#0d1117]' : 
            viewMode === 'tablet' ? 'w-[768px] h-[1000px] rounded-[2rem] border-[12px] border-[#0d1117]' : 
            'w-full max-w-5xl h-[700px] border-[8px] border-[#0d1117]'
          }`}>
            <iframe 
              src={`/preview?v=${lastUpdate}`}
              className="w-full h-full bg-slate-50 opacity-95"
              title="VUO_LIVE_PREVIEW"
            />
          </div>
          
          <div className="mt-8 flex items-center gap-12 text-[9px] tracking-[0.5em] opacity-40 font-black">
            <span className="flex items-center gap-2"><Sparkles size={12} /> ENGINE_READY</span>
            <span className="flex items-center gap-2"><Lock size={12} /> SECURE_SANDBOX</span>
            <span className="flex items-center gap-2"><RefreshCcw size={12} className="animate-spin-slow" /> SYNC_ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewBtn({ active, onClick, icon }: { active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`p-2.5 transition-all ${
      active ? 'bg-[#00FF41] text-black shadow-lg shadow-[#00FF41]/20' : 'text-[#00FF41]/30 hover:bg-[#00FF41]/10'
    }`}>
      {icon}
    </button>
  );
}

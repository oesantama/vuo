'use client';
import { useState, useEffect } from 'react';
import { Send, ChevronLeft, Github, Smartphone, Laptop, Monitor, CheckCircle2, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ProjectEditor({ params }: { params: { id: string } }) {
  const [instruction, setInstruction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [chat, setChat] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Soy VUO AI. Describe los cambios que necesitas en el código y los aplicaré por ti en tiempo real.' }
  ]);

  const handleVibe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim()) return;

    setChat(prev => [...prev, { role: 'user', content: instruction }]);
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
        setChat(prev => [...prev, { role: 'ai', content: '✓ Cambios aplicados con éxito. Reconstruyendo previsualización...' }]);
        setLastUpdate(Date.now());
      } else {
        setChat(prev => [...prev, { role: 'ai', content: '✗ No pude aplicar los cambios: ' + data.error }]);
      }
    } catch (e) {
      setChat(prev => [...prev, { role: 'ai', content: 'Error de red en el proceso de Vibe-Coding.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeploy = async () => {
    setIsLoading(true);
    setChat(prev => [...prev, { role: 'ai', content: '📦 Iniciando sincronización final con GitHub...' }]);
    try {
      const res = await fetch('/api/git/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: params.id }),
      });
      const data = await res.json();
      if (data.success) {
        setChat(prev => [...prev, { role: 'ai', content: '🚀 ¡Código sincronizado! El sitio público se actualizará en unos instantes.' }]);
      } else {
        setChat(prev => [...prev, { role: 'ai', content: 'Error en sincronización: ' + data.error }]);
      }
    } catch (e) {
      setChat(prev => [...prev, { role: 'ai', content: 'Fallo al conectar con el servidor de despliegue.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans">
      {/* Header */}
      <header className="px-6 py-4 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-800 rounded-2xl transition-all border border-transparent hover:border-slate-700">
            <ChevronLeft size={20} />
          </Link>
          <div className="h-6 w-[1px] bg-slate-800 mx-1" />
          <h1 className="font-black text-xl tracking-tighter flex items-center gap-2">
            <Sparkles className="text-indigo-400" size={18} />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Vibe Editor</span>
          </h1>
        </div>
        <button 
          onClick={handleDeploy}
          disabled={isLoading}
          className="flex items-center gap-2 py-2 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
        >
          <CheckCircle2 size={16} />
          Desplegar a Production
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Col: Chat */}
        <div className="w-full md:w-[400px] flex flex-col bg-slate-900/30 border-r border-slate-800">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white ml-8 shadow-lg shadow-indigo-600/10' 
                  : 'bg-slate-800/80 text-slate-200 border border-slate-700 mr-8'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-4 rounded-3xl bg-slate-800/40 border border-slate-700 animate-pulse">
                  <TerminalIcon size={16} className="text-indigo-400 animate-spin" />
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-950/50 border-t border-slate-800">
            <form onSubmit={handleVibe} className="relative group">
              <textarea 
                rows={3}
                placeholder="Ej: Añade un botón de contacto..."
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-sm resize-none pr-14"
                value={instruction}
                onChange={e => setInstruction(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 active:scale-90 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Preview */}
        <div className="hidden md:flex flex-1 flex-col bg-[#050b1a] items-center p-8 overflow-y-auto">
          <div className="flex gap-2 mb-8 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            <ModeBtn active={viewMode === 'mobile'} onClick={() => setViewMode('mobile')} icon={<Smartphone size={16} />} />
            <ModeBtn active={viewMode === 'tablet'} onClick={() => setViewMode('tablet')} icon={<Laptop size={16} />} />
            <ModeBtn active={viewMode === 'desktop'} onClick={() => setViewMode('desktop')} icon={<Monitor size={16} />} />
          </div>

          <div className={`transition-all duration-500 bg-white rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(79,70,229,0.15)] ${
            viewMode === 'mobile' ? 'w-[375px] h-[750px] border-[12px] border-slate-900' : 
            viewMode === 'tablet' ? 'w-[800px] h-[1000px] border-[12px] border-slate-900' : 
            'w-full max-w-5xl h-[700px] border-[8px] border-slate-900'
          }`}>
            <iframe 
              src={`/preview?v=${lastUpdate}`}
              className="w-full h-full"
              title="VUO Live Preview"
            />
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
            Entorno de Previsualización Protegido
          </div>
        </div>
      </div>
    </div>
  );
}

function ModeBtn({ active, onClick, icon }: { active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`p-2.5 rounded-xl transition-all ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:bg-slate-800'
    }`}>
      {icon}
    </button>
  );
}

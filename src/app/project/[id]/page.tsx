'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Play, Save, ChevronLeft, Github, Laptop, Smartphone, Monitor, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ProjectEditor({ params }: { params: { id: string } }) {
  const [instruction, setInstruction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [chat, setChat] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Hola, soy VUO. ¿Qué cambio quieres hacer en tu proyecto hoje?' }
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
        setChat(prev => [...prev, { role: 'ai', content: 'He aplicado los cambios. La previsualización se está actualizando...' }]);
        setLastUpdate(Date.now()); // Forzamos refresh del iframe
      } else {
        setChat(prev => [...prev, { role: 'ai', content: 'Error: ' + data.error }]);
      }
    } catch (e) {
      setChat(prev => [...prev, { role: 'ai', content: 'Error de conexión.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeploy = async () => {
    setIsLoading(true);
    setChat(prev => [...prev, { role: 'ai', content: 'Iniciando despliegue final a GitHub...' }]);
    try {
      const res = await fetch('/api/git/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: params.id }),
      });
      const data = await res.json();
      if (data.success) {
        setChat(prev => [...prev, { role: 'ai', content: '¡Despliegue completado con éxito! Coolify actualizará la app en unos minutos.' }]);
      } else {
        setChat(prev => [...prev, { role: 'ai', content: 'Error en despliegue: ' + data.error }]);
      }
    } catch (e) {
      setChat(prev => [...prev, { role: 'ai', content: 'Error de red al intentar desplegar.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="p-4 border-b border-white/10 glass flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="font-bold text-gradient">Vibe Editor</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDeploy}
            disabled={isLoading}
            className="flex items-center gap-2 py-2 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs transition-all shadow-lg shadow-green-600/20 active:scale-95 disabled:opacity-50"
          >
            <CheckCircle2 size={16} />
            <span>Desplegar</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Chat/Editor Interface */}
        <div className="w-full md:w-1/3 flex flex-col border-r border-white/10 bg-slate-900/50">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'glass bg-white/5 text-slate-200'}`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-4 rounded-3xl glass bg-white/5 text-slate-400">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 bg-slate-950/50">
            <form onSubmit={handleVibe} className="relative">
              <textarea 
                rows={3}
                placeholder="Describe el cambio... (ej: Pon el fondo azul y añade un título)"
                className="w-full bg-slate-800/50 border border-white/10 p-4 rounded-2xl focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 text-sm resize-none pr-12"
                value={instruction}
                onChange={e => setInstruction(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute bottom-4 right-4 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 active:scale-90 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Right: Live Preview Iframe */}
        <div className="hidden md:flex flex-1 flex-col bg-slate-800/20 items-center p-6 relative">
          <div className="flex gap-4 mb-6 glass p-2 rounded-2xl">
            <button onClick={() => setViewMode('mobile')} title="Móvil" className={`p-2 rounded-xl transition-all ${viewMode === 'mobile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-500 hover:bg-white/5'}`}>
              <Smartphone size={18} />
            </button>
            <button onClick={() => setViewMode('tablet')} title="Tablet" className={`p-2 rounded-xl transition-all ${viewMode === 'tablet' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-500 hover:bg-white/5'}`}>
              <Laptop size={18} />
            </button>
            <button onClick={() => setViewMode('desktop')} title="Escritorio" className={`p-2 rounded-xl transition-all ${viewMode === 'desktop' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-500 hover:bg-white/5'}`}>
              <Monitor size={18} />
            </button>
          </div>

          <div className={`transition-all duration-500 bg-white rounded-2xl overflow-hidden shadow-2xl relative ${
            viewMode === 'mobile' ? 'w-[375px] h-[667px]' : 
            viewMode === 'tablet' ? 'w-[768px] h-[1024px]' : 
            'w-full h-full max-h-[800px]'
          }`}>
            <iframe 
              src={`/preview?t=${lastUpdate}`}
              className="w-full h-full border-none"
              title="Vibe Preview"
            />
          </div>
          
          <div className="absolute top-8 right-8 py-1 px-3 bg-red-500 text-white text-[10px] font-bold rounded-full animate-pulse flex items-center gap-1 uppercase tracking-tighter">
            <div className="w-1 h-1 bg-white rounded-full" />
            Live Preview
          </div>
        </div>
      </div>
    </div>
  );
}

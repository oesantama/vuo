'use client';
import { useState, useEffect } from 'react';
import { Send, ChevronLeft, Github, Smartphone, Laptop, Monitor, CheckCircle2, Terminal as TerminalIcon, ShieldCheck, Zap, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function ProjectEditor({ params }: { params: { id: string } }) {
  const [instruction, setInstruction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [chat, setChat] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: '>>> VUO_NEURAL_INTERFACE_CONNECTED. Describe el cambio necesario.' }
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
        setChat(prev => [...prev, { role: 'ai', content: '>>> CODE_MUTATION_SUCCESSFUL. Recargando frame de previsualización...' }]);
        setLastUpdate(Date.now());
      } else {
        setChat(prev => [...prev, { role: 'ai', content: '!!! ERROR: ' + data.error }]);
      }
    } catch (e) {
      setChat(prev => [...prev, { role: 'ai', content: '!!! CONNECTION_FAILURE' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeploy = async () => {
    setIsLoading(true);
    setChat(prev => [...prev, { role: 'ai', content: '>>> INITIATING_FINAL_SYNC_PROTOCOL...' }]);
    try {
      const res = await fetch('/api/git/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: params.id }),
      });
      const data = await res.json();
      if (data.success) {
        setChat(prev => [...prev, { role: 'ai', content: '>>> DEPLOY_SEQUENCE_COMPLETE. Cambios propagados a GitHub.' }]);
      } else {
        setChat(prev => [...prev, { role: 'ai', content: '!!! SYNC_ERROR: ' + data.error }]);
      }
    } catch (e) {
      setChat(prev => [...prev, { role: 'ai', content: '!!! TRANSMISSION_FAILED' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-[#00FF41] font-mono selection:bg-[#00FF41] selection:text-black overflow-hidden uppercase">
      <div className="scanline" />

      {/* Cyber Header */}
      <header className="px-6 py-4 bg-black border-b-2 border-[#00FF41]/40 flex justify-between items-center z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="p-1 border border-transparent hover:border-[#00FF41] transition-all">
            &lt; RETURN_HOME
          </Link>
          <div className="flex items-center gap-2">
             <Cpu size={14} className="animate-pulse" />
             <h1 className="font-black text-lg tracking-[0.2em] neon-text">VIBE_EDITOR_BETA</h1>
          </div>
        </div>
        <button 
          onClick={handleDeploy}
          disabled={isLoading}
          className="px-8 py-2 bg-[#00FF41] text-black font-black hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,65,0.4)] disabled:opacity-30"
        >
          EXECUTE_DEPLOY_01
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Console Panel */}
        <div className="w-full md:w-[450px] flex flex-col border-r-2 border-[#00FF41]/20 bg-black/40">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide text-[13px] tracking-tight">
            {chat.map((msg, i) => (
              <div key={i} className="space-y-1">
                <span className={`text-[10px] font-bold ${msg.role === 'user' ? 'text-white' : 'text-[#00FF41]/40'}`}>
                  {msg.role === 'user' ? '[USR_TRANS]' : '[SYS_LOG]'}
                </span>
                <div className={`p-4 ${
                  msg.role === 'user' 
                  ? 'border-l-2 border-white text-white bg-white/5' 
                  : 'border-l-2 border-[#00FF41] text-[#00FF41] bg-[#00FF41]/5'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 text-[10px] animate-pulse">
                 <TerminalIcon size={12} />
                 WAITING_FOR_IA_DECRYPTION...
              </div>
            )}
          </div>

          <div className="p-6 border-t-2 border-[#00FF41]/20 bg-black">
            <form onSubmit={handleVibe} className="relative">
              <textarea 
                rows={3}
                placeholder="INPUT_INSTRUCTION..."
                className="w-full bg-black border border-[#00FF41]/30 p-4 focus:border-[#00FF41] outline-none transition-all placeholder:text-[#00FF41]/20 text-sm resize-none pr-14"
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
          </div>
        </div>

        {/* Neural Viewport (Preview) */}
        <div className="hidden md:flex flex-1 flex-col bg-[#050b1a] items-center p-8 overflow-y-auto relative">
          <div className="flex gap-4 mb-8 bg-black p-1 border-2 border-[#00FF41]/30">
            <button onClick={() => setViewMode('mobile')} className={`p-3 transition-all ${viewMode === 'mobile' ? 'bg-[#00FF41] text-black' : 'text-[#00FF41]/40'}`}>
              <Smartphone size={16} />
            </button>
            <button onClick={() => setViewMode('tablet')} className={`p-3 transition-all ${viewMode === 'tablet' ? 'bg-[#00FF41] text-black' : 'text-[#00FF41]/40'}`}>
              <Laptop size={16} />
            </button>
            <button onClick={() => setViewMode('desktop')} className={`p-3 transition-all ${viewMode === 'desktop' ? 'bg-[#00FF41] text-black' : 'text-[#00FF41]/40'}`}>
              <Monitor size={16} />
            </button>
          </div>

          <div className={`transition-all duration-500 border-[16px] border-zinc-900 shadow-[0_0_100px_rgba(0,255,65,0.1)] relative ${
            viewMode === 'mobile' ? 'w-[375px] h-[750px]' : 
            viewMode === 'tablet' ? 'w-[800px] h-[1000px]' : 
            'w-full max-w-5xl h-[700px]'
          }`}>
             {/* Industrial CRT Effect */}
            <div className="absolute inset-0 pointer-events-none z-10 border-[1px] border-[#00FF41]/20 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />
            <iframe 
              src={`/preview?v=${lastUpdate}`}
              className="w-full h-full bg-white opacity-90"
              title="VUO_LOGIC_PREVIEW"
            />
          </div>
          
          <div className="mt-8 flex items-center gap-4 text-[10px] tracking-[0.5em] opacity-40">
            <span className="animate-pulse">STREAMING_LIVE_DATA</span>
            <span className="animate-pulse [animation-delay:0.5s]">SECURE_CONNECTION</span>
          </div>
        </div>
      </div>
    </div>
  );
}

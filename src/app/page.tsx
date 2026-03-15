'use client';
import { Plus, Github, FolderCode, WifiOff, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { useOfflineSync } from '@/lib/offlineSync';

export default function Home() {
  const { isOnline, pendingPrompts } = useOfflineSync();
  const [projects] = useState([
    { id: 'poc', name: 'Mi Primer Proyecto', repo: 'oscar/vibe-poc' }
  ]);

  return (
    <div className="p-4 space-y-6">
      {/* Offline Alert */}
      {!isOnline && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-500/20 border border-orange-500/50 text-orange-400 animate-pulse">
          <WifiOff size={20} />
          <div className="text-sm">
            <p className="font-bold">Modo Offline</p>
            <p className="opacity-80">Los cambios se guardarán localmente.</p>
          </div>
        </div>
      )}

      {/* Sync Status */}
      {pendingPrompts.length > 0 && isOnline && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
          <div className="flex items-center gap-2 text-sm font-medium">
            <RefreshCcw size={16} className="animate-spin" />
            {pendingPrompts.length} cambios pendientes
          </div>
          <button className="text-xs font-bold uppercase tracking-wider bg-blue-500 text-white px-3 py-1 rounded-lg">
            Sincronizar
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-300">Mis Proyectos</h2>
        <button className="p-2 bg-blue-600 rounded-full shadow-lg hover:bg-blue-500 transition-all active:scale-95">
          <Plus size={20} />
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-all group active:bg-slate-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <FolderCode size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <Github size={12} /> {project.repo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20">
        <h3 className="text-indigo-300 font-semibold mb-2">Comienza a Vibe-Codear</h3>
        <p className="text-sm text-slate-400">
          Añade un repositorio de GitHub para empezar a programar desde tu celular usando el poder de la IA.
        </p>
      </div>
    </div>
  );
}

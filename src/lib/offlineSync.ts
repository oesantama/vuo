'use client';
import { useEffect, useState } from 'react';

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingPrompts, setPendingPrompts] = useState<string[]>([]);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const saved = localStorage.getItem('vuo_pending_prompts');
    if (saved) setPendingPrompts(JSON.parse(saved));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const queuePrompt = (prompt: string) => {
    const newQueue = [...pendingPrompts, prompt];
    setPendingPrompts(newQueue);
    localStorage.setItem('vuo_pending_prompts', JSON.stringify(newQueue));
  };

  return { isOnline, pendingPrompts, queuePrompt };
};

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VUO - Vibe Code Universal de Oscar",
  description: "Programación asistida por IA desde cualquier lugar",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#020617" />
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `
        }} />
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden`}>
        <div className="flex flex-col min-h-screen max-w-md mx-auto border-x border-slate-800 shadow-2xl bg-slate-900/50 backdrop-blur-xl">
          <header className="p-4 border-b border-slate-800 bg-slate-950/80 sticky top-0 z-50">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              VUO
            </h1>
          </header>
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

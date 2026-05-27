import React from 'react';
import { useTaxonomyStore } from '../src/state/useTaxonomyStore';
import { Layout, Users, BarChart3, Search, Bell, ShieldCheck, Settings, Globe, Cpu, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const { activeView, setActiveView } = useTaxonomyStore();

  return (
    <nav className="h-20 bg-walmart-black flex items-center justify-between px-12 text-white sticky top-0 z-50 border-b border-walmart-border">
      {/* Walmart Global Tech Brand */}
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveView('Dashboard')}>
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-walmart-blue flex items-center justify-center font-black text-white italic text-lg rounded-sm">W</div>
            <div className="h-8 w-[2px] bg-walmart-border mx-2"></div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight uppercase leading-none text-walmart-gray-800">Global Tech</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-walmart-blue">Catalog IQ</span>
            </div>
          </div>
        </div>
        
        {/* Dark Nav Tabs */}
        <div className="flex items-center gap-2">
          {['Dashboard', 'CategoryManager', 'Supplier'].map((view) => (
            <button 
              key={view}
              onClick={() => setActiveView(view as any)}
              className={cn(
                "px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all relative group",
                activeView === view ? "text-walmart-blue" : "text-walmart-gray-400 hover:text-white"
              )}
            >
              {view === 'Dashboard' ? 'Strategic ROI' : view === 'CategoryManager' ? 'Taxonomy Engine' : 'Ingestion Portal'}
              {activeView === view && <div className="absolute bottom-[-14px] left-0 right-0 h-[2px] bg-walmart-blue shadow-[0_0_8px_rgba(0,113,206,0.8)]" />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center bg-walmart-surface border border-walmart-border rounded-sm px-4 py-2 w-72 focus-within:border-walmart-blue transition-all">
          <Search className="w-4 h-4 text-walmart-gray-400" />
          <input type="text" placeholder="SEARCH ASSETS" className="bg-transparent border-none focus:ring-0 text-[10px] ml-3 placeholder-walmart-gray-400/50 w-full font-bold uppercase tracking-widest text-white" />
        </div>
        <div className="flex items-center gap-4 border-l border-walmart-border pl-6">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-bold leading-none mb-1 text-walmart-gray-800 uppercase">PRIYA SHARMA</div>
            <div className="text-[8px] font-black text-walmart-blue uppercase tracking-tighter">Senior Tech Lead</div>
          </div>
          <div className="w-10 h-10 bg-walmart-blue rounded-sm flex items-center justify-center font-bold text-sm border border-white/10 shadow-[0_0_15px_rgba(0,113,206,0.2)]">PS</div>
        </div>
      </div>
    </nav>
  );
};

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-walmart-black flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 p-12 max-w-[1800px] mx-auto w-full">
        {children}
      </main>
      
      <footer className="bg-walmart-black text-walmart-gray-400 border-t border-walmart-border py-10 px-12">
        <div className="max-w-[1800px] mx-auto flex justify-between items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-walmart-blue flex items-center justify-center font-black text-white italic text-xs rounded-sm">W</div>
              <span className="font-bold text-sm tracking-widest uppercase text-walmart-gray-800">Walmart Global Tech</span>
            </div>
            <p className="text-[10px] text-walmart-gray-400/50 max-w-xs leading-relaxed uppercase tracking-widest font-bold">
              Building the future of retail through self-serve catalog governance and autonomous data validation.
            </p>
          </div>
          <div className="flex gap-20">
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-widest text-walmart-blue mb-4">ENGINEERING</h5>
              <ul className="text-[10px] font-bold text-walmart-gray-400 space-y-2 uppercase tracking-tighter">
                <li className="hover:text-white cursor-pointer transition-colors">Impact Graphs</li>
                <li className="hover:text-white cursor-pointer transition-colors">CDC Pipelines</li>
                <li className="hover:text-white cursor-pointer transition-colors">gRPC Gateways</li>
              </ul>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-walmart-green uppercase tracking-[0.4em]">SYSTEM STABLE</span>
              <div className="text-[8px] text-walmart-gray-400/30 mt-2 font-bold uppercase tracking-widest">© 2026 Walmart Tech India · INTERNAL ACCESS ONLY</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

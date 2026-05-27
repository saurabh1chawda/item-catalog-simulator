import React from 'react';
import { useTaxonomyStore } from '../src/state/useTaxonomyStore';
import { 
  Zap, Clock, ShieldCheck, DollarSign, Globe, 
  BarChart3, Layout, Sparkles, ChevronRight,
  Database, Network, Cpu, TrendingUp
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const KPICard = ({ label, val, unit, icon: Icon, trend, colorClass }: { 
  label: string, 
  val: string, 
  unit: string, 
  icon: any, 
  trend: string,
  colorClass: string 
}) => (
  <div className="relative group overflow-hidden border border-walmart-border bg-walmart-surface p-8 transition-all duration-500 hover:border-walmart-blue/50">
    {/* Background Glow */}
    <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-[0.03] -translate-y-12 translate-x-12 transition-transform group-hover:scale-150 duration-1000", colorClass)} />
    
    <div className="flex justify-between items-start mb-10 relative z-10">
      <div className={cn("p-4 border border-white/5 bg-walmart-black shadow-inner group-hover:border-walmart-blue/30 transition-colors", colorClass.replace('text-', 'text-'))}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-1 text-walmart-green font-black text-[11px] uppercase tracking-widest bg-walmart-green/5 px-2 py-1 rounded-sm border border-walmart-green/10">
          <TrendingUp className="w-3 h-3" /> {trend}
        </div>
      </div>
    </div>

    <div className="relative z-10">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-6xl font-black text-white tracking-tighter leading-none">{val}</span>
        <span className="text-lg font-black text-walmart-gray-400 uppercase tracking-tighter">{unit}</span>
      </div>
      <div className="text-[11px] font-black text-walmart-blue uppercase tracking-[0.2em] leading-tight mb-4">{label}</div>
      
      <div className="h-0.5 w-12 bg-walmart-blue/30 group-hover:w-full transition-all duration-700" />
    </div>
  </div>
);

export const ROIDashboard = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Tech.walmart.com Hero Style */}
      <div className="bg-tech-blueprint -mx-12 -mt-12 p-20 text-white relative overflow-hidden mb-12 border-b border-walmart-border">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-walmart-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 text-walmart-blue font-black uppercase tracking-[0.4em] text-[10px] mb-8">
            <Cpu className="w-4 h-4" /> Global Tech Infrastructure
          </div>
          <h1 className="text-7xl font-black tracking-tighter leading-[0.9] mb-10 uppercase">
            Strategic ROI <br/><span className="text-walmart-gray-800">Command Center</span>
          </h1>
          <p className="text-xl text-walmart-gray-400 leading-relaxed font-medium max-w-2xl border-l-2 border-walmart-blue pl-8 italic">
            Walmart Global Tech is transforming item governance from manual intervention to autonomous, self-serve microservices. 
            Catalog IQ quantifies the engineering and operational velocity of the world’s largest retail catalog.
          </p>
          <div className="flex gap-6 mt-16">
            <div className="flex items-center gap-4 bg-walmart-surface/50 border border-walmart-border px-8 py-4 backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-walmart-green shadow-[0_0_10px_rgba(100,255,218,0.8)] animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-walmart-gray-800">CDC Pipeline: Synchronized</span>
            </div>
            <div className="flex items-center gap-4 bg-walmart-surface/50 border border-walmart-border px-8 py-4 backdrop-blur-xl">
              <Network className="w-4 h-4 text-walmart-blue" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-walmart-gray-800">GDP Node: Healthy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Redesigned KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard 
          label="Engineering Hours Reclaimed" 
          val="2,450" 
          unit="Hrs" 
          icon={Cpu} 
          trend="12.4%" 
          colorClass="text-walmart-blue"
        />
        <KPICard 
          label="Ingestion Latency (SLA)" 
          val="1.2" 
          unit="Days" 
          icon={Clock} 
          trend="60.0%" 
          colorClass="text-walmart-green"
        />
        <KPICard 
          label="Data Accuracy Index" 
          val="99.8" 
          unit="%" 
          icon={ShieldCheck} 
          trend="22.5%" 
          colorClass="text-walmart-spark"
        />
        <KPICard 
          label="Operational ROI Impact" 
          val="$185" 
          unit="K/Qtr" 
          icon={DollarSign} 
          trend="Direct" 
          colorClass="text-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        <div className="space-y-8">
          <h3 className="text-xl font-black uppercase tracking-widest border-b border-walmart-border pb-6 flex items-center gap-4 text-walmart-gray-800">
            <Database className="w-6 h-6 text-walmart-blue" /> Deployment Maturity
          </h3>
          <div className="space-y-12">
            {[
              { label: 'Self-Serve Adoption', val: 82 },
              { label: 'Autonomous Invalidation', val: 95 },
              { label: 'CDC Blast Radius Coverage', val: 64 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-walmart-gray-400">
                  <span>{item.label}</span>
                  <span className="text-white">{item.val}%</span>
                </div>
                <div className="h-1 bg-walmart-border w-full relative">
                  <div className="absolute top-0 left-0 h-full bg-walmart-blue transition-all duration-1000 shadow-[0_0_12px_rgba(0,113,206,0.4)]" style={{ width: `${item.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-walmart-surface p-12 border border-walmart-border relative group">
          <div className="absolute inset-0 bg-walmart-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <Sparkles className="absolute top-8 right-8 w-12 h-12 text-walmart-blue opacity-10" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-walmart-blue mb-10 relative z-10">Strategic North Star</h3>
          <p className="text-3xl font-bold tracking-tight leading-tight mb-12 italic text-white relative z-10">
            "By enabling retail at the speed of thought, we provide Priya and her team with the agility of a startup backed by the scale of Walmart Global Tech."
          </p>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-walmart-blue flex items-center justify-center font-black text-2xl italic rounded-sm shadow-[0_0_20px_rgba(0,113,206,0.3)]">W</div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-1 text-white">Walmart Tech India</div>
              <div className="text-[10px] text-walmart-gray-400 font-bold uppercase tracking-tighter">Global Catalog Architecture</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

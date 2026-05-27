import React from 'react';
import { useTaxonomyStore, type TaxonomyNode, type CategoryAttribute } from '../src/state/useTaxonomyStore';
import { 
  ChevronRight, ChevronDown, Plus, Trash2, Edit3,
  Settings2, Database, Search, Filter,
  Layers, ArrowRightLeft, Sparkles,
  ShieldAlert, Activity, Truck, Cpu, Network, RefreshCcw,
  Lock, ArrowRight, ShieldCheck, Clock, CheckCircle2, UserCheck, Zap,
  AlertCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Hierarchy Components ---

const TreeNode = ({ node, depth = 0 }: { node: TaxonomyNode; depth?: number }) => {
  const { nodes, selectedNodeId, setSelectedNode } = useTaxonomyStore();
  const children = nodes.filter(n => n.parentId === node.id);
  const isSelected = selectedNodeId === node.id;
  const hasChildren = children.length > 0;

  return (
    <div className="select-none transition-all duration-300">
      <div 
        className={cn(
          "flex items-center gap-3 py-2.5 px-4 rounded-sm cursor-pointer transition-all duration-200 group mb-1 border",
          isSelected 
            ? "bg-walmart-blue/20 text-walmart-blue border-walmart-blue shadow-[0_0_15px_rgba(0,113,206,0.15)]" 
            : "hover:bg-walmart-surface text-walmart-gray-400 border-transparent hover:border-walmart-border"
        )}
        style={{ marginLeft: `${depth * 12}px` }}
        onClick={() => setSelectedNode(node.id)}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          {hasChildren ? <ChevronDown className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-current opacity-30" />}
        </div>
        <span className={cn("text-xs font-bold truncate flex-1 uppercase tracking-tight", isSelected ? "text-walmart-gray-800" : "")}>{node.name}</span>
      </div>
      {hasChildren && children.map(child => <TreeNode key={child.id} node={child} depth={depth + 1} />)}
    </div>
  );
};

// --- Attribute Component ---

const AttributeCard = ({ attr }: { attr: CategoryAttribute }) => (
  <div className="group bg-walmart-black p-5 rounded-sm border border-walmart-border hover:border-walmart-blue/50 transition-all duration-300 relative overflow-hidden">
    <div className={cn("absolute top-0 left-0 w-[2px] h-full", attr.mandatory ? "bg-walmart-blue shadow-[0_0_8px_rgba(0,113,206,0.5)]" : "bg-walmart-border")} />
    <div className="flex items-start justify-between mb-2">
      <div>
        <h4 className="text-sm font-black text-walmart-gray-800 uppercase tracking-tight">{attr.name}</h4>
        <span className="text-[9px] px-2 py-0.5 rounded-sm font-black uppercase tracking-widest bg-walmart-surface text-walmart-gray-400 border border-walmart-border">
          {attr.type} {attr.mandatory && "· Mandatory"}
        </span>
      </div>
      <Sparkles className="w-4 h-4 text-walmart-spark opacity-30" />
    </div>
    <p className="text-[11px] text-walmart-gray-400 italic">Inferred from item history.</p>
  </div>
);

// --- Main View ---

export const CategoryManagerView = () => {
  const { 
    nodes, selectedNodeId, isSimulating, startSimulation, commitThrottled,
    simulationStep, affectedSKUs, invalidatedSKUs, systemHealth, toggleHealth, governanceChain, approveStep
  } = useTaxonomyStore();
  
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const l1Nodes = nodes.filter(n => n.level === 1);
  const allApproved = governanceChain.every(g => g.status !== 'Pending');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black text-walmart-blue uppercase tracking-[0.3em] mb-1">
            <Layers className="w-3.5 h-3.5" /> Governance System v4.0
          </div>
          <h1 className="text-3xl font-black text-walmart-gray-800 tracking-tighter uppercase">Hierarchy Engine</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleHealth}
            className={cn(
              "px-4 py-2 rounded-sm border flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all",
              systemHealth === 'Stable' ? "bg-walmart-surface border-walmart-border text-walmart-gray-400" : "bg-walmart-red/10 border-walmart-red text-walmart-red"
            )}
          >
            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", systemHealth === 'Stable' ? "bg-walmart-green shadow-[0_0_8px_rgba(100,255,218,0.5)]" : "bg-walmart-red")} />
            GDP Node: {systemHealth === 'Stable' ? 'Operational' : 'Degraded'}
          </button>
          <button 
            onClick={startSimulation}
            disabled={isSimulating || !selectedNode}
            className="btn-primary flex items-center gap-2 py-2.5 disabled:opacity-30"
          >
            <Activity className="w-4 h-4" /> Analyze Blast Radius
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-walmart-gray-400" />
            <input type="text" placeholder="SEARCH TAXONOMY" className="w-full pl-11 pr-4 py-3 bg-walmart-surface border-walmart-border rounded-sm text-[10px] font-black uppercase tracking-widest text-white focus:border-walmart-blue transition-all" />
          </div>
          <div className="card bg-walmart-surface/30 min-h-[600px] border-dashed overflow-y-auto custom-scrollbar">
            {l1Nodes.map(node => <TreeNode key={node.id} node={node} />)}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 space-y-6">
          {selectedNode ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="card p-0 border-walmart-border overflow-hidden">
                <div className="bg-tech-blueprint p-8 text-white relative border-b border-walmart-border">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="px-3 py-1 bg-walmart-blue/20 border border-walmart-blue/40 text-walmart-blue rounded-sm text-[9px] font-black uppercase tracking-widest">LEVEL {selectedNode.level} PROTOCOL</div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-walmart-green/10 rounded-sm border border-walmart-green/30">
                        <Cpu className="w-3 h-3 text-walmart-green" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-walmart-green">AI Suggestion Engine</span>
                      </div>
                    </div>
                    <h2 className="text-5xl font-black tracking-tighter mb-2 uppercase">{selectedNode.name}</h2>
                    <div className="flex items-center gap-2 text-walmart-gray-400 text-[10px] font-black uppercase tracking-widest"><Network className="w-4 h-4 text-walmart-blue" /> GDP_ASSET_UUID: {selectedNode.id}</div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black text-walmart-gray-800 uppercase tracking-widest flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-walmart-blue" /> Schema Blueprints
                    </h3>
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-walmart-blue/10 border border-walmart-blue/30 text-walmart-blue rounded-sm text-[9px] font-black uppercase tracking-widest hover:bg-walmart-blue hover:text-white transition-all">
                      <Plus className="w-3 h-3" /> Append Field
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedNode.attributes.map(attr => <AttributeCard key={attr.id} attr={attr} />)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center card bg-walmart-surface border-dashed border-walmart-border text-walmart-gray-400 font-black uppercase tracking-widest text-[10px]">
              <Database className="w-12 h-12 mb-4 opacity-10" />
              Select an asset node to initialize governance
            </div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-3 space-y-6">
          {isSimulating && (
            <div className={cn(
              "card border-none shadow-2xl p-8 rounded-sm animate-in zoom-in-95 duration-500 relative overflow-hidden text-white transition-colors duration-700",
              simulationStep === 'Analyzing' ? "bg-walmart-surface border-t-4 border-walmart-blue" :
              simulationStep === 'Error' ? "bg-walmart-surface border-t-4 border-walmart-red" :
              simulationStep === 'Throttling' ? "bg-walmart-surface border-t-4 border-walmart-green" : "bg-walmart-surface border-t-4 border-walmart-blue"
            )}>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-walmart-black border border-walmart-border flex items-center justify-center">
                     {simulationStep === 'Analyzing' ? <RefreshCcw className="w-6 h-6 text-walmart-blue animate-spin" /> :
                      simulationStep === 'Throttling' ? <Database className="w-6 h-6 text-walmart-green shadow-[0_0_10px_rgba(100,255,218,0.3)]" /> :
                      <Truck className="w-6 h-6 text-walmart-blue" />}
                   </div>
                   <div>
                     <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-walmart-gray-800">
                       {simulationStep === 'Analyzing' ? 'Analyzing Impact...' : 
                        simulationStep === 'Throttling' ? 'CDC Throttling' : 'Executive Sign-off'}
                     </h4>
                     <p className="text-[9px] text-walmart-gray-400 font-bold">GDP_INGEST_V4.2</p>
                   </div>
                </div>

                {simulationStep === 'Ready' && (
                  <div className="space-y-6 text-walmart-gray-800">
                    <div className="p-4 bg-walmart-black border border-walmart-border">
                      <div className="text-[9px] font-black text-walmart-blue uppercase mb-4 tracking-[0.2em] flex items-center gap-2">
                        <UserCheck className="w-3 h-3" /> Stakeholder Verification
                      </div>
                      <div className="space-y-3">
                        {governanceChain.map(g => (
                          <div key={g.id} className="flex items-center justify-between border-b border-walmart-border pb-2 last:border-none">
                            <span className="text-[9px] font-black text-walmart-gray-400 uppercase tracking-tighter">{g.role}</span>
                            {g.status === 'Approved' ? <CheckCircle2 className="w-3.5 h-3.5 text-walmart-green" /> :
                             g.status === 'SLA_Auto' ? <Clock className="w-3.5 h-3.5 text-walmart-spark" /> :
                             <button onClick={() => approveStep(g.id)} className="px-2 py-0.5 bg-walmart-blue/10 text-walmart-blue border border-walmart-blue/30 rounded-sm text-[8px] font-black uppercase">Approve</button>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-walmart-spark/5 p-4 border-l-2 border-walmart-spark">
                      <p className="text-[9px] leading-relaxed italic text-walmart-spark font-bold uppercase tracking-widest">
                        72h Grace Period active.
                      </p>
                    </div>

                    <button 
                      onClick={commitThrottled}
                      disabled={!allApproved || systemHealth === 'Degraded'}
                      className="w-full py-4 bg-walmart-blue text-white rounded-sm text-[10px] font-black uppercase tracking-[0.3em] shadow-xl disabled:opacity-30 disabled:grayscale transition-all"
                    >
                      {systemHealth === 'Degraded' ? 'Safety Lock Active' : 'Authorize Push'}
                    </button>
                  </div>
                )}

                {simulationStep === 'Throttling' && (
                  <div className="space-y-6 pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-black tracking-tighter mb-2 text-walmart-green">{invalidatedSKUs.toLocaleString()}</div>
                      <div className="text-[9px] font-black text-walmart-gray-400 uppercase tracking-[0.2em]">CDC Buffer Synchronization</div>
                    </div>
                    <div className="w-full h-1 bg-walmart-black border border-walmart-border overflow-hidden">
                      <div className="h-full bg-walmart-green shadow-[0_0_10px_rgba(100,255,218,0.5)] transition-all duration-300" style={{ width: `${(invalidatedSKUs/45000)*100}%` }} />
                    </div>
                  </div>
                )}
                
                {simulationStep === 'Error' && (
                  <div className="p-6 bg-walmart-red/10 border-l-4 border-walmart-red">
                    <div className="flex items-center gap-3 text-walmart-red font-black text-[10px] uppercase tracking-widest mb-2"><Lock className="w-4 h-4" /> Node Degraded</div>
                    <p className="text-[10px] text-walmart-gray-400 font-bold leading-relaxed uppercase tracking-tighter">GDP Cluster stability failed. automated lock triggered.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="card bg-walmart-surface border-walmart-border p-8">
            <div className="flex items-center gap-2 text-[9px] font-black text-walmart-blue uppercase tracking-[0.4em] mb-8"><Zap className="w-4 h-4" /> Analytics ROI</div>
            <div className="space-y-12">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-walmart-gray-400 text-[9px] font-black uppercase tracking-widest">Self-Serve Velocity</span>
                  <span className="text-3xl font-black text-walmart-gray-800">4.2 <span className="text-xs text-walmart-gray-400 italic">Days</span></span>
                </div>
                <div className="h-0.5 bg-walmart-border w-full relative">
                  <div className="absolute top-0 left-0 h-full bg-walmart-green shadow-[0_0_8px_rgba(100,255,218,0.3)] transition-all duration-1000" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

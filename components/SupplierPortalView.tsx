import React, { useState, useMemo } from 'react';
import { useTaxonomyStore, type TaxonomyNode, type CategoryAttribute } from '../src/state/useTaxonomyStore';
import { 
  Upload, CheckCircle2, AlertTriangle, XCircle, Info, 
  ArrowRight, FileSpreadsheet, ListFilter, ShieldAlert,
  ChevronRight, Search, Database, HardDrive, BarChart3,
  Sparkles, ShieldCheck, AlertCircle, FileUp, Zap, Download,
  RefreshCcw
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Validation Logic ---

interface ValidationResult {
  isValid: boolean;
  errors: Array<{ field: string; message: string; severity: 'Critical' | 'Warning' }>;
  qualityScore: number;
}

const validateItem = (item: Record<string, any>, schema: CategoryAttribute[]): ValidationResult => {
  const errors: ValidationResult['errors'] = [];
  let mandatoryMet = 0;
  const totalMandatory = schema.filter(a => a.mandatory && !a.isAdvisory).length;

  schema.forEach(attr => {
    const value = item[attr.name];
    const isMissing = value === undefined || value === '';

    if (attr.mandatory && !attr.isAdvisory && isMissing) {
      errors.push({ field: attr.name, message: `Mandatory field '${attr.name}' is missing.`, severity: 'Critical' });
    } else if (attr.mandatory && attr.isAdvisory && isMissing) {
      errors.push({ field: attr.name, message: `Recommended field '${attr.name}' is missing.`, severity: 'Warning' });
    } else if (!isMissing) {
      if (!attr.isAdvisory) mandatoryMet++;
      if (attr.type === 'Number' && isNaN(Number(value))) {
        errors.push({ field: attr.name, message: `'${attr.name}' must be a number.`, severity: 'Critical' });
      }
    }
  });

  const isValid = !errors.some(e => e.severity === 'Critical');
  const qualityScore = totalMandatory > 0 ? Math.round((mandatoryMet / totalMandatory) * 100) : 100;
  return { isValid, errors, qualityScore };
};

export const SupplierPortalView = () => {
  const { nodes } = useTaxonomyStore();
  const [selectedL4Id, setSelectedL4Id] = useState<string | null>(null);
  const [itemData, setItemData] = useState<Record<string, string>>({});
  const [isExporting, setIsExporting] = useState(false);
  
  const selectedNode = nodes.find(n => n.id === selectedL4Id);
  const l4Nodes = nodes.filter(n => n.level === 4);

  const validation = useMemo(() => {
    if (!selectedNode) return null;
    return validateItem(itemData, selectedNode.attributes);
  }, [selectedNode, itemData]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black text-walmart-green uppercase tracking-[0.3em] mb-1">
            <Database className="w-3.5 h-3.5" /> Ingestion Portal
          </div>
          <h1 className="text-3xl font-black text-walmart-gray-800 tracking-tighter uppercase">Catalog Ingestion</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-walmart-surface px-4 py-2 border border-walmart-border flex items-center gap-3 text-[10px] font-black text-walmart-gray-400 uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-walmart-blue shadow-[0_0_8px_rgba(0,113,206,0.4)]" />
            AI Auto-Classification
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="card p-0 overflow-hidden border-walmart-border shadow-2xl">
            <div className="p-6 border-b border-walmart-border bg-walmart-black/50 flex flex-col gap-4">
              <h3 className="text-[10px] font-black text-walmart-blue uppercase tracking-[0.2em]">1. Select Category</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-walmart-gray-400" />
                <input type="text" placeholder="FILTER CATEGORIES" className="w-full pl-9 pr-4 py-2.5 bg-walmart-black border-walmart-border rounded-sm text-[10px] font-black text-white focus:border-walmart-blue transition-all" />
              </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar bg-walmart-surface">
              {l4Nodes.map(node => (
                <div key={node.id} onClick={() => { setSelectedL4Id(node.id); setItemData({}); }} className={cn("flex items-center justify-between p-5 cursor-pointer transition-all border-b border-walmart-border last:border-none group", selectedL4Id === node.id ? "bg-walmart-blue text-white shadow-inner" : "hover:bg-walmart-black/30")}>
                  <div>
                    <div className={cn("text-xs font-black uppercase tracking-tight", selectedL4Id === node.id ? "text-white" : "text-walmart-gray-800")}>{node.name}</div>
                    <div className={cn("text-[9px] font-bold mt-1 uppercase tracking-widest", selectedL4Id === node.id ? "text-white/60" : "text-walmart-gray-400")}>{node.attributes.length} Schema Fields</div>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", selectedL4Id === node.id ? "text-white" : "text-walmart-gray-400")} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="card bg-tech-blueprint border-walmart-blue/30 p-8 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-walmart-blue/5 group-hover:bg-walmart-blue/10 transition-colors" />
            <FileUp className="w-12 h-12 text-walmart-blue mb-4 group-hover:scale-110 transition-transform relative z-10" />
            <h4 className="text-sm font-black tracking-widest text-white relative z-10 uppercase">Bulk Upload (50k)</h4>
            <p className="text-[10px] text-walmart-gray-400 mt-3 leading-relaxed font-bold uppercase tracking-tighter relative z-10">Asynchronous CDC Invalidation Engine.</p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          {!selectedNode ? (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center card bg-walmart-surface/50 border-dashed border-walmart-border text-walmart-gray-400 font-black uppercase tracking-widest text-[10px]">
              <HardDrive className="w-12 h-12 mb-4 opacity-10" />
              Initialize category selection to begin
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between bg-walmart-surface p-8 border border-walmart-border shadow-lg">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-walmart-black border border-walmart-border flex items-center justify-center text-walmart-green shadow-[0_0_10px_rgba(100,255,218,0.2)]"><Database className="w-6 h-6" /></div>
                  <div>
                    <span className="text-[10px] font-black text-walmart-blue uppercase tracking-[0.2em] block mb-1">2. Item Attributes</span>
                    <h2 className="text-3xl font-black text-walmart-gray-800 tracking-tighter uppercase">{selectedNode.name}</h2>
                  </div>
                </div>
                <button className={cn("btn-primary px-10 py-3", validation?.isValid ? "" : "opacity-30 grayscale cursor-not-allowed")}>List Item</button>
              </div>

              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-7 card p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8 border-b border-walmart-border pb-6">
                    <div className="flex items-center gap-3"><FileSpreadsheet className="w-5 h-5 text-walmart-blue" /><h3 className="text-xs font-black text-walmart-gray-800 uppercase tracking-[0.2em]">Data Entry</h3></div>
                  </div>
                  <div className="space-y-6">
                    {selectedNode.attributes.map(attr => (
                      <div key={attr.id} className="group">
                        <label className="flex items-center justify-between mb-2 px-1">
                          <span className="text-[10px] font-black text-walmart-gray-400 uppercase tracking-widest">{attr.name} {attr.mandatory && <span className="text-walmart-red">*</span>}</span>
                          <span className="text-[9px] font-black text-walmart-gray-400/30 uppercase">{attr.type}</span>
                        </label>
                        <input type="text" className="w-full text-xs font-bold border border-walmart-border rounded-sm px-4 py-3 bg-walmart-black text-white focus:border-walmart-blue transition-all" value={itemData[attr.name] || ''} onChange={(e) => setItemData({ ...itemData, [attr.name]: e.target.value })} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-5 space-y-6">
                  <div className="card p-8 shadow-xl bg-walmart-surface">
                    <div className="flex items-center justify-between mb-8 border-b border-walmart-border pb-6">
                      <div className="flex items-center gap-3"><BarChart3 className="w-5 h-5 text-walmart-blue" /><h3 className="text-[10px] font-black text-walmart-gray-800 uppercase tracking-[0.2em]">Ingestion Quality</h3></div>
                      <button onClick={handleExport} className="p-2 hover:bg-walmart-black/30 rounded-sm text-walmart-blue transition-all group relative border border-walmart-border">
                        {isExporting ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      </button>
                    </div>
                    {validation && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-5">
                          <div className={cn("w-14 h-14 rounded-sm border border-walmart-border flex items-center justify-center shrink-0 shadow-lg", validation.isValid ? "bg-walmart-green/10 text-walmart-green" : "bg-walmart-red/10 text-walmart-red")}>{validation.isValid ? <CheckCircle2 className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}</div>
                          <div>
                            <div className="text-xl font-black text-walmart-gray-800 uppercase tracking-tight mb-1">{validation.isValid ? 'Approved' : 'Correction Required'}</div>
                            <div className={cn("text-[9px] font-black uppercase tracking-widest", validation.isValid ? "text-walmart-green" : "text-walmart-red")}>{validation.errors.length} Critical Blocks</div>
                          </div>
                        </div>
                        <div className="bg-walmart-black p-6 border border-walmart-border">
                          <div className="flex justify-between items-end mb-3 font-black text-[10px] uppercase tracking-widest text-walmart-gray-400"><span>Quality Score</span><span className={cn(validation.qualityScore > 80 ? "text-walmart-green" : "text-walmart-red")}>{validation.qualityScore}%</span></div>
                          <div className="w-full h-0.5 bg-walmart-border"><div className={cn("h-full transition-all duration-700", validation.qualityScore > 80 ? "bg-walmart-green shadow-[0_0_8px_rgba(100,255,218,0.5)]" : "bg-walmart-red")} style={{ width: `${validation.qualityScore}%` }} /></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-walmart-black border border-walmart-border p-8 relative overflow-hidden">
                    <div className="relative z-10"><Zap className="w-4 h-4 text-walmart-spark mb-4" /><p className="text-[10px] text-walmart-gray-400 font-bold uppercase leading-relaxed tracking-tighter">"Walmart Governance allow items with Warnings to be listed, but they are flagged as <span className="text-walmart-spark underline">Low Quality</span> in global search."</p></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

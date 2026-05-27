import { create } from 'zustand';

export type AttributeType = 'String' | 'Number' | 'Enum' | 'Boolean';

export interface CategoryAttribute {
  id: string;
  name: string;
  type: AttributeType;
  mandatory: boolean;
  allowedValues?: string[];
  description?: string;
  isAdvisory?: boolean;
}

export interface TaxonomyNode {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4;
  parentId: string | null;
  attributes: CategoryAttribute[];
}

interface GovernanceStep {
  id: string;
  role: 'Logistics' | 'Legal' | 'Category';
  status: 'Pending' | 'Approved' | 'SLA_Auto';
  approver: string;
}

interface TaxonomyState {
  nodes: TaxonomyNode[];
  selectedNodeId: string | null;
  activeView: 'CategoryManager' | 'Supplier' | 'Dashboard';
  
  // Executive Hardening State
  isSimulating: boolean;
  simulationStep: 'Idle' | 'Analyzing' | 'Ready' | 'Throttling' | 'Complete' | 'Error';
  affectedSKUs: number;
  invalidatedSKUs: number;
  gracePeriodHours: number;
  systemHealth: 'Stable' | 'Degraded';
  governanceChain: GovernanceStep[];
  
  // Actions
  addNode: (node: Omit<TaxonomyNode, 'id' | 'attributes'>) => void;
  deleteNode: (id: string) => void;
  updateNode: (id: string, updates: Partial<TaxonomyNode>) => void;
  setSelectedNode: (id: string | null) => void;
  setActiveView: (view: 'CategoryManager' | 'Supplier' | 'Dashboard') => void;
  
  // Hardened Actions
  startSimulation: () => void;
  approveStep: (id: string) => void;
  commitThrottled: () => void;
  toggleHealth: () => void;
  
  // Attribute Actions
  addAttribute: (categoryId: string, attribute: Omit<CategoryAttribute, 'id'>) => void;
  updateAttribute: (categoryId: string, attributeId: string, updates: Partial<CategoryAttribute>) => void;
  deleteAttribute: (categoryId: string, attributeId: string) => void;
}

const INITIAL_NODES: TaxonomyNode[] = [
  { id: 'l1-elec', name: 'Electronics', level: 1, parentId: null, attributes: [] },
  { id: 'l2-comp', name: 'Computing', level: 2, parentId: 'l1-elec', attributes: [] },
  { id: 'l3-lap', name: 'Laptops', level: 3, parentId: 'l2-comp', attributes: [] },
  { 
    id: 'l4-game-lap', 
    name: 'Gaming Laptops', 
    level: 4, 
    parentId: 'l3-lap', 
    attributes: [
      { id: 'a1', name: 'GPU Model', type: 'Enum', mandatory: true, allowedValues: ['RTX 4090', 'RTX 4080', 'RTX 4070'], description: 'Primary dedicated graphics card' },
      { id: 'a2', name: 'Refresh Rate', type: 'Number', mandatory: true, description: 'Screen refresh rate in Hz' }
    ] 
  }
];

export const useTaxonomyStore = create<TaxonomyState>((set, get) => ({
  nodes: INITIAL_NODES,
  selectedNodeId: 'l4-game-lap',
  activeView: 'CategoryManager',
  
  isSimulating: false,
  simulationStep: 'Idle',
  affectedSKUs: 0,
  invalidatedSKUs: 0,
  gracePeriodHours: 72,
  systemHealth: 'Stable',
  governanceChain: [
    { id: 'g1', role: 'Category', status: 'Approved', approver: 'Priya Sharma' },
    { id: 'g2', role: 'Logistics', status: 'Pending', approver: 'Mark (Global Ops)' },
    { id: 'g3', role: 'Legal', status: 'Pending', approver: 'Legal-Auto-SLA' }
  ],

  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, { ...node, id: `node-${Date.now()}`, attributes: [] }]
  })),

  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter(n => n.id !== id && n.parentId !== id)
  })),

  updateNode: (id, updates) => set((state) => ({
    nodes: state.nodes.map(n => n.id === id ? { ...n, ...updates } : n)
  })),

  setSelectedNode: (id) => set({ selectedNodeId: id, isSimulating: false, simulationStep: 'Idle' }),

  setActiveView: (view) => set({ activeView: view }),

  startSimulation: () => {
    set({ isSimulating: true, simulationStep: 'Analyzing' });
    setTimeout(() => {
      const { systemHealth } = get();
      if (systemHealth === 'Degraded') {
        set({ simulationStep: 'Error' });
      } else {
        set({ 
          simulationStep: 'Ready',
          affectedSKUs: 45000,
          governanceChain: get().governanceChain.map(g => g.role === 'Legal' ? { ...g, status: 'SLA_Auto' } : g)
        });
      }
    }, 1200);
  },

  approveStep: (id) => set((state) => ({
    governanceChain: state.governanceChain.map(g => g.id === id ? { ...g, status: 'Approved' } : g)
  })),

  commitThrottled: () => {
    set({ simulationStep: 'Throttling' });
    let count = 0;
    const interval = setInterval(() => {
      count += 5000;
      set({ invalidatedSKUs: count });
      if (count >= 45000) {
        clearInterval(interval);
        set({ simulationStep: 'Complete' });
        setTimeout(() => set({ isSimulating: false, simulationStep: 'Idle', invalidatedSKUs: 0 }), 2000);
      }
    }, 400);
  },

  toggleHealth: () => set((state) => ({ systemHealth: state.systemHealth === 'Stable' ? 'Degraded' : 'Stable' })),

  addAttribute: (categoryId, attribute) => set((state) => ({
    nodes: state.nodes.map(n => n.id === categoryId ? {
      ...n,
      attributes: [...n.attributes, { ...attribute, id: `attr-${Date.now()}` }]
    } : n)
  })),

  updateAttribute: (categoryId, attributeId, updates) => set((state) => ({
    nodes: state.nodes.map(n => n.id === categoryId ? {
      ...n,
      attributes: n.attributes.map(a => a.id === attributeId ? { ...a, ...updates } : a)
    } : n)
  })),

  deleteAttribute: (categoryId, attributeId) => set((state) => ({
    nodes: state.nodes.map(n => n.id === categoryId ? {
      ...n,
      attributes: n.attributes.filter(a => a.id !== attributeId)
    } : n)
  }))
}));

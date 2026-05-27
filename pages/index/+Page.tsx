import React from 'react';
import { useTaxonomyStore } from '../../src/state/useTaxonomyStore';
import { MainLayout } from '../../components/MainLayout';
import '../../renderer/index.css';

import { CategoryManagerView } from '../../components/CategoryManagerView';
import { SupplierPortalView } from '../../components/SupplierPortalView';
import { ROIDashboard } from '../../components/ROIDashboard';

export default function Page() {
  const { activeView } = useTaxonomyStore();

  return (
    <MainLayout>
      {activeView === 'Dashboard' && <ROIDashboard />}
      {activeView === 'CategoryManager' && <CategoryManagerView />}
      {activeView === 'Supplier' && <SupplierPortalView />}
    </MainLayout>
  );
}

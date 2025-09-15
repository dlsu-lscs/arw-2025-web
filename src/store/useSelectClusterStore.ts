import { create } from 'zustand';

interface ClusterState {
  selectedCluster:
    | string
    | 'engage'
    | 'probe'
    | 'aso'
    | 'aspire'
    | 'cap%2013'
    | 'all'
    | 'cso'
    | 'outside%20cso';
}

interface ClusterAction {
  setSelectedCluster: (
    cluster:
      | string
      | 'engage'
      | 'probe'
      | 'aso'
      | 'aspire'
      | 'cap%2013'
      | 'all'
      | 'cso'
      | 'outside%20cso'
  ) => void;
}

export const useSelectClusterStore = create<ClusterState & ClusterAction>((set) => ({
  selectedCluster: 'all',
  setSelectedCluster: (cluster) => set({ selectedCluster: cluster }),
}));

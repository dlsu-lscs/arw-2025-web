import { create } from 'zustand';
import { ClusterTypeConst } from '@/features/clusters/types/cluster.types';

interface ClusterState {
  selectedCluster: ClusterTypeConst;
}

interface ClusterAction {
  setSelectedCluster: (cluster: ClusterTypeConst) => void;
}

export const useSelectClusterStore = create<ClusterState & ClusterAction>((set) => ({
  selectedCluster: 'all',
  setSelectedCluster: (cluster) => set({ selectedCluster: cluster }),
}));

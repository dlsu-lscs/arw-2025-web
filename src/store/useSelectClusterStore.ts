import { create } from 'zustand'

interface ClusterState {
  selectedCluster:
    | string
    | 'engage'
    | 'probe'
    | 'aso'
    | 'aspire'
    | 'cap13'
    | 'all'
}

interface ClusterAction {
  setSelectedCluster: (
    cluster: string | 'engage' | 'probe' | 'aso' | 'aspire' | 'cap13' | 'all'
  ) => void
}

export const useSelectClusterStore = create<ClusterState & ClusterAction>(
  (set) => ({
    selectedCluster: 'all',
    setSelectedCluster: (cluster) => set({ selectedCluster: cluster }),
  })
)

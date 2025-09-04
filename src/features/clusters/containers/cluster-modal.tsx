'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useClusterModalStore } from '../store/useClusterModalStore'

export default function ClusterModal() {
  const { isOrgModalOpen, closeOrgModal } = useClusterModalStore()
  return (
    <>
      <Dialog open={isOrgModalOpen} onOpenChange={closeOrgModal}></Dialog>
    </>
  )
}

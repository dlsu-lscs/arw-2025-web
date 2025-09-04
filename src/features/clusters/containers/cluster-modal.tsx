'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useClusterModalStore } from '../store/useClusterModalStore'
import CloseModal from '@/components/modal/close-modal'

export default function ClusterModal() {
  const { isOrgModalOpen, closeOrgModal } = useClusterModalStore()
  return (
    <>
      <Dialog open={isOrgModalOpen} onOpenChange={closeOrgModal}>
        <DialogContent className="[&>button:last-child]:hidden pixel-corner--modal">
          <DialogHeader>
            <DialogTitle>
              <CloseModal />
            </DialogTitle>
          </DialogHeader>
          <main className="grid grid-cols2 gap-4">
            <section className="grid grid-cols-2 gap-2">
              <section className="grid grid-cols-1 gap-4">
                <div>
                  <h1 className="text-2xl">Clusters!?</h1>
                  <p className="font-space-mono">
                    Clusters are alliances or groups of CSO-accredited
                    organizations that share similar themes or goals. Select one
                    that catches your eye, and find where you belong!
                  </p>
                </div>
                <div>
                  <div className="w-full h-[200px] bg-gray-300 flex justify-center items-center rounded-lg text-white">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-left text-4xl [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        ENGAGE
                      </h1>
                      <p className="text-md">
                        Engineering Alliance Geared Towards Excellence
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </main>
          <footer className="flex justify-center">
            <h3 className="font-tiny5 opacity-50">
              Powered by La Salle Computer Society.
            </h3>
          </footer>
        </DialogContent>
      </Dialog>
    </>
  )
}

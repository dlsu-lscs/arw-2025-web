"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useClusterModalStore } from "../store/useClusterModalStore";
import CloseModal from "@/components/modal/close-modal";

export default function ClusterModal() {
  const { isOrgModalOpen, closeOrgModal } = useClusterModalStore();
  return (
    <>
      <Dialog open={isOrgModalOpen} onOpenChange={closeOrgModal}>
        <DialogContent className="[&>button:last-child]:hidden pixel-corner--modal">
          <DialogHeader>
            <DialogTitle>
              <CloseModal />
            </DialogTitle>
          </DialogHeader>
          <div>
            <h1 className="text-2xl">Clusters!?</h1>
            <p className="font-space-mono">
              Clusters are alliances or groups of CSO-accredited organizations
              that share similar themes or goals. Select one that catches your
              eye, and find where you belong!
            </p>
          </div>
          <div className="flex justify-center">
            <h3 className="font-tiny5 opacity-50">
              Powered by La Salle Computer Society.
            </h3>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

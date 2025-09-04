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
        </DialogContent>
      </Dialog>
    </>
  );
}

'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { useOrgsModalStore } from '../store/useOrgsModalStore';
import CloseModal from '@/components/modal/close-modal';
export default function OrgsModal() {
  const { isOrgsModalOpen, openOrgsModal } = useOrgsModalStore();
  return (
    <>
      <Dialog open={isOrgsModalOpen} onOpenChange={openOrgsModal}>
        <DialogContent className="[&>button:last-child]:hidden pixel-corner--modal overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>
              <CloseModal className="text-[#0F0092]" />
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { useClusterModalStore } from '@/features/clusters/store/useClusterModalStore';
import { useOrgsModalStore } from '@/features/orgs/store/useOrgsModalStore';

type CloseModalProps = {
  className?: string;
};

export default function CloseModal({ className }: CloseModalProps) {
  const { closeClusterModal } = useClusterModalStore();
  const { closeOrgsModal } = useOrgsModalStore();
  return (
    <>
      <button
        className={`flex items-center gap-3 hover:cursor-pointer ${className}`}
        onClick={() => {
          closeClusterModal();
          closeOrgsModal();
        }}
      >
        <span>&lt;</span>
        <h1 className="text-sm sm:text-lg">back to organizations</h1>
      </button>
    </>
  );
}

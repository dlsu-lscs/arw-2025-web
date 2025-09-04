import { useClusterModalStore } from "@/features/clusters/store/useClusterModalStore";

export default function CloseModal() {
  const { isOrgModalOpen, closeOrgModal } = useClusterModalStore();
  return (
    <>
      <button className="flex gap-3" onClick={closeOrgModal}>
        <span>&lt;</span>
        <h1>back to organizations</h1>
      </button>
    </>
  );
}

'use client';

import { useLogoutStore } from '@/store/useLogoutStore';
import { AiOutlineLoading } from 'react-icons/ai';

export default function LogoutOverlay() {
  const { isLoggingOut } = useLogoutStore();

  if (!isLoggingOut) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-8">
        <AiOutlineLoading className="animate-spin text-4xl text-blue-600" />
        <span className="font-press-start text-lg">Logging out...</span>
      </div>
    </div>
  );
}

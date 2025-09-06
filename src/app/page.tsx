import HomePage from '@/features/home/container/home-page';
import { requireAuth } from '@/features/auth/services/server-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await requireAuth();

  if (!user) redirect('/auth/login');
  if (user.needsRefresh) redirect('/auth/refresh');
  return (
    <>
      <div className="min-h-screen p-8">
        <HomePage />
      </div>
    </>
  );
}

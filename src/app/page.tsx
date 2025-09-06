import HomePage from '@/features/home/container/home-page';
import { requireAuth } from '@/features/auth/services/server-auth';
import { redirect } from 'next/navigation';
import { getAllOrgs } from '@/features/orgs/services/orgs.services';

export default async function Home() {
  const user = await requireAuth();

  if (!user) redirect('/auth/login');
  if (user.needsRefresh) redirect('/auth/refresh');

  const orgs = await getAllOrgs('', 0, 5);
  return (
    <>
      <div className="min-h-screen p-8">
        <HomePage user={user} initialOrgs={orgs} />
      </div>
    </>
  );
}

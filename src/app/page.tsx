import HomePage from '@/features/home/container/home-page';
import { requireAuth } from '@/features/auth/services/server-auth';
import { getAllOrgs } from '@/features/orgs/services/orgs.services';
import { OrgsResponse } from '@/features/orgs/types/orgs.types';

export default async function Home() {
  const user = await requireAuth();

  const initialOrgs: OrgsResponse = await getAllOrgs('', 0, 5);
  return (
    <>
      <div className="min-h-screen p-8">
        <HomePage user={user} initialOrgs={initialOrgs} />
      </div>
    </>
  );
}

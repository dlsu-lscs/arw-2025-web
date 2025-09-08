import HomePage from '@/features/home/container/home-page';
import { requireAuth } from '@/features/auth/services/server-auth';
import { OrgsResponse } from '@/features/orgs/types/orgs.types';
import { serverGetAllOrgs } from '@/features/orgs/services/server.orgs.services';

export default async function Home() {
  const user = await requireAuth();

  const initialOrgs: OrgsResponse = await serverGetAllOrgs('', 0, 10);
  return (
    <>
      <div className="min-h-screen p-8">
        <HomePage user={user} initialOrgs={initialOrgs} />
      </div>
    </>
  );
}

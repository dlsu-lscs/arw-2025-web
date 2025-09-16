export const dynamic = 'force-dynamic';

import HomePage from '@/features/home/container/home-page';
import { requireAuth } from '@/features/auth/services/server-auth';
import { OrgsResponse } from '@/features/orgs/types/orgs.types';
import { serverGetAllOrgs } from '@/features/orgs/services/server.orgs.services';
import { v4 as uuidv4 } from 'uuid';
import Maintenance from '@/features/home/container/maintenance-page';

export default async function Home() {
  const user = await requireAuth();
  const seed = uuidv4();

  if (process.env.NODE_ENV !== 'production') console.log('Seed:', seed);
  const initialOrgs: OrgsResponse = await serverGetAllOrgs(seed, undefined, 0, 10);
  if (process.env.NODE_ENV !== 'production') console.log('Initial Orgs:', initialOrgs);
  return (
    <>
      <div className="max-h-screen min-h-screen flex flex-col sm:p-8 p-4">
        {/* <HomePage user={user} initialOrgs={initialOrgs} seed={seed} /> */}
        <Maintenance />
      </div>
    </>
  );
}

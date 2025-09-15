export const dynamic = 'force-dynamic';

import LoginPage from '@/features/auth/containers/login-page';
import { getServerUser } from '@/features/auth/services/server-auth';
import { redirect } from 'next/navigation';

export default async function LoginRoute() {
  // Check if user is already authenticated
  const user = await getServerUser();

  // If user is authenticated (and doesn't need refresh), redirect to dashboard
  if (user && !user.needsRefresh) {
    redirect('/'); // or wherever you want authenticated users to go
  }

  if (user?.needsRefresh) {
    redirect('/auth/refresh');
  }

  // If user needs refresh, let them re-authenticate
  // If user is null, show login page
  return (
    <>
      <LoginPage />
    </>
  );
}

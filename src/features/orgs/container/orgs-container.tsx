import { shuffleArray } from '@/lib/helpers';
import OrgCard from '../components/org-card';
import { OrganizationType } from '../types/orgs.types';

type OrgsContainerProps = {
  orgs: OrganizationType[];
};

export default function OrgsContainer({ orgs }: OrgsContainerProps) {
  const shuffledOrgs: OrganizationType[] = orgs;
  return (
    <>
      <div className="flex flex-col gap-4 mt-8">
        {shuffledOrgs.map((org, index) => {
          return <OrgCard key={index} org={org} />;
        })}
      </div>
    </>
  );
}

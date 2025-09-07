import OrgCard from '../components/org-card';
import { OrganizationType } from '../types/orgs.types';

type OrgsContainerProps = {
  orgs: OrganizationType[];
};

export default function OrgsContainer({ orgs }: OrgsContainerProps) {
  return (
    <>
      <div className="flex flex-col gap-4 mt-8">
        {orgs.map((org, index) => {
          return <OrgCard key={index} org={org} />;
        })}
      </div>
    </>
  );
}

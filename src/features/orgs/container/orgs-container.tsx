'use client';
import OrgCard from '../components/org-card';
import { OrganizationType } from '../types/orgs.types';
import { useOrgsModalStore } from '../store/useOrgsModalStore';
import { usePrefetchIndivOrgs } from '../hooks/use-prefetch-indiv-orgs';
import { orgByIdQueryOptions } from '../queries/orgs.query.options';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import OrgsModal from '@/features/orgs/container/orgs-modal';

type OrgsContainerProps = {
  orgs: OrganizationType[];
};

export default function OrgsContainer({ orgs }: OrgsContainerProps) {
  const { openOrgsModal } = useOrgsModalStore();
  const { prefetchOrgByID } = usePrefetchIndivOrgs();
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);

  const {
    data: orgDetails,
    isLoading,
    isError,
  } = useQuery({
    ...orgByIdQueryOptions(selectedOrgId as number),
    enabled: selectedOrgId !== null,
    staleTime: 10 * 60 * 1000,
  });

  return (
    <>
      <div className="flex flex-col gap-4 mt-8">
        {orgs.map((org, index) => {
          return (
            <OrgCard
              key={index}
              org={org}
              onClick={() => {
                setSelectedOrgId(org.id);
                openOrgsModal();
              }}
              onMouseEnter={() => prefetchOrgByID(org.id)}
            />
          );
        })}
      </div>
      <OrgsModal org={orgDetails} isLoading isError />
    </>
  );
}

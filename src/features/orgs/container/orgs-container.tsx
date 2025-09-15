'use client';
import OrgCard from '../components/org-card';
import { OrganizationType } from '../types/orgs.types';
import { useOrgsModalStore } from '../store/useOrgsModalStore';
import { usePrefetchIndivOrgs } from '../hooks/use-prefetch-indiv-orgs';
import { orgByIdQueryOptions } from '../queries/orgs.query.options';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import OrgsModal from '@/features/orgs/container/orgs-modal';
import { AiOutlineLoading } from 'react-icons/ai';
import useObserver from '@/hooks/useObserver';

// import { ScrollArea } from '@/components/ui/scroll-area';

type OrgsContainerProps = {
  orgs: OrganizationType[];
  isSearchActive: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
};

export default function OrgsContainer({
  orgs,
  isSearchActive,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: OrgsContainerProps) {
  const { openOrgsModal } = useOrgsModalStore();
  const { prefetchOrgByID } = usePrefetchIndivOrgs();
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useObserver({
    ref,
    callback: () => {
      if (hasNextPage && !isSearchActive && fetchNextPage) {
        fetchNextPage();
      }
    },
  });

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
      <div className="overflow-y-auto flex-1 h-full min-h-0 w-full mt-4 overflow-x-hidden shadcn-scrollbar">
        {orgs.map((org, index) => {
          if (org.publications) {
            return (
              <OrgCard
                className="mb-4"
                key={index}
                org={org}
                onClick={() => {
                  setSelectedOrgId(org.id);
                  openOrgsModal();
                }}
                onMouseEnter={() => prefetchOrgByID(org.id)}
              />
            );
          }
        })}
        {/* Only show infinite scroll when not searching */}
        {!isSearchActive && (
          <>
            <div className="w-2" ref={ref} />
            {isFetchingNextPage && (
              <AiOutlineLoading className="mx-auto mt-2 text-2xl animate-spin" />
            )}
          </>
        )}
      </div>
      <OrgsModal org={orgDetails} isLoading={isLoading} isError={isError} />
    </>
  );
}

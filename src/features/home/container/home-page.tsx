'use client';
import HighlightCard from '@/components/highlight-card';
import NavBar from '../components/navbar';
import Image from 'next/image';
import ClusterCarousel from '../components/cluster-carousel';
import { AiOutlineLoading } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import CollapsibleText from '@/components/collapsible-text';

import { SearchBar } from '@/components/search-bar';
import ClusterModal from '@/features/clusters/containers/cluster-modal';
import { useClusterModalStore } from '@/features/clusters/store/useClusterModalStore';
import { User } from '@/features/auth/types/user';
import OrgsContainer from '@/features/orgs/container/orgs-container';
import { OrgsResponse } from '@/features/orgs/types/orgs.types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { allOrgsQueryOptions } from '@/features/orgs/queries/orgs.query.options';
import { usePrefetchOrgClusters } from '@/features/orgs/hooks/use-prefetch-org-clusters';
import { useSelectClusterStore } from '@/store/useSelectClusterStore';
import { useMemo, useRef } from 'react';
import useObserver from '@/hooks/useObserver';
interface HomeProps {
  user: User;
  seed: string;
  initialOrgs: OrgsResponse;
}

export default function HomePage({ user, initialOrgs, seed }: HomeProps) {
  const { openClusterModal } = useClusterModalStore();
  const { selectedCluster } = useSelectClusterStore();
  const ref = useRef<HTMLDivElement>(null);

  // Prefetch all cluster types to eliminate loading when switching
  if (process.env.NODE_ENV !== 'production') console.log('Client Seed:', seed);
  usePrefetchOrgClusters(seed);

  useObserver({
    ref,
    callback: () => {
      if (hasNextPage) fetchNextPage();
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    allOrgsQueryOptions(
      seed,
      selectedCluster,
      10,
      selectedCluster === 'all' ? initialOrgs : undefined
    )
  );

  const orgs = useMemo(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔍 Debug - Data structure:', data);
      console.log('🔍 Debug - Number of pages:', data?.pages.length);
    }
    data?.pages.forEach((page, index) => {
      if (process.env.NODE_ENV !== 'production')
        console.log(`🔍 Debug - Page ${index} content length:`, page.content.length);
    });
    return data?.pages.flatMap((page) => page.content) ?? [];
  }, [data]);

  return (
    <>
      <div className="pixel-corners--wrapper mx-auto flex flex-col flex-1">
        <div className="!max-w-5xl 2xl:!max-w-7xl border-2 flex-1 bg-white border-black p-4 !flex flex-col pixel-corners">
          <NavBar user={user} />
          <HighlightCard className="flex gap-4 mt-4">
            <Image
              src={'/assets/macky.svg'}
              width={96}
              height={96}
              alt="macky"
              className="hidden sm:block"
            ></Image>
            <div>
              <div className="flex items-center gap-2">
                <Image
                  src={'/assets/macky.svg'}
                  width={64}
                  height={64}
                  alt="macky"
                  className="block sm:hidden"
                ></Image>
                <h2 className="font-press-start text-xl sm:text-2xl lg:text-3xl">
                  Welcome to ARW 2025!
                </h2>
              </div>
              <CollapsibleText
                maxLines={3}
                className="font-space-mono text-sm sm:text-base"
                text="Annual Recruitment Week (ARW) is THE event sa DLSU where orgs show
              what they’re all about. Basically, it’s your chance to vibe with
              49+ CSO orgs (plus iba pa) para you can find your crowd, explore
              your interests, and go beyond acads."
              />
            </div>
          </HighlightCard>

          <ClusterCarousel />

          <Button
            className="font-space-mono hover:cursor-pointer bg-[#D8E6FF] rounded-none border-black text-sm sm:text-base font-bold self-center sm:mt-4 sm:mb-8 mt-2 mb-4"
            variant="outline"
            onClick={openClusterModal}
          >
            DISCOVER THE CLUSTERS
          </Button>

          <SearchBar />
          <ClusterModal />
          <OrgsContainer orgs={orgs} />
          <div className="w-2" ref={ref} />
          {isFetchingNextPage && (
            <AiOutlineLoading className="mx-auto mt-2 text-2xl animate-spin" />
          )}
        </div>
      </div>
    </>
  );
}

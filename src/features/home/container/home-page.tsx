'use client';
import HighlightCard from '@/components/highlight-card';
import NavBar from '../components/navbar';
import Image from 'next/image';
import ClusterCarousel from '../components/cluster-carousel';
import { AiOutlineLoading } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import CollapsibleText from '@/components/collapsible-text';

import { SearchBar } from '@/features/orgs/components/search-bar';
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
import { useSearchOrgs } from '@/features/orgs/hooks/useSearchOrgs';

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
      if (hasNextPage && !isSearchActive) fetchNextPage();
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

  const baseOrgs = useMemo(() => {
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

  // Use search results if search is active, otherwise use base orgs
  const {
    searchResults,
    isSearchActive,
    isLoading,
    isTyping,
    searchTerm,
    isFetching: isSearchFetching,
    totalResults,
  } = useSearchOrgs();
  const orgs = isSearchActive ? searchResults : baseOrgs;

  return (
    <>
      <div className="pixel-corners--wrapper mx-auto flex flex-col flex-1">
        <div className="bg-[url('/bg/green-triangle3.png')] bg-repeat !max-w-4xl 2xl:!max-w-7xl border-2 flex-1 bg-white border-black p-4 !flex flex-col pixel-corners">
          <NavBar user={user} />
          <HighlightCard className="flex gap-4 mt-2 bg-white">
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
                <h2 className="font-press-start text-xl sm:text-2xl 2xl:text-3xl">
                  Welcome to ARW 2025!
                </h2>
              </div>
              <CollapsibleText
                maxLines={3}
                className="font-space-mono text-xs sm:text-sm text-2xl:text-base"
                text="Annual Recruitment Week (ARW) is THE event sa DLSU where orgs show
              what they’re all about. Basically, it’s your chance to vibe with
              49+ CSO orgs (plus iba pa) para you can find your crowd, explore
              your interests, and go beyond acads."
              />
            </div>
          </HighlightCard>

          <ClusterCarousel />

          <Button
            className="font-space-mono hover:cursor-pointer bg-[#D8E6FF] rounded-none border-black text-xm sm:text-base font-bold self-center mt-1 md:-mt-4 2xl:mt-2 mb-4"
            variant="outline"
            onClick={openClusterModal}
          >
            DISCOVER THE CLUSTERS
          </Button>

          <SearchBar />

          {/* Search results indicator */}
          {isSearchActive && !isTyping && (
            <div className="text-sm text-gray-600 font-space-mono mb-2 flex items-center gap-2">
              {(isSearchFetching || isLoading) && (
                <AiOutlineLoading className="text-sm animate-spin" />
              )}
              {isSearchFetching
                ? `Searching organizations...`
                : totalResults > 0
                  ? `Found ${totalResults} organization${totalResults !== 1 ? 's' : ''} matching "${searchTerm}"`
                  : `No organizations found matching "${searchTerm}"`}
            </div>
          )}

          <ClusterModal />
          <OrgsContainer orgs={orgs} />

          {/* Only show infinite scroll when not searching */}
          {!isSearchActive && (
            <>
              <div className="w-2" ref={ref} />
              {isFetchingNextPage && (
                <AiOutlineLoading className="mx-auto mt-2 text-2xl animate-spin" />
              )}
            </>
          )}
          <footer className="flex justify-center -mb-2 2xl:mt-2 mt-1">
            <h3 className="font-tiny5 sm:text-sm text-xs md:text-base opacity-50">
              Powered by La Salle Computer Society.
            </h3>
          </footer>
        </div>
      </div>
    </>
  );
}

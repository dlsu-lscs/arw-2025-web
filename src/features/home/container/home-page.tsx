'use client';
import HighlightCard from '@/components/highlight-card';
import NavBar from '../components/navbar';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPreviousPixel,
  CarouselNextPixel,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import ExpandableText from '@/components/collapsible-text';
import CollapsibleText from '@/components/collapsible-text';
import { SearchBar } from '@/components/search-bar';
import { useEffect, useState } from 'react';
import ClusterModal from '@/features/clusters/containers/cluster-modal';
import { useClusterModalStore } from '@/features/clusters/store/useClusterModalStore';
import api from '@/lib/axios';

const dummyData = [
  {
    acronym: 'All organizations',
    name: 'All organizations among the 5 clusters in CSO.',
  },
  {
    acronym: 'ENGAGE',
    name: 'Engineering Alliance Geared Towards Excellence (ENGAGE).',
  },
];

export default function HomePage() {
  const [selectedCluster, setSelectedCluster] = useState('');
  const { isOrgModalOpen, openOrgModal } = useClusterModalStore();

  return (
    <>
      <div className="pixel-corners--wrapper mx-auto">
        <div className="!max-w-7xl border-2 bg-white border-black p-4 !flex flex-col pixel-corners">
          <NavBar />
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

          <Carousel className="w-full my-4">
            <CarouselContent>
              {dummyData.map(({ acronym, name }, index) => (
                <CarouselItem key={index} className="pr-10 pl-14">
                  <h2 className="text-center text-blue-700 text-sm sm:text-2xl">{acronym}</h2>
                  <h4 className="text-center font-space-mono text-xs sm:text-lg">{name}</h4>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPreviousPixel className="left-1" />
            <CarouselNextPixel className="right-1" />
          </Carousel>

          <Button
            className="font-space-mono bg-[#D8E6FF] rounded-none border-black text-sm sm:text-base font-bold self-center mt-4 mb-8"
            variant="outline"
            onClick={openOrgModal}
          >
            DISCOVER THE CLUSTERS
          </Button>

          <SearchBar />
          <ClusterModal />
        </div>
      </div>
    </>
  );
}

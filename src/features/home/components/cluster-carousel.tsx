'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPreviousPixel,
  CarouselNextPixel,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useSelectClusterStore } from '@/store/useSelectClusterStore';
import { clusters } from '../data/clusters';
import { useCallback, useEffect, useRef } from 'react';
import { returnColorFromCluster } from '@/lib/helpers';
import { cn } from '@/lib/utils';

export default function ClusterCarousel() {
  const { selectedCluster, setSelectedCluster } = useSelectClusterStore();
  const apiRef = useRef<CarouselApi | null>(null);

  const handleApi = useCallback(
    (api: CarouselApi) => {
      if (!api) return;
      apiRef.current = api;

      const initialId = clusters[api.selectedScrollSnap()].id;
      setSelectedCluster(initialId);

      api.on('select', () => {
        const index = api.selectedScrollSnap();
        setSelectedCluster(clusters[index].id);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCluster]
  );

  useEffect(() => {
    const api = apiRef.current;

    if (!api) return;

    const index = clusters.findIndex((cluster) => cluster.id === selectedCluster);

    if (index >= 0 && index != api.selectedScrollSnap()) {
      api.scrollTo(index);
    }
  }, [selectedCluster]);

  return (
    <>
      <Carousel className="w-full mt-4" opts={{ loop: true }} setApi={handleApi}>
        <CarouselContent>
          {clusters.map(({ id, acronym, name }, index) => {
            return (
              <CarouselItem key={index} className="pr-10 pl-14">
                <h2
                  className="text-center text-sm sm:text-xl 2xl:text-2xl"
                  style={{ color: returnColorFromCluster(id) }}
                >
                  {acronym}
                </h2>

                <h4 className={cn('text-center font-space-mono text-xs sm:text-lg')}>{name}</h4>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPreviousPixel className="left-1" />
        <CarouselNextPixel className="right-1" />
      </Carousel>
    </>
  );
}

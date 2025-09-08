'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useOrgsModalStore } from '../store/useOrgsModalStore';
import CloseModal from '@/components/modal/close-modal';
import { ChevronDown } from 'lucide-react';
import { OrganizationType } from '../types/orgs.types';

type OrgsModalProps = {
  org?: OrganizationType;
  isLoading?: boolean;
  isError?: boolean;
};

export default function OrgsModal({ org, isLoading, isError }: OrgsModalProps) {
  const { isOrgsModalOpen, openOrgsModal } = useOrgsModalStore();

  if (process.env.NODE_ENV !== 'production') console.log('🔍 Org Modal Debug - org:', org);

  if (org)
    return (
      <>
        <Dialog open={isOrgsModalOpen} onOpenChange={openOrgsModal}>
          <DialogContent className="[&>button:last-child]:hidden pixel-corner--modal overflow-y-scroll">
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <main className="grid grid-cols-2 gap-2 px-4 py-1">
              <section className="flex flex-col gap-10">
                <div className="mb-8">
                  <CloseModal className="text-[#0F0092] text-2xl" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h1 className="text-3xl">{org.name}</h1>
                    <p className="text-lg opacity-50">{org.tagline}</p>
                    <Button
                      className="font-tiny5 bg-[#D8E6FF] rounded-none border-black text-3xl font-bold self-center mt-4 mb-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center"
                      variant="outline"
                      onClick={() => window.open(org.gformsUrl, '_blank', 'noopener,noreferrer')}
                    >
                      <span className="pr-4 border-r-2 border-black">JOIN NOW - P{org.fee}</span>
                      <span className="pl-2">
                        <Image
                          alt="next"
                          width={18}
                          height={18}
                          src="/assets/next.svg"
                          className="transform rotate-90 invert-0 brightness-0"
                        />
                      </span>
                    </Button>
                  </div>
                  <div>
                    {org.publications.logoUrl == null ? null : (
                      <Image
                        src={org.publications.logoUrl ?? '/assets/placeholder-image.png'}
                        alt="org logo"
                        width={167}
                        height={157}
                        loading="lazy"
                        unoptimized
                        className="rounded-lg"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-3xl">About Us</h1>
                  <p className="font-space-mono text-md font-regular w-full">{org.about}</p>
                </div>
                <div className="flex flex-col gap-4">
                  {' '}
                  <h1 className="text-3xl">Mission</h1>
                  <p className="font-space-mono text-md font-regular w-full">{org.mission}</p>
                </div>
                <div className="flex flex-col gap-4">
                  {' '}
                  <h1 className="text-3xl">Vision</h1>
                  <p className="font-space-mono text-md font-regular w-full">{org.vision}</p>
                </div>
              </section>
              <section className="flex justify-center">
                <Image
                  src="https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/544108095_1074363368196384_2903282524075137468_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGq2s5J92EgDuT9Rwi-t_uh-ysNYn-4L5r7Kw1if7gvmh13OIx8szvO3ilh4vi0GyhOt5rcGFU9lvHLUq3OI5YL&_nc_ohc=rYRalMRdLUoQ7kNvwGBXEbw&_nc_oc=AdlN5cT12KLCqgav2JqnL8Uu6-N-ZwXTG05yuaby6QUPBGpq9wHh2Px0XYkEl9mbhV3CP3-MNZP1oxFo_S32ycHV&_nc_zt=23&_nc_ht=scontent.fmnl4-3.fna&_nc_gid=v-h2Q6Wxf10tblH76XoEpA&oh=00_Afail3N929v6DMNpRZoqcj3ev102DNfnPBzzm1oat4QNTQ&oe=68C37D6E"
                  alt="org logo"
                  width={646}
                  height={814}
                  unoptimized
                  className="rounded-lg"
                  onClick={() => window.open(org.facebookUrl, '_blank', 'noopener,noreferrer')}
                />
              </section>
            </main>
            <footer className="flex justify-center mt-12">
              <h3 className="font-tiny5 opacity-50">Powered by La Salle Computer Society.</h3>
            </footer>
          </DialogContent>
        </Dialog>
      </>
    );
}

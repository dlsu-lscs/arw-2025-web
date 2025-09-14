'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useOrgsModalStore } from '../store/useOrgsModalStore';
import CloseModal from '@/components/modal/close-modal';
import { OrganizationType } from '../types/orgs.types';
import { AiOutlineLoading } from 'react-icons/ai';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextPixel,
  CarouselPreviousPixel,
} from '@/components/ui/carousel';
import { DialogTrigger } from '@radix-ui/react-dialog';

type OrgsModalProps = {
  org?: OrganizationType;
  isLoading?: boolean;
  isError?: boolean;
};

export default function OrgsModal({ org, isLoading, isError }: OrgsModalProps) {
  const { isOrgsModalOpen, closeOrgsModal } = useOrgsModalStore();

  if (process.env.NODE_ENV !== 'production') console.log('🔍 Org Modal Debug - org:', org);

  return (
    <Dialog open={isOrgsModalOpen} onOpenChange={closeOrgsModal}>
      <DialogContent className="[&>button:last-child]:hidden pixel-corner--no-scroll flex flex-col p-4 sm:p-6 md:p-8 overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {/* Show only on mobile + tablet, hide on PC */}
            <div className="block lg:hidden mb-4 md:mb-8">
              <CloseModal className="text-[#0F0092] text-xl sm:text-2xl md:text-3xl" />
            </div>
          </DialogTitle>
        </DialogHeader>

        {isError ? (
          <>
            <section className="flex flex-col justify-center items-center font-space-mono gap-4 m-4">
              <p className="text-lg">ORG ERROR: PLEASE TRY AGAIN</p>
              <p
                className="text-sm opacity-70 cursor-pointer hover:opacity-100 transition"
                onClick={closeOrgsModal}
              >
                ▶ CLICK TO RETURN
              </p>
            </section>
          </>
        ) : (
          <>
            {isLoading ? (
              <>
                <section className="flex flex-col justify-center items-center font-space-mono gap-4 m-4">
                  <AiOutlineLoading className="text-2xl animate-spin" />
                  <p className="text-lg">LOADING ORG...</p>
                  <p
                    className="text-sm opacity-70 cursor-pointer hover:opacity-100 transition"
                    onClick={closeOrgsModal}
                  >
                    ▶ CLICK TO RETURN
                  </p>
                </section>
              </>
            ) : (
              <>
                <main className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 flex-1 overflow-hidden">
                  {/* RIGHT SECTION - shows on top for mobile */}
                  <section className="order-1 md:order-2 flex justify-center items-start md:items-center pixel-right">
                    <img
                      src={org?.publications.mainPubUrl}
                      alt="org image 1"
                      className="w-full max-h-[90vh] object-contain rounded-lg cursor-pointer"
                      onClick={() => window.open(org?.facebookUrl, '_blank', 'noopener,noreferrer')}
                    />
                  </section>

                  {/* LEFT SECTION */}
                  <section className="order-2 md:order-1 flex flex-col gap-8 md:gap-10 pixel-left pb-6 shadcn-scrollbar">
                    <div className="hidden lg:block mb-4 md:mb-8">
                      <CloseModal className="text-[#0F0092] text-xl sm:text-2xl md:text-3xl" />
                    </div>
                    {/* Logo above name/tagline until lg, side-by-side only at xl */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-center">
                      {/* Name + tagline first only on xl+ */}
                      <div className="order-2 xl:order-1 text-center xl:text-left">
                        <h1 className="text-2xl md:text-3xl">{org?.name}</h1>
                        <p className="text-base md:text-lg opacity-50">{org?.tagline}</p>
                        <Button
                          className="font-tiny5 bg-[#D8E6FF] rounded-none border-black text-xl md:text-3xl font-bold self-center mt-4 mb-6 md:mb-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center"
                          variant="outline"
                          onClick={() =>
                            window.open(org?.gformsUrl, '_blank', 'noopener,noreferrer')
                          }
                        >
                          JOIN NOW
                        </Button>
                        {org?.fee ? (
                          <>
                            {org?.fee ? (
                              <>
                                <p className="font-tiny5 text-black text-lg">{org?.fee}</p>
                              </>
                            ) : null}
                          </>
                        ) : null}
                      </div>

                      {/* Logo second on xl+ */}
                      <div className="order-1 xl:order-2 flex justify-center items-center xl:justify-center">
                        {org?.publications.logoUrl && (
                          <Image
                            src={org?.publications.logoUrl}
                            alt="org logo"
                            width={167}
                            height={157}
                            loading="lazy"
                            unoptimized
                            className="rounded-lg max-w-full h-auto xl:ml-8"
                          />
                        )}
                      </div>
                    </div>

                    {/* About, Mission, Vision */}
                    {org?.about ? (
                      <>
                        <div className="flex flex-col gap-4">
                          <h1 className="text-2xl md:text-3xl">About Us</h1>
                          <div className="flex gap-2 w-full overflow-x-auto ">
                            {org.publications.mainPubUrl ? (
                              <>
                                <Dialog>
                                  <DialogTrigger>
                                    <img
                                      src={org?.publications.mainPubUrl}
                                      alt="main pub"
                                      className="w-auto h-[200px] object-contain rounded-lg cursor-pointer flex-shrink-0"
                                    />
                                  </DialogTrigger>
                                  <DialogTitle></DialogTitle>
                                  <DialogContent className="bg-transparent border-none p-0">
                                    <img
                                      src={org?.publications.mainPubUrl}
                                      alt="main pub"
                                      className="w-full h-full object-contain rounded-lg cursor-pointer flex-shrink-0"
                                    />
                                  </DialogContent>
                                </Dialog>
                              </>
                            ) : null}
                            {org.publications.feePubUrl ? (
                              <>
                                <Dialog>
                                  <DialogTrigger>
                                    <img
                                      src={org?.publications.feePubUrl}
                                      alt="fee pub"
                                      className="w-auto h-[200px] object-contain rounded-lg cursor-pointer flex-shrink-0"
                                    />
                                  </DialogTrigger>
                                  <DialogTitle></DialogTitle>
                                  <DialogContent className="bg-transparent border-none p-0">
                                    <img
                                      src={org?.publications.feePubUrl}
                                      alt="fee pub"
                                      className="w-full h-full object-contain rounded-lg cursor-pointer flex-shrink-0"
                                    />
                                  </DialogContent>
                                </Dialog>
                              </>
                            ) : null}
                            {org.publications.orgVidUrl ? (
                              <>
                                <Dialog>
                                  <DialogTrigger>
                                    <img
                                      src={org?.publications.orgVidUrl}
                                      alt="fee pub"
                                      className="w-auto h-[200px] object-contain rounded-lg cursor-pointer flex-shrink-0"
                                    />
                                  </DialogTrigger>
                                  <DialogTitle></DialogTitle>
                                  <DialogContent className="bg-transparent border-none p-0">
                                    <img
                                      src={org?.publications.orgVidUrl}
                                      alt="fee pub"
                                      className="w-full h-full object-contain rounded-lg cursor-pointer flex-shrink-0"
                                    />
                                  </DialogContent>
                                </Dialog>
                              </>
                            ) : null}
                          </div>
                          <p className="font-space-mono text-sm md:text-md w-full">{org?.about}</p>
                        </div>
                      </>
                    ) : null}
                    {org?.mission ? (
                      <>
                        <div className="flex flex-col gap-4">
                          <h1 className="text-2xl md:text-3xl">Mission</h1>
                          <p className="font-space-mono text-sm md:text-md w-full">
                            {org?.mission}
                          </p>
                        </div>
                      </>
                    ) : null}
                    {org?.vision ? (
                      <>
                        <div className="flex flex-col gap-4">
                          <h1 className="text-2xl md:text-3xl">Vision</h1>
                          <p className="font-space-mono text-sm md:text-md w-full">{org?.vision}</p>
                        </div>
                      </>
                    ) : null}
                    <footer className="flex justify-center mt-8 md:mt-12">
                      <h3 className="font-tiny5 text-sm md:text-base opacity-50">
                        Powered by La Salle Computer Society.
                      </h3>
                    </footer>
                  </section>
                </main>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

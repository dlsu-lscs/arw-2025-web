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
                    <Carousel className="w-full" opts={{ loop: true }}>
                      <CarouselContent>
                        <CarouselItem className="basis-[80%]  flex justify-center items-center">
                          <img
                            src="https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/545580037_1190175683142012_2186304815006449886_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE4R6AGNKAb_gzcp4YdYAncgMYg3AmRlQWAxiDcCZGVBa3Tn1nvWl7UNzT_inbJdKfTiUxuasJz96VTwyy6Qy8i&_nc_ohc=4hFZC2ITpBsQ7kNvwF-dWOW&_nc_oc=AdnnIuUqe0JHlZmS6QRdEzTJjBF3nSzI5j8yymixzBVjDAYjyDIjbQfR3NWu_-AM_mBQZRDspa3hQswveCC67hIj&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=9YmXn29-f7dvz8OvoR0DPA&oh=00_AfZHat8hNNEi8gnzSbCF9_3Na_mKj-9lk_HK6D_fFU_nrw&oe=68CB69E4"
                            alt="org image 1"
                            className="w-full max-h-[90vh] object-contain rounded-lg cursor-pointer"
                            onClick={() =>
                              window.open(org?.facebookUrl, '_blank', 'noopener,noreferrer')
                            }
                          />
                        </CarouselItem>
                        <CarouselItem className="basis-[80%]  flex justify-center items-center">
                          <img
                            src="https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-6/547174890_1194235219402725_5628082084578477908_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFKkxynjLbUiJthqqk2FMbVLej2r5pHM9Yt6Pavmkcz1irMB7DUyc-ONvFbT9xXKvv89vhpyes2LsnMd_gxWDNN&_nc_ohc=LIPb0-EghFEQ7kNvwFgwBHW&_nc_oc=AdnaKwIMAM2o_8gu25Wh8p4p6kK2i_WXk5DYsDK9VW8rTTgcU3mEJyQeJXcnrZ12iHnNfP69DecZlNgWsiTx2Hml&_nc_zt=23&_nc_ht=scontent.fmnl4-1.fna&_nc_gid=eGbjgLnjOWYOuRgbj2qHuw&oh=00_AfZYmqsgyGs8tPx4gK4ZuQsghTVLI10keiQhXufZkFfJyw&oe=68CB4C6B"
                            alt="org image 1"
                            className="w-full min-h-full object-cover rounded-lg cursor-pointer"
                            onClick={() =>
                              window.open(org?.facebookUrl, '_blank', 'noopener,noreferrer')
                            }
                          />
                        </CarouselItem>
                      </CarouselContent>

                      <CarouselPreviousPixel className="left-1" />
                      <CarouselNextPixel className="right-1" />
                    </Carousel>
                  </section>

                  {/* LEFT SECTION */}
                  <section className="order-2 md:order-1 flex flex-col gap-8 md:gap-10 pixel-left pb-6">
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
                          <span className="pr-4 border-r-2 border-black">
                            JOIN NOW - P{org?.fee}
                          </span>
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

                      {/* Logo second on xl+ */}
                      <div className="order-1 xl:order-2 flex justify-center items-center xl:justify-center">
                        {org?.publications.logoUrl && (
                          <Image
                            src="https://researchfair.upalchemes.org/wp-content/uploads/LSCS-1.png"
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
                    <div className="flex flex-col gap-4">
                      <h1 className="text-2xl md:text-3xl">About Us</h1>
                      <p className="font-space-mono text-sm md:text-md w-full">{org?.about}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-2xl md:text-3xl">Mission</h1>
                      <p className="font-space-mono text-sm md:text-md w-full">{org?.mission}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-2xl md:text-3xl">Vision</h1>
                      <p className="font-space-mono text-sm md:text-md w-full">{org?.vision}</p>
                    </div>
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

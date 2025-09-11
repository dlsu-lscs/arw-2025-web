'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useOrgsModalStore } from '../store/useOrgsModalStore';
import CloseModal from '@/components/modal/close-modal';
import { OrganizationType } from '../types/orgs.types';
import { AiOutlineLoading } from 'react-icons/ai';

type OrgsModalProps = {
  org?: OrganizationType;
  isLoading?: boolean;
  isError?: boolean;
};

export default function OrgsModal({ org, isLoading, isError }: OrgsModalProps) {
  const { isOrgsModalOpen, openOrgsModal, closeOrgsModal } = useOrgsModalStore();

  if (process.env.NODE_ENV !== 'production') console.log('🔍 Org Modal Debug - org:', org);

  return (
    <Dialog open={isOrgsModalOpen} onOpenChange={openOrgsModal}>
      <DialogContent className="[&>button:last-child]:hidden pixel-corner--modal overflow-y-scroll p-4 sm:p-6 md:p-8">
        <DialogHeader>
          <DialogTitle>
            <div className="md:hidden block mb-4 md:mb-8">
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
                <main className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  {/* RIGHT SECTION - shows on top for mobile */}
                  <section className="order-1 md:order-2 flex justify-center items-start md:items-center">
                    <Image
                      src="https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/545580037_1190175683142012_2186304815006449886_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE4R6AGNKAb_gzcp4YdYAncgMYg3AmRlQWAxiDcCZGVBa3Tn1nvWl7UNzT_inbJdKfTiUxuasJz96VTwyy6Qy8i&_nc_ohc=5slV48eQiBcQ7kNvwFOY6a9&_nc_oc=AdnSkWr-bO0PcBQrkzHKNPU_EuRwApKxsD86t-pTVGvkt5NTDIDlNkA4hBSjljsao2tCOwtb-rf-a7IjNK0_MOIv&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=M5IwpGCD3mZwxtW1HqjIIw&oh=00_AfZsy78J5teokZhe6ewyqvtjGn0z0dh_JJptf4UHc47QAw&oe=68C4D264"
                      alt="org main"
                      width={646}
                      height={814}
                      unoptimized
                      className="rounded-lg w-full h-auto"
                      onClick={() => window.open(org.facebookUrl, '_blank', 'noopener,noreferrer')}
                    />
                  </section>

                  {/* LEFT SECTION */}
                  <section className="order-2 md:order-1 flex flex-col gap-8 md:gap-10">
                    <div className="hidden lg:block mb-4 md:mb-8">
                      <CloseModal className="text-[#0F0092] text-xl sm:text-2xl md:text-3xl" />
                    </div>
                    {/* Logo above name/tagline on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      {/* Logo first on mobile */}
                      <div className="order-1 sm:order-2 flex justify-center items-center">
                        {org.publications.logoUrl && (
                          <Image
                            // src={org.publications.logoUrl ?? '/assets/placeholder-image.png'}
                            src="https://researchfair.upalchemes.org/wp-content/uploads/LSCS-1.png"
                            alt="org logo"
                            width={167}
                            height={157}
                            loading="lazy"
                            unoptimized
                            className="rounded-lg max-w-full h-auto"
                          />
                        )}
                      </div>

                      {/* Name + tagline second on mobile */}
                      <div className="order-2 sm:order-1 text-center sm:text-left">
                        <h1 className="text-2xl md:text-3xl">{org.name}</h1>
                        <p className="text-base md:text-lg opacity-50">{org.tagline}</p>
                        <Button
                          className="font-tiny5 bg-[#D8E6FF] rounded-none border-black text-xl md:text-3xl font-bold self-center mt-4 mb-6 md:mb-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center"
                          variant="outline"
                          onClick={() =>
                            window.open(org.gformsUrl, '_blank', 'noopener,noreferrer')
                          }
                        >
                          <span className="pr-4 border-r-2 border-black">
                            JOIN NOW - P{org.fee}
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
                    </div>

                    {/* About, Mission, Vision */}
                    <div className="flex flex-col gap-4">
                      <h1 className="text-2xl md:text-3xl">About Us</h1>
                      <p className="font-space-mono text-sm md:text-md w-full">{org.about}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-2xl md:text-3xl">Mission</h1>
                      <p className="font-space-mono text-sm md:text-md w-full">{org.mission}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-2xl md:text-3xl">Vision</h1>
                      <p className="font-space-mono text-sm md:text-md w-full">{org.vision}</p>
                    </div>
                  </section>
                </main>
              </>
            )}
          </>
        )}
        <footer className="flex justify-center mt-8 md:mt-12">
          <h3 className="font-tiny5 text-sm md:text-base opacity-50">
            Powered by La Salle Computer Society.
          </h3>
        </footer>
      </DialogContent>
    </Dialog>
  );
}

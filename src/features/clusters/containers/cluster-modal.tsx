'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useClusterModalStore } from '../store/useClusterModalStore'
import CloseModal from '@/components/modal/close-modal'
import Image from 'next/image'

export default function ClusterModal() {
  const { isOrgModalOpen, closeOrgModal } = useClusterModalStore()
  return (
    <>
      <Dialog open={isOrgModalOpen} onOpenChange={closeOrgModal}>
        <DialogContent className="[&>button:last-child]:hidden pixel-corner--modal">
          <DialogHeader>
            <DialogTitle>
              <CloseModal />
            </DialogTitle>
          </DialogHeader>
          <main className="grid grid-cols-2 p-10">
            {/* First Col, Clusters Title, Engage Card, Cap13 Card, Macky Logo, Aspire Card*/}
            <section className="grid grid-cols-2 gap-2">
              {/* First Row */}
              <section className="grid grid-cols-1 gap-4">
                {/* Clusters Title */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl">Clusters!?</h1>
                  <p className="font-space-mono">
                    Clusters are alliances or groups of CSO-accredited
                    organizations that share similar themes or goals. Select one
                    that catches your eye, and find where you belong!
                  </p>
                </div>
                {/* Engage Card */}
                <div>
                  <div className="w-full h-[200px] bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#010F56]/70 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white ">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-left  text-3xl [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        ENGAGE
                      </h1>
                      <p className="text-xl font-space-grotesk font-bold">
                        Engineering Alliance Geared Towards Excellence
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="grid grid-cols-1 gap-4">
                {/* CAP13 Card */}
                <div>
                  <div className="w-[200px] h-full bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#564C01]/70 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-left text-3xl [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        CAP13
                      </h1>
                      <p className="text-xl font-space-grotesk font-bold">
                        College of Liberal Arts Organizations
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="grid grid-cols-2 gap-4">
                <div className="flex justify-end w-full">
                  <Image
                    src="/logos/macky_logo.webp"
                    alt="macky logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                  />
                </div>

                {/* Aspire Card */}
                <div>
                  <div className="w-full h-[200px] bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#8D0094]/70 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white ">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-left  text-3xl [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        ASPIRE
                      </h1>
                      <p className="text-xl font-space-grotesk font-bold">
                        College of Education and Special Interest and
                        Socio-Civic Organizations
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </section>
            <section className="grid grid-cols-1 gap-2">
              <section className="grid grid-rows-1 grid-cols-2 gap-4">
                {/* PROBE Card */}
                <div>
                  <div className="w-[400px] h-full bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#940000]/70 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-left text-3xl [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        PROBE
                      </h1>
                      <p className="text-xl font-space-grotesk font-bold">
                        Professional Organizations of Business and Economics
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                {/* ASO Card */}
                <div>
                  <div className="w-[200px] h-full bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#3FA300]/70 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-left text-3xl [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        ASO
                      </h1>
                      <p className="text-xl font-space-grotesk font-bold">
                        Alliance of Science Organizations
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </main>
          <footer className="flex justify-center">
            <h3 className="font-tiny5 opacity-50">
              Powered by La Salle Computer Society.
            </h3>
          </footer>
        </DialogContent>
      </Dialog>
    </>
  )
}

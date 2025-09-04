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
          <main className="grid grid-cols-2 p-12 gap-4">
            {/* First Main Column (Left Side) with nested rows */}
            <section className="grid grid-cols-1 gap-4">
              {/* First Row: Clusters, Engage, and CAP13 Cards side by side */}
              <div className="grid grid-cols-2 gap-4">
                {/* Clusters Title & Engage Card */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">Clusters!?</h1>
                    <p className="font-space-mono">
                      Clusters are alliances or groups of CSO-accredited
                      organizations that share similar themes or goals. Select
                      one that catches your eye, and find where you belong!
                    </p>
                  </div>
                  <div>
                    <div className="w-full h-[200px] bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#010F56]/70 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-left text-3xl [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                          ENGAGE
                        </h1>
                        <p className="text-xl font-space-mono font-bold">
                          Engineering Alliance Geared Towards Excellence
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* CAP13 Card */}
                <div>
                  <div className="w-full h-full bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#564C01]/70 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-left text-3xl [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        CAP13
                      </h1>
                      <p className="text-xl font-space-mono font-bold">
                        College of Liberal Arts Organizations
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row: Macky Logo & Aspire Card */}
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <div className="w-full h-[200px] bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#8D0094]/70 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-left text-3xl [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        ASPIRE
                      </h1>
                      <p className="text-xl font-space-mono font-bold">
                        College of Education and Special Interest and
                        Socio-Civic Organizations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Second Main Column (Right Side) */}
            <section className="grid grid-cols-2 grid-rows-2 gap-4">
              {/* PROBE Card spanning two columns */}
              <div className="col-span-2">
                <div className="w-full h-full bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#940000]/70 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-left text-3xl [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                      PROBE
                    </h1>
                    <p className="text-xl font-space-mono font-bold">
                      Professional Organizations of Business and Economics
                    </p>
                  </div>
                </div>
              </div>
              {/* ASO Card */}
              <div>
                <div className="w-full h-full bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#3FA300]/70 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-left text-3xl [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                      ASO
                    </h1>
                    <p className="text-xl font-space-mono font-bold">
                      Alliance of Science Organizations
                    </p>
                  </div>
                </div>
              </div>
              {/* Empty div for the second col of the second row */}
              <div></div>
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

'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useClusterModalStore } from '../store/useClusterModalStore';
import CloseModal from '@/components/modal/close-modal';
import { useSelectClusterStore } from '@/store/useSelectClusterStore';

export default function ClusterModal() {
  const { isClusterModalOpen, closeClusterModal } = useClusterModalStore();
  const { setSelectedCluster } = useSelectClusterStore();

  return (
    <>
      <Dialog open={isClusterModalOpen} onOpenChange={closeClusterModal}>
        <DialogContent className="[&>button:last-child]:hidden pixel-corner--no-scroll-grid w-fit">
          <DialogHeader>
            <DialogTitle>
              <CloseModal />
            </DialogTitle>
          </DialogHeader>
          {/* Main container with responsive flexbox properties */}
          <main className="flex flex-col gap-4 p-8 md:p-16 justify-center items-center lg:flex-row">
            {/* First Main Column (Left Side) with nested rows */}
            <section className="flex flex-col gap-4 w-full md:w-auto">
              {/* First Row: Clusters, Engage, and CAP13 Cards side by side */}
              <div className="flex gap-4 flex-col md:flex-row">
                {/* Clusters Title & Engage Card */}
                <div className="flex flex-col gap-4 w-full md:w-[400px]">
                  <div className="flex flex-col gap-2 h-auto md:h-[200px]">
                    <h1 className="text-[clamp(1.5rem,4vw,1.875rem)]">Clusters!?</h1>
                    <p className="font-space-mono text-[clamp(0.875rem,2.5vw,1rem)]">
                      Clusters are alliances or groups of CSO-accredited organizations that share
                      similar themes or goals. Select one that catches your eye, and find where you
                      belong!
                    </p>
                  </div>
                  <div>
                    <button
                      className="w-full h-[200px] bg-[url('/bg/st-lasalle-bg.webp')] hover:cursor-pointer bg-center bg-cover bg-[#010F56]/62 hover:opacity-90 transition duration-100 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white"
                      onClick={() => {
                        closeClusterModal();
                        setSelectedCluster('engage');
                      }}
                    >
                      <div className="flex flex-col gap-2">
                        <h1 className="text-left text-[clamp(1.25rem,4vw,1.875rem)] [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                          ENGAGE
                        </h1>
                        <p className="text-[clamp(0.75rem,2vw,1.25rem)] text-left font-space-mono font-bold">
                          Engineering Alliance Geared Towards Excellence
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
                {/* CAP13 Card */}
                <div className="flex justify-center items-center w-full md:w-auto">
                  <div
                    className="w-full h-[200px] md:w-[200px] md:h-[400px] bg-[url('/bg/st-lasalle-bg.webp')] hover:cursor-pointer bg-center bg-cover bg-[#564C01]/62 hover:opacity-90 transition duration-100 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white"
                    onClick={() => {
                      closeClusterModal();
                      setSelectedCluster('cap13');
                    }}
                  >
                    <button className="w-full hover:cursor-pointer mx-auto flex flex-col gap-2">
                      <h1 className="text-left text-[clamp(1.25rem,4vw,1.875rem)] [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        CAP13
                      </h1>
                      <p className="text-[clamp(0.75rem,2vw,1.25rem)] text-left font-space-mono font-bold">
                        College of Liberal Arts Organizations
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Second Row: Macky Logo & Aspire Card */}
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex justify-end w-full">
                  <div className="w-full h-[200px] md:w-[200px] md:h-[200px] hover:cursor-pointer bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#004B02]/62 hover:opacity-90 transition duration-100 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white">
                    <button
                      className="flex flex-col gap-2 hover:cursor-pointer"
                      onClick={() => {
                        closeClusterModal();
                        setSelectedCluster('cso');
                      }}
                    >
                      <h1 className="text-left text-[clamp(1rem,2.5vw,1.5rem)] [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        CSO
                      </h1>
                      <p className="text-[clamp(0.65rem,1.5vw,1rem)] text-left font-space-mono font-bold leading-snug">
                        Council of Student Organizations
                      </p>
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <div className="w-full h-[200px] md:w-[400px] hover:cursor-pointer bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#8D0094]/70 hover:opacity-90 transition duration-100 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white">
                    <button
                      className="flex flex-col gap-2 hover:cursor-pointer"
                      onClick={() => {
                        closeClusterModal();
                        setSelectedCluster('aspire');
                      }}
                    >
                      <h1 className="text-left text-[clamp(1rem,2.5vw,1.5rem)] [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        ASPIRE
                      </h1>
                      <p className="text-[clamp(0.65rem,1.5vw,1rem)] text-left font-space-mono font-bold leading-snug">
                        College of Education and Special Interest and Socio-Civic Organizations
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Second Main Column (Right Side) */}
            <section className="flex w-full flex-col gap-4  md:items-center lg:items-start">
              {/* PROBE Card spanning two columns */}
              <div className="flex w-full lg:justify-start md:justify-center">
                <div
                  className="w-full h-[200px] md:w-[400px] hover:cursor-pointer bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#940000]/62 hover:opacity-90 transition duration-100  bg-blend-multiply flex justify-start items-center rounded-lg text-white"
                  onClick={() => {
                    closeClusterModal();
                    setSelectedCluster('probe');
                  }}
                >
                  <button className="w-full mx-auto flex flex-col gap-2 hover:cursor-pointer p-6">
                    <h1 className="text-left text-[clamp(1.25rem,4vw,1.875rem)] [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                      PROBE
                    </h1>
                    <p className="text-[clamp(0.75rem,2vw,1.25rem)] text-left font-space-mono font-bold">
                      Professional Organizations of Business and Economics
                    </p>
                  </button>
                </div>
              </div>
              <div className="flex gap-4 flex-col md:flex-row">
                {/* ASO Card */}
                <div
                  className="w-full h-[200px] md:w-[200px] md:h-[400px] hover:cursor-pointer bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#3FA300]/62 hover:opacity-90 transition duration-100 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white"
                  onClick={() => {
                    closeClusterModal();
                    setSelectedCluster('aso');
                  }}
                >
                  <button className="flex flex-col gap-2 hover:cursor-pointer">
                    <h1 className="text-left text-[clamp(1.25rem,4vw,1.875rem)] [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                      ASO
                    </h1>
                    <p className="text-[clamp(0.75rem,2vw,1.25rem)] text-left font-space-mono font-bold">
                      Alliance of Science Organizations
                    </p>
                  </button>
                </div>
                {/* Other Card */}
                <div className="w-full">
                  <div
                    className="w-full h-[200px] md:w-[200px] md:h-[400px] hover:cursor-pointer bg-[url('/bg/st-lasalle-bg.webp')] bg-center bg-cover bg-[#0078A3]/62 hover:opacity-90 transition duration-100 bg-blend-multiply flex justify-start p-6 items-center rounded-lg text-white"
                    onClick={() => {
                      closeClusterModal();
                      setSelectedCluster('special');
                    }}
                  >
                    <button className="flex flex-col gap-2 hover:cursor-pointer">
                      <h1 className="text-left text-[clamp(1rem,3vw,1.5rem)] [text-shadow:_4px_4px_0px_rgba(0,0,0,1)]">
                        Special
                      </h1>
                      <p className="text-[clamp(0.65rem,1.5vw,1rem)] text-left font-space-mono font-bold">
                        Special Organizations
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <footer className="flex justify-center">
            <h3 className="font-tiny5 opacity-50">Powered by La Salle Computer Society.</h3>
          </footer>
        </DialogContent>
      </Dialog>
    </>
  );
}

import CloseModal from '@/components/modal/close-modal';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

export default function LSCSModal() {
  return (
    <>
      <Dialog>
        <DialogTrigger className="hover:cursor-pointer">LSCS</DialogTrigger>
        <DialogContent className="max-h-[95vh] h-full overflow-hidden pixel-corner--modal [&>button:last-child]:hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>
              <DialogClose>
                <CloseModal className="text-[#0F0092] text-lg sm:text-2xl md:text-3xl" />
              </DialogClose>
            </DialogTitle>
          </DialogHeader>

          <div className="flex overflow-hidden min-h-0 sm:p-4 gap-4 sm:gap-12 sm:flex-row flex-col my-auto">
            <section className="sm:flex-1 flex items-center justify-center">
              <div className="max-w-24 sm:max-w-none">
                <Image
                  src={'/logos/lscs-logo.png'}
                  alt="LSCS Logo"
                  width={400}
                  height={400}
                ></Image>
              </div>
              <h1 className="sm:text-3xl text-lg font-bold sm:hidden block text-center">
                La Salle Computer Society
              </h1>
            </section>
            <section className="flex-2 overflow-y-auto min-h-0 h-full pr-4 space-y-4 shadcn-scrollbar font-space-mono">
              <h1 className="sm:text-3xl font-bold hidden sm:block font-press-start">
                La Salle Computer Society
              </h1>
              <p className="sm:text-lg text-sm">
                La Salle Computer Society (LSCS) is DLSU&apos;s largest and pioneering technological
                organization and the home organization of the College of Computer Studies. LSCS is
                committed to help students learn more about tech through interactive workshops, make
                new friends with recreational events, develop their leadership skills through the
                esteemed Junior Officer Training program, secure a job through various career
                events, and more. Now in its 40th year of service, LSCS continues to ignite,
                innovate, and inspire.
              </p>
              <h2 className="text-lg text-blue-800 font-press-start">Vision</h2>
              <p className="sm:text-lg text-sm">
                We envision the La Salle Computer Society to be an organization that, through
                quality assistance and activities, will mold its members academically, socially and
                spiritually in order for them to become competent Lasallian students and
                well-rounded individuals. We also see the organization to be the pioneering student
                organization of the De La Salle University Manila that strongly symbolizes the
                expertise of the College of Computer Studies (CCS) in the field of computer science
              </p>
              <h2 className="text-lg text-yellow-600 font-press-start">Mission</h2>
              <p className="sm:text-lg text-sm">
                <span className="font-bold">Purpose</span> - to know and understand the reason
                behind every act, decision, and endeavor pursued.
              </p>
              <p className="sm:text-lg text-sm">
                <span className="font-bold">Process</span> - to organize and oversee the entire
                procedure of every project and make sure that each goes through very necessary step
                towards the purpose.
              </p>
              <p className="sm:text-lg text-sm">
                <span className="font-bold">Excellence</span> - to accomplish our goals in the best
                way possible and in accordance with the ideals of the organization and of De La
                Salle University Manila.
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

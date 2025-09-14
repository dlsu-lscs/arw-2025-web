import CloseModal from '@/components/modal/close-modal';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

export default function CSOModal() {
  return (
    <>
      <Dialog>
        <DialogTrigger className="hover:cursor-pointer">CSO</DialogTrigger>
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
                <Image src={'/logos/cso.png'} alt="CSO Logo" width={400} height={400}></Image>
              </div>
              <h1 className="sm:text-3xl text-lg font-bold sm:hidden block text-center">
                Council of Student Organization
              </h1>
            </section>
            <section className="flex-2 overflow-y-auto min-h-0 h-full pr-4 space-y-4 shadcn-scrollbar font-space-mono">
              <h1 className="sm:text-3xl font-bold hidden sm:block font-press-start">
                Council of Student Organization
              </h1>
              <p className="sm:text-lg text-sm">
                The Council of Student Organizations (CSO) is the official union and coordinating
                body of all duly accredited student organizations at De La Salle University (DLSU).
                Established in 1974, the CSO was created to serve as a unifying platform for student
                groups across various interests, including academic, socio-civic, cultural, and
                special advocacy organizations. It provides leadership, support, and guidance to its
                member organizations, ensuring that their activities align with the
                university&apos;s Lasallian values and contribute to holistic student development.
              </p>
              <h2 className="text-lg text-green-800 font-press-start">What is ARW</h2>
              <p className="sm:text-lg text-sm">
                The Annual Recruitment Week 2025 is one of the university&apos;s most anticipated
                institutional events, showcasing a weeklong celebration of the accredited
                organizations under the Council of Student Organizations (CSO). This initiative
                serves as a platform for organizations to highlight their core missions and
                advocacies to the Lasallian community by connecting students with groups that
                reflect their passions, values, and aspirations. Organizations and also some other
                organizations outside of CSO in pursuit of being able to meet people of similar
                interests and hone their skills outside of academic responsibilities.
              </p>
              <h2 className="text-lg text-yellow-600 font-press-start">Vision</h2>
              <p className="sm:text-lg text-sm">
                The Council of Student Organizations strives to empower and develop a community of
                proactive student-led organizations that is committed to deliver quality services
                befitting the standards of a world-class research University. Driven by the ideals
                of the Lasallian mission, The Council aspires to become pioneers of nation-building
                and Lasallian-formation built on the foundation of excellence and innovation.
              </p>
              <h2 className="text-lg text-blue-800 font-press-start">Mission</h2>
              <p className="sm:text-lg text-sm">
                The Council of Student Organizations provides relevant and quality services that
                support heightened student involvement and development. We continually set standards
                that contribute to the flourishing of our members and member organizations as we
                work together to cultivate growth and provide opportunities for the benefit of its
                stakeholders.
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

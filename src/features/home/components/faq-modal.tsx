import CloseModal from '@/components/modal/close-modal';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { faqs } from '../data/faq';

export default function FAQModal() {
  return (
    <>
      <Dialog>
        <DialogTrigger className="hover:cursor-pointer">FAQ</DialogTrigger>

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
                  src={'/assets/question-mark.webp'}
                  alt="q-mark"
                  className="animate-pulse"
                  width={400}
                  height={400}
                ></Image>
              </div>
              <h1 className="sm:text-3xl text-lg font-bold sm:hidden block text-center">
                Frequently asked Questions
              </h1>
            </section>
            <section className="flex-2 overflow-y-auto min-h-0 h-full pr-4 space-y-4 shadcn-scrollbar font-space-mono">
              <h1 className="sm:text-3xl font-bold hidden sm:block font-press-start">
                Frequently asked Questions
              </h1>
              <div className="flex flex-col gap-4 mt-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={index}
                      className="border-b border-gray-400 data-[state=open]:border-b-0 rounded-md"
                    >
                      <AccordionTrigger
                        className={`font-press-start mt-2 text-left ${
                          index % 2 === 0 ? 'text-green-800' : 'text-blue-800'
                        } hover:bg-black/25 transition duration-200 px-2 py-4`}
                      >
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4 font-space-mono">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

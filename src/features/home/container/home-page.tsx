import HighlightCard from "@/components/highlight-card";
import NavBar from "../components/navbar";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselPreviousPixel,
  CarouselNextPixel,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import ExpandableText from "@/components/collapsible-text";
import CollapsibleText from "@/components/collapsible-text";

export default function HomePage() {
  return (
    <>
      <div className="max-w-6xl mx-auto border-2 border-black p-4 flex flex-col">
        <NavBar />
        <HighlightCard className="flex gap-4 mt-4">
          <Image
            src={"/assets/macky.svg"}
            width={96}
            height={96}
            alt="macky"
            className="hidden sm:block"
          ></Image>
          <div>
            <div className="flex items-center gap-2">
              <Image
                src={"/assets/macky.svg"}
                width={64}
                height={64}
                alt="macky"
                className="block sm:hidden"
              ></Image>
              <h2 className="font-press-start text-xl sm:text-2xl lg:text-3xl">
                Welcome to ARW 2025!
              </h2>
            </div>
            <CollapsibleText
              className="font-space-mono text-sm sm:text-base"
              text="Annual Recruitment Week (ARW) is THE event sa DLSU where orgs show
              what they’re all about. Basically, it’s your chance to vibe with
              49+ CSO orgs (plus iba pa) para you can find your crowd, explore
              your interests, and go beyond acads."
            />
          </div>
        </HighlightCard>

        <Carousel className="w-full my-4">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1 flex justify-center">hi</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPreviousPixel className="left-2" />
          <CarouselNextPixel className="right-2" />
        </Carousel>

        <Button
          className="font-space-mono bg-[#D8E6FF] rounded-none border-black text-base font-bold self-center"
          variant="outline"
        >
          DISCOVER THE CLUSTERS
        </Button>
      </div>
    </>
  );
}

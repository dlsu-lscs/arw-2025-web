import { cn } from "@/lib/utils";
import Image from "next/image";

interface OrgCardProps {
  className?: string;
  orgName: string;
  desc: string;
  orgLogo: string;
  orgBg: string;
}

export default function OrgCard(props: OrgCardProps) {
  return (
    <>
      <div
        className={cn(
          `flex relative rounded-xl items-center w-full p-4 gap-2 bg-cover bg-center bg-black`,
          props.className
        )}
        style={{ backgroundImage: `url('${props.orgBg}')` }}
      >
        <div
          className="w-full h-full absolute rounded-xl left-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.0))",
          }}
        />

        <div className="z-50 text-white flex flex-col gap-2 sm:flex-row items-center">
          <div className="flex items-center gap-2">
            <Image
              alt="org logo"
              src={props.orgLogo || ""}
              width={86}
              height={86}
              className="z-10"
            ></Image>
            <h3 className="sm:hidden block md:text-xl lg:text-2xl font-press-start">
              {props.orgName}
            </h3>
          </div>

          <span>
            <h3 className="hidden sm:block md:text-xl lg:text-2xl font-press-start">
              {props.orgName}
            </h3>
            <p className="font-tiny-5 lg:text-xl md:text-lg">{props.desc}</p>
          </span>
        </div>
      </div>
    </>
  );
}

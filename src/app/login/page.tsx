import LoginBtn from "@/components/login-btn";
import Image from "next/image";

export default function LoginRoute() {
  return (
    <>
      <main className="min-h-screen flex flex-col justify-center items-center px-8">
        <div className="relative md:w-[600px] md:h-[348px] w-[324px] h-[213px]">
          <Image
            src="/logos/arw.webp"
            alt="arw logo"
            fill
            className="object-contain"
          />
        </div>

        <LoginBtn />
      </main>
    </>
  );
}

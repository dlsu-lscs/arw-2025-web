import LoginBtn from '@/components/login-btn';
import Image from 'next/image';

export default function LoginPage() {
  // Build OAuth URL on the server
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  const oauthUrl = `${baseUrl}/oauth2/authorization/google`;

  return (
    <>
      <main className="min-h-screen">
        <a
          href={oauthUrl}
          className="w-full min-h-screen flex flex-col justify-center items-center hover:cursor-pointer p-8"
        >
          <div className="relative md:w-[600px] md:h-[348px] w-[324px] h-[213px]">
            <Image src="/logos/arw.webp" alt="arw logo" fill className="object-contain" />
          </div>

          <LoginBtn />
        </a>
      </main>
    </>
  );
}

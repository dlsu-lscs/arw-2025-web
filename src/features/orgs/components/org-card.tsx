import { cn } from '@/lib/utils';
import Image from 'next/image';
import { OrganizationType } from '../types/orgs.types';

interface OrgCardProps {
  className?: string;
  org: OrganizationType;
}

export default function OrgCard({ className, org }: OrgCardProps) {
  return (
    <>
      <div
        className={cn(
          `flex relative rounded-xl items-center w-full p-4 gap-2 bg-cover bg-center bg-black`,
          className
        )}
        style={{ backgroundImage: `url('${org.publications.mainPubUrl}')` }}
      >
        <div
          className="w-full h-full absolute rounded-xl left-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.0))',
          }}
        />

        <div className="z-50 text-white flex flex-col gap-2 sm:flex-row items-center">
          <div className="flex items-center gap-2">
            {/* {org.publications.logoUrl ? (
              <Image
                alt="org logo"
                src={org.publications.logoUrl}
                width={86}
                height={86}
                className="z-10"
              />
            ) : null} */}
            <h3 className="sm:hidden block md:text-xl lg:text-2xl font-press-start">{org.name}</h3>
          </div>

          <span>
            <h3 className="hidden sm:block md:text-xl lg:text-2xl font-press-start">{org.name}</h3>
            <p className="font-tiny-5 lg:text-xl md:text-lg">{org.about}</p>
          </span>
        </div>
      </div>
    </>
  );
}

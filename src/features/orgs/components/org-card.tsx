import { cn } from '@/lib/utils';
import { OrganizationType } from '../types/orgs.types';
import { returnColorFromCluster } from '@/lib/helpers';
import { useOrgsModalStore } from '../store/useOrgsModalStore';

interface OrgCardProps {
  className?: string;
  org: OrganizationType;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export default function OrgCard({ className, org, onClick, onMouseEnter }: OrgCardProps) {
  const { openOrgsModal } = useOrgsModalStore();
  return (
    <>
      <div
        className={cn(
          `flex relative rounded-xl items-center w-full p-4 gap-2 bg-cover bg-center ${returnColorFromCluster(org.cluster.name.toLowerCase())}`,
          className
        )}
        style={{
          backgroundImage: `url('${org.publications.mainPubUrl ?? '/bg/st-lasalle-bg.webp'}')`,
        }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
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
            <p className="font-tiny5 lg:text-xl md:text-lg">{org.about}</p>
          </span>
        </div>
      </div>
    </>
  );
}

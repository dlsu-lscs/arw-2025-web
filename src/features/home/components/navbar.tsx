import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MdMenu } from 'react-icons/md';
import { User } from '@/features/auth/types/user';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import LSCSModal from './lscs-modal';
import CSOModal from './cso-modal';

interface NavProps {
  user: User;
}

export default function NavBar({ user }: NavProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout');

      // Redirect to login page after successful logout
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect to login even if there's an error
      router.push('/auth/login');
    }
  };
  return (
    <header>
      <nav className="relative">
        <li className="hidden sm:flex font-press-start text-sm justify-between items-center">
          <ul className="hover:text-[#2563EB] transition duration-200">Organizations</ul>
          <ul className="hover:text-[#2563EB] transition duration-200 cursor-pointer">
            <CSOModal />
          </ul>
          <ul className="hover:text-[#2563EB] transition duration-200">
            <LSCSModal />
          </ul>
          <ul className="hover:text-[#2563EB] transition duration-200 cursor-pointer">FAQ</ul>
          <ul className="hover:text-[#2563EB] transition duration-200 cursor-pointer">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Avatar className="hover:cursor-pointer">
                  <AvatarImage src={user.picture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-xs">
                <DropdownMenuLabel className="text-center">Hi {user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ul>
        </li>

        <Sheet>
          <SheetTrigger className="sm:hidden">
            <MdMenu className="text-xl" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="font-press-start">Menu</SheetTitle>
              <div className="mt-2 flex items-center gap-4">
                <Avatar className="hover:cursor-pointer">
                  <AvatarImage src={user.picture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h3 className="text-base">Hi {user.name}</h3>
              </div>
            </SheetHeader>
            <li className="font-press-start text-sm sm:text-base flex flex-col p-4 gap-4">
              <ul>Organizations</ul>
              <ul>CSO</ul>
              <ul>
                <LSCSModal />
              </ul>
              <ul>FAQ</ul>
              <ul
                onClick={handleLogout}
                className="cursor-pointer hover:text-blue-600 transition-colors"
              >
                Logout
              </ul>
            </li>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

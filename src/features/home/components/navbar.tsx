import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdMenu } from "react-icons/md";

export default function NavBar() {
  return (
    <header>
      <nav className="relative">
        <li className="hidden sm:flex font-press-start text-sm justify-between ">
          <ul>Organizations</ul>
          <ul>CSO</ul>
          <ul>LSCS</ul>
          <ul>FAQ</ul>
        </li>

        <Sheet>
          <SheetTrigger className="sm:hidden">
            <MdMenu className="text-xl" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="font-press-start">Menu</SheetTitle>
            </SheetHeader>
            <li className="font-press-start text-sm sm:text-base flex flex-col p-4 gap-4">
              <ul>Organizations</ul>
              <ul>CSO</ul>
              <ul>LSCS</ul>
              <ul>FAQ</ul>
            </li>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

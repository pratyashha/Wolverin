"use client";
import { UserButton } from "@clerk/nextjs";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import MobileSidebar from "@/components/MobileSidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Navbar = ({apiLimitCount,isPro=false}:NavbarProps) => {
  const { setTheme } = useTheme();
  return (
    <nav className="flex items-center p-4 dark:bg-gray-800">
      <MobileSidebar 
      isPro={isPro}
        apiLimitCount={apiLimitCount}
      />
      <div className="flex w-full justify-end">
      
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full focus-visible:ring-0">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform delay-50 dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform delay-50 dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant={"ghost"} className="p-0 ml-3 rounded-full dark:border ">
          <UserButton afterSignOutUrl="/" />
        </Button>
      </div>
    </nav>
  );
};
export default Navbar;

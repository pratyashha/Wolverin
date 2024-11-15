"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import Sidebar from "@/components/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}
const MobileSidebar = ({
  apiLimitCount,
  isPro = false,
}: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger aria-controls="sheet-content">
        <div className="md:hidden flex items-center rounded-md p-2 hover:bg-blue-100 dark:hover:bg-blue-100/10">
          <HamburgerMenuIcon />
        </div>
      </SheetTrigger>
      <SheetContent aria-label="sheet-content" side={"left"} className="p-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidebar;

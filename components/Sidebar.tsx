"use client";
import {
  DashboardIcon,
  ImageIcon,
  TextIcon,
  VideoIcon,
  SpeakerLoudIcon,
  CodeIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import FreeCounter from "./FreeCounter";

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const monserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Text Generation",
    icon: TextIcon,
    href: "/text",
    color: "text-yellow-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-green-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-red-500",
  },
  {
    label: "Audio Generation",
    icon: SpeakerLoudIcon,
    href: "/audio",
    color: "text-orange-500",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-purple-500",
  },
  {
    label: "Settings",
    icon: GearIcon,
    href: "/settings",
    color: "text-white",
  },
];
const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathName = usePathname();

  return (
    <div className="space-y-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link className="flex items-center pl-3 mb-14" href="/dashboard">
          <div className="relative w-12 h-12 mr-3">
            <Image
              src="/wolf.svg"
              alt="Logo"
              width={100}
              height={100}
              className="scale-150 pt-0.5"
            />
          </div>
          <h1 className={cn("text-2xl font-bold", monserrat.className)}>
            WolverinAI
          </h1>
          {isPro && <Badge className="ml-2">Pro</Badge>}
        </Link>

        <div className="flex flex-col space-y-1">
          {routes.map((route, index) => (
            <Link
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all ease-in-out",
                pathName === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
              key={index}
              href={route.href}
              aria-controls="sheet-content"
              prefetch
              as={route.href}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};
export default Sidebar;

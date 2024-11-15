"use client";

import {
  ImageIcon,
  TextIcon,
  VideoIcon,
  SpeakerLoudIcon,
  CodeIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tools = [
  {
    label: "Text Generation",
    icon: TextIcon,
    href: "/text",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    label: "Audio Generation",
    icon: SpeakerLoudIcon,
    href: "/audio",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];
export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Explore the power of{" "}
        <span className="animate-text text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500">
          WolverineAI
        </span>
      </h2>
      <p className="text-muted-foreground font-light text-sm md:text-lg text-center px-16 md:px-20 lg:px-32">
        WolverinAI is a web app that allows you to generate audio,image, code,
        and more using the power of AI.
      </p>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => {
              router.push(tool.href);
            }}
            key={tool.label}
            className="p-4 border-black/5 flex items-center justify-between dark:hover:shadow-white/10 hover:shadow-md transition cursor-pointer dark:bg-gray-700/50"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRightIcon className="w-6 h-6 text-black/50 dark:text-white/50" />
          </Card>
        ))}
      </div>
    </div>
  );
}

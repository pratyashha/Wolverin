"use client";

import { useState } from "react";

import {
  ImageIcon,
  TextIcon,
  VideoIcon,
  SpeakerLoudIcon,
  CodeIcon,
  CheckIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import axios from "axios";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useProModal } from "@/hooks/useProModal";
import { cn } from "@/lib/utils";

const tools = [
  {
    label: "Text Generation",
    icon: TextIcon,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    label: "Audio Generation",
    icon: SpeakerLoudIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error:any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade To
              <span className="animate-text text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500">
                WolverinAI
              </span>
              <Badge variant="premium" className="uppercase text-sm py-1">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center text-sm mb-4 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-5">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <CheckIcon className="w-5 h-5 text-green-600" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full">
          <Button
            size={"lg"}
            onClick={onSubscribe}
            disabled={loading}
            className={cn(
              "w-full",
              loading && "animate-pulse cursor-not-allowed"
            )}
            variant={loading ? "default" : "premium"}
          >
            <RocketIcon className="w-4 h-4 mr-2" />
            {!loading && "Upgrade to Pro"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ProModal;

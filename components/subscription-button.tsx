"use client";

import { useState } from "react";

import { RocketIcon } from "@radix-ui/react-icons";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
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
    <Button
      disabled={loading}
      className={cn(loading && "animate-pulse cursor-not-allowed")}
      onClick={onClick}
      variant={isPro || loading ? "default" : "premium"}
    >
        {(!isPro && !loading) && <RocketIcon className="w-4 h-4 mr-2" />}
      {(isPro && !loading)
        ? "Manage Subscription"
        : loading
        ? "Please Wait..."
        : "Upgrade to Pro"}
    </Button>
  );
};
export default SubscriptionButton;

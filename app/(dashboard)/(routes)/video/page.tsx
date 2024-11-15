"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { VideoIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Empty } from "@/components/Empty";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useProModal } from "@/hooks/useProModal";
import { cn } from "@/lib/utils";

import { formSchema } from "./constants";

//import { Loader } from "@/components/Loader";

const VideoPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [video, setVideo] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async (value: z.infer<typeof formSchema>) => {
    try {
      setVideo(() => undefined);

      const response = await axios.post("/api/video", {
        ...value,
      });

      setVideo(response.data[0]);
    } catch (error: any) {
      if (error.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      router.refresh();
      form.reset();
    }
  };
  return (
    <div>
      <Heading
        title="Video Generation"
        description="Visualize your dreams."
        icon={VideoIcon}
        iconColor="text-red-500"
        bgColor="bg-red-500/10"
      />
      <div className="px-4 lg:px-8 h-full dark:bg-gray-800">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitForm)}
              className="rounded-lg border dark:border-gray-600 w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        id="prompt"
                        aria-describedby="prompt"
                        className="bg-[#fdfdfd] dark:bg-gray-700 pl-2 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent shadow-none"
                        disabled={isLoading}
                        placeholder="Enter your prompt here..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className={cn(
                  "col-span-12 lg:col-span-2 w-full cursor-pointer disabled:opacity-70 disabled:animate-pulse"
                )}
                disabled={isLoading}
              >
                {isLoading ? "Visualizing..." : "Generate"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {/* {true && (
            <div className="p-8 rounded-lg flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )} */}
          {!video && !isLoading && <Empty label="No video generated." />}
          {video && (
            <video
              className="w-full mt-8 aspect-video rounded-lg border bg-black"
              controls
            >
              <source src={video} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};
export default VideoPage;

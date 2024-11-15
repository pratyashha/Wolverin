"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";
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

const AudioPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [audio, setAudio] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async (value: z.infer<typeof formSchema>) => {
    try {
      setAudio(() => undefined);

      const response = await axios.post("/api/audio", {
        ...value,
      });
      setAudio(response.data.audio);
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
        title="Audio Generation"
        description="Compose your own masterpiece."
        icon={SpeakerLoudIcon}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
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
                {isLoading ? "Composing..." : "Generate"}
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
          {!audio && !isLoading && <Empty label="Nothing to listen to." />}
          {audio && (
            <audio className="w-full mt-8" controls>
              <source src={audio} type="audio/mpeg" />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};
export default AudioPage;

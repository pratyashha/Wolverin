"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { RocketIcon, TextIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Empty } from "@/components/Empty";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { UserAvatar } from "@/components/UserAvatar";
import { useProModal } from "@/hooks/useProModal";
import { cn } from "@/lib/utils";

import { formSchema } from "./constants";
//import { Loader } from "@/components/Loader";

const TextPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async (value: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: value.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/text", {
        messages: newMessages,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        response.data,
      ]);
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
        title="Text Generation"
        description="Generate text using GPT-3.5 Turbo."
        icon={TextIcon}
        iconColor="text-yellow-500"
        bgColor="bg-yellow-500/10"
      />
      <div className="px-4 lg:px-8">
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
                {isLoading ? "Thinking..." : "Generate"}
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
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started yet." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 w-full flex gap-x-2 rounded-lg items-start",
                  message.role === "user"
                    ? "bg-white dark:bg-gray-700 border border-black/10 justify-end"
                    : "bg-muted justify-start dark:border dark:border-gray-700"
                )}
              >
                {message.role === "assistant" && (
                  <div className="relative h-full mt-1">
                    <RocketIcon className="h-full w-6" />
                  </div>
                )}

                <p className="text-sm">{message.content}</p>
                {message.role === "user" && (
                  <div className="relative h-full">
                    <UserAvatar />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TextPage;

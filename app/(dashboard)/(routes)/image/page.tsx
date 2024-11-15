"use client";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { CopyIcon, DownloadIcon, ImageIcon } from "@radix-ui/react-icons";
import axios from "axios";
import FileSaver from "file-saver";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Empty } from "@/components/Empty";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useProModal } from "@/hooks/useProModal";
import { cn } from "@/lib/utils";

import { amountOptions, formSchema, resolutionOptions } from "./constants";

//import { Loader } from "@/components/Loader";

const ImagePage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async (value: z.infer<typeof formSchema>) => {
    try {
      setImages(() => []);
      const response = await axios.post("/api/image", {
        ...value,
      });

      const urls: [] = response.data.map((image: { url: string }) => image.url);
      setImages(() => urls);
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
        title="Image Generation"
        description="Your imagination is the limit."
        icon={ImageIcon}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
      />
      <div className="px-4 lg:px-8 dark:bg-gray-800">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitForm)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 dark:border-gray-700"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        id="prompt"
                        aria-describedby="prompt"
                        className="bg-[#fdfdfd] dark:bg-gray-700 pl-2 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent shadow-none"
                        disabled={isLoading}
                        placeholder="Enter your imagination here..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-2 dark:border dark:border-gray-700 dark:rounded-md">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            defaultChecked
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-2 dark:border dark:border-gray-700 dark:rounded-md">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            defaultChecked
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <Button
                className={cn(
                  "col-span-12 lg:col-span-2 w-full cursor-pointer disabled:opacity-70 disabled:animate-pulse"
                )}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Generate"}
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
          {images.length === 0 && !isLoading && (
            <Empty label="No images generated yet." />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src, index) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={src}
                    alt={"Generated " + index}
                    fill
                    sizes="100%"
                    priority
                    loading="eager"
                  />
                </div>
                <CardFooter className="grid grid-cols-12 p-2">
                  <Button
                    variant="default"
                    className="col-span-8 mx-1 h-10"
                    onClick={() => {
                      FileSaver.saveAs(src, `WolverinAIImage${Date.now()}.jpg`);
                    }}
                  >
                    <DownloadIcon className="w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="secondary"
                    className="col-span-4 h-10"
                    onClick={() => {
                      navigator.clipboard.writeText(src);
                      toast({
                        description: "Copied to clipboard",
                      });
                    }}
                  >
                    <CopyIcon className="w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImagePage;

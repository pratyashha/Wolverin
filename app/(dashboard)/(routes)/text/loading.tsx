"use client";
import { TextIcon } from "@radix-ui/react-icons";

import Heading from "@/components/Heading";

const TextLoadingPage = () => {
  return (
    <Heading
      title="Text Generation"
      description="Generate text using GPT-3.5 Turbo."
      icon={TextIcon}
      iconColor="text-yellow-500"
      bgColor="bg-yellow-500/10"
    />
  );
};
export default TextLoadingPage;

"use client";
import { ImageIcon } from "@radix-ui/react-icons";

import Heading from "@/components/Heading";


const ImageLoadingPage = () => {

  return (
    <Heading
        title="Image Generation"
        description="Your imagination is the limit."
        icon={ImageIcon}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
      />
  );
};
export default ImageLoadingPage;

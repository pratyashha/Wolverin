"use client";
import { VideoIcon } from "@radix-ui/react-icons";

import Heading from "@/components/Heading";

const VideoLoadingPage = () => {
  return (
    <Heading
      title="Video Generation"
      description="Visualize your dreams."
      icon={VideoIcon}
      iconColor="text-red-500"
      bgColor="bg-red-500/10"
    />
  );
};
export default VideoLoadingPage;

"use client";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";

import Heading from "@/components/Heading";

const AudioLoadingPage = () => {
  return (
    <Heading
      title="Audio Generation"
      description="Compose your own masterpiece."
      icon={SpeakerLoudIcon}
      iconColor="text-orange-500"
      bgColor="bg-orange-500/10"
    />
  );
};
export default AudioLoadingPage;

"use client";
import { CodeIcon } from "@radix-ui/react-icons";

import Heading from "@/components/Heading";

const CodeLoadingPage = () => {
  return (
    <Heading
      title="Code Generation"
      description="Generate high performant code."
      icon={CodeIcon}
      iconColor="text-purple-500"
      bgColor="bg-purple-500/10"
    />
  );
};
export default CodeLoadingPage;

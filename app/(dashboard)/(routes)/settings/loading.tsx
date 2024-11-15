"use client";
import { GearIcon } from "@radix-ui/react-icons";

import Heading from "@/components/Heading";

const SettingsLoadingPage = () => {
  return (
    <Heading
      title="Settings"
      description="Customize your account settings"
      icon={GearIcon}
      iconColor="text-gray-700"
      bgColor="bg-gray-100"
    />
  );
};
export default SettingsLoadingPage;

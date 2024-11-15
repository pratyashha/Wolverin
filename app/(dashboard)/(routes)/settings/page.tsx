import { GearIcon } from "@radix-ui/react-icons";

import Heading from "@/components/Heading";
import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div>
      <Heading
        title="Settings"
        description="Customize your account settings"
        icon={GearIcon}
        iconColor="text-gray-700"
        bgColor="bg-gray-100"
      />
      <div className="px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "You are currently subscribed to the Pro plan."
            : "You are currently on a free trial."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};
export default SettingsPage;

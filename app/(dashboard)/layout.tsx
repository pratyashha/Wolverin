import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      <div
        className="hidden h-full md:flex md:flex-col md:fixed
      md:inset-y-0 bg-gray-900 md:w-72"
      >
        <Sidebar 
        isPro={isPro}
        apiLimitCount={apiLimitCount} />
      </div>
      <Navbar 
      isPro={isPro}
      apiLimitCount={apiLimitCount} />
      <main className="md:pl-72 h-full dark:bg-gray-800">{children}</main>
      <Toaster />
    </div>
  );
};

export default DashBoardLayout;

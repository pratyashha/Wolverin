import { useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatar = () => {
  const { user } = useUser();

  return (
    <Avatar className="w-6 h-full">
      <AvatarImage src={user?.profileImageUrl} alt="Avatar" />
      <AvatarFallback>
        {user?.firstName?.charAt(0).toUpperCase()}
        {user?.lastName?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

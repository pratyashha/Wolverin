import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative">
        <Image src="/animation_gif.gif" alt="Loader" fill />
      </div>
      <p className="text-muted-foreground text-md text-center mt-2">
        Thinking...
      </p>
    </div>
  );
};

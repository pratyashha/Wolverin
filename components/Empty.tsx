import Image from "next/image";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <p className="text-muted-foreground text-md text-center mt-2">{label}</p>
      <div className="relative h-72 w-72">
        <Image
          src="/empty.png"
          alt="Empty"
          fill
          sizes="100%"
          priority
          className="mix-blend-darken dark:mix-blend-color-dodge dark:filter dark:invert dark:grayscale dark:opacity-20"

        />
      </div>
    </div>
  );
};

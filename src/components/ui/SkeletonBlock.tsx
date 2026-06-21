import { cn } from "@/lib/utils";

interface SkeletonBlockProps {
  className?: string;
  rounded?:   "sm" | "md" | "lg" | "full";
}

const radiusMap = {
  sm:   "rounded",
  md:   "rounded-md",
  lg:   "rounded-xl",
  full: "rounded-full",
};

export function SkeletonBlock({ className, rounded = "md" }: SkeletonBlockProps): React.ReactElement {
  return (
    <div
      className={cn(
        "animate-shimmer",
        radiusMap[rounded],
        className
      )}
      aria-hidden="true"
    />
  );
}

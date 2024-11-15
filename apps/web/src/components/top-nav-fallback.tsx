import { Skeleton } from "./ui/skeleton";

export default function TopNavFallback() {
  return (
    <div className="sticky md:top-2 flex justify-center z-[99] w-full">
      <Skeleton className="px-3 max-w-[48rem] md:w-[80%] w-full bg-background/70 md:border border-b md:rounded-full flex items-center justify-between h-14 reltive backdrop-blur-md shadow-sm" />
    </div>
  );
}

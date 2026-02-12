import { cn } from "@/lib/utils";

interface DiagonalPatternProps {
  count?: number;
  className?: string;
}

function DiagonalPattern({ count = 50, className }: DiagonalPatternProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="w-[162px] left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
          />
        ))}
      </div>
    </div>
  );
}

export { DiagonalPattern };

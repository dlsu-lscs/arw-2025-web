"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function HighlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        <div
          className={cn(
            "border-[1.5px] border-black flex px-8 py-4 relative",
            className
          )}
        >
          <span
            onClick={() => {
              setVisible(false);
            }}
            className="cursor-pointer font-press-start flex items-center justify-center absolute top-0 right-2"
          >
            x
          </span>
          {children}
        </div>
      )}
    </>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface CollapsibleTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

export default function CollapsibleText({
  text,
  maxLines = 3,
  className,
}: CollapsibleTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const checkClamping = () => {
    if (textRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(textRef.current).lineHeight
      );
      const maxHeight = lineHeight * maxLines;
      setIsClamped(textRef.current.scrollHeight > maxHeight);
    }
  };

  useEffect(() => {
    // Initial check
    checkClamping();

    // Recalculate on window resize
    window.addEventListener("resize", checkClamping);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", checkClamping);
    };
  }, [text, maxLines]);

  return (
    <div className="mx-auto">
      <p ref={textRef} className={expanded ? "" : `line-clamp-${maxLines}`}>
        {text}
      </p>

      {/* Only show button if clamped */}
      {isClamped && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-1 text-blue-600"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}

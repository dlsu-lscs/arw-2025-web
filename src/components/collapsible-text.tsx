'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CollapsibleTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

export default function CollapsibleText({ text, maxLines = 3, className }: CollapsibleTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const checkClamping = () => {
    if (textRef.current) {
      const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
      const maxHeight = lineHeight * maxLines;
      setIsClamped(textRef.current.scrollHeight > maxHeight);
    }
  };

  useEffect(() => {
    // Initial check
    checkClamping();

    // Recalculate on window resize
    window.addEventListener('resize', checkClamping);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', checkClamping);
    };
  }, [text, maxLines]);

  return (
    <div className="mx-auto">
      <p
        ref={textRef}
        className={cn(className)}
        style={
          expanded
            ? {}
            : {
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
        }
      >
        {text}
      </p>

      {/* Only show button if clamped */}
      {isClamped && (
        <Button
          variant="ghost"
          size="sm"
          className=" text-blue-600 text-xs font-space-mono hover:cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  );
}

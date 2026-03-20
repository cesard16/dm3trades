"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextMarqueeProps {
  children: React.ReactNode[];
  speed?: number;
  className?: string;
  prefix?: React.ReactNode;
  height?: string | number;
  id?: string;
}

export function TextMarquee({
  children,
  speed = 1,
  className,
  prefix,
  height = "1.5em",
  id,
}: TextMarqueeProps) {
  const count = React.Children.count(children);

  return (
    <>
      <style>
        {`
          @keyframes slide-vertical {
            to {
              translate: 0 var(--destination);
            }
          }
        `}
      </style>
      <div id={id || "marquee-root"} className={cn("flex relative bg-transparent", className)}>
        <div id="marquee-inner" className="flex relative flex-row gap-2 md:gap-4 items-center w-min h-min bg-transparent">
          {prefix && (
            <div className="whitespace-pre size-auto relative">
              {prefix}
            </div>
          )}
          
          <div
            id="marquee-clip-container"
            className="relative [clip-path:inset(0)] transform-gpu bg-transparent"
            style={{ height: typeof height === "number" ? `${height}px` : height }}
          >
            {/* Invisible measuring tool to set the dynamic fixed width based on longest word */}
            <div 
              id="marquee-measurer"
              className="grid invisible pointer-events-none h-full items-center bg-transparent" 
              aria-hidden="true"
            >
              {React.Children.map(children, (child, index) => (
                <div key={index} className="col-start-1 row-start-1 flex items-center h-[1.2em] justify-start pr-1">
                  {child}
                </div>
              ))}
            </div>

            {/* Absolute scrolling text */}
            <div 
              id="marquee-scroller-container"
              className="absolute inset-x-0 top-0 bottom-0 opacity-100 flex items-center [clip-path:inset(0)] transform-gpu isolation-auto mix-blend-normal bg-transparent"
            >
              
              <div
                id="marquee-scroller-inner"
                className="relative h-[1.2em] w-full bg-transparent"
                style={{
                  "--count": count,
                  "--speed": speed,
                } as React.CSSProperties}
              >
                {React.Children.map(children, (child, index) => (
                  <div
                    key={index}
                    id={`marquee-item-${index}`}
                    className="h-[1.2em] flex items-center justify-start bg-transparent"
                    style={{
                      "--index": index,
                      "--origin": `calc((var(--count) - var(--index)) * 100%)`,
                      "--destination": `calc((var(--index) + 1) * -100%)`,
                      "--duration": `calc(var(--speed) * ${count}s)`,
                      "--delay":
                        `calc((var(--duration) / var(--count)) * var(--index) - var(--duration))`,
                      translate: `0 var(--origin)`,
                      animation:
                        `slide-vertical var(--duration) var(--delay) infinite linear`,
                    } as React.CSSProperties}
                  >
                    {child}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

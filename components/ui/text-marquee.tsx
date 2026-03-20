"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextMarqueeProps {
  children: React.ReactNode[];
  speed?: number;
  className?: string;
  prefix?: React.ReactNode;
  height?: string | number;
}

export function TextMarquee({
  children,
  speed = 1,
  className,
  prefix,
  height = "1.5em",
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
      <div className={cn("flex relative", className)}>
        <div className="flex relative flex-row gap-2 md:gap-4 items-center w-min h-min">
          {prefix && (
            <div className="whitespace-pre size-auto relative">
              {prefix}
            </div>
          )}
          
          <div
            className="relative overflow-hidden"
            style={{ height: typeof height === "number" ? `${height}px` : height }}
          >
            {/* Invisible measuring tool to set the dynamic fixed width based on longest word */}
            <div 
              className="grid invisible pointer-events-none h-full items-center" 
              aria-hidden="true"
            >
              {React.Children.map(children, (child, index) => (
                <div key={index} className="col-start-1 row-start-1 flex items-center h-[1.2em] justify-start pr-1">
                  {child}
                </div>
              ))}
            </div>

            {/* Absolute scrolling text */}
            <div className="absolute inset-x-0 top-0 bottom-0 opacity-100 flex items-center overflow-hidden">
              
              <div
                className="relative h-[1.2em] w-full"
                style={{
                  "--count": count,
                  "--speed": speed,
                } as React.CSSProperties}
              >
                {React.Children.map(children, (child, index) => (
                  <div
                    key={index}
                    className="h-[1.2em] flex items-center justify-start"
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

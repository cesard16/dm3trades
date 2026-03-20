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
      <div id={id || "marquee-root"} className={cn("flex relative bg-transparent [isolation:isolate]", className)} style={{ background: 'transparent !important' }}>
        <div id="marquee-inner" className="flex relative flex-row gap-2 md:gap-4 items-center w-min h-min bg-transparent" style={{ background: 'transparent !important' }}>
          {prefix && (
            <div id="marquee-prefix-container" className="whitespace-pre size-auto relative bg-transparent" style={{ background: 'transparent !important' }}>
              {prefix}
            </div>
          )}
          
          <div
            id="marquee-clip-container"
            className="relative overflow-hidden bg-transparent"
            style={{ 
              height: typeof height === "number" ? `${height}px` : height,
              background: 'transparent !important',
              WebkitMaskImage: 'linear-gradient(rgba(0,0,0,0) 0%, rgb(0,0,0) 25%, rgb(0,0,0) 75%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(rgba(0,0,0,0) 0%, rgb(0,0,0) 25%, rgb(0,0,0) 75%, rgba(0,0,0,0) 100%)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Invisible measuring tool to set the dynamic fixed width based on longest word */}
            <div 
              id="marquee-measurer"
              className="grid invisible pointer-events-none h-full items-center bg-transparent" 
              aria-hidden="true"
              style={{ background: 'transparent !important' }}
            >
              {React.Children.map(children, (child, index) => (
                <div key={index} className="col-start-1 row-start-1 flex items-center h-[1.2em] justify-start pr-1">
                  {child}
                </div>
              ))}
            </div>

            <div 
              id="marquee-scroller-container"
              className="absolute inset-x-0 top-0 bottom-0 opacity-100 flex items-center overflow-hidden bg-transparent"
              style={{ background: 'transparent !important' }}
            >
              
              <div
                id="marquee-scroller-inner"
                className="relative h-[1.2em] w-full bg-transparent"
                style={{
                  "--count": count,
                  "--speed": speed,
                  background: 'transparent !important',
                } as React.CSSProperties}
              >
                {React.Children.map(children, (child, index) => (
                  <div
                    key={index}
                    id={`marquee-item-${index}`}
                    className="h-[1.2em] flex items-center justify-start bg-transparent"
                    style={{
                      background: 'transparent !important',
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

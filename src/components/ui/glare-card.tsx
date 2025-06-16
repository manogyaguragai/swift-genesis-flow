
import { cn } from "@/lib/utils";
import { useRef, useCallback } from "react";

export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  });

  const updateStyles = useCallback(() => {
    if (refElement.current) {
      const { background, rotate, glare } = state.current;
      refElement.current?.style.setProperty("--m-x", `${glare.x}%`);
      refElement.current?.style.setProperty("--m-y", `${glare.y}%`);
      refElement.current?.style.setProperty("--r-x", `${rotate.x}deg`);
      refElement.current?.style.setProperty("--r-y", `${rotate.y}deg`);
      refElement.current?.style.setProperty("--bg-x", `${background.x}%`);
      refElement.current?.style.setProperty("--bg-y", `${background.y}%`);
    }
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Use requestAnimationFrame to throttle updates
    animationFrameRef.current = requestAnimationFrame(() => {
      const rotateFactor = 0.4;
      const rect = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      const percentage = {
        x: (100 / rect.width) * position.x,
        y: (100 / rect.height) * position.y,
      };
      const delta = {
        x: percentage.x - 50,
        y: percentage.y - 50,
      };

      const { background, rotate, glare } = state.current;
      background.x = 50 + percentage.x / 4 - 12.5;
      background.y = 50 + percentage.y / 3 - 16.67;
      rotate.x = -(delta.x / 3.5);
      rotate.y = delta.y / 2;
      rotate.x *= rotateFactor;
      rotate.y *= rotateFactor;
      glare.x = percentage.x;
      glare.y = percentage.y;

      updateStyles();
    });
  }, [updateStyles]);

  const handlePointerEnter = useCallback(() => {
    isPointerInside.current = true;
    if (refElement.current) {
      refElement.current?.style.setProperty("--opacity", "1");
      setTimeout(() => {
        if (isPointerInside.current && refElement.current) {
          refElement.current?.style.setProperty("--duration", "0s");
        }
      }, 300);
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    isPointerInside.current = false;
    if (refElement.current) {
      refElement.current?.style.setProperty("--opacity", "0");
      refElement.current.style.removeProperty("--duration");
      refElement.current?.style.setProperty("--r-x", `0deg`);
      refElement.current?.style.setProperty("--r-y", `0deg`);
    }
    
    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  return (
    <div
      className="relative isolate [contain:layout_style] [perspective:600px] will-change-transform w-full h-full"
      style={{
        "--m-x": "50%",
        "--m-y": "50%",
        "--r-x": "0deg",
        "--r-y": "0deg",
        "--bg-x": "50%",
        "--bg-y": "50%",
        "--duration": "300ms",
        "--foil-size": "100%",
        "--opacity": "0",
        "--radius": "16px",
        "--easing": "ease",
      } as any}
      ref={refElement}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div 
        className="h-full grid will-change-transform origin-center rounded-2xl border border-slate-200/20 overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transform: 'rotateY(var(--r-x)) rotateX(var(--r-y))',
        }}
      >
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_16px)]">
          <div className={cn("h-full w-full bg-white/80 backdrop-blur-lg", className)}>
            {children}
          </div>
        </div>
        <div 
          className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_16px)] will-change-background transition-opacity duration-300 ease-out"
          style={{
            opacity: 'var(--opacity)',
            background: 'radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(37,99,235,0.8) 10%, rgba(59,130,246,0.65) 20%, rgba(255,255,255,0) 90%)',
          }}
        />
        <div
          className="w-full h-full grid [grid-area:1/1] mix-blend-color-dodge will-change-background [clip-path:inset(0_0_1px_0_round_16px)] transition-opacity duration-300 ease-out relative after:content-[''] after:grid-area-[inherit] after:bg-repeat-[inherit] after:bg-attachment-[inherit] after:bg-origin-[inherit] after:bg-clip-[inherit] after:bg-[inherit] after:mix-blend-exclusion"
          style={{ 
            opacity: 'var(--opacity)',
            backgroundImage: `url("/lovable-uploads/e01f5efb-6a63-4043-903e-3d7e1726d4d9.png"), repeating-linear-gradient(45deg, #2563eb 5%, #3b82f6 10%, #6366f1 15%, #8b5cf6 20%, #a855f7 25%, #c084fc 30%, #2563eb 35%), repeating-linear-gradient(128deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.2) 3.8%, rgba(139, 92, 246, 0.2) 4.5%, rgba(139, 92, 246, 0.2) 5.2%, rgba(37, 99, 235, 0.1) 10%, rgba(37, 99, 235, 0.1) 12%), radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(37, 99, 235, 0.3) 12%, rgba(59, 130, 246, 0.25) 20%, rgba(255,255,255,0.1) 120%)`,
            backgroundPosition: 'center, 0% var(--bg-y), var(--bg-x) var(--bg-y), var(--bg-x) var(--bg-y)',
            backgroundSize: '100%, 200% 700%, 300%, 300%',
            backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
            backgroundBlendMode: 'hue, hue, hue, overlay',
          }}
        />
      </div>
    </div>
  );
};


"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useCallback, useMemo } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = useCallback((index: number) => {
    return index === active;
  }, [active]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const randomRotateY = useCallback(() => {
    return Math.floor(Math.random() * 21) - 10;
  }, []);

  // Memoize background colors to prevent recalculation
  const backgroundColors = useMemo(() => [
    "bg-gradient-to-br from-blue-50/80 to-primary/10",
    "bg-gradient-to-br from-purple-50/80 to-secondary/10",
    "bg-gradient-to-br from-blue-50/60 to-purple-100/60",
    "bg-gradient-to-br from-primary/5 to-secondary/15",
  ], []);

  // Memoize current testimonial to prevent unnecessary re-renders
  const currentTestimonial = useMemo(() => testimonials[active], [testimonials, active]);

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div className="relative">
          {/* Optimized background hue - only render for active testimonial */}
          <div className={`absolute inset-0 rounded-3xl blur-3xl ${backgroundColors[active % backgroundColors.length]} opacity-40 transition-all duration-500 will-change-transform`}></div>
          <div className="relative h-80 w-full">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.src}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom will-change-transform"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    loading="lazy"
                    className="h-full w-full rounded-3xl object-cover object-center shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=2563eb&color=ffffff&size=500`;
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4 relative">
          {/* Optimized background hue - only render for active testimonial */}
          <div className={`absolute inset-0 rounded-2xl ${backgroundColors[(active + 2) % backgroundColors.length]} opacity-30 blur-2xl transition-all duration-500 will-change-transform`}></div>
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {currentTestimonial.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-neutral-500">
              {currentTestimonial.designation}
            </p>
            <motion.p className="mt-8 text-lg text-slate-700 dark:text-neutral-300">
              {currentTestimonial.quote.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block will-change-transform"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0 relative z-10">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-white/50 hover:bg-white hover:shadow-glow-blue transition-all duration-300 hover:scale-110 will-change-transform"
              aria-label="Previous testimonial"
            >
              <IconArrowLeft className="h-5 w-5 text-primary transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-white/50 hover:bg-white hover:shadow-glow-purple transition-all duration-300 hover:scale-110 will-change-transform"
              aria-label="Next testimonial"
            >
              <IconArrowRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

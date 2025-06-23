
"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  onLoad,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  onLoad?: () => void;
}) => {
  const [active, setActive] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      if (newSet.size === testimonials.length && onLoad) {
        onLoad();
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  // Soft thematic background colors for each testimonial
  const backgroundColors = [
    "bg-gradient-to-br from-blue-50/80 to-primary/10",
    "bg-gradient-to-br from-purple-50/80 to-secondary/10",
    "bg-gradient-to-br from-blue-50/60 to-purple-100/60",
    "bg-gradient-to-br from-primary/5 to-secondary/15",
  ];

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div className="relative">
          {/* Soft background hue behind images */}
          <div className={`absolute inset-0 rounded-3xl blur-3xl ${backgroundColors[active % backgroundColors.length]} opacity-40 transition-all duration-500`}></div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
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
                  className="absolute inset-0 origin-bottom"
                >
                  <div className="relative h-full w-full">
                    {!imagesLoaded.has(index) && (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl animate-pulse flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      loading="lazy"
                      className={`h-full w-full rounded-3xl object-cover object-center shadow-lg transition-opacity duration-300 ${
                        imagesLoaded.has(index) ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(index)}
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=2563eb&color=ffffff&size=500`;
                        handleImageLoad(index);
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4 relative">
          {/* Soft background hue behind text */}
          <div className={`absolute inset-0 rounded-2xl ${backgroundColors[(active + 2) % backgroundColors.length]} opacity-30 blur-2xl transition-all duration-500`}></div>
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
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-8 text-lg text-slate-700 dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
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
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0 relative z-10">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-white/50 hover:bg-white hover:shadow-glow-blue transition-all duration-300 hover:scale-110"
            >
              <IconArrowLeft className="h-5 w-5 text-primary transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-white/50 hover:bg-white hover:shadow-glow-purple transition-all duration-300 hover:scale-110"
            >
              <IconArrowRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

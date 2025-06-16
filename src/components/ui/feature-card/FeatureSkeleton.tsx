
"use client";
import { animate, motion } from "motion/react";
import React, { useEffect } from "react";
import { HiSparkles } from "react-icons/hi";
import { Container } from "./Container";

interface FeatureSkeletonProps {
  icon: React.ReactNode;
  animationDelay: number;
  cardIndex: number;
}

export const FeatureSkeleton: React.FC<FeatureSkeletonProps> = ({ 
  icon, 
  animationDelay, 
  cardIndex 
}) => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".icon-container",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      animate(sequence, {
        // @ts-ignore
        repeat: Infinity,
        repeatDelay: 2,
      });
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Container className="icon-container h-20 w-20">
          {icon}
        </Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-primary"
        >
          <HiSparkles className="h-6 w-6" />
        </motion.div>
      </div>

      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={`star-${i}`}
            animate={{
              top: `calc(${Math.random() * 100}% + ${Math.random() * 2 - 1}px)`,
              left: `calc(${Math.random() * 100}% + ${Math.random() * 2 - 1}px)`,
              opacity: Math.random(),
              scale: [1, 1.2, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `2px`,
              height: `2px`,
              borderRadius: "50%",
              zIndex: 1,
            }}
            className="inline-block bg-primary"
          ></motion.span>
        ))}
      </div>
    </div>
  );
};

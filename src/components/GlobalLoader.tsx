"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we've already shown the loader in this session
    const hasLoaded = sessionStorage.getItem("vs-auto-mart-loaded");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Hide loader after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("vs-auto-mart-loaded", "true");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-graphite-950"
        >
          {/* Animated SVG Car Outline */}
          <div className="relative flex h-32 w-64 items-center justify-center md:h-48 md:w-96">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full drop-shadow-[0_0_15px_rgba(199,158,50,0.5)]"
            >
              <motion.path
                d="M5 16C5 17.1046 4.10457 18 3 18C1.89543 18 1 17.1046 1 16V14.1534C1 13.0645 1.54714 12.0465 2.45398 11.4503L5.04505 9.74384C6.51613 8.7753 8.13627 7.97334 9.83984 7.37943L11.5977 6.7667C12.4419 6.47246 13.3323 6.31498 14.2332 6.30219L18.3582 6.24357C19.9866 6.22045 21.464 7.15939 22.1384 8.64654V8.64654C22.6961 9.87679 23 11.2052 23 12.5539V16C23 17.1046 22.1046 18 21 18C19.8954 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14H7C5.89543 14 5 14.8954 5 16ZM5 16H6.5M19 16H17.5M8 12H18"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brass-400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              />
              <motion.circle 
                cx="5" 
                cy="16" 
                r="2" 
                stroke="currentColor" 
                strokeWidth="0.8" 
                className="text-brass-400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
              />
              <motion.circle 
                cx="19" 
                cy="16" 
                r="2" 
                stroke="currentColor" 
                strokeWidth="0.8" 
                className="text-brass-400"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Glowing effect underneath */}
            <motion.div
              className="absolute bottom-4 h-2 w-3/4 blur-xl bg-brass-500/30"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <h1 className="font-display text-2xl font-bold uppercase tracking-widest text-graphite-100">
              VS Auto Mart
            </h1>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-brass-500">
              Premium Collection
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

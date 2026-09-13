import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, BookOpen, Star, Compass, Award } from "lucide-react";
import { soundEngine } from "../utils/soundEngine.ts";

interface JoyfulTransitionScreenProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  durationMs?: number;
  onComplete?: () => void;
}

const ENCOURAGING_TIPS = [
  "Tip: Regular daily micro-practice builds long-term fluency faster than cramming!",
  "Tip: Click the speech button on questions to train your ear to natural pronunciation.",
  "Tip: Reviewing mistakes immediately reinforces synaptic memory pathways.",
  "Tip: Each section has 1,000 procedurally verified questions to explore!",
  "Tip: Don't fear mistakes—they are the stepping stones of true mastery!",
];

const FLOATING_PARTICLES = [
  { text: "A", color: "text-[#0F766E]", bg: "bg-[#CCFBF1]", x: -120, y: -80, delay: 0 },
  { text: "B", color: "text-[#16794B]", bg: "bg-[#E8F7EE]", x: 130, y: -70, delay: 0.1 },
  { text: "C", color: "text-[#9A6700]", bg: "bg-[#FFF4CC]", x: -140, y: 70, delay: 0.2 },
  { text: "✨", color: "text-[#1D4ED8]", bg: "bg-[#EBF3FF]", x: 120, y: 80, delay: 0.15 },
  { text: "🌟", color: "text-[#D97706]", bg: "bg-[#FEF3C7]", x: 0, y: -130, delay: 0.25 },
];

export const JoyfulTransitionScreen: React.FC<JoyfulTransitionScreenProps> = ({
  isOpen,
  title = "Preparing Your Practice",
  subtitle = "Selecting fresh questions from the 1,000+ item bank...",
  badgeText = "CEFR Practice",
  durationMs = 900,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    setTipIndex(Math.floor(Math.random() * ENCOURAGING_TIPS.length));
    soundEngine.playOptionSelect();

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);

      if (elapsed >= durationMs) {
        clearInterval(interval);
        if (onComplete) {
          setTimeout(onComplete, 120);
        }
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isOpen, durationMs, onComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="joyful-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFDF7]/95 backdrop-blur-md px-4"
          role="status"
          aria-live="polite"
          aria-label="Loading your practice session"
        >
          {/* Joyful Floating Background Letters & Symbols */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
            {FLOATING_PARTICLES.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0, x: item.x * 0.4, y: item.y * 0.4 }}
                animate={{
                  opacity: [0.3, 0.85, 0.3],
                  scale: [0.9, 1.15, 0.9],
                  x: [item.x, item.x + (idx % 2 === 0 ? 8 : -8), item.x],
                  y: [item.y, item.y + (idx % 2 === 0 ? -12 : 12), item.y],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
                className={`absolute w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xs ${item.bg} ${item.color} border border-white/60`}
              >
                {item.text}
              </motion.div>
            ))}
          </div>

          {/* Centered Joyful Card */}
          <motion.div
            initial={{ scale: 0.88, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="relative max-w-md w-full p-8 bg-white/90 border border-[#D9DED9] rounded-2xl shadow-xl text-center flex flex-col items-center"
          >
            {/* Animated Mascot Chime Badge */}
            <div className="relative mb-5">
              {/* Pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-[#CCFBF1] -z-10"
              />
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, -3, 3, 0],
                }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-[#0F766E] to-[#2DD4BF] flex items-center justify-center shadow-lg shadow-[#0F766E]/25 text-white"
              >
                <Sparkles className="w-9 h-9 animate-pulse" />
              </motion.div>
            </div>

            {/* Badge */}
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20 mb-2 tracking-wide uppercase">
              {badgeText}
            </span>

            {/* Title */}
            <h2 className="text-xl font-extrabold text-[#172026] mb-1 tracking-tight">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-[#5D6870] mb-6 max-w-xs">
              {subtitle}
            </p>

            {/* Joyful Progress Bar */}
            <div className="w-full space-y-2 mb-6">
              <div className="w-full h-3 bg-[#F6F8F6] rounded-full overflow-hidden border border-[#D9DED9] p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#2DD4BF] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-[#5D6870] px-1">
                <span>Loading assets</span>
                <span className="text-[#0F766E] font-bold">{progress}%</span>
              </div>
            </div>

            {/* Helpful Tip */}
            <div className="p-3 bg-[#F6F8F6] border border-[#E7EBE7] rounded-xl text-xs text-[#5D6870] italic max-w-sm">
              {ENCOURAGING_TIPS[tipIndex]}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

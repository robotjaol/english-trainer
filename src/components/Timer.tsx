import React, { useEffect, useState, useRef } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  deadlineEpochMs: number;
  onExpire: () => void;
  paused?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ deadlineEpochMs, onExpire, paused = false }) => {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() =>
    Math.max(0, Math.floor((deadlineEpochMs - Date.now()) / 1000))
  );

  const announcedRef = useRef<{ fiveMin: boolean; oneMin: boolean }>({
    fiveMin: false,
    oneMin: false,
  });

  const [announcement, setAnnouncement] = useState<string>("");

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((deadlineEpochMs - now) / 1000));
      setRemainingSeconds(remaining);

      // Accessible announcements for thresholds
      if (remaining <= 300 && remaining > 295 && !announcedRef.current.fiveMin) {
        announcedRef.current.fiveMin = true;
        setAnnouncement("5 minutes remaining in timed assessment.");
      } else if (remaining <= 60 && remaining > 55 && !announcedRef.current.oneMin) {
        announcedRef.current.oneMin = true;
        setAnnouncement("1 minute remaining in timed assessment.");
      }

      if (remaining <= 0) {
        clearInterval(interval);
        setAnnouncement("Time has expired. Submitting assessment.");
        onExpire();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [deadlineEpochMs, onExpire, paused]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const isUrgent = remainingSeconds < 60;

  return (
    <div
      id="timer-display"
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-mono font-medium transition-colors ${
        isUrgent
          ? "bg-[#FDECEA] text-[#B42318] border border-[#B42318]/30 font-semibold animate-pulse"
          : "bg-[#F6F8F6] text-[#172026] border border-[#D9DED9]"
      }`}
      role="timer"
      aria-live="off"
      aria-label={`Time remaining: ${minutes} minutes and ${seconds} seconds`}
    >
      <Clock className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
      {/* Screen reader polite live region for major milestone announcements */}
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
};

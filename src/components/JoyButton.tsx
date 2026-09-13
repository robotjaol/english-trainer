import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { soundEngine } from "../utils/soundEngine.ts";

export interface JoyButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "icon";
  disableSound?: boolean;
}

const VARIANT_STYLES: Record<NonNullable<JoyButtonProps["variant"]>, string> = {
  primary:
    "bg-[#0F766E] hover:bg-[#115E59] text-white shadow-sm hover:shadow-md hover:shadow-[#0F766E]/20 border border-[#0F766E]",
  secondary:
    "bg-[#CCFBF1] hover:bg-[#99F6E4] text-[#0F766E] border border-[#0F766E]/20 shadow-2xs",
  outline:
    "bg-white hover:bg-[#F6F8F6] text-[#172026] border border-[#D9DED9] hover:border-[#8B98A0] shadow-2xs",
  ghost:
    "bg-transparent hover:bg-[#F6F8F6] text-[#5D6870] hover:text-[#172026] border border-transparent",
  danger:
    "bg-[#FDECEA] hover:bg-[#FCD8D4] text-[#B42318] border border-[#B42318]/20",
  success:
    "bg-[#E8F7EE] hover:bg-[#D1F2DE] text-[#16794B] border border-[#16794B]/20",
};

const SIZE_STYLES: Record<NonNullable<JoyButtonProps["size"]>, string> = {
  sm: "px-2.5 py-1 text-xs gap-1.5 rounded-lg",
  md: "px-4 py-2 text-sm gap-2 rounded-xl",
  lg: "px-5 py-3 text-base gap-2.5 rounded-xl font-semibold",
  icon: "p-2 text-sm rounded-xl aspect-square justify-center",
};

export const JoyButton: React.FC<JoyButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disableSound = false,
  className = "",
  disabled = false,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!disableSound) {
      soundEngine.playButtonClick();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.03, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.94, y: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 24 }}
      disabled={disabled}
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#1D4ED8] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

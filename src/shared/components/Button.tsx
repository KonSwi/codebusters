"use client";

import clsx from "clsx";
import React from "react";

type Variant = "blue" | "red" | "black" | "transparent" | "onlyText" | "linkText";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export const Button = ({
  variant = "blue",
  className,
  disabled = false,
  type = "button",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center rounded-lg font-medium transition",
        {
          "bg-blue text-white w-full py-2.5 px-5 mb-1 text-lg font-semibold": variant === "blue",
          "bg-red w-50 px-5 py-3 text-white": variant === "red",
          "bg-black px-5 py-3 text-white w-full gap-4": variant === "black",
          "bg-transparent w-50 border border-white px-5 py-3 text-white":
            variant === "transparent",
          "bg-transparent text-white": variant === "onlyText",
          "bg-transparent text-blue": variant === "linkText",
          "cursor-not-allowed opacity-50": disabled,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
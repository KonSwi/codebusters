"use client";

import clsx from "clsx";
import React from "react";

type Variant = "blue" | "red" | "transparent" | "onlyText" | "linkText";

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
          "bg-blue text-white": variant === "blue",
          "bg-red w-50 px-5 py-3 text-white": variant === "red",
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

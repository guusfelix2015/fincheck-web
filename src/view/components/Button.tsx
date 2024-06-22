import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spiner } from "./Spiner";

interface ButtonProps extends ComponentProps<"button"> {
  isPending?: boolean
  children?: React.ReactNode
  variant?: "danger" | "ghost"
}

export function Button({ className, isPending, disabled, children, variant, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isPending}
      className={
        cn(
          "bg-teal-900 text-white h-12 px-6 rounded-2xl font-medium hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center",
          variant === "danger" && "bg-red-900 hover:bg-red-800",
          variant === "ghost" && "border border-gray-500 bg-gray-50 text-gray-800 font-medium hover:bg-gray-100",
          className
        )
      }
    >
      {children}
      {isPending && <Spiner />}
    </button>

  )
}
import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spiner } from "./Spiner";

interface ButtonProps extends ComponentProps<"button"> {
  isPending?: boolean
  children?: React.ReactNode
}

export function Button({ className, isPending, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isPending}
      className={
        cn(
          "bg-teal-900 text-white h-12 px-6 rounded-2xl font-medium hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center",
          className
        )
      }
    >
      {children}
      {isPending && <Spiner />}
    </button>

  )
}
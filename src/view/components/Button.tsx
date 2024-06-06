import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> { }

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-teal-900 text-white h-12 px-6 rounded-2xl font-medium hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
    />

  )
}
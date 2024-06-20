import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";
import { formatDate } from "../../app/utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  error?: boolean
  className?: string
}

export function DatePickerInput({ error, className }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button type="button" className={cn(
            "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4",
            error && "border-red-900 focus:border-red-900",
            className
          )}>
            <span className="absolute text-gray-700 font-xs left-[13px] top-1 pointer-events-none">Data</span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>
        <Popover.Content className="shadow-xl">
          <DatePicker value={selectedDate} onChange={(date) => setSelectedDate(date)} />
        </Popover.Content>
      </Popover.Root>
      {
        error && (
          <div className="flex gap-2 items-center mt-2 text-red-900">
            <CrossCircledIcon />
            <p className="text-xs">{error}</p>
          </div>
        )
      }
    </div >
  )
}
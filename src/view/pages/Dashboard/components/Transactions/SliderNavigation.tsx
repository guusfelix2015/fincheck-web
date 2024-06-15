import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";




export function SliderNavigation() {
  const swiper = useSwiper()

  return (
    <>
      <button onClick={() => swiper.slidePrev()}
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors 
        disabled:opacity-40 absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center 
        z-10 bg-gradient-to-r from-gray-100 to-transparent">
        <ChevronLeftIcon className="text-gray-800 w-6 h-6" />
      </button>
      <button onClick={() => swiper.slideNext()}
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors 
        disabled:opacity-40 absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center 
        z-10 bg-gradient-to-l from-gray-100 to-transparent">
        <ChevronRightIcon className="text-gray-800 w-6 h-6" />
      </button>
    </>
  )
}
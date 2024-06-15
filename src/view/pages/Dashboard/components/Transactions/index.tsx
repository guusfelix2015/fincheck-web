import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { cn } from "../../../../../app/utils/cn";
import { useTransactionsController } from "./useTransactionsController";
import { Spiner } from "../../../../components/Spiner";
import emptyStateImage from "../../../../../assets/empty-state.svg"

export function Transactions() {
  const { areValuesVisible, isLoading, transactions } = useTransactionsController()
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {!isLoading ? (
        <>
          <header className="">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">Transações</span>
                <ChevronDownIcon className="text-gray-900" />
              </button>
              <button>
                <FilterIcon />
              </button>
            </div>
            <div className="mt-6 relative flex-1">
              <Swiper centeredSlides slidesPerView={3}>
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption index={index} isActive={isActive} month={month} />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>
          <div className="mt-4 space-y-2 overflow-y-auto flex-1">
            {transactions.length > 0 ? (
              <>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="expense" />
                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                      <strong className="text-sm text-gray-600">04/06/2023</strong>
                    </div>
                  </div>
                  <span className={cn("text-red-800 tracking-[-0.5px] font-medium", !areValuesVisible && "blur-sm")}>- {formatCurrency(123)}</span>
                </div>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="income" />
                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                      <strong className="text-sm text-gray-600">04/06/2023</strong>
                    </div>
                  </div>
                  <span className="text-green-800 tracking-[-0.5px] font-medium">+ {formatCurrency(123)}</span>
                </div>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="expense" />
                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                      <strong className="text-sm text-gray-600">04/06/2023</strong>
                    </div>
                  </div>
                  <span className="text-red-800 tracking-[-0.5px] font-medium">- {formatCurrency(123)}</span>
                </div>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="income" />
                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                      <strong className="text-sm text-gray-600">04/06/2023</strong>
                    </div>
                  </div>
                  <span className="text-green-800 tracking-[-0.5px] font-medium">+ {formatCurrency(123)}</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={emptyStateImage} />
                <p className="text-gray-700">Não encontramos nenhuma transação</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <Spiner />
        </div>
      )}
    </div>
  )
}
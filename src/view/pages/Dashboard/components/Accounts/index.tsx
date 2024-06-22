import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { Spiner } from "../../../../components/Spiner";
import { PlusIcon } from "@radix-ui/react-icons";

export function Accounts() {

  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance,
  } = useAccountsController()


  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {!isLoading ? (
        <>
          <div>
            <span className="tracking-[-0.5] text-white block">Saldo total</span>
            <div className="flex items-center gap-2">
              <strong className={cn("text-2xl traking-[-1px] text-white", !areValuesVisible && "blur-md")}>
                {formatCurrency(currentBalance)}
              </strong>
              <button className="w-12 h-12 flex items-center justify-center" onClick={toggleValuesVisibility}>
                {areValuesVisible ? <EyeIcon open={false} /> : <EyeIcon open />}
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts?.length > 0 ? (
              <div>
                <Swiper spaceBetween={16} slidesPerView={windowWidth >= 500 ? 2.1 : 1.1} onSlideChange={swiper => {
                  setSliderState({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd
                  })
                }}>
                  <div className="flex items-center justify-between mb-4" slot="container-start">
                    <strong className="text-white tracking-[-1px] text-lg font-bold">Minhas contas</strong>
                    <AccountsSliderNavigation isBeginning={sliderState.isBeginning} isEnd={sliderState.isEnd} />
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <>
                <div className="mb-4" slot="container-start">
                  <strong className="text-white tracking-[-1px] text-lg font-bold">Minhas contas</strong>
                </div>
                <button onClick={openNewAccountModal}
                  className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center 
                justify-center gap-4 text-white">
                  <div className="h-11 w-11 rounded-full border-2 border-dashed border-w flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="font-medium tracjking-[-0.5px] block text-center w-32">Cadastre uma nova conta</span>
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <Spiner className="text-teal-950/50 fill-white" />
        </div>
      )}
    </div>
  )
}
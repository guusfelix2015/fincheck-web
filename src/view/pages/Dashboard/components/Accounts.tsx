import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";


export function Accounts() {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      <div>
        <span className="tracking-[-0.5] text-white block">Saldo total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl traking-[-1px] text-white">R$ 100,00</strong>
          <button className="w-12 h-12 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper spaceBetween={16} slidesPerView={2.1}>
            <div className="flex items-center justify-between mb-4" slot="container-start">
              <strong className="text-white tracking-[-1px] text-lg font-bold">Minhas contas</strong>
              <AccountsSliderNavigation />
            </div>
            <SwiperSlide>
              <AccountCard type="CHECKING" color="#7950f2" name="Nubank" balance={1000} />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard type="INVESTMENT" color="#333" name="XP" balance={1000} />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard type="CASH" color="#0f0" name="Carteira" balance={1000} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}
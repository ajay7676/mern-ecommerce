import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import AdRecommendationCard from "./AdRecommendationCard";
import CriticalActionsCard from "./CriticalActionsCard";
import CustomerCard from "./CustomerCard";
import SettlementHubCard from "./SettlementHubCard";
import WhatsNewCard from "./WhatsNewCard";
import "swiper/css";
import "swiper/css/navigation";

const WidgtCardContainer = () => {
  return (
    <section className="bg-[#DFE7FA] mt-20 rounded-2xl">
      <div className="p-6">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          <SwiperSlide>
            <WhatsNewCard />
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <CriticalActionsCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <SettlementHubCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="xl:col-span-2">
              <AdRecommendationCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="xl:col-span-1">
              <CustomerCard />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default WidgtCardContainer;

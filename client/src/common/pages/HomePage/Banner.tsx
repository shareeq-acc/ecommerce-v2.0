import { Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// images
import image1 from "../../../assets/images/banner/banner-01-1.jpg";
import image2 from "../../../assets/images/banner/banner-01-2.jpg";
import image3 from "../../../assets/images/banner/banner-01-3.jpg";

const Banner = () => {
  return (
    <div className="banner section-margin section-padding">
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div
            className="banner__img"
            style={{ background: `url(${image1}) no-repeat center` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner__img"
            style={{ background: `url(${image2}) no-repeat center` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner__img"
            style={{ background: `url(${image3}) no-repeat center` }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

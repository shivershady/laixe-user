import 'swiper/swiper-bundle.css';
import '../styles/slide.css';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';
import { useRef } from 'react';

function HeroSection() {
  const swiperRef = useRef(null)

  const slides = [
    {
      title: "Khóa học ô tô Hạng B11 tự động",
      description: "Trung tâm liên tục mở lớp tuyển sinh học viên học lái xe ô tô hạng B11 tự động. Học và thi tại Trung tâm. Thời gian học: 2.5 tháng. Học phí niêm yết: 14 triệu 000. Học viên có thể chủ động thời gian học theo nhu cầu công việc.",
      image: "https://daotaolaixehd.com.vn/wp-content/uploads/2016/12/taplaiB2.png"
    },
    {
      title: "Khóa học ô tô Hạng B11 tự động",
      description: "Trung tâm liên tục mở lớp tuyển sinh học viên học lái xe ô tô hạng B11 tự động. Học và thi tại Trung tâm. Thời gian học: 2.5 tháng. Học phí niêm yết: 14 triệu 000. Học viên có thể chủ động thời gian học theo nhu cầu công việc.",
      image: "https://daotaolaixehd.com.vn/wp-content/uploads/2016/12/taplaiB2.png"
    },
    {
      title: "Khóa học ô tô Hạng B11 tự động",
      description: "Trung tâm liên tục mở lớp tuyển sinh học viên học lái xe ô tô hạng B11 tự động. Học và thi tại Trung tâm. Thời gian học: 2.5 tháng. Học phí niêm yết: 14 triệu 000. Học viên có thể chủ động thời gian học theo nhu cầu công việc.",
      image: "https://daotaolaixehd.com.vn/wp-content/uploads/2016/12/taplaiB2.png"
    },
  ]
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      effect="fade"
      speed={1500}
      loop={true}
      onSwiper={(swiper) => {
        swiperRef.current = swiper
      }}
      className="px-4"
      style={{
        backgroundImage: 'url(https://daotaolaixehd.com.vn/wp-content/themes/academy/images/bgs/site_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="container flex justify-between items-center py-4">
            <div className="max-w-xl">
              <h2 className="mb-4 text-3xl font-bold text-white">{slide.title}</h2>
              <p className="mb-6 text-sm text-white">{slide.description}</p>
              <button className="px-4 py-2 text-white bg-[#f47b68] rounded-md">Đăng ký học ngay</button>
            </div>
            <div className="relative w-1/2 h-full">
              <img src={slide.image} alt={slide.title} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSection;
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const SuggestedPropertiesSection = ({ properties = [] }) => {
  // Додатково перевіримо, що це масив
  if (!Array.isArray(properties)) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 text-rich-black">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-amber-200 via-green-200 to-emerald-400 bg-clip-text text-transparent">
        Suggested Properties
      </h2>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 150,
          modifier: 1.5,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="w-full max-w-6xl"
      >
        {properties.map((property, index) => (
          <SwiperSlide
            key={index}
            className="p-[2px] rounded-2xl bg-gradient-to-r from-amber-200 via-green-200 to-emerald-400 w-[300px] md:w-[360px] lg:w-[400px]"
          >
            <div className="bg-rich-black rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.03] flex flex-col">
              <img
                src={property.image}
                alt={property.title || property.summary}
                className="w-full h-56 object-cover"
              />
              <div className="px-6 py-5 text-center space-y-2">
                <p className="text-emerald-400 text-xl font-semibold tracking-tight">{property.price}</p>
                <p className="text-gold-muted text-base font-medium">{property.location}</p>
                <p className="text-white text-sm opacity-60">{property.summary}</p>
                <ul className="text-sm text-white opacity-60 mt-2 space-y-1 list-none">
                  {property.features?.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SuggestedPropertiesSection;
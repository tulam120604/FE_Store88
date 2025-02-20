/* eslint-disable @next/next/no-img-element */
'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/app/_Components/ui/carousel"
import Image from "next/image"
import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


const Anh_san_pham = ({ dataProps }: any) => {
  const [image_item, setImage_item] = useState(0)

  return (
    <div className="w-full h-full p-2 flex flex-col lg:items-center lg:gap-y-6 gap-y-3.5">
      <div className="relative bg-white cursor-pointer w-full lg:h-[450px] mb:h-[342px] overflow-hidden rounded grid place-content-center">
        <img width={400} height={400} className="bg-white w-full lg:h-[400px] mb:h-[342px] " src={dataProps?.gallery[image_item]} alt='' />
      </div>
      <div className="lg:w-1/2">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          freeMode={true}
       
          modules={[FreeMode, Pagination]}
          className="mySwiper !h-16"
        >
          {dataProps?.gallery?.map((uri: any, i: number) => (
            <SwiperSlide key={i} className="*:border *:rounded *:overflow-hidden !w-16 !h-16">
              <button key={uri} className={`hover:border-gray-800 ${image_item === i ? 'border-gray-800' 
                : 'border-gray-300'}`} onClick={() => setImage_item(i)}>
                <Image width={100} height={100} className="w-16 !h-14" src={uri} alt='Loading...' />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  )
}

export default Anh_san_pham
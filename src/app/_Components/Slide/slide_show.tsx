'use client';

import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

const Slide_show = ({ children }: { children: React.ReactNode }) => {
    return (
        <Swiper
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
                delay: 4500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            speed={600}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Slide_show
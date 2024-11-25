'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 

const Custome_Swiper = ({ children, count_item,spaceBetween, shadow } : {children : React.ReactNode, count_item : any,spaceBetween : any, shadow?: any}) => {

    return (
        <Swiper
            slidesPerView={count_item}
            spaceBetween={spaceBetween}
            className="!pt-4 *:cursor-pointer"
        >
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={index} className={`rounded-lg !duration-300 ${shadow} !flex !flex-col !items-stretch gap-y-4`}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Custome_Swiper;
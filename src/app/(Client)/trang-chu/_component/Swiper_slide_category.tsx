"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";
import { convert_Slug } from "@/src/app/util/Slug";

export default function Custome_swiper_slide_category_product({ propsData }: any) {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={10}
      freeMode={true}
      modules={[FreeMode, Pagination]}
      className="mySwiper"
    >
      {propsData?.data?.map((item: any, i: number) => (
        <SwiperSlide
          key={i}
          className="*:rounded *:overflow-hidden !w-[110px]"
        >
          <Link
          href={`/san-pham/${convert_Slug(item?.category_name)}.html?p=${item?._id}`}
            className="flex flex-col items-center rounded-lg group 
            hover:text-gray-800 text-gray-500 duration-200 gap-2 my-2"
          >
            <section className="rounded-full w-20 h-20 grid place-content-center bg-gray-100">
              {/* <Removal_background link_img={item?.category_img}/> */}
              <Image
                width={100}
                height={100}
                src={item?.category_img}
                className="max-w-[90px] !max-h-20 mix-blend-darken group-hover:scale-105 duration-200"
                alt="Store88"
              />
            </section>
            <span className="truncate text-sm font-light mt-1 line-clamp-2 whitespace-normal">
              {item?.category_name}
            </span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

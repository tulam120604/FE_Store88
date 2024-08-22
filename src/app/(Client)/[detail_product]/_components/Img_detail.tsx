/* eslint-disable @next/next/no-img-element */
'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/app/_Components/ui/carousel"
import Image from "next/image"
import { useState } from "react"

const Img_Detail_Product = ({ dataProps }: any) => {
  const [image_item, setImage_item] = useState(0)

  return (
    <div className="w-full h-full p-2 flex flex-col lg:items-center lg:gap-y-6 gap-y-3.5">
      <div className="relative bg-white cursor-pointer w-full lg:h-[450px] mb:h-[342px] overflow-hidden rounded border-4 grid place-items-center">
        <img width={400} height={400} className="bg-white max-w-full max-h-full" src={dataProps?.gallery[image_item]} alt='' />
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="h-16 pb-4 max-w-[250px]"
      >
        <CarouselContent>
          {dataProps?.gallery?.map((uri: any, i: number) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 *:border *:rounded *:overflow-hidden">
              <button key={uri} className={`hover:border-gray-800 ${image_item === i && 'border-gray-800'}`} onClick={() => setImage_item(i)}>
                <Image width={100} height={100} className="w-16 h-16" src={uri} alt='Loading...' />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default Img_Detail_Product
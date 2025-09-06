import { Skeleton } from "../../../_Components/ui/Skeleton/skeleton"

const LoadingShops = () => {
  return (
    <div className="lg:w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] flex flex-col">
      <div className="grid lg:pt-16 pb-5 snap-x lg:grid-cols-6 md:grid-cols-3 gap-x-4 grid-cols-2 justify-between lg:gap-y-8 mb:gap-y-[29px] mb:pt-10">
        <div className="flex flex-col w-full snap-center hover:shadow-[0px_2px_20px_-5px_rgba(0,0,0,0.6)] duration-200 cursor-pointer overflow-hidden h-full rounded">
          {/* Image */}
          <Skeleton className="relative group w-full lg:h-[200px] shadow sm:h-[160px] h-[150px] overflow-hidden rounded grid place-items-center"/>
          {/* about */}
          <Skeleton className="w-full p-4 flex flex-col gap-y-1.5 items-start h-[120px] justify-between"/>
        </div>

        <div className="flex flex-col w-full snap-center hover:shadow-[0px_2px_20px_-5px_rgba(0,0,0,0.6)] duration-200 cursor-pointer overflow-hidden h-full rounded">
          {/* Image */}
          <Skeleton className="relative group w-full lg:h-[200px] shadow sm:h-[160px] h-[150px] overflow-hidden rounded grid place-items-center"/>
          {/* about */}
          <Skeleton className="w-full p-4 flex flex-col gap-y-1.5 items-start h-[120px] justify-between"/>
        </div>

        <div className="flex flex-col w-full snap-center hover:shadow-[0px_2px_20px_-5px_rgba(0,0,0,0.6)] duration-200 cursor-pointer overflow-hidden h-full rounded">
          {/* Image */}
          <Skeleton className="relative group w-full lg:h-[200px] shadow sm:h-[160px] h-[150px] overflow-hidden rounded grid place-items-center"/>
          {/* about */}
          <Skeleton className="w-full p-4 flex flex-col gap-y-1.5 items-start h-[120px] justify-between"/>
        </div>

        <div className="flex flex-col w-full snap-center hover:shadow-[0px_2px_20px_-5px_rgba(0,0,0,0.6)] duration-200 cursor-pointer overflow-hidden h-full rounded">
          {/* Image */}
          <Skeleton className="relative group w-full lg:h-[200px] shadow sm:h-[160px] h-[150px] overflow-hidden rounded grid place-items-center"/>
          {/* about */}
          <Skeleton className="w-full p-4 flex flex-col gap-y-1.5 items-start h-[120px] justify-between"/>
        </div>

        <div className="flex flex-col w-full snap-center hover:shadow-[0px_2px_20px_-5px_rgba(0,0,0,0.6)] duration-200 cursor-pointer overflow-hidden h-full rounded">
          {/* Image */}
          <Skeleton className="relative group w-full lg:h-[200px] shadow sm:h-[160px] h-[150px] overflow-hidden rounded grid place-items-center"/>
          {/* about */}
          <Skeleton className="w-full p-4 flex flex-col gap-y-1.5 items-start h-[120px] justify-between"/>
        </div>
      </div>
    </div>
  )
}

export default LoadingShops
import { Skeleton } from "../../../_Components/ui/Skeleton/skeleton"

const LoadingShops = () => {
  return (
    <div className="max-w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] flex flex-col">
    <div className="grid lg:pt-16 pb-5 snap-x lg:grid-cols-6 md:grid-cols-3 gap-x-4 grid-cols-2 justify-between lg:gap-y-8 mb:gap-y-[29px] mb:pt-10 lg:h-[500px] h-[300px]">
      <div className="flex flex-col w-full overflow-hidden h-full rounded">
        {/* Image */}
        <Skeleton className="relative group w-full shadow h-full bg-gray-300 overflow-hidden rounded grid place-items-center">
        </Skeleton>
      </div>

      <div className="flex flex-col w-full overflow-hidden h-full rounded">
        {/* Image */}
        <Skeleton className="relative group w-full shadow h-full bg-gray-300 overflow-hidden rounded grid place-items-center">
        </Skeleton>
      </div>

      <div className="flex flex-col w-full overflow-hidden h-full rounded">
        {/* Image */}
        <Skeleton className="relative group w-full shadow h-full bg-gray-300 overflow-hidden rounded grid place-items-center">
        </Skeleton>
      </div>

      <div className="flex flex-col w-full overflow-hidden h-full rounded">
        {/* Image */}
        <Skeleton className="relative group w-full shadow h-full bg-gray-300 overflow-hidden rounded grid place-items-center">
        </Skeleton>
      </div>

      <div className="flex flex-col w-full overflow-hidden h-full rounded">
        {/* Image */}
        <Skeleton className="relative group w-full shadow h-full bg-gray-300 overflow-hidden rounded grid place-items-center">
        </Skeleton>
      </div>

      <div className="flex flex-col w-full overflow-hidden h-full rounded">
        {/* Image */}
        <Skeleton className="relative group w-full shadow h-full bg-gray-300 overflow-hidden rounded grid place-items-center">
        </Skeleton>
      </div>
    </div>
  </div>
  )
}

export default LoadingShops
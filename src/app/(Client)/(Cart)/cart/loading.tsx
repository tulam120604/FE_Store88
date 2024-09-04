import { Skeleton } from "@/src/app/_Components/ui/Skeleton/skeleton"

const LoadingCart = () => {
  return (
    <div className="max-w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] grid lg:grid-cols-[70%_27%]">
      <Skeleton className="relative group w-full shadow h-full bg-gray-300 overflow-hidden rounded grid place-items-center">
      </Skeleton>
      <Skeleton className="relative group w-full shadow h-full bg-gray-300 overflow-hidden rounded grid place-items-center">
      </Skeleton>
    </div>
  )
}

export default LoadingCart
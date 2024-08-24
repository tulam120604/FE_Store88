import { Skeleton } from "@/src/app/_Components/ui/Skeleton/skeleton"

const LoadingDetail = () => {
  return (
    <main className="w-full *:max-w-[1440px] *:w-[342px] *:mx-auto *:h-full py-12">
      <div className="lg:grid lg:grid-cols-[573px_auto] auto-rows-[70vw] gap-x-20 *:bg-gray-300">
        {/*  desktop : left  , mobile : row 1 */}
        <Skeleton></Skeleton>
        {/*desktop: right, mobile : row 2 */}
        <Skeleton></Skeleton>
      </div>
      {/* related products */}
      <Skeleton className="w-full h-[10vw] bg-gray-300"></Skeleton>
      <Skeleton className="pt-4 *:bg-gray-300">
        <Skeleton className="lg:text-2xl text-xl lg:tracking-[-0.5px]"></Skeleton>
        <Skeleton className="w-full h-[10vw]"></Skeleton>
      </Skeleton>
    </main>
  )
}

export default LoadingDetail
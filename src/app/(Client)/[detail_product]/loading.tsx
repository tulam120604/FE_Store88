import { Skeleton } from "@/src/app/_Components/ui/Skeleton/skeleton"

const LoadingDetail = () => {
  return (
    <section className="w-full *:max-w-[1440px] *:w-[342px] *:mx-auto *:h-full py-12">
      <div className="lg:grid lg:grid-cols-[573px_auto] gap-x-10 pb-4 *:bg-gray-200 *:h-[400px]">
        {/*  desktop : left  , mobile : row 1 */}
        <Skeleton></Skeleton>
        {/*desktop: right, mobile : row 2 */}
        <Skeleton></Skeleton>
      </div>
      {/* related products */}
      <Skeleton className="w-full h-[400px] bg-gray-200"></Skeleton>
      <Skeleton className="pt-4 *:bg-gray-200 *:h-[300px]">
        <Skeleton className="lg:text-2xl text-xl lg:tracking-[-0.5px]"></Skeleton>
        <Skeleton className="w-full h-[10vw]"></Skeleton>
      </Skeleton>
    </section>
  )
}

export default LoadingDetail
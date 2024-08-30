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
      <Skeleton className="*:max-w-[1440px] *:w-[342px] *:mx-auto h-[400px] bg-gray-200"></Skeleton>
      <Skeleton className="*:max-w-[1440px] *:w-[342px] *:mx-auto h-[400px] bg-gray-200"></Skeleton>
    </section>
  )
}

export default LoadingDetail
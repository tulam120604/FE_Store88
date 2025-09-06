import { Skeleton } from "@/src/app/_Components/ui/Skeleton/skeleton";

const LoadingDetail = () => {
  return (
    <>
      <div className="max-w-[1440px] mx-auto w-[95vw] grid grid-cols-1 lg:grid-cols-2 
      gap-x-10 pb-4 *:h-[400px]">
        {/*  desktop : left  , mobile : row 1 */}
        <Skeleton></Skeleton>
        {/*desktop: right, mobile : row 2 */}
        <Skeleton></Skeleton>
      </div>
      {/* related products */}
      <Skeleton className="max-w-[1440px] mx-auto w-[95vw] my-8 h-[400px]" />
    </>
  );
};

export default LoadingDetail;

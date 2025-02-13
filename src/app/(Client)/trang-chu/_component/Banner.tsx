import Image from 'next/image';
import Slide_show from '@/src/app/_Components/Slide/slide_show';
import { Suspense } from 'react';
import Loading_Skeleton from '@/src/app/_Components/Loadings/Loading_Skeleton';

const Banner = () => {
  return (
    <Suspense fallback={<Loading_Skeleton number_elements={2} />}>
      <div className="grid md:grid-cols-[60%_39%] grid-cols-1 gap-y-2 justify-between lg:p-4 lg:bg-white rounded-lg">
        {/* slide */}
        <div className='*:cursor-pointer'>
          <Slide_show>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[350px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/voucher_4.jpg" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[350px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/voucher_freeship.png" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[350px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/3.jpeg" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[350px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/voucher_3.jpg" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[350px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/banner3.jpg" alt='Loading...' />
            </div>
          </Slide_show>
        </div>
        <div className='h-[150px] lg:h-[350px] cursor-pointer'>
          <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/voucher_2.png" alt='Loading...' />
        </div>
      </div>
    </Suspense>
  )
}

export default Banner
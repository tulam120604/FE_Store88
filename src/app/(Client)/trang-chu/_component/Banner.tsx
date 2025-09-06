import Image from 'next/image';
import { Suspense } from 'react';
import Loading_Skeleton from '@/src/app/_Components/Loadings/Loading_Skeleton';
import Slide_show from '@/src/app/_Components/Slide/Slide_show';

const Banner = () => {
  return (
    <Suspense fallback={<Loading_Skeleton number_elements={2} />}>
        {/* slide */}
        <div className='*:cursor-pointer'>
          <Slide_show>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[450px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/voucher_4.jpg" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[450px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/voucher_freeship.png" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[450px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/3.jpeg" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[450px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/voucher_3.jpg" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[450px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/banner3.jpg" alt='Loading...' />
            </div>
          </Slide_show>
        </div>
    </Suspense>
  )
}

export default Banner
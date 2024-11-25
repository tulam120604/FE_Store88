import Image from 'next/image';
import Slide_show from '@/src/app/_Components/Slide/slide_show';

const Banner = () => {
  return (
      <div className="grid md:grid-cols-[60%_39%] grid-cols-1 gap-y-2 justify-between">
        {/* slide */}
        <div className='*:cursor-pointer'>
          <Slide_show>
          <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[250px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/banner1.jpg" alt='Loading...' />
            </div>
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[250px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/voucher_4.jpg" alt='Loading...' />
            </div>
            {/* 888 */}
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[250px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/voucher_freeship.png" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[250px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/3.jpeg" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[150px] lg:h-[250px]">
              <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/voucher_3.jpg" alt='Loading...' />
            </div>
          </Slide_show>
        </div>
        <div className='border h-[150px] lg:h-[250px] cursor-pointer'>
          <Image width={2000} height={1000} className='w-full h-full top-0 rounded-lg left-0' src="/Images/voucher_2.png" alt='Loading...' />
        </div>
      </div>
  )
}

export default Banner
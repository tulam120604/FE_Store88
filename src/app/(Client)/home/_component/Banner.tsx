import Image from 'next/image';
import Slide_show from '@/src/app/_Components/Slide/slide_show';

const Banner = () => {
  return (
      <div className="max-w-[1440px] grid md:grid-cols-[65%_34%] grid-cols-1 gap-y-2 justify-between w-[95vw] py-2 mx-auto">
        {/* slide */}
        <div>
          <Slide_show>
            <div className="relative flex flex-col *:flex *:flex-col h-[200px] lg:h-[400px]">
              <Image width={1000} height={500} className='w-full h-full top-0 rounded left-0' src="/Images/voucher_4.jpg" alt='Loading...' />
            </div>
            {/* 888 */}
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[200px] lg:h-[400px]">
              <Image width={1000} height={500} className='w-full h-full top-0 rounded left-0' src="/Images/voucher_freeship.png" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[200px] lg:h-[400px]">
              <Image width={1000} height={500} className='w-full h-full top-0 rounded left-0' src="/Images/3.jpeg" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[200px] lg:h-[400px]">
              <Image width={1000} height={500} className='w-full h-full top-0 rounded left-0' src="/Images/voucher_3.jpg" alt='Loading...' />
            </div>
          </Slide_show>
        </div>
        <div className='border h-[200px] lg:h-[400px]'>
          <Image width={1000} height={500} className='w-full h-full top-0 rounded left-0' src="/Images/voucher_2.png" alt='Loading...' />
        </div>
      </div>
  )
}

export default Banner
import Link from 'next/link';
import React, { Suspense } from 'react'
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { unstable_noStore as noStore } from 'next/cache';
import { GET_limit_items } from '@/src/app/_lib/Services/Services_Items/Product';
import ReloadPage from '@/src/app/_Components/Pages/ReloadPage';
import List_Products from '@/src/app/_Components/Products/List_Products';
import Loading_Skeleton from '@/src/app/_Components/Loadings/Loading_Skeleton';

const Products_Home = async () => {
    noStore();
    const data = await GET_limit_items(42);
    //   const isClient = typeof window !== 'undefined';
    //   console.log(isClient);
    return (
        <Suspense fallback={<Loading_Skeleton number_elements={12} />}>
            <div className='flex flex-col lg:py-4'>
                {(data?.status === 404 || data?.status === 500) ? (<>
                    <div className='min-h-[70vh] grid place-items-center'>
                        <ReloadPage />
                    </div></>) :
                    (<>
                    <div className='sticky top-0 z-[1000] bg-[#F5F5FA]'>
                    <div className='px-6 py-2 lg:py-6 bg-gradient-to-r from-[#DEECFE] to-[#E1E8FD] rounded mt-4'>
                            <span className="relative z-[2] text-gray-800 antialiased tracking-[0.3px] uppercase font-semibold">Gợi ý hôm nay</span>
                        </div>
                    </div>
                        
                        {
                            data?.data?.docs ?
                                ((data?.data?.docs?.length < 1) ? <span className='text-center'>Trống!</span> :
                                    <List_Products data={data?.data?.docs} />) :
                                <Loading_Dots />
                        }
                        {
                            Array.isArray(data?.data?.docs) &&
                            (data?.data?.docs > 42) &&
                            <div className='flex justify-center mt-4'>
                                <Link href={'/san-pham'} className='border px-4 py-1 rounded bg-gray-900 hover:bg-gray-700 duration-300 text-white'>Xem Thêm</Link>
                            </div>
                        }
                    </>)}
            </div>
        </Suspense>)
}

export default Products_Home
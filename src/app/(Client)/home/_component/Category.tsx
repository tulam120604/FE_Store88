import Image from 'next/image';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { list_Categories } from '@/src/app/_lib/Services/Services_Items/categories';
import Custome_Swiper from '@/src/app/_Components/Swipper/swiper';

const Service = async () => {
    noStore();
    const { data } = await list_Categories();
    return (
        <div className="max-w-[1440px] mx-auto mb:w-[342px] md:w-[90vw] py-4">
            <strong className="relative font-medium lg:text-xl px-4 mb:text-lg">Danh mục</strong>
            {data?.status === 404 ? (<><div className='min-h-[70vh] grid place-items-center'>
                <div className='flex flex-col gap-y-2'>
                    Ôi hỏng!
                    <span>Có vẻ như đã có lỗi xảy ra :(( </span>
                    <Link className='underline text-sky-500' href={'/'}>Trở về trang chủ!</Link>
                </div>
            </div></>) : (<>
                <div className='lg:block hidden'>
                    <Custome_Swiper spaceBetween={40} count_item={7}>
                        {
                            data?.map((item: any) => (
                                <Link key={item?._id} href={`/products/${item?._id}`} className='bg-white grid place-item-center border border-gray-50 w-[200px] h-[200px] rounded-lg bg-gray-50 p-4 hover:shadow-lg duration-200'>
                                    <div key={item?._id} className="flex flex-col items-center justify-center gap-y-4">
                                        <Image width={100} height={100} src={item?.category_img} alt='Loading...'></Image>
                                        <span>{item?.category_name}</span>
                                    </div>
                                </Link>
                            ))
                        }
                    </Custome_Swiper>
                </div>
                <div className='lg:hidden md:block hidden'>
                    <Custome_Swiper spaceBetween={40} count_item={4}>
                        {
                            data?.map((item: any) => (
                                <Link key={item?._id} href={`/products/${item?._id}`} className='bg-white grid place-item-center border border-gray-50 w-[200px] h-[200px] rounded-lg bg-gray-50 p-4 hover:border-red-600'>
                                    <div key={item?._id} className="flex flex-col items-center justify-center gap-y-4">
                                        <Image width={100} height={100} src={item?.category_img} alt='Loading...'></Image>
                                        <span>{item?.category_name}</span>
                                    </div>
                                </Link>
                            ))
                        }
                    </Custome_Swiper>
                </div>
                <div className='md:hidden block'>
                    <Custome_Swiper spaceBetween={40} count_item={2}>
                        {
                            data?.map((item: any) => (
                                <Link key={item?._id} href={`/products/${item?._id}`} className='bg-white grid place-item-center border border-gray-50 w-[150px] h-[200px] rounded-lg bg-gray-50 p-4 hover:border-red-600'>
                                    <div key={item?._id} className="flex flex-col items-center justify-center gap-y-4">
                                        <Image width={100} height={100} src={item?.category_img} alt='Loading...'></Image>
                                        <span>{item?.category_name}</span>
                                    </div>
                                </Link>
                            ))
                        }
                    </Custome_Swiper>
                </div>
            </>)}
        </div>

    )
}

export default Service
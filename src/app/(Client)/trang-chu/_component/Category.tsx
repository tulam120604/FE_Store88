import Image from 'next/image';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { GET_category } from '@/src/app/_lib/Services/Services_Items/Category';
import { Suspense } from 'react';
import Loading_Skeleton from '@/src/app/_Components/Loadings/Loading_Skeleton';

const Category = async () => {
    noStore();
    const { data } = await GET_category();
    return (
        <Suspense fallback={<Loading_Skeleton number_elements={1} />}>
            <aside className='py-4 px-2 overflow-y-scroll hidden_scroll_y !sticky top-4 bg-white rounded-lg max-h-screen'>
                <span className="relative font-medium px-4 text-black">Danh mục</span>
                {data?.status === 404 ? (<><div className='min-h-[70vh] grid place-items-center'>
                    <div className='flex flex-col gap-y-2'>
                        Ôi hỏng!
                        <Link className='underline text-sky-500' href={'/'}>Trở về trang chủ!</Link>
                    </div>
                </div></>) : (
                    <ul className='mt-4'>
                        {
                            data?.length > 0 ?
                            data?.map((item: any) => (
                                <li key={item?._id} >
                                    <Link href={`/san-pham/${item?._id}`} className='flex items-center rounded-lg 
                                p-1.5 hover:bg-gray-200 duration-200 gap-4 my-2'>
                                        <section className='rounded-full w-10 h-10 p-1'>
                                            {/* <Removal_background link_img={item?.category_img}/> */}
                                            <Image width={50} height={50} src={item?.category_img} className='w-10 h-10 mix-blend-darken' alt='Loading...' />
                                        </section>
                                        <span className='truncate text-sm font-light text-gray-700 mt-1 line-clamp-2 whitespace-normal'>{item?.category_name}</span>
                                    </Link>
                                </li>

                            )) :
                            <div className='py-10 text-center text-sm font-normal h-[310px]'>Trống!</div>
                        }
                    </ul>
                )}
            </aside>
        </Suspense>
    )
}

export default Category
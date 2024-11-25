import Image from 'next/image';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { list_Categories } from '@/src/app/_lib/Services/Services_Items/categories';
import Custome_Swiper from '@/src/app/_Components/Swipper/swiper';

const Category = async () => {
    noStore();
    const { data } = await list_Categories();
    return (
        <aside className='py-4 px-2 overflow-y-scroll hidden_scroll_y !sticky top-10 bg-white rounded-lg max-h-screen'>
            <span className="relative font-medium px-4 text-black">Danh mục</span>
            {data?.status === 404 ? (<><div className='min-h-[70vh] grid place-items-center'>
                <div className='flex flex-col gap-y-2'>
                    Ôi hỏng!
                    <Link className='underline text-sky-500' href={'/'}>Trở về trang chủ!</Link>
                </div>
            </div></>) : (
                <ul className='mt-4'>
                    {
                        data?.map((item: any) => (
                            <li key={item?._id} >
                                <Link href={`/san-pham/${item?._id}`} className='flex items-center rounded-lg 
                                p-1.5 hover:bg-gray-200 duration-200 gap-4 my-2'>
                                    <section className='rounded-full w-10 h-10 p-1 bg-[#efefef] overflow-hidden'>
                                        {/* <Removal_background link_img={item?.category_img}/> */}
                                        <Image width={50} height={50} src={item?.category_img} className='w-8 h-8 mix-blend-darken' alt='Loading...' />
                                    </section>
                                    <span className='truncate text-sm font-light text-gray-700 mt-1 line-clamp-2 whitespace-normal'>{item?.category_name}</span>
                                </Link>
                            </li>

                        ))
                    }
                </ul>
            )}
        </aside>

    )
}

export default Category
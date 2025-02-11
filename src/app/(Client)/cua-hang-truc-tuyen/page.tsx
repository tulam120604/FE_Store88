import Image from 'next/image';
import React from 'react';
import { infor_shop } from '../../_lib/Services/Services_Auth/Auth';
import { Button } from '../../_Components/ui/Shadcn/button';
import List_Products from '../../_Components/Products/List_Products';
import Loading_Dots from '../../_Components/Loadings/Loading_Dots';
import Paginate_item from '../san-pham/_component/Paginate';
import Link from 'next/link';
import Breadcrum from '../../_Components/breadcrum/breadcrum';
import { GET_item_by_seller } from '../../_lib/Services/Services_Items/Product';

export default async function Page({ searchParams }: any) {
  const data = await infor_shop(searchParams?.id);
  const data_item = await GET_item_by_seller(data?.data?._id);
  return (
    <div className='max-w-[1440px] mx-auto mb:w-[342px] md:w-[90vw] py-2'>
      {data?.status === 404 ? (<><div className='min-h-[70vh] grid place-items-center'>
        <div className='flex flex-col gap-y-2 max-w-[1440px]'>
          Ôi hỏng!
          <span>Có vẻ như đã có lỗi xảy ra :(( </span>
          <Link className='underline text-sky-500' href={'/'}>Trở về trang chủ!</Link>
        </div>
      </div></>)
        : (<>
          <div className='flex items-center text-sm gap-x-2 font-medium capitalize text-gray-700 mb-4'>
            <Breadcrum textProps={{
              name_item: `shop > ${data?.data?.user_name}`,
            }} />
          </div>
          {/* infor shop */}
          <div className='lg:flex gap-x-10'>
            {/* name shop */}
            <section className='w-[340px] rounded p-4 bg-gradient-to-r from-[#564F54] to-[#2C2F54] h-[120px] flex gap-x-5'>
              <Image className="rounded-full border-4 border-gray-500 w-[70px] h-[70px]" width={70} height={70} src={'/Images/avatar.jpg'} alt='Avatar' />
              <div className='flex flex-col gap-y-2'>
                <span className='text-gray-100 text-lg lg:text-xl'>{data?.data?.user_name}</span>
                <Button className='h-auto text-xs'>Theo dõi</Button>
              </div>
            </section>
            {/* 8888 */}
            <section className='flex flex-col gap-y-3 pt-2 text-sm *:flex *:items-center *:gap-x-2'>
              <span>Sản phẩm : <p className='text-red-500'>{data_item?.data?.totalDocs}</p></span>
              <span>Đánh giá : <p className='text-red-500'>4.8 (1000 đánh giá)</p></span>
            </section>
          </div>
          {/* items shop */}
          <div className='py-7'>
            <div className="mx-auto relative text-center mb-3 lg:mb-6">
              <strong className="relative z-[2] font-medium bg-[#F5F5FA] lg:text-xl px-4 mb:text-lg">SẢN PHẨM</strong>
              <div className="absolute w-full h-[1px] bg-gray-400 top-1/2 z-[1]"></div>
            </div>
            {
              data_item?.data?.docs ?
                Array.isArray(data_item?.data?.docs) &&
                <List_Products data={data_item?.data?.docs} /> :
                <Loading_Dots />
            }
            <div className="mx-auto py-6">
              {/* paginate page */}
              {
                data_item?.data?.totalPages > 1 &&
                <Paginate_item totalPages={data_item?.data?.totalPages} page={data_item?.data?.page} />
              }
            </div>
          </div>
        </>)}
    </div>
  )
}
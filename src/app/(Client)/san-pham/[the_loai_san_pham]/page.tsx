import { Suspense } from 'react';
import LoadingShops from './loading';
import { unstable_noStore as noStore } from 'next/cache';
import List_Products from '@/src/app/_Components/Products/List_Products';
import Paginate_item from '../_component/Paginate';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { GET_item_by_category } from '@/src/app/_lib/Services/Services_Items/Product';
import { GET_product_by_category } from '@/src/app/_lib/Services/Services_Items/Category';

const Page = async ({ searchParams }: any) => {
  noStore();
  const data = await GET_item_by_category(undefined, searchParams?.p);
  const detail_category = await GET_product_by_category(searchParams?.p);
  //  const isClient = typeof window !== 'undefined';
  //   console.log(isClient);
  return (
    <Suspense fallback={<LoadingShops />}>
      <div className="py-5 mx-auto max-w-[1440px] w-[95vw]">
        <div className="mx-auto relative text-center mb-6">
          <strong className="relative z-[2] font-medium bg-[#F5F5FA] lg:text-xl px-4 mb:text-lg">
            {detail_category ? detail_category?.category_name : ''}</strong>
          <div className="absolute w-full h-[1px] bg-gray-400 top-1/2 z-[1]"></div>
        </div>
        {/* product */}
        {
          data?.data?.docs ?
            Array.isArray(data?.data?.docs) &&
            <List_Products data={data?.data?.docs} /> :
            <Loading_Dots />
        }
        <div className="mx-auto py-6">
          {/* paginate page */}
          {
            data?.data?.totalPages > 1 &&
            <Paginate_item totalPages={data?.data?.totalPages} page={data?.data?.page} />
          }
        </div>
      </div>
    </Suspense>

  )
}

export default Page
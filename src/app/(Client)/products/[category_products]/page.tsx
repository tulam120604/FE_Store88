import { Suspense } from 'react';
import LoadingShops from './loading';
import { unstable_noStore as noStore } from 'next/cache';
import { detail_Categories } from '@/src/app/_lib/Services/Services_Items/categories';
import List_Products from '@/src/app/_Components/Products/List_Products';
import Paginate_item from '../_component/Paginate';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { GET_item_by_category } from '@/src/app/_lib/Services/Services_Items/products';

const Page = async ({ params }: any) => {
  noStore();
  const data = await GET_item_by_category('', params?.category_products);
  const detail_category = await detail_Categories(params?.category_products);

  //  const isClient = typeof window !== 'undefined';
  //   console.log(isClient);
  return (
    <Suspense fallback={<LoadingShops />}>
      <div className="py-10 mx-auto max-w-[1440px] md:w-[90vw] w-[342px]">
        <div className="mx-auto relative text-center mb-6">
          <strong className="relative z-[2] font-medium bg-[#F5F5FA] lg:text-xl px-4 mb:text-lg">{detail_category ? detail_category?.category_name : ''}</strong>
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
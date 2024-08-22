import { Suspense } from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import { getLimit_and_paginate } from '../../_lib/Services/Services_Items/products';
import LoadingShops from './_component/loading';
import List_Products from '../../_Components/Products/List_Products';
import Loading_Dots from '../../_Components/Loadings/Loading_Dots';
import Paginate_item from './_component/Paginate';

const Products = async ({ searchParams }: any) => {
  let page = searchParams._page ?? 1;
  noStore();
  const data = await getLimit_and_paginate(page, 30);
  //  const isClient = typeof window !== 'undefined';
  //   console.log(isClient);
  return (
    <Suspense fallback={<LoadingShops />}>
      <div className="py-10 mx-auto max-w-[1440px] md:w-[90vw] w-[342px]">
        <div className="mx-auto relative text-center mb-3 lg:mb-6">
          <strong className="relative z-[2] font-medium bg-[#F5F5FA] lg:text-xl px-4 mb:text-lg">Dành cho bạn</strong>
          <div className="absolute w-full h-[1px] bg-gray-400 top-1/2 z-[1]"></div>
        </div>
        {/* product */}
        {/* <Render_Products data={data}/> */}
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

export default Products
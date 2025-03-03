import { Suspense } from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import LoadingShops from './_component/loading';
import Loading_Dots from '../../_Components/Loadings/Loading_Dots';
import Paginate_item from './_component/Paginate';
import type { Metadata } from 'next';
import Breadcrum from '../../_Components/breadcrum/breadcrum';
import Menu_bar from './_component/Menubar';
import { list_product_client } from '../../_lib/Services/Services_Items/Product';
import List_Products from '../../_Components/Products/List_Products';

export const metadata: Metadata = {
  title: 'Sản phẩm'
}

const Products = async ({ searchParams }: any) => {
  let page = searchParams._page ?? 1;
  const bestSeller = searchParams._bestseller ?? '';
  noStore();
  const data = await list_product_client(page, 30, bestSeller);
  //  const isClient = typeof window !== 'undefined';
  //   console.log(isClient);
  return (
    <Suspense fallback={<LoadingShops />}>
      <div className="lg:pt-2 max-w-[1440px] mx-auto w-[95vw]">
        <section className='flex items-center text-sm gap-x-2 font-medium capitalize text-gray-700 mb-2'>
          <Breadcrum textProps={{
            bread_1: 'Sản phẩm',
          }} />
        </section>
        <div className="relative text-center mb-4 lg:mb-8 bg-white py-4 border-b-4 border-gray-700">
          <strong className="relative z-[2] text-[gray-800 font-medium lg:text-lg px-4">Danh sách sản phẩm</strong>
        </div>
        {/* menu */}
        <div className='!w-auto mb-4'>
          <Menu_bar />
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
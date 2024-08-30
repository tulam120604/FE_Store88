import Img_Detail_Product from './_components/Img_detail';
import Breadcrum from '@/src/app/_Components/breadcrum/breadcrum';
import { revalidatePath } from 'next/cache';
import Description from './_components/Description';
import Infor_seller from './_components/Infor_seller';
import { getDetail } from '../../_lib/Services/Services_Items/products';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { detail_Categories } from '../../_lib/Services/Services_Items/categories';
import Infor_Detail_Product from './_components/Infor_detail';
import Related_Product from './_components/Related_Product';
import { get_feedBack_in_item } from '../../_lib/Services/Service_Feedback/Feedback';

const page = async ({ params }: any) => {
  noStore();
  //  const isClient = typeof window !== 'undefined';
  // console.log(isClient);
  const data = await getDetail(params?.detail_product);
  const data_category = await detail_Categories(data?.category_id)
  revalidatePath('/products/[detail_product]', 'page');

  // get feedback
  const data_feedback = await get_feedBack_in_item(data?._id);

  return (
    <main className="max-w-[1440px] mx-auto w-[95vw] *:mx-auto *:h-full py-2">
      {data?.status === 404 ? (<><div className='min-h-[70vh] grid place-items-center'>
        <div className='flex flex-col gap-y-2 max-w-[1440px]'>
          Ôi hỏng!
          <span>Có vẻ như đã có lỗi xảy ra :(( </span>
          <Link className='underline text-sky-500' href={'/'}>Trở về trang chủ!</Link>
        </div>
      </div></>)
        : (<>
          <section className='flex items-center text-sm gap-x-2 font-medium capitalize text-gray-700 mb-4'>
            <Breadcrum textProps={{
              name_item: data?.short_name,
              name_category: data_category
            }} />
          </section>
          <section className="lg:grid lg:grid-cols-[573px_auto] gap-x-10 bg-white pb-4">
            {/*  desktop : left  , mobile : row 1 */}
            <Img_Detail_Product dataProps={data} />
            {/*desktop: right, mobile : row 2 */}
            <div>
              <Infor_Detail_Product dataProps={{
                data,
                data_feedback
              }} />
            </div>
          </section>
          <Infor_seller dataProps={data?.id_user_seller} />
          {/* related products */}
          <Description dataProps={{
                data,
                data_feedback
              }} />
          <div className="pt-4">
            <span className="lg:text-2xl text-xl mb-2">Sản phẩm liên quan</span>
            <Related_Product dataProps={data?.category_id} />
          </div>
        </>)}
    </main>


  )
}

export default page
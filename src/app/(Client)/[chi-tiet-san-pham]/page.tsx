import Anh_san_pham from "./_components/anh_san_pham";
import Breadcrum from "@/src/app/_Components/breadcrum/breadcrum";
// import { revalidatePath } from "next/cache";
import Mo_ta_san_pham from "./_components/mo_ta_san_pham";
import Thong_tin_cua_hang from "./_components/thong_tin_cua_hang";
import { view_detail_product } from "../../_lib/Services/Services_Items/Product";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import Thong_tin_san_pham from "./_components/thong_tin_san_pham";
import San_pham_lien_quan from "./_components/san_pham_lien_quan";
import { get_feedBack_in_item } from "../../_lib/Services/Service_Feedback/Feedback";
import type { Metadata } from "next";
import { view_detail_category } from "../../_lib/Services/Services_Items/Category";

export async function generateMetadata({
  searchParams,
}: any): Promise<Metadata> {
  const data = await view_detail_product(searchParams?.p);
  return {
    title: data?.short_name,
  };
}

const page = async ({ searchParams }: any) => {
  noStore();
  //  const isClient = typeof window !== 'undefined';
  // console.log(isClient);
  const data = await view_detail_product(searchParams?.p);
  // const data_category = await view_detail_category(data?.category_id);
  // revalidatePath("/products/[detail_product]", "page");

  // get feedback
  // const data_feedback = await get_feedBack_in_item(data?._id);

  return (
    <main className="max-w-[1440px] mx-auto w-[95vw] *:mx-auto *:h-full py-2">
      {data?.status === 404 ? (
        <>
          <div className="min-h-[70vh] grid place-items-center">
            <div className="flex flex-col gap-y-2 max-w-[1440px]">
              Ôi hỏng!
              <span>Đã có lỗi xảy ra!</span>
              <Link className="underline text-sky-500" href={"/"}>
                Trở về trang chủ!
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <section className="font-medium capitalize mb-4">
            <Breadcrum
              textProps={{
                // bread_1: data_category?.category_name,
                bread_2: data?.short_name,
              }}
            />
          </section>
          <section className="lg:grid lg:grid-cols-[573px_auto] gap-x-10 bg-gray-100 dark:bg-[#0F1629] pb-4 rounded-lg">
            {/*  desktop : left  , mobile : row 1 */}
            <Anh_san_pham dataProps={data} />
            {/*desktop: right, mobile : row 2 */}
            <div>
              <Thong_tin_san_pham
                dataProps={{
                  data,
                  // data_feedback,
                }}
              />
            </div>
          </section>
          <Thong_tin_cua_hang dataProps={data?.seller} />
          {/* related products */}
          {/* <Mo_ta_san_pham
            dataProps={{
              data,
              // data_feedback,
            }}
          /> */}
          <div className="mt-6 rounded-lg">
          <span className="opacity-80 antialiased tracking-[0.3px] text-xl 
          font-semibold mt-6 lg:mt-0">Sản phẩm liên quan</span>
            <San_pham_lien_quan
              dataProps={{
                id_category: data?.category_id,
                id_current_product: searchParams?.p,
              }}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default page;

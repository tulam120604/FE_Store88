import { Suspense } from "react";
import LoadingShops from "./loading";
import { unstable_noStore as noStore } from "next/cache";
import List_Products from "@/src/app/_Components/Products/List_Products";
import Paginate_item from "../_component/Paginate";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { list_product_by_category } from "@/src/app/_lib/Services/Services_Items/Product";
import { view_detail_category } from "@/src/app/_lib/Services/Services_Items/Category";
import Breadcrum from "@/src/app/_Components/breadcrum/breadcrum";

const Page = async ({ searchParams }: any) => {
  noStore();
  const data = await list_product_by_category(undefined, searchParams?.p);
  const detail_category = await view_detail_category(searchParams?.p);
  //  const isClient = typeof window !== 'undefined';
  //   console.log(isClient);
  return (
    <Suspense fallback={<LoadingShops />}>
      <div className="py-5 mx-auto max-w-[1440px] w-[95vw]">
        <Breadcrum
          textProps={{
            bread_1: "Sản phẩm",
            bread_2: detail_category?.category_name,
          }}
        />
        {/* product */}
        {data?.data?.docs ? (
          Array.isArray(data?.data?.docs) && (
            <List_Products data={data?.data?.docs} cols={6}/>
          )
        ) : (
          <Loading_Dots />
        )}
        <div className="mx-auto py-6">
          {/* paginate page */}
          {data?.data?.totalPages > 1 && (
            <Paginate_item
              totalPages={data?.data?.totalPages}
              page={data?.data?.page}
            />
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Page;

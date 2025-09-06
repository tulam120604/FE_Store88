import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import Loading_Dots from "../../_Components/Loadings/Loading_Dots";
import type { Metadata } from "next";
import Breadcrum from "../../_Components/breadcrum/breadcrum";
import {
  list_product_search,
} from "../../_lib/Services/Services_Items/Product";
import List_Products from "../../_Components/Products/List_Products";
import LoadingShops from "../san-pham/_component/loading";
import Menu_bar from "../san-pham/_component/Menubar";

export const metadata: Metadata = {
  title: "Sản phẩm",
};

const Page = async ({ searchParams }: any) => {
  let key_search = searchParams?.key ?? '';
  noStore();
    const data = await list_product_search(key_search);
  //  const isClient = typeof window !== 'undefined';
  //   console.log(isClient);
  return (
    <Suspense fallback={<LoadingShops />}>
      <div className="lg:pt-2 max-w-[1440px] mx-auto w-[95vw]">
        <section className="flex items-center text-sm gap-x-2 font-medium capitalize mb-2">
          <Breadcrum
            textProps={{
              bread_1: "Sản phẩm",
              bread_2: searchParams?.key,
            }}
          />
        </section>
        <div className="w-full justify-between">
          <div>
            {/* menu */}
            <div className="!w-auto mb-4">
              <Menu_bar />
            </div>
            {/* product */}
            {data ? (
              Array.isArray(data) && (
                <List_Products data={data} cols={6} />
              )
            ) : (
              <Loading_Dots />
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;

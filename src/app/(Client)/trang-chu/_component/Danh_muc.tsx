import { unstable_noStore as noStore } from "next/cache";
import { list_category } from "@/src/app/_lib/Services/Services_Items/Category";
import { Suspense } from "react";
import Loading_Skeleton from "@/src/app/_Components/Loadings/Loading_Skeleton";
import Custome_swiper_slide_category_product from "./Swiper_slide_category";
import ReloadPage from "@/src/app/_Components/Pages/ReloadPage";

const Category = async () => {
  noStore();
  const { data } = await list_category();
  return (
    <Suspense fallback={<Loading_Skeleton number_elements={1} />}>
      <aside className="py-4 px-2 overflow-y-scroll hidden_scroll_y !sticky top-4 bg-white rounded-lg max-h-screen">
        {data?.status === 404 ? (
          <>
            <div className="min-h-[100px] grid place-items-center">
              <ReloadPage/>
            </div>
          </>
        ) : (
          <>
            {data?.length > 0 ? (
              <Custome_swiper_slide_category_product
                propsData={{ data: data }}
              />
            ) : (
              <div className="py-4 text-center text-sm font-normal">
                Trống!
              </div>
            )}
          </>
        )}
      </aside>
    </Suspense>
  );
};

export default Category;

import { unstable_noStore as noStore } from "next/cache";
import { list_category } from "@/src/app/_lib/Services/Services_Items/Category";
import { Suspense } from "react";
import Loading_Skeleton from "@/src/app/_Components/Loadings/Loading_Skeleton";
import ReloadPage from "@/src/app/_Components/Pages/ReloadPage";
import Image from "next/image";
import Link from "next/link";
import { convert_Slug } from "@/src/app/util/Slug";

const Category = async () => {
  noStore();
  const { data } = await list_category();
  return (
    <Suspense fallback={<Loading_Skeleton number_elements={1} />}>
      <aside className="hidden lg:block max-h-1/3 py-6 border-b">
        <span className="antialiased text-xl font-semibold opacity-80">
          Danh mục gợi ý
        </span>
        {data?.status === 404 ? (
          <>
            <div className="min-h-[100px] grid place-items-center">
              <ReloadPage />
            </div>
          </>
        ) : (
          <div
            className="grid md:grid-cols-6 xl:grid-cols-9 gap-x-2 w-full max-w-[95vw] 
          *:border *:rounded-lg my-3 *:h-[150px] *:grid *:place-items-center *:cursor-pointer"
          >
            {data?.length > 0 ? (
              data?.map((item: any) => (
                <Link
                  key={item?._id}
                  className="text-sm duration-150
                 opacity-85 text-center hover:border-orange-600"
                  href={`/san-pham/${convert_Slug(
                    item?.category_name
                  )}.html?p=${item?._id}`}
                >
                  <Image
                    src={item?.category_img}
                    width={100}
                    height={100}
                    alt=""
                  />
                  <span>{item?.category_name}</span>
                </Link>
              ))
            ) : (
              <div className="py-4 text-center text-sm font-normal">Trống!</div>
            )}
          </div>
        )}
      </aside>
    </Suspense>
  );
};

export default Category;

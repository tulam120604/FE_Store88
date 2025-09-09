"use client";

import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { Suspense, useState } from "react";
import CategoryTable from "./_components/table_category";
import { Query_Category } from "@/src/app/_lib/Query_APIs/Items/Query";
import Form_add_category from "@/src/app/_Components/Forms/form_category";
import { CirclePlus } from "lucide-react";
import Loading_Overlay from "@/src/app/_Components/Loadings/Loading_Overlay";

const Page = () => {
  const { data, isLoading } = Query_Category();
  const [category_form, setCategory_form] = useState<boolean>(false);
  function handle_category() {
    setCategory_form(!category_form);
  }
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center">
          <Loading_Dots />
        </div>
      }
    >
      <div className="py-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <span className="text-lg font-extrabold opacity-90">Danh mục</span>
            <span className="text-gray-600 text-sm">
              Quản lý danh mục của sản phẩm trong cửa hàng
            </span>
          </div>

          {/* add category */}
          <div className="relative">
            <button
              onClick={handle_category}
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 
                transition-colors flex items-center"
            >
              <CirclePlus
                className="inline-block mr-1"
                strokeWidth={1.5}
                size={18}
              />
              Thêm
            </button>
            {category_form && (
              <div>
                <div
                  onClick={handle_category}
                  className="fixed w-[200%] h-[200%] bg-[#00000066] top-0 z-[6] left-0"
                />
                <Form_add_category setCategory_form={setCategory_form} />
              </div>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="*:bg-[#ECF1F2] *:dark:bg-[#020517] min-h-[50vh] grid place-content-center">
          <Loading_Dots />
        </div>
      ) : (
        <>
          {data?.data ? (
            <CategoryTable data={data?.data} />
          ) : (
            <section className="h-[70vh] grid place-content-center text-center text-sm">
              Không có dữ liệu!
            </section>
          )}
        </>
      )}
    </Suspense>
  );
};

export default Page;

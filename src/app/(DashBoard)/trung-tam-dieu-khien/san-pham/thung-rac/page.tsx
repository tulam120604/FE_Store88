/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { Query_Recycle_Items_Admin } from "@/src/app/_lib/Query_APIs/Items/Query";
import { Mutation_Items } from "@/src/app/_lib/Query_APIs/Items/Mutation_product";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import Data_Table from "../_component/Data_Table";
import Loading_Overlay from "@/src/app/_Components/Loadings/Loading_Overlay";
import Pagination_Component from "../_component/Pagination";

const Page = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isFetching } = Query_Recycle_Items_Admin(page, 0);
  const { on_Submit, isLoading: loading_restore } = Mutation_Items({
    action: "RESTORE_OR_DESTROY",
  });
  function handle_Restore_or_Destroy(
    idItem?: string | number,
    action?: string
  ) {
    const item = {
      id_item: idItem,
      action_mutation: action,
    };
    on_Submit(item);
  }

  const isLoadingOverlayVisible = isLoading || isFetching || loading_restore;

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center">
          <Loading_Dots />
        </div>
      }
    >
      <div className="flex flex-col gap-y-6 pb-6 rounded">
        <div className="flex items-center justify-between gap-x-20 py-4">
          <span className="text-gray-700 lg:text-xl">
            Danh sách sản phẩm đã xóa
          </span>
          <Link
            href={"/adminstrations/products/list"}
            className="*:w-[25px] *:h-[30px] text-gray-900 hover:underline hover:text-sky-500 cursor-pointer"
          >
            Quay lại
          </Link>
        </div>
        {isLoadingOverlayVisible ? (
          <Loading_Overlay />
        ) : data?.data.length > 0 ? (
          <>
            <div className="bg-white border rounded-lg px-4">
              <Data_Table
                dataProps={{
                  dataTable: data?.data,
                  handle_Restore_or_Destroy,
                  action: "recycle",
                }}
              />
            </div>
            {data?.totalPages > 1 && (
              <div className="text-gray-100">
                <Pagination_Component
                  totalPages={data?.totalPages}
                  currentPage={data?.currentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="grid place-content-center h-[70vh]">
            <span className="text-gray-900">Thùng rác trống!</span>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Page;

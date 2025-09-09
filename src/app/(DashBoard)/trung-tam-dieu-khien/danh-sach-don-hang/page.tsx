"use client";

import { List_Order_Dashboard } from "@/src/app/_lib/Query_APIs/Order/Query";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import React, { Suspense } from "react";
import Loading from "./loading";
import Paginate_item from "@/src/app/(Client)/san-pham/_component/Paginate";
import OrderTable from "./_components/Order_table";

const Page = () => {
  const { data, isLoading } = List_Order_Dashboard();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center">
          <Loading_Dots />
        </div>
      }
    >
      <div className="flex flex-col gap-y-6 py-4 rounded">
         <div className="flex flex-col gap-y-1">
              <span className="text-lg font-extrabold opacity-90">
                Danh sách đơn hàng
              </span>
              <span className="opacity-70 text-sm">
                Quản lý đơn hàng của bạn
              </span>
            </div>
        <div>
          {data?.data_order ? (
            <>
              <div className="bg-white dark:bg-[#0F1629] rounded px-4 mb-4  *:dark:text-gray-300">
                <OrderTable data={data?.data_order?.docs}/>
              </div>
              <Paginate_item
                totalPages={data?.data_order?.totalPages}
                page={data?.data_order?.page}
              />
            </>
          ) : (
            <span className="border-none">không thể xác minh danh tính</span>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Page;

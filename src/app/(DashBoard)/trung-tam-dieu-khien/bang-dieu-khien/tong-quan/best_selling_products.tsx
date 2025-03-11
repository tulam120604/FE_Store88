"use client";

import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { Query_List_Items_Dashboard } from "@/src/app/_lib/Query_APIs/Items/Query";
import React, { useState } from "react";
import Data_Table from "../../san-pham/_component/Data_Table";

export default function Best_selling_products() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isFetching } = Query_List_Items_Dashboard(page, 20);
  const is_Loading = isLoading || isFetching;

  //   sắp xếp giảm dần theo doanh thu
  const data_products = data?.data?.docs ?? [];
  for (let i = 0; i < data_products?.length - 1; i++) {
    for (let j = 0; j < data_products?.length - 1; j++) {
      if (
        data_products[j]?.sale_quantity < data_products[j + 1]?.sale_quantity
      ) {
        let temp = data_products[j];
        data_products[j] = data_products[j + 1];
        data_products[j + 1] = temp;
      }
    }
  }

  return (
    <div className="p-4 bg-white border rounded-lg my-4">
      {is_Loading ? (
        <Loading_Dots />
      ) : (
        <div>
          <span>Top sản phẩm bán chạy</span>
          <div className="bg-white rounded-lg border px-4">
            <Data_Table
              dataProps={{ dataTable: data_products, operation: false }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

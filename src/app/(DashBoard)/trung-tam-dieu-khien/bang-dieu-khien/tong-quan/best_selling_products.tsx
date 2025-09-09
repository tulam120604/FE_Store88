"use client";

import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { Query_List_Items_Dashboard } from "@/src/app/_lib/Query_APIs/Items/Query";
import React, { useState } from "react";
import ProductTable from "../../san-pham/_components/product_table";

export default function Best_selling_products() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = Query_List_Items_Dashboard(page, 20);

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
    <div className="bg-white dark:bg-[#0F1629] border rounded-lg my-4">
      {isLoading ? (
        <Loading_Dots />
      ) : (
        <div className="space-y-4">
          <div className="p-4 ">Top sản phẩm bán chạy</div>
          <div className="bg-white dark:bg-[#0F1629]">
            <ProductTable
              dataProps={{ dataTable: data_products, operation: false }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { Suspense } from "react";
import {
  Container,
  List,
  Receipt,
  UserCheck,
  UsersRound,
  Box as Box_icon,
} from "lucide-react";
import Box from "../_component/box";
import { ChartData } from "../_component/Chart";
import Top_seller from "../_component/top_seller";
import {
  Query_caculate_revenue,
  Query_summary,
} from "@/src/app/_lib/Query_APIs/Analytics/Query";
import Best_selling_products from "./best_selling_products";
import { useAuthStore } from "@/src/app/_lib/Zustand/Store";
import Loading_Overlay from "@/src/app/_Components/Loadings/Loading_Overlay";

export default function Page() {
  const { data: data_caculate_revenue, isLoading: loading_caculate_revenue } =
    Query_caculate_revenue();
  const { data: infor_user, isLoading: loading_infor_user } = useAuthStore();
  const { data: data_summary, isLoading: loading_summary } = Query_summary();
  const total_revenue =
    data_caculate_revenue?.data?.reduce(
      (total: any, current: any) => total + current?.totalAmount,
      0
    ) ?? 0;
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center">
          <Loading_Overlay />
        </div>
      }
    >
      <div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 *:p-6 *:rounded-xl 
      *:shadow-lg gap-4 my-6 *:bg-white *:dark:bg-[#0F1629]"
      >
        <Box
          dataProps={{
            text: "Tổng doanh thu",
            number: loading_caculate_revenue
              ? 0
              : `${total_revenue?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}`,
            icon: <Receipt strokeWidth="2" stroke="#2563EB" color="#F7FAFC" />,
          }}
        />
        <Box
          dataProps={{
            text: "Tổng mặt hàng",
            number: loading_summary ? 0 : data_summary?.data?.productCount,
            icon: <Box_icon strokeWidth="2" stroke="#2563EB" />,
          }}
        />
        <Box
          dataProps={{
            text: "Tổng danh mục",
            number: loading_summary ? 0 : data_summary?.data?.categoryCount,
            icon: <List strokeWidth="2" stroke="#2563EB" />,
          }}
        />
        <Box
          dataProps={{
            text: "Tổng đơn hàng",
            number: loading_summary ? 0 : data_summary?.data?.orderCount,
            icon: <Container strokeWidth="1.5" stroke="#2563EB" />,
          }}
        />
        <Box
          dataProps={{
            text: "Tổng người dùng",
            number: loading_summary ? 0 : data_summary?.data?.userCount,
            icon: <UsersRound strokeWidth="2" stroke="#2563EB" />,
          }}
        />
        {["admin_global", "admin_local"].includes(infor_user?.role) && (
          <Box
            dataProps={{
              text: "Đối tác bán hàng",
              number: loading_summary ? 0 : data_summary?.data?.sellerCount,
              icon: <UserCheck strokeWidth="2" stroke="#2563EB" />,
            }}
          />
        )}
      </div>
      {/* chart */}
      {loading_infor_user ? (
        <div className="grid place-items-center min-h-screen">
          <Loading_Overlay />
        </div>
      ) : ["admin_global", "admin_local"].includes(infor_user?.role) ? (
        <div className="2xl:grid grid-cols-[60%_39%] min-h-[25vh] space-y-4 xl:space-y-0 
        justify-between *:border *:bg-white *:dark:bg-[#0F1629]">
          <ChartData />
          <Top_seller
            dataProps={data_caculate_revenue?.data}
            loading={loading_caculate_revenue}
          />
        </div>
      ) : (
        <div className="*:border">
          <ChartData />
        </div>
      )}
      {/* best selling products */}
      <Best_selling_products />
    </Suspense>
  );
}

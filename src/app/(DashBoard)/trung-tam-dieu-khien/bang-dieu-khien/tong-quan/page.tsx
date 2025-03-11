"use client";

import { Suspense } from "react";
import {
  DollarSign,
  List,
  SquareGanttChart,
  UserCheck,
  UsersRound,
} from "lucide-react";
import {
  Query_Category,
  Query_List_Items_Dashboard,
} from "@/src/app/_lib/Query_APIs/Items/Query";
import {
  Infor_user,
  List_Account,
} from "@/src/app/_lib/Query_APIs/Auth/Query_Auth";
import Box from "../_component/box";
import { ChartData } from "../_component/Chart";
import Top_seller from "../_component/top_seller";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { Query_caculate_revenue } from "@/src/app/_lib/Query_APIs/Analytics/Query";
import Best_selling_products from "./best_selling_products";

export default function Page() {
  const { data, isLoading } = Query_List_Items_Dashboard(1, 1);
  const { data: data_caculate_revenue, isLoading: loading_caculate_revenue } =
    Query_caculate_revenue();
  const { data: infor_user, isLoading: loading_infor_user } = Infor_user();
  const { data: account, isLoading: loading_data_account } = List_Account();
  const { data: category, isLoading: loading_data_category } = Query_Category();
  const total_revenue =
    data_caculate_revenue?.data?.reduce(
      (total: any, current: any) => total + current?.totalAmount,
      0
    ) ?? 0;
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center">
          <Loading_Dots />
        </div>
      }
    >
      <div className="grid lg:grid-cols-4 grid-cols-3 *:p-6 *:rounded-xl *:shadow-lg gap-4 my-6 *:bg-white">
        <Box
          dataProps={{
            text: "Tổng doanh thu",
            number: loading_caculate_revenue
              ? 0
              : `${total_revenue?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}`,
            icon: <DollarSign strokeWidth="3" stroke="#2563EB" />,
          }}
        />
        <Box
          dataProps={{
            text: "Tổng mặt hàng",
            number: isLoading ? 0 : data?.data?.totalDocs,
            icon: <SquareGanttChart strokeWidth="2" stroke="#2563EB" />,
          }}
        />
        <Box
          dataProps={{
            text: "Danh mục",
            number: loading_data_category ? 0 : category?.data?.length,
            icon: <List strokeWidth="2" stroke="#2563EB" />,
          }}
        />
        <Box
          dataProps={{
            text: "Tổng người dùng",
            number: loading_data_account ? 0 : account?.data?.totalDocs,
            icon: <UsersRound strokeWidth="2" stroke="#2563EB" />,
          }}
        />
        {["admin_global", "admin_local"].includes(infor_user?.data?.role) && (
          <Box
            dataProps={{
              text: "Đối tác bán hàng",
              number: loading_data_account
                ? 0
                : Array.isArray(account?.account_seller) &&
                  account?.account_seller?.length,
              icon: <UserCheck strokeWidth="2" stroke="#2563EB" />,
            }}
          />
        )}
      </div>
      {/* chart */}
      {loading_infor_user ? (
        <div className="grid place-items-center">
          <Loading_Dots />
        </div>
      ) : ["admin_global", "admin_local"].includes(infor_user?.data?.role) ? (
        <div className="grid lg:grid-cols-[60%_39%] justify-between *:border">
          <ChartData />
          <Top_seller dataProps={data_caculate_revenue?.data} />
        </div>
      ) : (
        <div className=" *:border">
          <ChartData />
        </div>
      )}
      {/* best selling products */}
      <Best_selling_products/>
    </Suspense>
  );
}

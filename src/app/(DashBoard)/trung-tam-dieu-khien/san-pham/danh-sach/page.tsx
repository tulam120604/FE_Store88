/* eslint-disable @next/next/no-img-element */
"use client";

import { Suspense, useEffect } from "react";
import { Query_List_Items_Dashboard } from "@/src/app/_lib/Query_APIs/Items/Query";
import { Mutation_Items } from "@/src/app/_lib/Query_APIs/Items/Mutation_product";
import { useSearchParams } from "next/navigation";
import { io } from "socket.io-client";
import Loading_Overlay from "@/src/app/_Components/Loadings/Loading_Overlay";
import { useAuthStore } from "@/src/app/_lib/Zustand/Store";
import Link from "next/link";
import { CirclePlus, EyeOff } from "lucide-react";
import { message } from "@/src/app/_Components/ui/message";
import ProductTable from "../_components/product_table";
import Pagination_Component from "../_components/Pagination";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";

const Page = () => {
  // const socket = io("http://localhost:8888");
  let id_user;
  const { data: user } = useAuthStore();
  const searchParams = useSearchParams();
  const role_user = ["admin_global", "admin_local"];
  let page = Math.max(1, Number(searchParams.get("_page")) || 1);
  if (!role_user.includes(user?.role)) {
    if (user?.role === "seller") {
      id_user = user?._id;
    }
  }
  const { data, isLoading } = Query_List_Items_Dashboard(page, 20);
  const { mutateAsync, isLoading: loading_remove } = Mutation_Items({
    action: "HIDDEN_OR_RESTORE",
  });
  // close socket
  // useEffect(() => {
  //   socket.on("connect_error", () => {
  //     socket.disconnect();
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [socket]);

  async function handle_toggle_item(idItem?: {
    id_item: string;
    path: string;
    method: string;
  }) {
    const item = {
      refeshToken: "token",
      id_item: idItem?.id_item,
      path: idItem?.path,
      method: idItem?.method,
    };
    const result: any = await mutateAsync(item);
    message.success(result?.message);
    // socket.emit("send_message_delete_item", idItem);
  }
  const isLoadingOverlayVisible = isLoading || loading_remove;
  // render items and attributes
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center">
          <Loading_Overlay />
        </div>
      }
    >
      <div className="flex flex-col gap-y-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <span className="text-lg font-extrabold opacity-90">
              Danh sách sản phẩm
            </span>
            <span className="opacity-70 text-sm">Quản lý sản phẩm của bạn</span>
          </div>

          {/* add item */}
          <Link
            href={"/trung-tam-dieu-khien/san-pham/them-moi-san-pham"}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 
                transition-colors flex items-center"
          >
            <CirclePlus
              className="inline-block mr-1"
              strokeWidth={1.5}
              size={18}
            />
            Thêm
          </Link>
        </div>

        {isLoadingOverlayVisible ? (
          <div className="*:bg-[#ECF1F2] *:dark:bg-[#020517] min-h-[50vh] grid place-content-center">
            <Loading_Dots />
          </div>
        ) : data?.data?.totalDocs > 0 ? (
          <div className="rounded-lg border">
            <ProductTable
              dataProps={{
                dataTable: data?.data?.docs,
                handle_toggle_item,
                action: "list_products",
                operation: true,
              }}
            />
          </div>
        ) : (
          <section className="h-[70vh] grid place-content-center text-center text-sm">
            Không có dữ liệu!
          </section>
        )}
        {data?.data?.totalPages > 1 && (
          <div className="text-gray-100">
            <Pagination_Component
              totalPages={data?.data?.totalPages}
              currentPage={data?.data?.page}
            />
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Page;

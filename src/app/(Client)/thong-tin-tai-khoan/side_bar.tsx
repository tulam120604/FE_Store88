"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Suspense } from "react";
import Swal from "sweetalert2";
import { useToast } from "@/src/app/_Components/ui/use-toast";
import Bell_component from "../../_Components/Notification/Bell_component";
import { Box, Heart, LogOut, User } from "lucide-react";
import { Mutation_Auth } from "../../_lib/Query_APIs/Auth/Auth_mutation";
import { eventEmit } from "../../_Components/ui/Header/Event_emit";
import Loading_Skeleton from "../../_Components/Loadings/Loading_Skeleton";
import Loading_Overlay from "../../_Components/Loadings/Loading_Overlay";

const Side_bar = () => {
  const routing = useRouter();
  const { toast } = useToast();
  const mutation_auth = Mutation_Auth({
    action: "LOGOUT",
  });
  const pathName = usePathname();
  function log_out() {
    Swal.fire({
      title: "Xác nhận đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        toast({
          title: "Đã đăng xuất",
          className:
            "w-[200px] bg-gray-100 fixed right-0 bottom-0 text-gray-900 h-10",
          duration: 800,
        });
        localStorage.removeItem("account");
        eventEmit.emit("log_out", true);
        mutation_auth.onSubmit("");
        eventEmit.emit("logout");
        routing.push("/");
      }
    });
  }

  return (
    <Suspense fallback={<Loading_Skeleton number_elements={1} />}>
      {mutation_auth?.isLoading && <Loading_Overlay />}
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-y-2 overflow-hidden *:rounded *:px-4 *:py-3 *:duration-200 *:text-sm p-2">
          <Link
            href={"/thong-tin-tai-khoan/thong-tin"}
            className={`${
              pathName === "/thong-tin-tai-khoan/thong-tin" ||
              pathName === "/thong-tin-tai-khoan/dang-ki-ban-hang"
                ? "font-medium flex items-center gap-x-4 bg-[#6F8BFC] text-gray-100"
                : "hover:bg-[#6F8BFC] hover:text-gray-100 text-sm font-medium flex items-center gap-x-4 text-gray-700"
            } `}
          >
            <User className="!w-5" />
            <span className="hidden lg:block">Thông tin tài khoản</span>
          </Link>
          <Link
            href={"/thong-tin-tai-khoan/thong-bao"}
            className={`${
              pathName === "/thong-tin-tai-khoan/thong-bao"
                ? "font-medium flex items-center gap-x-4 bg-[#6F8BFC] text-gray-100"
                : "hover:bg-[#6F8BFC] hover:text-gray-100 font-medium flex items-center gap-x-4 text-gray-700"
            } `}
          >
            <div className="relative *:!text-gray-800">
              <Bell_component />
            </div>
            <span className="hidden lg:block">Thông báo</span>
          </Link>
          <Link
            href={"/thong-tin-tai-khoan/san-pham-yeu-thich"}
            className={`${
              pathName === "/thong-tin-tai-khoan/san-pham-yeu-thich"
                ? "font-medium flex items-center gap-x-4 bg-[#6F8BFC] text-gray-100"
                : "hover:bg-[#6F8BFC] hover:text-gray-100 font-medium flex items-center gap-x-4 text-gray-700"
            } `}
          >
            <Heart />
            <span className="hidden lg:block">Yêu thích</span>
          </Link>
          <Link
            href={"/thong-tin-tai-khoan/don-hang"}
            className={`${
              pathName === "/thong-tin-tai-khoan/don-hang"
                ? "font-medium flex items-center gap-x-4 bg-[#6F8BFC] text-gray-100"
                : "hover:bg-[#6F8BFC] hover:text-gray-100 font-medium flex items-center gap-x-4 text-gray-700"
            } `}
          >
            <Box />
            <span className="hidden lg:block">Đơn hàng</span>
          </Link>
          <button
            onClick={log_out}
            className="hover:bg-[#6F8BFC] px-4 py-3 text-sm font-medium text-gray-700 
            hover:text-gray-100 flex items-center gap-x-4"
          >
            <LogOut strokeWidth={1.8} className="h-5 rotate-180" />
            <span className="hidden lg:block">Đăng xuất</span>
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default Side_bar;

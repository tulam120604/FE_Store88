"use client";

import React from "react";
import { useStoreStatusItemOrder } from "@/src/app/Zustand/Store";
import {
  Ambulance,
  FileCog,
  Gift,
  MessageCircleMore,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useToast } from "@/src/app/_Components/ui/use-toast";
import { eventEmit } from "@/src/app/_Components/ui/Header/Event_emit";
import { Mutation_Auth } from "@/src/app/_lib/Query_APIs/Auth/Auth_mutation";
import Loading_Overlay from "@/src/app/_Components/Loadings/Loading_Overlay";
import Image from "next/image";

export default function Page_infor_mobile({ data_user }: any) {
  const { setStatus } = useStoreStatusItemOrder();
  const router = useRouter();
  function handleRedirectPage(status: number, path: string) {
    setStatus(status);
    router.push(path);
  }
  const routing = useRouter();
  const { toast } = useToast();
  const mutation_auth = Mutation_Auth({
    action: "LOGOUT",
  });
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
    <>
      {/* name account */}
      {mutation_auth?.isLoading && <Loading_Overlay />}
      <div className="flex gap-4 text-gray-800 items-center relative">
        <div className="rounded-full *:rounded-full bg-slate-200 w-12 h-12 grid place-content-center">
          <Image src={data_user?.data?.avatar} width={48} height={48} alt=""/>
        </div>
        <div className="flex flex-col gap-2">
          <span>{data_user?.data?.user_name}</span>
          <span className="text-xs bg-slate-100 rounded-lg py-0.5 text-center text-[#0A68FF]">
            {data_user?.data?.role === "seller"
              ? "Nhà phân phối"
              : data_user?.data?.role === "user"
              ? "Thành viên"
              : "Quản lý"}
          </span>
        </div>
        <button
          onClick={log_out}
          className="duration-200 px-4 py-3 text-sm font-medium text-gray-700 flex items-center gap-x-1 
                absolute right-[-5%] top-[-10%]"
        >
          <span>Đăng xuất</span>
        </button>
      </div>

      {/* menu item order */}
      <div className="mt-4 pt-4">
        <div className="flex justify-between">
          <span className="text-sm">Đơn mua</span>
          <Link
            href={"/thong-tin-tai-khoan/don-hang"}
            className="text-xs text-gray-600"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="flex justify-between mt-5 *:flex *:flex-col *:gap-1 text-[10px] text-gray-600 *:items-center *:relative">
          <button
            onClick={() =>
              handleRedirectPage(1, "/thong-tin-tai-khoan/don-hang")
            }
          >
            <FileCog />
            <span>Chờ xác nhận</span>
            <div className="absolute w-2 h-2 rounded-full bg-red-500 right-1/4 animate-ping" />
            <div className="absolute w-2 h-2 rounded-full bg-red-500 right-1/4" />
          </button>
          <button
            onClick={() =>
              handleRedirectPage(2, "/thong-tin-tai-khoan/don-hang")
            }
          >
            <Gift />
            <span>Chờ lấy hàng</span>
            <div className="absolute w-2 h-2 rounded-full bg-red-500 right-1/4 animate-ping" />
            <div className="absolute w-2 h-2 rounded-full bg-red-500 right-1/4" />
          </button>
          <button
            onClick={() =>
              handleRedirectPage(4, "/thong-tin-tai-khoan/don-hang")
            }
          >
            <Ambulance />
            <span>Chờ giao hàng</span>
            <div className="absolute w-2 h-2 rounded-full bg-red-500 right-1/4 animate-ping" />
            <div className="absolute w-2 h-2 rounded-full bg-red-500 right-1/4" />
          </button>
          <button
            onClick={() =>
              handleRedirectPage(5, "/thong-tin-tai-khoan/don-hang")
            }
          >
            <MessageCircleMore />
            <span>Đánh giá</span>
            <div className="absolute w-2 h-2 rounded-full bg-red-500 right-1/4 animate-ping" />
            <div className="absolute w-2 h-2 rounded-full bg-red-500 right-1/4" />
          </button>
        </div>
      </div>
    </>
  );
}

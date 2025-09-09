"use client";

import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "@/src/app/_Components/ui/Shadcn/button";
import Address_component from "../_components/address";
import List_address_user from "./list_address";
import Page_infor_mobile from "./page.infor.mobile";
import Avatar_account from "./avatar";
import Phone_account from "./phone";
import { useAuthStore } from "@/src/app/_lib/Zustand/Store";
import { eventEmit } from "@/src/app/_Components/ui/header/Event_emit";

const Page_infor = () => {
  const form_create_address = useRef<HTMLDivElement>(null);
  const bg_form_create_address = useRef<HTMLDivElement>(null);
  const { data: data_user, isLoading: loading_user } = useAuthStore();
  // console.log(data_user)
  // address
  function handle_Show_Form_Create_Address() {
    form_create_address?.current?.classList?.remove("left-3/4");
    form_create_address?.current?.classList?.add("left-1/2", "scale-100");
    bg_form_create_address?.current?.classList?.remove("hidden");
    bg_form_create_address?.current?.classList?.add("block");
  }
  function handle_Close_Form_Create_Address() {
    form_create_address?.current?.classList?.add("left-3/4", "scale-0");
    form_create_address?.current?.classList?.remove("left-1/2", "scale-100");
    bg_form_create_address?.current?.classList?.add("hidden");
    bg_form_create_address?.current?.classList?.remove("block");
  }

  useEffect(() => {
    eventEmit.on("close_form_create_address", () => {
      handle_Close_Form_Create_Address();
    });
  }, []);

  return (
    <div className="w-full py-4 lg:py-8 bg-gray-100 dark:bg-[#0F1629] rounded">
      {loading_user ? (
        <div className="w-full min-h-[40vh] lg:min-h-[70vh] grid place-content-center">
          <Loading_Dots />
        </div>
      ) : (
        <>
          {/* desktop */}
          <div className="hidden lg:flex justify-between px-6">
            <div className="flex flex-col gap-y-1 pb-4 w-full">
              <span className="lg:text-xl">Hồ sơ của tôi</span>
              <span className="text-sm">
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </span>
            </div>
            {data_user?.role === "seller" ? (
              <Link
                className="lg:text-sm text-xs underline whitespace-nowrap"
                href={"/trung-tam-dieu-khien/bang-dieu-khien/tong-quan"}
              >
                Đi đến kho phân phối
              </Link>
            ) : (
              <Link
                className="lg:text-sm text-xs underline whitespace-nowrap"
                href={"/trung-tam-dieu-khien/bang-dieu-khien/tong-quan"}
              >
                Trung tâm điều khiển
              </Link>
            )}
          </div>
          <div className="hidden lg:grid grid-cols-[65%_30%] justify-between py-10 border-y px-6">
            {/* thong tin */}
            <div className="w-full grid grid-cols-[40%_55%] gap-4 mx-auto">
              <span className="font-light">Tên hiển thị</span>
              <div className="w-full border py-1 lg:py-2 px-4 rounded">
                {data_user && data_user?.user_name}
              </div>
              {/* email */}
              <span className="font-light">Email</span>
              <div className="w-full lg:py-2 py-1 tracking-[1px] underline">
                {data_user?.email?.slice(0, 2) +
                  "*****" +
                  data_user?.email?.slice(7)}
              </div>
              {/* sdt */}
              <span className="font-light">Số điện thoại</span>
              <Phone_account data_user={data_user} />
            </div>
            {/* avatar */}
            <Avatar_account data_user={data_user} />
          </div>

          {/* mobile */}
          <div className="lg:hidden px-6">
            <Page_infor_mobile data_user={data_user} />
          </div>
          {/* --- */}
          <section className="flex items-center justify-between my-5 py-5 px-6">
            <span className="lg:text-xl text-sm">Địa chỉ</span>
            <Button
              className="lg:text-sm text-xs px-2 lg:py-2 py-1.5 h-auto bg-[#597BFE] hover:bg-[#6f8bfc]"
              onClick={handle_Show_Form_Create_Address}
            >
              Thêm địa chỉ +
            </Button>
          </section>
          <div
            ref={form_create_address}
            className="fixed -translate-x-1/2 -translate-y-1/2 scale-0 duration-200 top-1/2 left-3/4 z-[11]"
          >
            <Address_component id_user={data_user?._id} />
          </div>
          <div
            onClick={handle_Close_Form_Create_Address}
            ref={bg_form_create_address}
            className="fixed hidden w-screen h-screen top-0 left-0 z-[10] bg-[#33333388]"
          />
          <List_address_user />
        </>
      )}
    </div>
  );
};

export default Page_infor;

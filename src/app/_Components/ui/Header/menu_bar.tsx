"use client";

import { BellRing, CircleUser, Grip, Heart, House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Catalog_product_mobile from "./Catalog_product_mobile";

export default function Menu_bar_mobile({ dataProps }: any) {
  const [popup_catalog_product, setPopup_catalog_product] =
    useState<boolean>(false);

  function handle_popup_catalog_product(status: boolean) {
    setPopup_catalog_product(status);
  }

  const pathName = usePathname();
  return (
    <div className="bg-gray-100 dark:bg-[#0F1629]">
      <div
        className="w-[95vw] mx-auto flex justify-between *:flex *:items-center 
        *:flex-col *:gap-y-1 *:text-xs py-2 border-t z-[2]"
      >
        <Link
          href={"/"}
          className={
            pathName === "/" && !popup_catalog_product
              ? "text-sky-500"
              : "text-gray-700 dark:text-gray-200"
          }
          onClick={() => handle_popup_catalog_product(false)}
        >
          <House size={18} />
          <span>Trang chủ</span>
        </Link>

        <button
          className={`${
            popup_catalog_product ? "text-sky-500" : "text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => handle_popup_catalog_product(!popup_catalog_product)}
        >
          <Grip size={18} />
          <span>Danh mục</span>
        </button>

        <Link
          href={
            dataProps?.account
              ? "/thong-tin-tai-khoan/san-pham-yeu-thich"
              : "/dang-nhap"
          }
          className={
            pathName === "/thong-tin-tai-khoan/san-pham-yeu-thich" &&
            !popup_catalog_product
              ? "text-sky-500"
              : "text-gray-700 dark:text-gray-200"
          }
          onClick={() => handle_popup_catalog_product(false)}
        >
          <Heart size={18} />
          <span>Yêu thích</span>
        </Link>

        <Link
          href={
            dataProps?.account ? "/thong-tin-tai-khoan/thong-bao" : "/dang-nhap"
          }
          className={
            pathName === "/thong-tin-tai-khoan/thong-bao" &&
            !popup_catalog_product
              ? "text-sky-500"
              : "text-gray-700 dark:text-gray-200"
          }
          onClick={() => handle_popup_catalog_product(false)}
        >
          <BellRing size={18} />
          <span>Thông báo</span>
        </Link>

        <Link
          href={
            dataProps?.account ? "/thong-tin-tai-khoan/thong-tin" : "/dang-nhap"
          }
          className={
            pathName === "/thong-tin-tai-khoan/thong-tin" &&
            !popup_catalog_product
              ? "text-sky-500"
              : "text-gray-700 dark:text-gray-200"
          }
          onClick={() => handle_popup_catalog_product(false)}
        >
          <CircleUser size={18} />
          <span>Tài khoản</span>
        </Link>

        {/* catalog product mobile */}
        <Catalog_product_mobile
          propsData={{
            handle_popup_catalog_product: handle_popup_catalog_product,
            popup_catalog_product: popup_catalog_product,
          }}
        />
      </div>
    </div>
  );
}

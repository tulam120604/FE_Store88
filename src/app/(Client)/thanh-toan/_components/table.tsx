"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Het_hang from "../../gio-hang/_components/het_hang";
import { convert_Slug } from "@/src/app/util/Slug";

export default function Table_item({ dataProps }: any) {
  // Định nghĩa cột desktop
  const COLS = "minmax(320px,1fr) 160px 120px 160px" as const;

  if (!Array.isArray(dataProps) || dataProps.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* ===== Header desktop ===== */}
      <div className="hidden lg:block overflow-x-auto">
        <div
          className="grid bg-gray-100 dark:bg-[#0F1629] p-4 rounded-lg font-semibold opacity-80 min-w-[760px]"
          style={{ gridTemplateColumns: COLS }}
        >
          <span>Sản phẩm</span>
          <span className="text-center">Đơn giá</span>
          <span className="text-center">Số lượng</span>
          <span className="text-center">Thành tiền</span>
        </div>

        {/* ===== Body desktop ===== */}
        {dataProps.map((item: any) => {
          const product = item?.product_id;
          const productUrl = `/${convert_Slug(product?.short_name)}.html?p=${product?._id}`;

          return (
            <div
              key={item._id}
              className="relative grid items-center bg-gray-100 dark:bg-[#0F1629] mt-3 p-4 rounded-lg min-w-[760px]"
              style={{ gridTemplateColumns: COLS }}
            >
              <Het_hang dataProps={item} />

              {/* Col 1: Sản phẩm */}
              <div className="flex gap-4">
                <Link href={productUrl}>
                  <Image
                    width={120}
                    height={120}
                    className="bg-[#f2f2f2] rounded w-[100px] h-[100px] object-cover"
                    src={product?.gallery?.[0]}
                    alt={product?.short_name || "product"}
                  />
                </Link>
                <div className="flex flex-col gap-2">
                  <Link
                    href={productUrl}
                    className="line-clamp-2 font-medium"
                  >
                    {product?.short_name}
                  </Link>
                  {item?.name_varriant && (
                    <div className="text-xs text-gray-600">
                      Phân loại: {item?.name_varriant}
                      {item?.value_varriant && ` - ${item?.value_varriant}`}
                    </div>
                  )}
                </div>
              </div>

              {/* Col 2: Đơn giá */}
              <div className="text-center text-red-600 font-medium">
                {item?.price_item?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>

              {/* Col 3: Số lượng */}
              <div className="text-center">
                x{item?.quantity}
              </div>

              {/* Col 4: Thành tiền */}
              <div className="text-center text-red-600 font-semibold">
                {item?.total_price_item?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Mobile card layout ===== */}
      <div className="lg:hidden space-y-3">
        {dataProps.map((item: any) => {
          const product = item?.product_id;
          const productUrl = `/${convert_Slug(product?.short_name)}.html?p=${product?._id}`;

          return (
            <div
              key={item._id}
              className="relative bg-gray-100 dark:bg-[#0F1629] rounded-lg p-3 flex flex-col gap-3"
            >
              <Het_hang dataProps={item} />

              <div className="flex gap-3">
                <Link href={productUrl}>
                  <Image
                    width={84}
                    height={84}
                    className="bg-gray-100 dark:bg-[#0F1629] rounded w-20 h-20 object-cover"
                    src={product?.gallery?.[0]}
                    alt={product?.short_name || "product"}
                  />
                </Link>
                <div className="flex-1 flex flex-col gap-2">
                  <Link
                    href={productUrl}
                    className="font-medium line-clamp-2"
                  >
                    {product?.short_name}
                  </Link>
                  {item?.name_varriant && (
                    <div className="text-xs text-gray-600">
                      Phân loại: {item?.name_varriant}
                      {item?.value_varriant && ` - ${item?.value_varriant}`}
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-red-600 font-medium">
                      {item?.price_item?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <span>x{item?.quantity}</span>
                  </div>
                  <div className="text-right text-red-600 font-semibold">
                    {item?.total_price_item?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

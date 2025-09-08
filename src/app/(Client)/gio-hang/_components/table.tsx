"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Checkbox } from "@/src/app/_Components/ui/Shadcn/checkbox";
import Btn_dow from "./btn_dow";
import Btn_up from "./btn_up";
import Remove_Item_Cart from "./remove";
import Het_hang from "./het_hang";
import { convert_Slug } from "@/src/app/util/Slug";
import { Store } from "lucide-react";

type Item = any;

export default function Table_Cart({ dataProps }: any) {
  const items: Item[] = dataProps?.data?.items ?? [];
  const allChecked =
    (dataProps?.data_item_checkked?.length || 0) === items.length &&
    items.length > 0;

  // Dùng cùng 1 cấu hình cột cho header + từng hàng để đảm bảo KHÔNG LỆCH
  const COLS =
    "40px 120px minmax(260px,1fr) 140px 150px 150px 100px" as const;

  return (
    <div className="w-full">
      {/* ====== Desktop (>=lg) dạng bảng ====== */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-[980px]">
          {/* Header */}
          <div
            className="grid items-center p-4 opacity-90 font-semibold border-b bg-gray-100 dark:bg-[#0F1629] rounded-t"
            style={{ gridTemplateColumns: COLS }}
          >
            <Checkbox checked={allChecked} />
            <span>Hình ảnh</span>
            <span>Sản phẩm</span>
            <span>Đơn giá</span>
            <span>Số lượng</span>
            <span>Tạm tính</span>
            <span className="text-center">Thao tác</span>
          </div>

          {/* Body */}
          {items.length > 0 ? (
            items.map((item) => {
              const product = item?.product_id;
              const productUrl = `/${convert_Slug(product?.short_name)}.html?p=${product?._id}`;

              return (
                <div
                  key={item?._id}
                  className="relative grid items-center mt-3 py-4 px-2 text-sm border-b"
                  style={{ gridTemplateColumns: COLS }}
                >
                  <Het_hang dataProps={item} />

                  {/* Col 1: Check */}
                    <Checkbox
                      checked={!!item?.status_checked}
                      onClick={() =>
                        dataProps?.handle_Checkked(
                          product,
                          item?.name_varriant,
                          item?.value_varriant
                        )
                      }
                    />

                  {/* Col 2: Ảnh */}
                  <Link href={productUrl} className="flex justify-center">
                    <Image
                      width={120}
                      height={120}
                      src={product?.gallery?.[0]}
                      alt={product?.short_name || "product"}
                      className="rounded w-[100px] h-[100px] object-cover"
                    />
                  </Link>

                  {/* Col 3: Thông tin sản phẩm */}
                  <div className="flex flex-col gap-2 pr-2">
                    <Link href={productUrl} className="font-medium line-clamp-2">
                      {product?.short_name}
                    </Link>

                    {item?.name_varriant && (
                      <div className="text-xs text-gray-600">
                        Phân loại:{" "}
                        <span>
                          {item?.name_varriant}
                          {item?.value_varriant && ` - ${item?.value_varriant}`}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-3 items-center opacity-80 text-xs">
                      {product?.seller?.user_name && (
                        <span className="truncate">{product?.seller?.user_name}</span>
                      )}
                      {product?.seller?._id && (
                        <Link
                          href={`cua-hang-truc-tuyen?id=${product?.seller?._id}`}
                          className="flex items-center gap-1 underline"
                        >
                          <Store className="h-4" />
                          Ghé thăm
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Col 4: Đơn giá */}
                  <div className="font-medium text-red-600">
                    {item?.price_item?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>

                  {/* Col 5: Số lượng */}
                  <div className="w-[140px] grid grid-cols-3 gap-1 items-center">
                    <Btn_dow
                      id_props={{
                        id_item: product?._id,
                        quantity_item: item?.quantity,
                        attribute: item?.name_varriant,
                        value_variant: item?.value_varriant,
                        name_item: product?.short_name,
                      }}
                    />
                    <strong className="border py-2 border-gray-300 grid place-items-center rounded">
                      {item?.quantity}
                    </strong>
                    <Btn_up id_props={{ item }} />
                  </div>

                  {/* Col 6: Tạm tính */}
                  <div className="font-medium text-red-600">
                    {item?.total_price_item?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>

                  {/* Col 7: Thao tác */}
                  <div className="flex justify-center">
                    <Remove_Item_Cart id_props={{ item: item?._id }} />
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>

      {/* ====== Mobile (<lg) dạng card ====== */}
      <div className="lg:hidden space-y-3 *:bg-gray-100 *:dark:bg-[#0F1629]">
        {items.length > 0 ? (
          items.map((item) => {
            const product = item?.product_id;
            const productUrl = `/${convert_Slug(product?.short_name)}.html?p=${product?._id}`;

            return (
              <div
                key={item?._id}
                className="relative rounded-lg p-3 flex gap-3"
              >
                <Het_hang dataProps={item} />

                  <Checkbox
                    checked={!!item?.status_checked}
                    className="translate-y-8 !bg-transparent !text-green-500 !font-bold !rounded-full !w-6 !h-6"
                    onClick={() =>
                      dataProps?.handle_Checkked(
                        product,
                        item?.name_varriant,
                        item?.value_varriant
                      )
                    }
                  />
                  <Link href={productUrl}>
                    <Image
                      width={84}
                      height={84}
                      src={product?.gallery?.[0]}
                      alt={product?.short_name || "product"}
                      className="rounded w-20 h-20 object-cover"
                    />
                  </Link>

                <div className="flex-1 min-w-0 flex flex-col gap-2">
                  <Link href={productUrl} className="font-medium line-clamp-1">
                    {product?.short_name}
                  </Link>

                  {item?.name_varriant && (
                    <div className="text-xs text-gray-600">
                      Phân loại:{" "}
                      <span>
                        {item?.name_varriant}
                        {item?.value_varriant && ` - ${item?.value_varriant}`}
                      </span>
                    </div>
                  )}

                  <div className="text-xs text-red-600 font-medium">
                    {item?.price_item?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <div className="w-[120px] grid grid-cols-3 gap-1 items-center">
                      <Btn_dow
                        id_props={{
                          id_item: product?._id,
                          quantity_item: item?.quantity,
                          attribute: item?.name_varriant,
                          value_variant: item?.value_varriant,
                          name_item: product?.short_name,
                        }}
                      />
                      <strong className="border py-2 border-gray-300 grid place-items-center rounded">
                        {item?.quantity}
                      </strong>
                      <Btn_up id_props={{ item }} />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                      <div className="text-[13px] opacity-70">Tạm tính</div>
                      <div className="text-red-600 font-semibold">
                        {item?.total_price_item?.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    <Remove_Item_Cart id_props={{ item: item?._id }} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="grid place-items-center py-10">
      <div className="flex flex-col items-center gap-y-6">
        <Image
          width={100}
          height={100}
          src="/Images/document_icon.png"
          alt="empty-cart"
        />
        <span className="text-gray-700">
          Không có sản phẩm nào trong giỏ hàng{" "}
          <Link className="underline" href={"/san-pham"}>
            ! Mua ngay
          </Link>
        </span>
      </div>
    </div>
  );
}

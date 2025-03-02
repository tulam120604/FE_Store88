"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Het_hang from "../../gio-hang/_components/het_hang";
import { convert_Slug } from "@/src/app/util/Slug";

export default function Table_item({ dataProps }: any) {
  return (
    <div>
      {/* header table*/}
      <div className="hidden lg:block ">
        <div className="flex justify-between bg-white p-4 rounded-lg ">
          {/* image and name product */}
          <div className="lg:w-[700px]">
            <span>Sản phẩm</span>
            {/* 88 */}
            <span></span>
          </div>
          {/* price and quantity */}
          <div className="lg:w-[calc(100%-710px)] grid grid-cols-3 text-center">
            {/* 88 */}
            <span>Đơn giá</span>
            {/* 88 */}
            <span>Số lượng</span>
            {/* 88 */}
            <span>Thành tiền</span>
          </div>
        </div>
      </div>
      {/* body table */}
      {typeof dataProps == "object" && (
        <>
          {dataProps.length > 0 && (
            <>
              {dataProps?.map((item: any) => {
                return (
                  <div
                    className="flex flex-col lg:flex-row p-4 rounded-lg gap-y-4 bg-white lg:my-4 justify-between items-center relative"
                    key={item._id}
                  >
                    <Het_hang dataProps={item} />
                    {/* 88 */}
                    {/* image and name product */}
                    <div className="flex lg:w-[700px] gap-x-4 *:max-h-[150px]">
                      <Link
                        href={`/${convert_Slug(
                          item?.product_id?.short_name
                        )}.html?p=${item?.product_id?._id}`}>
                        <Image
                          width={150}
                          height={150}
                          className="bg-[#f2f2f2f2] max-w-[140px] max-h-[140px]"
                          src={item?.product_id?.gallery[0]}
                          alt="loading..."
                        />
                      </Link>
                      {/* 88 */}
                      <div className="flex flex-col gap-y-2 py-4">
                        <div className="flex flex-col gap-y-2 md:text-base mb:text-xs">
                          <Link
                            href={`/${convert_Slug(
                              item?.product_id?.short_name
                            )}.html?p=${item?.product_id?._id}`}
                            className="line-clamp-2">
                            {item?.product_id?.short_name}
                          </Link>
                        </div>
                        {/* 88 */}
                        <div className="flex flex-col gap-y-2 md:text-base mb:text-xs w-full">
                          {item?.name_varriant && (
                            <>
                              <span className="text-sm mb-1">Phân loại :</span>
                              <div className="flex text-gray-700">
                                <span className="text-xs">
                                  {item?.name_varriant}
                                </span>
                                {item?.value_varriant && " - "}
                                <span className="text-xs">
                                  {item?.value_varriant}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* price and quantity */}
                    <div className="grid grid-cols-3 lg:w-[calc(100%-710px)] w-full items-center text-center">
                      <span className="md:text-base mb:text-xs text-red-600">
                        {item?.price_item?.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      {/* 88 */}
                      <div className="*:text-gray-900 gap-x-1 *:md:text-base *:mb:text-xs">
                        <span className="ml-8">x{item?.quantity}</span>
                      </div>
                      {/* 88 */}
                      <span className="md:text-base mb:text-xs text-red-600">
                        {item?.total_price_item?.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}

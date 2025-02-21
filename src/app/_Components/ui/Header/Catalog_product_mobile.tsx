"use client";

import { Query_Category } from "@/src/app/_lib/Query_APIs/Items/Query";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Loading_Dots from "../../Loadings/Loading_Dots";
import { usePathname } from "next/navigation";
import { convert_Slug } from "@/src/app/util/Slug";

export default function Catalog_product_mobile({ propsData }: any) {
  const { popup_catalog_product, handle_popup_catalog_product } = propsData;
  const { data, isLoading, isError } = Query_Category();
  const pathName = usePathname();
  function reload_page() {
    window.location.reload();
  }
  return (
    <>
      {popup_catalog_product && (
        <button
          className="bg-[#33333366] h-full z-[-1] w-full fixed top-0 left-0"
          onClick={() => handle_popup_catalog_product(false)}
        />
      )}
      <div
        className={`${
          popup_catalog_product
            ? "translate-y-0 bottom-14"
            : "translate-y-full -bottom-10"
        } bg-white w-screen max-h-[90vh] border rounded-t-xl 
      text-center px-2 duration-300 fixed left-0`}
      >
        <section className="py-4 w-screen relative">
          <span className="text-lg text-gray-700">Danh mục sản phẩm</span>
          <button
            className="absolute right-6"
            onClick={() => handle_popup_catalog_product(false)}
          >
            <X />
          </button>
        </section>

        {/* list category product */}
        {isError ? (
          <div className="grid place-content-center h-[50vh] gap-y-2">
            <span>Lỗi, vui lòng tải lại trang! </span>
            <button onClick={reload_page}>Tải lại</button>
          </div>
        ) : isLoading ? (
          <div className="grid place-content-center h-[50vh]">
            <Loading_Dots />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 mt-4 overflow-y-auto py-4 w-full">
            {data?.data?.length > 0 ? (
              data?.data?.map((item: any) => (
                <Link
                  key={item?._id}
                  href={`/san-pham/${convert_Slug(
                    item?.category_name
                  )}.html?p=${item?._id}`}
                  onClick={() => handle_popup_catalog_product(false)}
                  className="flex flex-col items-center rounded-lg hover:bg-gray-200 duration-200 gap-2"
                >
                  <Image
                    width={100}
                    height={100}
                    src={item?.category_img}
                    className="w-16 h-[85px] mix-blend-darken"
                    alt="Loading..."
                  />
                  <span className="text-xs !font-light text-gray-700 line-clamp-2 whitespace-normal">
                    {item?.category_name}
                  </span>
                </Link>
              ))
            ) : (
              <div className="py-10 text-center text-sm font-normal h-[310px]">
                Trống!
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

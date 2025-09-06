"use client";

import Breadcrum from "@/src/app/_Components/breadcrum/breadcrum";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import List_Products from "@/src/app/_Components/Products/List_Products";
import { List_favorites } from "@/src/app/_lib/Query_APIs/Favorites/Query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page_favorite = () => {
  const { data, isLoading, isError } = List_favorites();
  return (
    <div>
      <div className="lg:block">
        <Breadcrum
          textProps={{
            bread_1: "Thông tin tài khoản",
            bread_2: "Sản phẩm yêu thích",
          }}
        />
      </div>
      {isError ? (
        <>
          <div className="grid place-items-center">
            <div className="flex flex-col gap-y-2">
              <span>Đã có lỗi xảy ra!</span>
              <Link className="underline text-sky-500" href={"/"}>
                Trở về trang chủ!
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          {isLoading ? (
            <Loading_Dots />
          ) : data?.data?.docs < 1 || !data?.data?.docs ? (
            <div className="grid place-items-center h-[60vh] px-6 py-4 lg:py-8 rounded bg-gray-100 dark:bg-[#0F1629]">
              <div className="flex flex-col items-center gap-y-6 my-auto">
                <Image
                  width={100}
                  height={100}
                  src="/Images/document_icon.png"
                  alt="store88"
                />
                <span className="flex items-center gap-x-1 text-gray-700 font-light">
                  Chưa có sản phẩm yêu thích!
                  <Link className="underline" href={"/san-pham"}>
                    Tìm ngay
                  </Link>
                </span>
              </div>
            </div>
          ) : (
            <div className="*:lg:grid-cols-5">
              <List_Products data={data?.data?.docs} cols={6}/>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page_favorite;

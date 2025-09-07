"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Suspense } from "react";
import Bell_component from "../../_Components/Notification/Bell_component";
import { Box, Heart, User } from "lucide-react";
import Loading_Skeleton from "../../_Components/Loadings/Loading_Skeleton";

const Side_bar = () => {
  const pathName = usePathname();

  return (
    <Suspense fallback={<Loading_Skeleton number_elements={1} />}>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-y-2 overflow-hidden *:rounded *:px-4 *:py-3 *:duration-200 *:text-sm p-2">
          <Link
            href={"/thong-tin-tai-khoan/thong-tin"}
            className={`${
              pathName === "/thong-tin-tai-khoan/thong-tin" ||
              pathName === "/thong-tin-tai-khoan/dang-ki-ban-hang"
                ? "font-medium flex items-center gap-x-4 text-[#6F8BFC]"
                : "hover:text-[#6F8BFC] text-sm font-medium flex items-center gap-x-4 opacity-80"
            } `}
          >
            <User className="!w-5" />
            <span className="hidden lg:block">Thông tin tài khoản</span>
          </Link>
          <Link
            href={"/thong-tin-tai-khoan/thong-bao"}
            className={`${
              pathName === "/thong-tin-tai-khoan/thong-bao"
                ? "font-medium flex items-center gap-x-4 text-[#6F8BFC]"
                : "hover:text-[#6F8BFC] font-medium flex items-center gap-x-4 opacity-80"
            } `}
          >
            <Bell_component />
            <span className="hidden lg:block">Thông báo</span>
          </Link>
          <Link
            href={"/thong-tin-tai-khoan/san-pham-yeu-thich"}
            className={`${
              pathName === "/thong-tin-tai-khoan/san-pham-yeu-thich"
                ? "font-medium flex items-center gap-x-4 text-[#6F8BFC]"
                : "hover:text-[#6F8BFC] font-medium flex items-center gap-x-4 opacity-80"
            } `}
          >
            <Heart />
            <span className="hidden lg:block">Yêu thích</span>
          </Link>
          <Link
            href={"/thong-tin-tai-khoan/don-hang"}
            className={`${
              pathName === "/thong-tin-tai-khoan/don-hang"
                ? "font-medium flex items-center gap-x-4 text-[#6F8BFC]"
                : "hover:text-[#6F8BFC] font-medium flex items-center gap-x-4 opacity-80"
            } `}
          >
            <Box />
            <span className="hidden lg:block">Đơn hàng</span>
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default Side_bar;

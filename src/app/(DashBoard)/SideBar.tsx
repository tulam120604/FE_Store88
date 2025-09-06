/* eslint-disable @next/next/no-img-element */
"use client";

import {
  BaggageClaim,
  Box,
  ChevronDown,
  Contact,
  Grid2x2Check,
  LayoutGrid,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loading_Dots from "../_Components/Loadings/Loading_Dots";
import { useAuthStore } from "../_lib/Zustand/Store";
import Image from "next/image";

const SideBarDashboard = () => {
  const { data: data_user, isLoading: loading_user } = useAuthStore();
  if (loading_user) {
    <Loading_Dots />;
  }
  const usePathName = usePathname();

  let arr = [
    {
      icon: <LayoutGrid strokeWidth={1.8} className="h-5" />,
      name: "Bảng điều khiển",
      pathName: "/trung-tam-dieu-khien/bang-dieu-khien/tong-quan",
    },
    {
      icon: <Box strokeWidth={1.8} className="h-5" />,
      name: "Sản phẩm",
      pathName: "/trung-tam-dieu-khien/san-pham",
    },
    {
      icon: <Grid2x2Check strokeWidth={1.8} className="h-5" />,
      name: "Danh mục",
      pathName: "/trung-tam-dieu-khien/danh-muc-san-pham",
    },
    {
      icon: <BaggageClaim strokeWidth={1.8} className="h-5" />,
      name: "Đơn hàng",
      pathName: "/trung-tam-dieu-khien/danh-sach-don-hang",
    },
    {
      icon: <Contact strokeWidth={1.8} className="h-5" />,
      name: "Khách hàng",
      pathName: "/trung-tam-dieu-khien/danh-sach-tai-khoan",
    },

    {
      icon: <Settings strokeWidth={1.8} className="h-5" />,
      name: "Cài đặt",
      pathName: "/trung-tam-dieu-khien/cai-dat",
    },
  ];
  if (data_user?.role === "seller") {
    arr = arr.filter((_: any, index: number) => ![2, 5].includes(index));
  }
  return (
    <div className="fixed top-0 border-2 h-full w-[200px] z-40 ">
      <Link
        href={"/"}
        className="!flex !items-center justify-center px-4 xl:h-14 h-10 border-b-2"
      >
        <Image
          width={50}
          height={50}
          className="w-10"
          src={
            "https://res.cloudinary.com/tulam120604/image/upload/v1745568585/by1qzllthq4ypulyfrey.png"
          }
          alt="Store88"
        />
        <span className="mt-2 text-2xl font-semibold opacity-80 font-serif">
          Store88
        </span>
      </Link>
      <div
        className="*:relative flex flex-col gap-y-1 *:items-center 
      *:whitespace-nowrap font-regular mt-4 px-2"
      >
        {arr?.map((item: any) => {
          const isActive = usePathName.startsWith(item?.pathName);
          return (
            <Link
              key={item?.pathName}
              href={item?.pathName}
              className={`${
                isActive ? "bg-white dark:bg-[#8440ED]" : "hover:bg-white dark:hover:bg-[#8440ED]"
              }  px-4  py-2.5 p-1.5 rounded-xl flex gap-2 opacity-80`}
            >
              {item?.icon}
              <span className="text-sm">{item?.name}</span>
            </Link>
          );
        })}
        {/* <Link
          href={"/"}
          className="flex gap-x-2 lg:px-4 lg:py-2.5 p-1.5 rounded 
          hover:bg-[#6F8BFC] hover:text-gray-200"
        >
          <LogOut strokeWidth={1.8} className="h-5 rotate-180" />
          <span className="hidden  block text-sm">Thoát</span>
        </Link> */}
      </div>
    </div>
  );
};

export default SideBarDashboard;

"use client";

import { List_Account } from "@/src/app/_lib/Query_APIs/Auth/Query_Auth";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { DataTable } from "@/src/app/_Components/ui/Tables/data_table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";
import { Auth_Provider } from "../_Auth_Wrapper/Page";
import Paginate_item from "@/src/app/(Client)/san-pham/_component/Paginate";

const CustomersAdmin = () => {
  const { data, isLoading } = List_Account();

  if (isLoading) {
    return <Loading />;
  }

  const columns: ColumnDef<any>[] = [
    {
      cell: ({ row }) => (
        <>
          <Image
            className="rounded-full"
            width={50}
            height={50}
            src={
              row?.original?.avatar
                ? row?.original?.avatar
                : "/Images/default-user.png"
            }
            alt="Loading..."
          ></Image>
        </>
      ),
      header: "Ảnh đại diện",
    },
    {
      accessorKey: "user_name",
      header: "Tên tài khoản",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      cell: ({ row }) => (
        <span>
          {row?.original?.phone
            ? "(+84) " + row?.original?.phone.slice(1, 10)
            : "Trống"}
        </span>
      ),
      header: "Số điện thoại",
    },
    {
      cell: ({ row }) => (
        <span>
          {row?.original?.role === "admin_global"
            ? "Quản lí"
            : row?.original?.role === "admin_local"
            ? "Nhân viên"
            : row?.original?.role === "seller"
            ? "Người bán"
            : "Người dùng"}
        </span>
      ),
      header: "Vai trò",
    },
    {
      cell: ({ row }) => console.log(row?.original),
      header: "Thao tác",
    },
  ];
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center">
          <Loading_Dots />
        </div>
      }
    >
      <Auth_Provider>
        <div className="flex flex-col gap-y-6 py-4 rounded text-gray-700">
          <span className="lg:text-xl">Danh sách tài khoản</span>
          {data?.data && (
            <>
              <div className="bg-white rounded-lg px-4">
                <DataTable data={data?.data?.docs} columns={columns} />
              </div>
              <div className="text-gray-100">
                <Paginate_item
                  totalPages={data?.data?.totalPages}
                  page={data?.data?.page}
                />
              </div>
            </>
          )}
        </div>
      </Auth_Provider>
    </Suspense>
  );
};

export default CustomersAdmin;

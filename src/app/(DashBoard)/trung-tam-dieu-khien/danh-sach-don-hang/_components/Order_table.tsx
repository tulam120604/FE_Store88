"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function status_order(item: any) {
  switch (+item) {
    case 1:
      return <span className="!text-yellow-500">Chờ xác nhận</span>;
    case 2:
      return (
        <span className="flex items-center text-green-500">
          <CircleCheck className="h-4" />
          Đã xác nhận
        </span>
      );
    case 3:
      return <span className="!text-sky-500">Đang chuẩn bị hàng</span>;
    case 4:
      return <span className="!text-sky-500">Đang vận chuyển</span>;
    case 5:
      return (
        <span className="flex items-center text-sky-500">
          <CircleCheck className="h-4" />
          Giao thành công
        </span>
      );
    case 6:
      return <span className="text-red-500">ĐÃ HỦY</span>;
    default:
      return;
  }
}

export default function OrderTable({ data }: any) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead className="border-b">
          <tr className="text-left">
            <th className="p-2">Đơn hàng</th>
            {/* Ẩn header này trên mobile */}
            <th className="p-2 hidden lg:table-cell">Thông tin</th>
            <th className="p-2 hidden lg:table-cell">Trạng thái</th>
            <th className="lg:p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr key={row?._id} className="border-b">
              {/* Cột Đơn hàng */}
              <td className="p-2 align-top">
                {row?.items_order?.map((item: any) => (
                  <div
                    key={item?.product_id._id}
                    className="flex items-center gap-x-3 mb-2"
                  >
                    <Image
                      src={item?.product_id.gallery[0]}
                      alt={item?.product_id.short_name}
                      width={60}
                      height={60}
                      className="rounded border"
                    />
                    <div className="flex flex-col gap-y-1">
                      <Link
                        href={`/trung-tam-dieu-khien/danh-sach-don-hang/chi-tiet-don-hang?id=${row._id}`}
                        className="line-clamp-1 max-w-[200px]"
                      >
                        {item?.product_id?.short_name}
                      </Link>
                      <div className="flex gap-x-2 text-xs">
                        <span className="text-red-500">
                          {item?.price_item?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                        <span>x{item?.quantity}</span>
                        <span className="text-red-500">
                          {item?.total_price_item?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </td>

              {/* Cột Thông tin (ẩn mobile) */}
              <td className="p-2 align-top hidden lg:table-cell">
                <div className="flex flex-col gap-y-1">
                  <span>Mã đơn: {row?.code_order}</span>
                  <span>Người đặt: {row?.infor_user?.name_user}</span>
                  <span>Ngày đặt: {row?.date_time?.slice(0, 10)}</span>
                </div>
              </td>

              {/* Cột Trạng thái (ẩn mobile) */}
              <td className="p-2 align-top hidden lg:table-cell">
                <span className="text-sky-500">
                  {status_order(row?.status_item_order)}
                </span>
              </td>

              {/* Cột Thao tác */}
              <td className="p-2 align-top">
                <Link
                  href={`/trung-tam-dieu-khien/danh-sach-don-hang/chi-tiet-don-hang?id=${row?._id}`}
                  className="text-sky-500 underline hover:text-sky-600"
                >
                  Chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

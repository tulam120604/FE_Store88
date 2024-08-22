"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"


export const columns: ColumnDef<any>[] = [
  {
    cell: ({ row }) => (
      <Link href={'/' + row?.original?.product_id?._id}>
        <Image width={100} height={100} loading="lazy" className="w-[100px] h-[100px] border" src={row?.original?.product_id?.gallery[0]} alt="Loading..." />
      </Link>),
    header: "Ảnh",
  },
  {
    cell: ({ row }) => (
      <Link href={'/' + row?.original?.product_id?._id} className="max-w-[300px] flex flex-col gap-y-3">
        <span className="line-clamp-2">{row?.original?.product_id.short_name}</span>
        {
          (row?.original?.color_item || row?.original?.size_attribute_item) &&
          <span className="text-sm">Phân loại : {row?.original?.color_item} - {row?.original?.size_attribute_item}</span>
        }
      </Link>
    ),
    header: "Tên sản phẩm",
  },
  {
    cell: ({ row }) => (
      <span className="text-red-600">{row?.original?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
    ),
    header: "Đơn giá",
  },
  {
    cell: ({ row }) => (
      <div className="text-center">{row?.original?.quantity}</div>
    ),
    header: "Số lượng",
  },
  {
    cell: ({ row }) => (
      <span className="text-red-600">{row?.original?.total_price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
    ),
    header: "Thành tiền",
  },
]
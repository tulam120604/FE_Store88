"use client";

import Image from "next/image";
import { FilePenLine } from "lucide-react";
import { Button } from "@/src/app/_Components/ui/Shadcn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/app/_Components/ui/Shadcn/table";

export default function CategoryTable({ data }: any) {
  return (
    <Table className="rounded border bg-white dark:bg-[#0F1629] overflow-hidden">
      <TableHeader>
        <TableRow className="*:font-semibold opacity-90 *:border-none">
          <TableHead>Ảnh</TableHead>
          <TableHead>Tên danh mục</TableHead>
          <TableHead>Số sản phẩm</TableHead>
          {/* <TableHead>Trạng thái</TableHead> */}
          <TableHead className="hidden lg:block">Ngày tạo/cập nhật</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item: any, idx: number) => (
          <TableRow key={idx} className="*:border-gray-200 *:dark:border-gray-700">
            <TableCell>
              <div>
                <Image
                  className="w-12 h-12 relative overflow-hidden object-cover"
                  src={item?.category_img}
                  alt={item?.name}
                  height={60}
                  width={60}
                />
              </div>
            </TableCell>
            <TableCell className="font-medium">{item?.category_name}</TableCell>
            <TableCell>{item?.countProduct}</TableCell>
            {/* <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {item.status}
              </span>
            </TableCell> */}
            <TableCell className="hidden lg:block">{item.updatedAt?.slice(0, 10)}</TableCell>
            <TableCell className="flex justify-end gap-2 *:border-none">
              <Button size="icon" variant="outline">
                <FilePenLine className="h-5 text-gray-700" />
              </Button>
              {/* <Button size="icon" variant="destructive">
                <Trash2 className="w-4 h-4" />
              </Button> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

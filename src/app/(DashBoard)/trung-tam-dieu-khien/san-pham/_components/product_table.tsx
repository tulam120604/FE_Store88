import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/src/app/_Components/ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/app/_Components/ui/dialog/alert-dialog";
import {
  ArchiveRestore,
  ChevronUp,
  Eye,
  EyeOff,
  FilePenLine,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductTable({ dataProps }: any) {
  return (
    <div className="overflow-x-auto rounded border bg-white dark:bg-[#0F1629]">
      {/* header */}
      <div
        className={`grid grid-cols-9 md:grid-cols-10 opacity-85 font-semibold border-b 
        gap-2 items-center p-3 text-xs md:text-sm`}
      >
        {!dataProps?.operation && <span className="hidden md:block">#</span>}
        <span className="text-start">Ảnh</span>
        <span className="text-start col-span-2">Tên</span>
        <span className="hidden sm:block">Thể loại</span>
        <span className="hidden sm:block">Doanh số</span>
        <span className="hidden md:block">Giá</span>
        <span className="hidden lg:block">Số lượng</span>
        <span className="hidden xl:block">Xuất xứ</span>
        <span>Trạng thái</span>
        {dataProps?.operation && <span className="text-center">Thao tác</span>}
      </div>

      {/* rows */}
      {dataProps?.dataTable?.map((data: any, i: number) => (
        <div
          key={data?._id}
          className="flex flex-col border-b last:border-none"
        >
          {/* main row */}
          <div
            className={`grid grid-cols-9 md:grid-cols-10 opacity-85 text-xs md:text-sm 
            gap-2 items-center p-3 transition`}
          >
            {!dataProps?.operation && (
              <span className="hidden md:block">{i + 1}</span>
            )}

            {/* image */}
            <div>
              {data?.deleted ? (
                <Image
                  width={50}
                  height={50}
                  src={data?.gallery[0]}
                  alt="..."
                />
              ) : (
                <Link href={`/trung-tam-dieu-khien/san-pham/${data?._id}`}>
                  <Image
                    width={50}
                    height={50}
                    src={data?.gallery[0]}
                    alt="..."
                  />
                </Link>
              )}
            </div>

            {/* name */}
            {data?.deleted ? (
              <span className="col-span-2 line-clamp-2 text-start">
                {data?.short_name}
              </span>
            ) : (
              <Link
                href={`/trung-tam-dieu-khien/san-pham/${data?._id}`}
                className="col-span-2 line-clamp-2 text-start font-medium hover:text-blue-600"
              >
                {data?.short_name}
              </Link>
            )}

            {/* category */}
            <span className="hidden sm:block line-clamp-1 text-start">
              {data?.category_id?.category_name}
            </span>

            {/* sales */}
            <span className="hidden sm:block">{data?.sale_quantity}</span>

            {/* price */}
            <span className="hidden md:block font-medium text-red-500">
              {data?.price_product?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>

            {/* stock */}
            <span className="hidden lg:block">{data?.stock}</span>

            {/* made in */}
            <span className="hidden xl:block">{data?.made_in}</span>

            {/* status */}
            <span
              className={`font-medium ${
                data?.deleted ? "text-red-500" : "text-green-600"
              }`}
            >
              {data?.deleted ? "Đã ẩn" : "Đang bán"}
            </span>

            {/* actions */}
            {dataProps?.operation && (
              <div className="flex justify-center items-center gap-x-2">
                {dataProps?.action === "recycle" ? (
                  <button
                    className="hover:scale-110"
                    onClick={() =>
                      dataProps?.handle_Restore_or_Destroy(data?._id, "restore")
                    }
                  >
                    <ArchiveRestore className="h-5" />
                  </button>
                ) : (
                  <Link
                    href={`/trung-tam-dieu-khien/san-pham/${data?._id}`}
                    className="*:hover:text-black"
                  >
                    <FilePenLine className="h-5 text-gray-700" />
                  </Link>
                )}

                <AlertDialog>
                  <AlertDialogTrigger>
                    {!data?.deleted ? (
                      <Eye className="w-5 h-5 opacity-80" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-red-500 hover:text-red-700" />
                    )}
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {data?.deleted
                          ? "Khôi phục sản phẩm?"
                          : "Ẩn sản phẩm?"}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {`Xác nhận ${
                          data?.deleted ? "khôi phục" : "ẩn"
                        } sản phẩm mã ${data?._id}?`}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500"
                        onClick={() =>
                          dataProps?.handle_toggle_item({
                            id_item: data?._id,
                            path: data?.deleted
                              ? "restore_item"
                              : "soft_delete",
                            method: data?.deleted ? "PATCH" : "DELETE",
                            action_mutation: "delete",
                          })
                        }
                      >
                        Xác nhận
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>

          {/* variants */}
          {data?.variant && (
            <details className="group border-t" open>
              <summary className="flex cursor-pointer items-center justify-center gap-2 p-2 text-xs text-gray-500">
                <span className="group-open:hidden">Hiện biến thể</span>
                <span className="hidden group-open:block">Đóng biến thể</span>
                <ChevronUp className="h-3 group-open:rotate-180 transition" />
              </summary>

              {data?.variant?.variants?.map((item: any) =>
                item?.value_variants?.map((value: any, idx: number) => (
                  <div
                    key={item?._id + idx}
                    className="grid grid-cols-9 md:grid-cols-10 text-xs md:text-sm gap-2 
                    items-center p-3 border-t"
                  >
                    {!dataProps?.operation && <div />} {/* cột index trống */}

                    {/* ảnh ảo */}
                    <div />

                    {/* attribute + value */}
                    <div className="col-span-2 flex gap-1 text-start">
                      <span>{item?.attribute}</span>
                      {value?.name_variant && <span>- {value?.name_variant}</span>}
                    </div>

                    {/* category trống */}
                    <div className="hidden sm:block" />

                    {/* sales */}
                    <span className="hidden sm:block">{value?.sales_item}</span>

                    {/* price */}
                    <span className="hidden md:block text-red-500">
                      {value?.price_variant?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>

                    {/* stock */}
                    <span
                      className={`hidden lg:block ${
                        value?.stock_variant > 0
                          ? ""
                          : "text-red-500 font-medium"
                      }`}
                    >
                      {value?.stock_variant > 0
                        ? value?.stock_variant
                        : "Hết hàng!"}
                    </span>

                    {/* made in trống */}
                    <div className="hidden xl:block" />

                    {/* status giữ nguyên */}
                    <div />

                    {/* action giữ nguyên */}
                    {dataProps?.operation && <div />}
                  </div>
                ))
              )}
            </details>
          )}
        </div>
      ))}
    </div>
  );
}

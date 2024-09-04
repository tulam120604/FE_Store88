/* eslint-disable @next/next/no-img-element */
'use client';

import Link from "next/link"
import { Suspense, useEffect, useState } from "react";
import { Query_Recycle_Items_Admin } from "@/src/app/_lib/Tanstack_Query/Items/query";
import { Mutation_Items } from "@/src/app/_lib/Tanstack_Query/Items/mutationFn";
import Re_store from "@/src/app/_Components/Icons/re_store";
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";
import { DataTable } from "@/src/app/_Components/ui/Tables/data_table";
import { useToken } from "@/src/app/_lib/Custome_Hooks/User";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/app/_Components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import Data_Table from "../../_components/Data_Table";
import Loading from "../_component/loading";

const Page = () => {
  const token = useToken();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = Query_Recycle_Items_Admin(token.accessToken, page);
  const { on_Submit } = Mutation_Items({
    action: 'RESTORE_OR_DESTROY'
  });
  if (isLoading) {
    return <Loading />
  };
  const columns: ColumnDef<any>[] = [
    {
      cell: ({ row }) => (
        <div className="max-w-[200px] line-clamp-3">{row?.original?.short_name}</div>
      ),
      header: "Tên sản phẩm",
    },
    {
      accessorKey: "category_id.category_name",
      header: "Danh mục",
    },
    {
      cell: ({ row }) => (
        <Image width={100} height={100} className="w-[100px] h-[100px] rounded" src={row?.original?.feature_product} alt="Loading..." />
      ),
      header: "Ảnh",
    },
    {
      cell: ({ row }) => {
        return (
          row?.original?.attributes?.varriants?.map((item: any) => {
            return (<div key={row?.original?._id} className="max-w-[200px]">
              <span>{item.color_item}</span>
              {
                item?.size_item.map((i: any) => {
                  return (<>
                    {
                      i?.name_size && <span>&#160; &#10539; &#160;</span>
                    }
                    <span key={i._id}>{i?.name_size}</span> <br />
                  </>)
                })
              }
            </div>)
          }))
      },
      header: "Phân loại",
    },
    {
      cell: ({ row }) => {
        return (row?.original?.price_product ?
          <span className="text-red-600">{row?.original?.price_product?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> :
          row?.original?.attributes?.varriants?.map((item: any) => {
            return (<div key={row?.original?._id} className="max-w-[200px]">
              {
                item?.size_item.map((i: any) => {
                  if (i.name_size) {
                    return (<>
                      <span key={i._id} className="text-red-600">{i?.price_attribute?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> <br />
                    </>)
                  }
                  else {
                    return <span key={i._id} className="text-red-600">{i?.price_attribute?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                  }
                })
              }
            </div>)
          }))

      },
      header: "Đơn giá",
    },
    {
      accessorKey: "count_stock",
      header: "Số lượng",
    },
    {
      accessorKey: "made_in",
      header: "Xuất xứ",
    },
    {
      cell: ({ row }) => (<div className="flex items-center gap-x-2 *:duration-200">
        <button className="hover:scale-110" onClick={() => handle_Restore_or_Destroy(row?.original?._id, 'restore')}>
          <Re_store />
        </button>
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash2 className="text-red-600 w-5 h-5" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa sản phẩm?</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn chắc chắn xóa sản phẩm mã {row?.original?._id} ? Điều này sẽ không thể khôi phục lại sản phẩm!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction className="hover:scale-110 bg-red-500" onClick={() => handle_Restore_or_Destroy(row?.original?._id, 'destroy')}>Xác nhận</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>),
      header: "options",
    },
  ]
  function handle_Restore_or_Destroy(idItem?: string | number, action?: string,) {
    const item = {
      token: token.accessToken,
      id_item: idItem,
      action_mutation: action
    };
    on_Submit(item);
  }

  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <div className="flex flex-col gap-y-6 pb-6 rounded">
        <div className="flex items-center justify-between gap-x-20 sticky top-0 py-4">
          <strong className="text-gray-900 lg:text-xl">Danh sách sản phẩm đã xóa</strong>
          <Link href={'/adminstrations/products/list'} className="*:w-[25px] *:h-[30px] text-gray-900 hover:underline hover:text-sky-500 cursor-pointer">
            Quay lại
          </Link>
        </div>
        {(Array.isArray(data)) ? (<>
          {
            data ? (<>
              {isLoading ? <span>Loading ...</span> :
                <div className="bg-white border rounded-lg px-4">
                  <Data_Table dataProps={{ dataTable: data, handle_Restore_or_Destroy, action: 'recycle' }} />
                </div>
              }
            </>)
              : <span className="text-gray-100">Thùng rác trống!</span>
          }
        </>)
          : <span className="text-white">Bạn không có quyền truy cập !</span>}
      </div>
    </Suspense>
  )
}

export default Page


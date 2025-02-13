'use client'

import { Query_Order } from '@/src/app/_lib/Query_APIs/Order/Query_order'
import React, { useState } from 'react'
import { Button } from "@/src/app/_Components/ui/Shadcn/button"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"
import { Mutation_Order } from '@/src/app/_lib/Query_APIs/Order/Mutation_order'
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogFooter, AlertDialogAction, AlertDialogCancel
} from '@/src/app/_Components/ui/alert-dialog'
import { Mutation_Notification } from '@/src/app/_lib/Query_APIs/Notification/Mutation_Notification'
import { useRouter, useSearchParams } from 'next/navigation'
import { DataTable } from '@/src/app/_Components/ui/Tables/data_table'
import Paginate_order from './paginate_order'
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots'
import { CircleCheck, CircleEllipsis, PackageOpen, Truck, X } from 'lucide-react'
import { convert_Slug } from '@/src/app/util/Slug'
import { Infor_user } from '@/src/app/_lib/Query_APIs/Auth/Query_Auth'
import { useStoreStatusItemOrder } from '@/src/app/Zustand/Store'

const Page_order = () => {
  const { status } = useStoreStatusItemOrder();
  const [status_item_order, setStatus_item_order] = useState<number>(status);
  const searchParams = useSearchParams();
  const { data: data_user, isLoading: loading_user } = Infor_user();
  let page = 1;
  if (searchParams.get('_page')) {
    page = Number(searchParams.get('_page'))
  }
  const routing = useRouter();
  const mutation_order = Mutation_Order('UPDATE_STATUS');
  // send message
  const mutate_notification = Mutation_Notification('ADD');
  const { data, isLoading } = Query_Order(page, 10, status_item_order);
  function status_order(item: any) {
    switch (+item) {
      case 1:
        return <span className='flex items-center gap-x-2'><CircleEllipsis className='h-5' />Chờ xác nhận</span>;
      case 2:
        return <span className='text-green-500 flex items-center gap-x-2'><CircleCheck className='h-5' />Đã xác nhận</span>;
      case 3:
        return <span className='text-sky-500 flex items-center gap-x-2'><PackageOpen className='h-5' />Đang chuẩn bị</span>;
      case 4:
        return <span className='text-sky-500 flex items-center gap-x-2'><Truck className='h-5' />Đang vận chuyển</span>;
      case 5:
        return <span className='text-green-500 flex items-center gap-x-2'><CircleCheck className='h-5' />Đơn hàng đã được giao thành công</span>;
      case 6:
        return <span className='text-red-500 flex items-center gap-x-1'><X className='h-5' />ĐÃ HỦY</span>;
      default: return;
    }
  }
  function cancel_order(id_order: string | number, status: number, number_order?: string | number, seller_id?: string | number) {
    const dataClient = {
      id_user: data_user?.data?._id,
      item: {
        order_id: id_order,
        status_item_order: status
      }
    }
    if (status === 7 && number_order && seller_id) {
      const data_message = {
        notification_message: `Khách hàng ${data_user?.data?.user_name} muốn hủy đơn hàng ${number_order}`,
        link: id_order,
        sender_id: data_user?.data?._id,
        receiver_id: seller_id
      }
      mutate_notification?.mutate(data_message);
    }
    mutation_order?.mutate(dataClient);
  }
  function restore_by_order(item: any) {
    sessionStorage.removeItem('item_order')
    const restore_buy_item_order = {
      items: Object.values(item?.items_order),
      user_id: data_user?.data?._id,
      action: 'restore_buy_item',
      id_order: item?._id,
    };
    sessionStorage.setItem('item_order', JSON.stringify(restore_buy_item_order))
    routing.push('/order')
  }
  const columns: ColumnDef<any>[] = [
    {
      cell: ({ row }) => (
        <div className="flex gap-x-4 lg:gap-x-8">
          <Link href={`/${convert_Slug(row?.original?.product_id?.short_name)}.html?p=${row?.original?.product_id?._id}`}>
            <Image width={100} height={100} loading="lazy" className="w-[100px] h-[100px] border" src={row?.original?.product_id?.gallery[0]} alt="Loading..." />
          </Link>
          <div className="w-full flex flex-col gap-y-3">
            <Link href={`/${convert_Slug(row?.original?.product_id?.short_name)}.html?p=${row?.original?.product_id?._id}`} className="line-clamp-2">{row?.original?.product_id?.short_name}</Link>
            {
              (row?.original?.color_item || row?.original?.size_attribute_item) &&
              <span className="text-sm">Phân loại : {row?.original?.color_item} - {row?.original?.size_attribute_item}</span>
            }
            {
              status_item_order === 5 &&
              (
                row?.original?.status_feedback ?
                  <div className='flex items-center gap-x-2'>
                    <CircleCheck className='text-green-600' />
                    <span className="text-sm">Đã đánh giá</span>
                  </div> :
                  <div>
                    <Button onClick={() => routing.push(`/profile/feedback?_rating=${row?.original?._id}`)} className="px-3 py-1.5 hover:bg-green-700 duration-200 bg-green-600 text-sm rounded text-white">Đánh giá</Button>
                  </div>
              )
            }
          </div>
        </div>
      ),
      header: " ",
    },
    {
      cell: ({ row }) => (
        <div className="flex flex-col gap-y-2 text-end">
          <span className="text-red-600">{row?.original?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
          <div>x {row?.original?.quantity}</div>
          <span className="text-red-600">{row?.original?.total_price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
        </div>
      ),
      header: " ",
    },
  ]
  function handle_list_item_status(status: any) {
    setStatus_item_order(status);
  }
  return (
    <div className='w-full relative bg-white '>
      <div className='flex hidden_scroll_x z-[1] gap-x-10 overflow-x-auto absolute w-full *:w-full *:py-4
      *:px-2 items-center *:bg-none *:text-sm *:border-b-2 *:border-white *:whitespace-nowrap top-0'>
        {
          Array.from({ length: 7 }, (_: any, i: number) =>
            <button key={i} onClick={() => handle_list_item_status(i)} className={status_item_order === i ? '!border-gray-900' : 'hover:border-gray-900'}>
              {
                i === 0 ? 'Tất cả' : i === 1 ? 'Chưa xác nhận' : i === 2 ? 'Đã xác nhận' : i === 3 ? 'Đang chuẩn bị hàng' : i === 4 ? 'Đang vận chuyển' : i === 5 ?
                  'Giao thành công' : 'Đã hủy'
              }
            </button>
          )
        }
      </div>
      <div className='bg-[#F5F5FA] w-full h-4 absolute top-[54px]' />
      {
        isLoading || loading_user && <div className='mt-20'><Loading_Dots /></div>
      }
      {
        data?.data_order &&
          data?.data_order?.docs.length > 0 ?
          data?.data_order?.docs?.map((item: any) =>
            <div className='shadow py-2 mb-6 px-4 lg:px-8 rounded' key={item?._id}>
              <span className='px-1 py-2 text-sm'>{status_order(item?.status_item_order)}</span>
              <div className='*:!border-none *:text-gray-900 -translate-y-12'>
                <DataTable data={item?.items_order} columns={columns} />
              </div>
              <div key={+item?._id + Math.random()} className='flex justify-between items-center -mt-4'>
                <span className='text-sm'>Hình thức: {(item?.payment_method === 'COD' ? 'Thanh toán khi nhận hàng' : 'Thanh toán trực tuyến')}</span>
                {
                  (+item?.status_item_order === 6 || +item?.status_item_order === 5) ?
                    <Button onClick={() => restore_by_order(item)}
                      className="px-3 bg-green-600 hover:!bg-green-700 mt-2 py-2 text-sm rounded text-white">Mua lại</Button> :
                    <AlertDialog>
                      {
                        (+item?.status_item_order === 1) || (+item?.status_item_order === 2) ? <AlertDialogTrigger className="px-3 mt-2 py-2 text-sm bg-red-500 hover:bg-red-700 duration-200 rounded text-white">
                          {
                            (+item?.status_item_order === 1) ? 'Hủy' : (+item?.status_item_order === 2) && 'Yêu cầu hủy'
                          }
                        </AlertDialogTrigger> :
                          <Button className="bg-[#11182755] text-gray-900 hover:!bg-[#11182755] cursor-not-allowed">
                            Hủy
                          </Button>
                      }

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className='text-sm'>Xác nhận hủy đơn hàng {item?.code_order}</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          {
                            (+item?.status_item_order === 1) ?
                              <AlertDialogAction className="bg-red-500 hover:!bg-red-700" onClick={() => cancel_order(item?._id, 6)}>Xác nhận</AlertDialogAction> :
                              (+item?.status_item_order === 2) &&
                              <AlertDialogAction className="bg-red-500 hover:!bg-red-700" onClick={() => cancel_order(item?._id, 7, item?.code_order, item?.items_order[0]?.product_id?.id_user_seller)}>Xác nhận</AlertDialogAction>}
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                }
              </div>
            </div>
          )
          :
          <div className='grid place-items-center h-[70vh] rounded'>
            <div className='flex flex-col items-center gap-y-6'>
              <Image width={100} height={100} src='/Images/document_icon.png' alt=''></Image>
              <span className='flex items-center'>Chưa có đơn hàng nào!<Link className='underline mx-1' href={'/products'}> Đi mua ngay</Link></span>
            </div>
          </div>
      }
      {data?.data_order &&
        <Paginate_order totalPages={data?.data_order?.totalPages} page={data?.data_order?.page} />
      }
    </div>)
}

export default Page_order
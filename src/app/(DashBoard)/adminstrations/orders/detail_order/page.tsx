'use client';

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { DataTable } from '@/src/app/_Components/ui/Tables/data_table';
import { Query_Detail_Order } from '@/src/app/_lib/Tanstack_Query/Order/Query_order';
import { ColumnDef } from '@tanstack/react-table';
import { CircleCheck } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/src/app/_Components/ui/dialog/alert-dialog';
import Image from 'next/image';
import { io } from 'socket.io-client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import { Mutation_Notification } from '@/src/app/_lib/Tanstack_Query/Notification/Mutation_Notification';
import { Mutation_Order } from '@/src/app/_lib/Tanstack_Query/Order/Mutation_order';
import Loading from '../loading';
import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User';

export default function Page() {
  const id = useSearchParams();
  const id_item = id?.get('id') ?? '';
  const user = useCheck_user();
  const { data, isLoading } = Query_Detail_Order(id_item);
  const mutation_notification = Mutation_Notification('ADD');
  const mutation_status_order = Mutation_Order('UPDATE_STATUS');
  const socket = io('http://localhost:8888');
  if (mutation_status_order?.isLoading) {
    return <Loading />
  }

  // update status order
  function change_status(id_item: { _id: string, code_order: string | number, user_id: string }, status: number) {
    mutation_status_order.mutate({
      id_user: user?.check_email?._id,
      item: {
        order_id: id_item?._id,
        status_item_order: status,
      },
      action: 'admin'
    });
    // gui thong bao ve user
    const message_notification = (status === 6) ? `Rất tiếc, người bán đã từ chối đơn hàng ${id_item?.code_order}!.` :
      (status === 2) ? `Đơn hàng ${id_item?.code_order} của bạn đã được xác nhận!.` :
        (status === 3) ? `Đơn hàng ${id_item?.code_order} của bạn đang chuẩn bị giao đến đơn vị vận chuyển!.` :
          (status === 4) && `Đơn hàng ${id_item?.code_order} đang trên đường vận chuyển tới bạn!.`
    const data_body = {
      sender_id: user?.check_email?._id,
      receiver_id: id_item?.user_id,
      notification_message: message_notification,
    }
    mutation_notification.mutate(data_body);
    socket.emit('send_status_item_order_to_user', (status === 2) ? `Đơn hàng ${id_item?.code_order} đã được xác nhận, người bán đang chuẩn bị hàng để giao đến bạn` :
    (status === 3) ? `Người bán đang chuẩn bị đơn hàng ${id_item?.code_order} để giao đến bạn!` : 
    (status === 4) ? `Đơn hàng ${id_item?.code_order} đang trên đường giao đến bạn!` :
      (status === 6) && `Người bán đã từ chối đơn hàng ${id_item?.code_order}, vui lòng chọn sản phẩm khác!`)
  }

  function status_order(item: any) {
    switch (+item) {
      case 1:
        return <span>Chờ xác nhận</span>;
      case 2:
        return <span className='flex items-center text-green-500'><CircleCheck className='h-4' />Đã xác nhận</span>;
      case 3:
        return <span>Đang chuẩn bị hàng</span>;
      case 4:
        return <span>Đang vận chuyển</span>;
      case 5:
        return <span className='flex items-center text-sky-500'>Giao thành công<CircleCheck className='h-4' /></span>;
      case 6:
        return <span className='text-red-500'>ĐÃ HỦY</span>;
      default: return;
    }
  }
  // colums : 
  const columns: ColumnDef<any>[] = [
    {
      cell: ({ row }) => (
        <div className="flex gap-x-4 lg:gap-x-8">
          <Link href={'/' + row?.original?.product_id?._id}>
            <Image width={100} height={100} loading="lazy" className="w-[100px] h-[100px] border" src={row?.original?.product_id?.gallery[0]} alt="Loading..." />
          </Link>
          <div className="w-full flex flex-col gap-y-3">
            <Link href={'/' + row?.original?.product_id?._id} className="line-clamp-2">{row?.original?.product_id?.short_name}</Link>
            {
              (row?.original?.color_item || row?.original?.size_attribute_item) &&
              <span className="text-sm">Phân loại : {row?.original?.color_item} , {row?.original?.size_attribute_item}</span>
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
          <div>X {row?.original?.quantity}</div>
          <span className="text-red-600">{row?.original?.total_price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
        </div>
      ),
      header: " ",
    },
  ]

  // update status 
  function btn_change_status_item_order(item: any, status: number) {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className={`${status === 2 ? 'bg-green-500 hover:!bg-green-700' : status === 6 ? 'bg-red-500 hover:!bg-red-700' :
            status === 3 ? 'bg-green-500 hover:!bg-green-700' : status === 4 && 'bg-sky-500 hover:!bg-sky-700'
            } rounded h-auto text-xs`}>{status === 2 ? 'Xác nhận' : status === 6 ? 'Từ chối' : status === 3 ? 'Chuẩn bị hàng'
              : status === 4 && 'Đang vận chuyển'
            }</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {
                status === 2 ? `Xác nhận đơn hàng ${item?.code_order}?` :
                  status === 6 ? `Từ chối đơn hàng ${item?.code_order}?` :
                    status === 3 ? `Xác nhận chuẩn bị đơn hàng ${item?.code_order}?` :
                      status === 4 && `Xác nhận đơn hàng ${item?.code_order} đang trên đường vận chuyển?`
              }
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction className="bg-green-500" onClick={() => change_status(item, status)}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  if (isLoading) {
    return <Loading_Dots />
  }
  return (
    <div className='rounded bg-white border border-gray-300 py-10 -translate-y-7'>
      <strong className='text-xl'>Chi tiết đơn hàng</strong>
      <div className='mt-6'>
        <span className='text-sm flex gap-x-3'>Trạng thái: {status_order(data?.data_order_by_id?.status_item_order)}</span>
        <div className='-translate-y-8'>
          <DataTable data={data?.data_order_by_id?.items_order} columns={columns} />
        </div>
        <div className='text-sm mt-2 pt-6 border-t'>
          <span>Thông tin khách hàng</span>
          <div className='my-2 flex flex-col gap-y-2 *:grid *:grid-cols-[150px_auto]'>
            <span>Tên: <p>{data?.data_order_by_id?.infor_user?.name_user}</p></span>
            <span>Số điện thoại: <p>{data?.data_order_by_id?.infor_user?.phone}</p></span>
            <span>Email: <p>{data?.data_order_by_id?.infor_user?.email_user}</p></span>
            <span>Địa chỉ: <p>{data?.data_order_by_id?.infor_user?.address}</p></span>
          </div>
        </div>
        <div className='flex justify-center mt-10'>
          {
            (data?.data_order_by_id?.status_item_order === '1') ?
              <div className='flex gap-2'>
                {/* Confirm don hang */}
                {btn_change_status_item_order(data?.data_order_by_id, 2)}
                {/* Tu choi don hang */}
                {btn_change_status_item_order(data?.data_order_by_id, 6)}
              </div>
              :
              // chuan bi don hang
              (data?.data_order_by_id?.status_item_order === '2') ?
                btn_change_status_item_order(data?.data_order_by_id, 3) :
                // xac nhan dang van chuyen
                (data?.data_order_by_id?.status_item_order === '3') &&
                btn_change_status_item_order(data?.data_order_by_id, 4)
          }
        </div>
      </div>
    </div>
  )
}

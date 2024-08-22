'use client';

import { useCheck_user, useToken } from '@/src/app/_lib/Custome_Hooks/User';
import { List_Order_Dashboard } from '@/src/app/_lib/Tanstack_Query/Order/Query_order';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { DataTable } from '@/src/app/_Components/ui/Tables/data_table';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';
import Loading from './loading';

const Page = () => {
  const token = useToken();
  const role_user = ['admin_global', 'admin_local'];
  const user = useCheck_user();
  let id_seller: string | undefined;
  if (!role_user.includes(user?.check_email?.role)) {
    if (user?.check_email?.role === 'seller') {
      id_seller = user?.check_email?._id
    }
  }
  const { data, isLoading } = List_Order_Dashboard(token?.accessToken, id_seller);
  if (isLoading) {
    return <Loading />
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
        return <span className='flex items-center text-sky-500'><CircleCheck className='h-4' />Giao thành công</span>;
      case 6:
        return <span className='text-red-500'>ĐÃ HỦY</span>;
      default: return;
    }
  }
  const columns: ColumnDef<any>[] = [
    {
      cell: ({ row }) => (
        <div className='flex flex-col gap-y-2 text-sm'>
          <span>Tên : {row?.original?.infor_user?.name_user}</span>
          <span>Địa chỉ : {row?.original?.infor_user?.address}</span>
          <span>SĐT : {row?.original?.infor_user?.phone}</span>
          <span>Email : {row?.original?.infor_user?.email_user}</span>
        </div>
      ),
      'header': "Khách hàng"
    },
    {
      cell: ({ row }) => (
        row?.original?.items_order?.map((item: any) => {
          return (<div key={item?.product_id?._id} className='flex items-center gap-x-4'>
            <Image width={70} height={100} className='h-[90px] rounded border' src={item?.product_id?.gallery[0]} alt='Loading...' />
            <div className='flex flex-col gap-y-1 *:text-sm'>
              <span className='max-w-[200px] line-clamp-1'>{item?.product_id?.short_name}</span>
              <span className='text-red-500'>{item?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
              <span>X {item?.quantity}</span>
              <span className='text-red-500'>{item?.total_price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            </div>
          </div>)
        })
      ),
      'header': "Đơn hàng"
    },
    {
      cell: ({ row }) => (
        <div className='flex flex-col gap-y-2'>
          <span>Ngày đặt : {row?.original?.date_time?.slice(0, 10)}</span>
          <span>Mã đơn : {row?.original?.code_order}</span>
        </div>
      ),
      'header': "Thông tin"
    },
    {
      cell: ({ row }) => (
        status_order(row?.original?.status_item_order)
      ),
      'header': "Trạng thái"
    },
    {
      cell: ({ row }) =>
        <Link href={`orders/detail_order?id=${row?.original?._id}`} className='hover:text-sky-600 text-sky-500 underline duration-100'>Chi tiết</Link>
      ,
      'header': "Thao tác"
    }
  ]
  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <div className="flex flex-col gap-y-6 py-4 rounded">
        <strong className="text-gray-900 lg:text-xl">Đơn hàng</strong>
        <div className="border bg-white rounded px-4">
          {
            data?.data_order ?
              <DataTable data={data?.data_order?.docs} columns={columns} /> :
              <span className='border-none'>không thể xác minh danh tính</span>
          }
        </div>
      </div>
    </Suspense>
  )
}

export default Page
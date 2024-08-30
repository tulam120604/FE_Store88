'use client';

import { useCheck_user, useToken } from '@/src/app/_lib/Custome_Hooks/User';
import { List_Order_Dashboard } from '@/src/app/_lib/Tanstack_Query/Order/Query_order';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { DataTable } from '@/src/app/_Components/ui/Tables/data_table';
import React, { Suspense } from 'react';
import Loading from './loading';
import { columns } from '../_components/colum';

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
'use client';

import { List_Order_Dashboard } from '@/src/app/_lib/Query_APIs/Order/Query_order';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { DataTable } from '@/src/app/_Components/ui/Tables/data_table';
import React, { Suspense } from 'react';
import Loading from './loading';
import { columns } from '../_components/colum';
import Paginate_item from '@/src/app/(Client)/san-pham/_component/Paginate';

const Page = () => {
  const { data, isLoading } = List_Order_Dashboard();
  if (isLoading) {
    return <Loading />
  }
  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <div className="flex flex-col gap-y-6 py-4 rounded">
        <strong className="text-gray-900 lg:text-xl">Đơn hàng</strong>
        <div>
          {
            data?.data_order ?
              <>
                <div className="bg-white rounded px-4 mb-4">
                  <DataTable data={data?.data_order?.docs} columns={columns} />
                </div>
                <Paginate_item totalPages={40} page={10} />
              </>
              :
              <span className='border-none'>không thể xác minh danh tính</span>
          }
        </div>
      </div>
    </Suspense>
  )
}

export default Page
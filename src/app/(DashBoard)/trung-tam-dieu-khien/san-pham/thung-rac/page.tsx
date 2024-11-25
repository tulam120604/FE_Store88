/* eslint-disable @next/next/no-img-element */
'use client';

import Link from "next/link"
import { Suspense, useState } from "react";
import { Query_Recycle_Items_Admin } from "@/src/app/_lib/Tanstack_Query/Items/query";
import { Mutation_Items } from "@/src/app/_lib/Tanstack_Query/Items/mutationFn";
import { useToken } from "@/src/app/_lib/Custome_Hooks/User";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import Data_Table from "../../_components/Data_Table";
import Loading from "../_component/loading";

const Page = () => {
  const token = useToken();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = Query_Recycle_Items_Admin(token.accessToken, page);
  const { on_Submit, isLoading: loading_restore} = Mutation_Items({
    action: 'RESTORE_OR_DESTROY'
  });
  if (isLoading || loading_restore) {
    return <Loading />
  };
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


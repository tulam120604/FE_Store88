/* eslint-disable @next/next/no-img-element */
'use client';

import { Suspense, useEffect } from "react";
import Loading from "../_component/loading";
import { Query_List_Items_Dashboard } from "@/src/app/_lib/Query_APIs/Items/Query";
import { Mutation_Items } from "@/src/app/_lib/Query_APIs/Items/Mutation_product";
import Pagination_Component from "../_component/Pagination";
import { useSearchParams } from "next/navigation";
import { useCheck_user } from "@/src/app/_lib/Custome_Hooks/User";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { io } from 'socket.io-client';
import Data_Table from "../../_components/Data_Table";
import { Auth_Provider } from "../../_Auth_Wrapper/Page";


const Page = () => {
  const socket = io('http://localhost:8888')
  let id_user;
  const user = useCheck_user();
  const searchParams = useSearchParams();
  const role_user = ['admin_global', 'admin_local'];
  let page = Number(searchParams.get('_page')) ?? 1;
  if (!role_user.includes(user?.check_email?.role)) {
    if (user?.check_email?.role === 'seller') {
      id_user = user?.check_email?._id
    }
  }
  const { data, isLoading } = Query_List_Items_Dashboard(page, 10);
  const { on_Submit, isLoading: loading_remove } = Mutation_Items({
    action: "REMOVE"
  });
  // close socket 
  useEffect(() => {
    socket.on("connect_error", () => {
      socket.disconnect();
    })
    return () => { socket.disconnect() };
  }, [socket]);

  if (isLoading || loading_remove) {
    return <Loading />
  };

  function handle_Remove(idItem?: { id_item: string, name_item: string }) {
    const item = {
      refeshToken: 'token',
      id_item: idItem?.id_item
    }
    on_Submit(item);
    socket.emit('send_message_delete_item', idItem);
  }

  // render items and attributes
  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <Auth_Provider>
        <div className="flex flex-col gap-y-6 py-4">
          <div className="flex flex-col gap-y-1">
            <strong className='text-lg'>Danh sách sản phẩm</strong>
            <span className="text-gray-600 text-sm">Quản lý sản phẩm của bạn</span>
          </div>
          {
            data?.status === 401 ? <span className="text-gray-900 text-center">Xác minh danh tính không thành công! Vui lòng đăng nhập lại!!</span> :
              data?.data ? (<>
                {isLoading ? <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div> :
                  <div className="bg-white rounded-lg border px-4">
                    <Data_Table dataProps={{ dataTable: data?.data?.docs, handle_Remove }} />
                  </div>
                }
              </>)
                : <section className="h-[70vh] grid place-content-center text-gray-800 text-center text-sm">Không có dữ liệu!</section>
          }
          {
            data?.data?.docs &&
            <div className="text-gray-100">
              <Pagination_Component totalPages={data?.data?.totalPages} currentPage={data?.data?.page} />
            </div>
          }
        </div>
      </Auth_Provider>
    </Suspense>
  )
}

export default Page
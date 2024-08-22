/* eslint-disable @next/next/no-img-element */
'use client';

import Link from "next/link"
import { Suspense, useEffect } from "react";
import Loading from "./_component/loading";
import { Query_List_Items_Dashboard } from "@/src/app/_lib/Tanstack_Query/Items/query";
import { Mutation_Items } from "@/src/app/_lib/Tanstack_Query/Items/mutationFn";
import Pagination_Component from "./_component/Pagination";
import { useSearchParams } from "next/navigation";
import { useCheck_user, useToken } from "@/src/app/_lib/Custome_Hooks/User";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { io } from 'socket.io-client';
import { Auth_Wrap_Seller } from "../_Auth_Wrap/Page";
import Data_Table from "../_components/Data_Table";


const Page = () => {
  const socket = io('http://localhost:8888')
  let id_user;
  const token = useToken();
  const user = useCheck_user();
  const searchParams = useSearchParams();
  const role_user = ['admin_global', 'admin_local'];
  let page = Number(searchParams.get('_page')) ?? 1;
  if (!role_user.includes(user?.check_email?.role)) {
    if (user?.check_email?.role === 'seller') {
      id_user = user?.check_email?._id
    }
  }
  const { data, isLoading } = Query_List_Items_Dashboard(token.accessToken, page, 10, id_user);
  const { on_Submit } = Mutation_Items({
    action: "REMOVE"
  });
  // close socket 
  useEffect(() => {
    socket.on("connect_error", () => {
      socket.disconnect();
    })
    return () => { socket.disconnect() };
  }, [socket]);

  if (isLoading) {
    return <Loading />
  };

  function handle_Remove(idItem?: { id_item: string, name_item: string }) {
    const item = {
      accessToken: token.accessToken,
      refeshToken: token,
      id_item: idItem?.id_item
    }
    on_Submit(item);
    socket.emit('send_message', idItem);
  }

  // render items and attributes
  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <Auth_Wrap_Seller>
        <div className=" flex flex-col gap-y-6 py-4 rounded">
          <strong className='text-xl'>Danh sách sản phẩm</strong>
          {/* {(Array.isArray(data)) ? (<> */}
          <div className="sticky z-[2] top-20">
            <Link className="border-none text-gray-100 text-sm h-full px-5 py-2.5 rounded bg-[#2563EB] hover:bg-[#2563EB88] duration-300" href={'/adminstrations/list_products/create_item'}>Thêm sản phẩm +</Link>
          </div>
          {
            data?.status === 401 ? <span className="text-gray-900 text-center">Xác minh danh tính không thành công! Vui lòng đăng nhập lại!!</span> :
              data?.data ? (<>
                {isLoading ? <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div> :
                  <div className="bg-white rounded-lg border px-4">
                    <Data_Table dataProps={{dataTable : data?.data?.docs, handle_Remove}}/>
                  </div>
                }
              </>)
                : <span className="text-gray-800 text-center text-sm">Không có dữ liệu</span>
          }
          {
            data?.data?.docs &&
            <div className="text-gray-100">
              <Pagination_Component totalPages={data?.data?.totalPages} currentPage={data?.data?.page} />
            </div>
          }
        </div>
      </Auth_Wrap_Seller>
    </Suspense>
  )
}

export default Page
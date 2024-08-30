'use client';

import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User';
import { List_Address, Mutation_Address } from '@/src/app/_lib/Tanstack_Query/Auth/Query_Address';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import Address_component from '../_components/address';
import { eventEmit } from '@/src/app/_Components/ui/Header/Event_emit';
import { Badge } from '@/src/app/_Components/ui/badge';
import { AlertDialog } from '@/src/app/_Components/ui/alert-dialog';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/src/app/_Components/ui/dialog/alert-dialog';
import Alert_dialog from '../_components/alert_dialog';

const Page = () => {
  const form_create_address = useRef<HTMLDivElement>(null);
  const bg_form_create_address = useRef<HTMLDivElement>(null);

  const mutate_address = Mutation_Address('REMOVE_OR_UPDATE_DEFAULT_ADDRESS');
  const [client, setClient] = useState<boolean>(false);
  useEffect(() => {
    setClient(true)
  }, [])
  const user = useCheck_user() ?? undefined;

  // address 
  const { data, isLoading } = List_Address(user?.check_email?._id);
  function handle_Show_Form_Create_Address() {
    form_create_address?.current?.classList?.remove('left-3/4');
    form_create_address?.current?.classList?.add('left-1/2', 'scale-100');
    bg_form_create_address?.current?.classList?.remove('hidden');
    bg_form_create_address?.current?.classList?.add('block');
  }
  function handle_Close_Form_Create_Address() {
    form_create_address?.current?.classList?.add('left-3/4', 'scale-0');
    form_create_address?.current?.classList?.remove('left-1/2', 'scale-100');
    bg_form_create_address?.current?.classList?.add('hidden');
    bg_form_create_address?.current?.classList?.remove('block');
  }

  useEffect(() => {
    eventEmit.on('close_form_create_address', () => { handle_Close_Form_Create_Address() })
  }, [])

  return (
    client ?
      <div className="w-full px-6 py-4">
        <div className='flex items-center justify-between'>
          <span className='lg:text-xl text-sm'>Hồ sơ của tôi</span>
          {
            user?.check_email?.role === 'user' ?
              <Link className='lg:text-sm text-xs underline' href={'/profile/create_saller'}>Kênh phân phối</Link> :
              user?.check_email?.role === 'seller' ?
                <Link className='lg:text-sm text-xs underline' href={'/adminstrations/dashboard/overview'}>Đi đến kho phân phối</Link> :
                <Link className='lg:text-sm text-xs underline' href={'/adminstrations/dashboard/overview'}>Bảng điều khiển</Link>
          }
        </div>
        <table className='lg:w-[50%] lg:w-[80%] mx-auto'>
          <tbody>
            <tr className='*:my-6'>
              <td className='flex items-center justify-between lg:text-sm text-xs'>
                Tên hiển thị
                <div className='lg:w-[70%] w-[50%] border py-1 lg:py-2 px-4 rounded text-gray-600'>{user && user?.check_email?.user_name}</div>
              </td>
              <td className='flex items-center justify-between lg:text-sm text-xs'>
                Email tài khoản
                <div className='lg:w-[70%] w-[50%] border py-1 lg:py-2 px-4 rounded text-gray-600 overflow-hidden'>{user && user?.check_email?.email}</div>
              </td>
              <td className='flex items-center justify-between lg:text-sm text-xs'>
                Số điện thoại
                {
                  user && user?.check_email?.phone ?
                    <div className='lg:w-[70%] w-[50%] border py-1 lg:py-2 px-4 rounded text-gray-600 overflow-hidden'>{user && user?.check_email?.phone}</div>
                    :
                    <Link href={''} className='lg:w-[70%] w-[40%] underline px-4 rounded text-sky-600'>thêm</Link>
                }
              </td>
            </tr>
          </tbody>
        </table>
        <section className='flex items-center justify-between my-5 py-5 border-t'>
          <span className='lg:text-xl text-sm'>Địa chỉ</span>
          <Button className='lg:text-sm text-xs px-2 lg:py-2 py-1.5 h-auto' onClick={handle_Show_Form_Create_Address}>Thêm địa chỉ +</Button>
        </section>
        <div ref={form_create_address} className='fixed -translate-x-1/2 scale-0 duration-200 top-1/4 left-3/4 z-[3]'>
          <Address_component id_user={user?.check_email?._id} />
        </div>
        <div onClick={handle_Close_Form_Create_Address} ref={bg_form_create_address}
          className='fixed hidden w-screen h-screen top-0 left-0 z-[2] bg-[#33333355]'></div>
        {isLoading && <Loading_Dots />}
        <div className='grid lg:grid-cols-2 lg:gap-x-10 gap-6'>
          {data?.data && data?.data.length > 0 ?
            data?.data?.map((item: any) => (
              <div key={item?._id} className="rounded py-3 border border-gray-300 lg:flex justify-between px-4 gap-x-6">
                <div className="text-sm flex flex-col gap-y-2 mb-2">
                  <span className="text-gray-700 sm:col-span-2">{item?.about_address?.user_name}</span>
                  <span className="text-gray-700 sm:col-span-2">{item?.about_address?.phone}</span>
                  <span className="text-gray-700 sm:col-span-2">{item?.about_address?.address}</span>
                </div>
                <div className='flex flex-col lg:items-end gap-y-1'>
                  <div>
                    <Link href={''} className="hover:underline text-sky-500 text-sm mx-2">Cập nhật</Link>
                    {!item?.status_address &&
                      <Alert_dialog dataProps={{
                        id_user: user?.check_email?._id,
                        id_address: item?._id,
                        remove_address: mutate_address?.mutate,
                        action: 'remove'
                      }} />
                    }
                  </div>
                  {(item?.status_address) ?
                    <div>
                      <Badge className='bg-green-500 hover:!bg-green-600'>Mặc định</Badge>
                    </div> :
                    <Alert_dialog dataProps={{
                      id_user: user?.check_email?._id,
                      id_address: item?._id,
                      change_default_address: mutate_address?.mutate
                    }} />
                  }
                </div>
              </div>
            )) :
            <div className='text-center'>Trống</div>
          }
        </div>
      </div >
      : <span>Loading..</span>
  )
}

export default Page
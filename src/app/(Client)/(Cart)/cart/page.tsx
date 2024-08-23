/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image'
import React, { Suspense, useEffect, useState } from 'react'
import LoadingCart from './loading';
import { Get_Items_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/query';
import { useRouter } from 'next/navigation';
import { Mutation_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/mutation_Cart';
import { io } from 'socket.io-client';
import { useToast } from '@/src/app/_Components/ui/use-toast';
import { ToastAction } from '@/src/app/_Components/ui/toast';
import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User';
import Table_Cart from './_components/table';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';


const Cart = () => {
  const { toast } = useToast();
  // socket
  useEffect(() => {
    const socket = io('http://localhost:8888')
    socket.on('res_message', (data: any) => {
      toast({
        title: "Thông báo!",
        description: `Rất tiếc, sản phẩm ${data?.name_item} không còn tồn tại!`,
        className: 'border border-gray-800',
        action: (
          <ToastAction altText="Goto schedule to undo">Ok</ToastAction>
        ),
      })
    })
  }, [])

  const routing = useRouter();
  const [content_note_order, setContent_note_order] = useState<string>('')
  const { mutate } = Mutation_Cart("CHECKED_AND_REMOVE_ALL");
  const user = useCheck_user() ?? undefined;
  useEffect(() => {
    if (!user) {
      routing.push('/')
    }
  }, [routing, user])
  const { data, isLoading } = Get_Items_Cart(user?.check_email?._id);
  const [arr_item_checkbox, setarr_item_checkbox] = useState<any>([]);
  useEffect(() => {
    if (!isLoading) {
      const new_arr: any = [];
      data?.items?.map((item: any) => (new_arr.push(item)));
      setarr_item_checkbox(new_arr);
    }
  }, [data, isLoading]);
  if (isLoading) {
    return (
      <LoadingCart />
    )
  };

  // console.count('re-render cart :');
  const data_checked_true = arr_item_checkbox.filter((item: any) => item?.status_checked && item);
  function remove_all_item_cart() {
    const item = {
      user_id: user?.check_email?._id,
      key_action: 'remove_all'
    };
    mutate(item);
  }

  function handle_Checkked(id_item: any, color_item: any, size_item: any) {
    const item = {
      user_id: user?.check_email?._id,
      id_item: id_item,
      color: color_item,
      size: size_item
    };
    mutate(item);
  }

  // notes_order
  function handle_notes_order(e: any) {
    setContent_note_order(e.target.value)
  }

  const data_item_next_order = data?.items?.filter((item: any) => (item?.status_checked && item));
  // next order
  function handle_next_order() {
    sessionStorage.removeItem('item_order');
    const item_cart_order = {
      ...data,
      items: data_item_next_order,
      notes_order: dataProps?.content_note_order,
      action: 'cart_item',
    }
    sessionStorage.setItem('item_order', JSON.stringify(item_cart_order));
    routing.push('/order');
  }

  // console.count('re-render : ')

  const dataProps = {
    data: data,
    content_note_order: content_note_order,
    data_item_next_order: data_item_next_order,
    user: user?.check_email,
    data_checked_true: data_checked_true,
    handle_Checkked: handle_Checkked,
    remove_all_item_cart: remove_all_item_cart
  }
  return (
    <Suspense fallback={<LoadingCart />}>
      <div className="max-w-[1440px] md:w-[90vw] mb:w-[342px] lg:pt-20 mb:pt-16 mx-auto grid lg:grid-cols-[67%_30%] mb:grid-cols-[100%] justify-between pb-10">
        {/* left */}
        <div>
          <span className="text-xl flex mb-[1px] items-center justify-between pb-6">Giỏ hàng của bạn <p className="text-[#9D9EA2] lg:text-base mb:text-sm">(3)</p></span>
          {/* list items */}
          <Table_Cart dataProps={dataProps} />
        </div>

        {/* right */}
        <div className="hidden lg:block">
          <div className="w-full lg:p-6 mb:p-5 rounded-lg border flex flex-col gap-y-[3px]">
            <div className="flex flex-col gap-y-4">
              <section className="flex justify-between text-sm">
                <span className="text-[#9D9EA2]">Tạm tính </span>
                <p className='text-red-600'>{data?.total_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
              </section>
              <section className="flex justify-between text-sm">
                <span className="text-[#9D9EA2]">Giảm giá </span>
                <p>0 đ</p>
              </section>
              <section className="flex justify-between text-sm">
                <span className="text-[#9D9EA2]">Chi phí vận chuyển </span>
                {/* <p>$50.00</p> */}
                <p>Free</p>
              </section>
            </div>
            {/* voucher */}
            <div className="flex items-center justify-between gap-x-3 *:h-12 *:border py-[19px]">
              <input type="text " placeholder="Enter Code (Chưa áp dụng)" className="px-3 text-sm py-2 rounded-lg outline-none font-light" />
              <button type='button' className="font-medium border border-black hover:bg-black hover:text-white duration-200 whitespace-nowrap text-sm rounded-[100px] px-5 py-2">Mã Voucher</button>
            </div>
            {/* *** */}
            <textarea onBlur={(e) => handle_notes_order(e)} name="" id="" className='border rounded p-2 outline-none text-light text-sm' placeholder='ghi chú của bạn (nếu có)'></textarea>
            <Button onClick={handle_next_order} type='button' className="flex gap-x-4 my-4">
              <span>Thanh toán</span>
              |
              <span>{data?.total_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            </Button>
            {/* payment */}
            <div className="flex flex-col gap-y-4 border-t mt-[3px] pt-[22px]">
              <span className="text-[#717378] text-sm">Thanh toán qua thẻ tín dụng</span>
              <div className="flex items-center gap-x-3 *:cursor-pointer *:w-[40px] *:h-[40px] *:border-none">
                <Image width={50} height={50} src="/Images/mastercard_v1.png" alt='' />
                <Image width={50} height={50} src="/Images/mastercard_v2.png" alt='' />
                <Image width={50} height={50} src="/Images/mastercard_v3.png" alt='' />
                <Image width={50} height={50} src="/Images/mastercard_v4.png" alt='' />
              </div>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="block lg:hidden mt-[35px]">
          <div className="w-full lg:p-6 mb:p-5 border rounded-2xl flex flex-col gap-y-[3px]">
            <div className="flex flex-col gap-y-4">
              <section className="flex justify-between text-sm">
                <span className="text-[#9D9EA2]">Tạm tính </span>
                <p className='text-red-600'>{data?.total_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
              </section>
              <section className="flex justify-between text-sm">
                <span className="text-[#9D9EA2]">Giảm giá </span>
                <p>$0.0</p>
              </section>
              <section className="flex justify-between text-sm">
                <span className="text-[#9D9EA2]">Chi phí vận chuyển </span>
                <p>Free</p>
              </section>
            </div>
            {/* voucher */}
            <div className="flex items-center justify-between gap-x-3 *:h-12 *:border py-[19px]">
              <input type="text" placeholder="Enter code" className="lg:px-3 mb:pl-[22px] mb:w-[150px] md:w-full rounded-lg text-sm lg:text-base" />
              <button type='button' className="font-medium border border-black hover:bg-black hover:text-white duration-200 whitespace-nowrap text-sm rounded-[100px] px-5 py-2">Mã Voucher</button>
            </div>
            {/* *** */}
            <textarea name="" id="" className='border rounded p-2 outline-none text-light text-sm' placeholder='ghi chú của bạn (nếu có)'></textarea>
            <Button onClick={handle_next_order} type='button' className='flex gap-x-4 my-4'>
              <span>Thanh toán</span>
              |
              <span>{data?.total_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            </Button>
            {/* check out */}
            <div className="flex flex-col gap-y-4 border-t mt-[3px] pt-[22px]">
              <span className="text-[#717378] text-sm">Thanh toán qua thẻ tín dụng</span>
              <div className="flex items-center gap-x-3 *:cursor-pointer *:w-[30px] *:h-[30px] *:border-none">
                <Image width={50} height={50} src="/Images/mastercard_v1.png" alt='' />
                <Image width={50} height={50} src="/Images/mastercard_v2.png" alt='' />
                <Image width={50} height={50} src="/Images/mastercard_v3.png" alt='' />
                <Image width={50} height={50} src="/Images/mastercard_v4.png" alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense >
  )
}

export default Cart
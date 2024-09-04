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
import Breadcrum from '@/src/app/_Components/breadcrum/breadcrum';

const Cart = () => {
  const { toast } = useToast();
  // socket
  useEffect(() => {
    const socket = io('http://localhost:8888')
    socket.on('res_message_delete_item', (data: any) => {
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

  const data_item_checkked = data?.items?.filter((item: any) => (item?.status_checked && item));
  function showToast(productName: string | number, stock: string | number) {
    toast({
      title: "Thông báo!",
      description: `Rất tiếc, sản phẩm ${productName} chỉ còn ${stock} chiếc. Vui lòng giảm số lượng thanh toán!`,
      className: 'border border-gray-800',
      action: (
        <ToastAction altText="Goto schedule to undo">Ok</ToastAction>
      ),
    });
  }
  // next order
  function next_page_payment() {
    // check so luong
    for (let i of data_item_checkked) {
      if (i?.product_id?.attributes) {
        for (let j of i?.product_id?.attributes?.varriants) {
          for (let k of j?.size_item) {
            if (i?.size_attribute_item) {
              if (i?.color_item === j?.color_item && i?.quantity > k?.stock_item && i?.size_attribute_item === k?.name_size) {
                showToast(i?.product_id?.short_name, k?.stock_item)
                return null;
              }
            }
            if (i?.color_item === j?.color_item && i?.quantity > k?.stock_item) {
              showToast(i?.product_id?.short_name, k?.stock_item)
              return null;
            }
          }
        }
      }
      else {
        if (i?.quantity > i?.product_id?.stock) {
          showToast(i?.product_id?.short_name, i?.product_id?.stock)
          return null;
        }
      }
    }
    routing.push('/checkout');
  }
  // console.count('re-render : ')
  const dataProps = {
    data: data,
    data_item_checkked: data_item_checkked,
    user: user?.check_email,
    data_checked_true: data_checked_true,
    handle_Checkked: handle_Checkked,
    remove_all_item_cart: remove_all_item_cart
  }
  return (
    <Suspense fallback={<LoadingCart />}>
      <div className="max-w-[1440px] w-[95vw] mx-auto pb-8">
        <div className='max-w-[1440px] mx-auto w-[95vw] mx-auto mb-4 mt-2'>
          <Breadcrum textProps={{ name_item: 'Giỏ hàng' }} />
        </div>
        {/* list items */}
        <Table_Cart dataProps={dataProps} />

        <div className="w-full rounded-lg lg:flex items-center justify-between bg-white py-2 px-4 lg:p-4 gap-x-4 sticky bottom-0 z-[10] shadow-[0_-5px_20px_-15px_rgba(0,0,0,0.3)] mt-8">
          <span className="text-gray-800 whitespace-nowrap text-sm lg:text-base">Số lượng ({data_item_checkked?.length} sản phẩm)</span>
          <Button onClick={next_page_payment} type='button' className="flex gap-x-4 mt-2 lg:mt-0">
            <span>Tiến hành thanh toán</span>
            |
            <span>{data?.total_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
          </Button>
        </div>
      </div>
    </Suspense >
  )
}

export default Cart
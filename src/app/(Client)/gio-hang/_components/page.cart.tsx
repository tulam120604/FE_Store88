/* eslint-disable @next/next/no-img-element */
'use client';

import React, { Suspense, useEffect, useState } from 'react'
import LoadingCart from '../loading';
import { Get_Items_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/query';
import { useRouter } from 'next/navigation';
import { Mutation_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/mutation_Cart';
import { io } from 'socket.io-client';
import { useToast } from '@/src/app/_Components/ui/use-toast';
import { ToastAction } from '@/src/app/_Components/ui/toast';
import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User';
import Table_Cart from './table';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import Breadcrum from '@/src/app/_Components/breadcrum/breadcrum';
import { filter_positive_Stock_Item } from '@/src/app/_lib/Config/Filter_Cart_And_Order';

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
  }, []);

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

  function handle_Checkked(id_item: any, name_varriant: any, value_varriant: any) {
    const item = {
      user_id: user?.check_email?._id,
      id_item: id_item,
      varriant_1: name_varriant,
      varriant_2: value_varriant
    };
    mutate(item);
  }

  const data_item_checkked = data?.items?.filter((item: any) => (item?.status_checked && item));
  // lọc item số lượng lớn hơn 0
  const positive_Stock_Item = filter_positive_Stock_Item(data_checked_true);
  const tota_price_item = positive_Stock_Item?.reduce((acc: any, curr: any) => (acc + curr?.total_price_item), 0);
  function showToast(productName: string | number, stock: string | number) {
    toast({
      title: "Thông báo!",
      description: ` ${(+stock > 0) ? `Rất tiếc, sản phẩm ${productName} chỉ còn ${stock} chiếc. Vui lòng giảm số lượng thanh toán!` : `Rất tiếc, sản phẩm ${productName} đã hết hàng!`}`,
      className: 'border border-gray-800',
      action: (
        <ToastAction altText="Goto schedule to undo">Ok</ToastAction>
      ),
    });
  }
  // next order
  function next_page_payment() {
    // check so luong
    for (let i of positive_Stock_Item) {
      if (i?.product_id?.variant) {
        const check_attribute = i?.product_id?.variant?.variants?.find((value: any) => value?.attribute === i?.name_varriant);
        const check_name_variant = check_attribute?.value_variants?.find((value: any) =>
          i?.value_varriant === (value?.name_variant?.trim() ? value?.name_variant : undefined));
        if (check_attribute?.attribute === i?.name_varriant && check_name_variant?.name_variant === i?.value_varriant
          && i?.quantity > check_name_variant?.stock_variant) {
          showToast(i?.product_id?.short_name, check_name_variant?.stock_variant);
          return null
        }
        if (check_attribute?.attribute === i?.name_varriant && i?.quantity > check_name_variant?.stock_variant) {
          showToast(i?.product_id?.short_name, check_name_variant?.stock_variant);
          return null
        }
      }
      else if (i?.quantity > i?.product_id?.stock) {
        showToast(i?.product_id?.short_name, i?.product_id?.stock)
        return null;
      }
    }
    if (data_item_checkked?.length > 0) {
      routing.push('/thanh-toan');
    }
    else {
      toast({
        description: `Vui lòng chọn sản phẩm để tiến hành thanh toán!`,
        className: 'border border-gray-800',
        duration: 1000,
      });
    }
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
        <div className='max-w-[1440px] mx-auto w-[95vw] mb-4 pt-2'>
          <Breadcrum textProps={{ name_item: 'Giỏ hàng' }} />
        </div>
        {/* list items */}
        <Table_Cart dataProps={dataProps} />
        <div className="w-full rounded-lg flex flex-col lg:flex-row items-center lg:justify-between justify-center bg-white py-2 px-4 lg:p-4 gap-x-4 sticky bottom-0 z-[10] shadow-[0_-5px_20px_-15px_rgba(0,0,0,0.3)] mt-8">
          <span className="text-gray-800 whitespace-nowrap text-sm lg:text-base">Số lượng ({data_item_checkked?.length} sản phẩm)</span>
          <Button onClick={next_page_payment} type='button' className="flex gap-x-4 mt-2 lg:mt-0">
            <span>Tiến hành thanh toán</span>
            |
            <span>{tota_price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
          </Button>
        </div>
      </div>
    </Suspense >
  )
}
export default Cart
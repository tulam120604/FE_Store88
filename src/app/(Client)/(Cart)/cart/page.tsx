/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image'
import React, { Suspense, use, useEffect, useRef, useState } from 'react'
import LoadingCart from './loading';
import { Get_Items_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/query';
import Link from 'next/link';
import Btn_dow from './_options/btn_dow';
import Btn_up from './_options/btn_up';
import Remove_Item_Cart from './_options/remove';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/app/_Components/ui/Tables/table';
import { Checkbox } from '@/src/app/_Components/ui/Shadcn/checkbox';
import { Mutation_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/mutation_Cart';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/app/_Components/ui/alert-dialog";
import { io } from 'socket.io-client';
import { useToast } from '@/src/app/_Components/ui/use-toast';
import { ToastAction } from '@/src/app/_Components/ui/toast';
import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User';


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

  // total_price
  // next order
  const data_item_next_order = data?.items?.filter((item: any) => (item?.status_checked && item));
  function handle_next_order() {
    sessionStorage.removeItem('item_order');
    const item_cart_order = {
      ...data,
      items: data_item_next_order,
      notes_order: content_note_order,
      action: 'cart_item',
    }
    sessionStorage.setItem('item_order', JSON.stringify(item_cart_order));
    routing.push('/order');
  }

  // console.count('re-render : ')
  return (
    <Suspense fallback={<LoadingCart />}>
      <div className="max-w-[1440px] md:w-[90vw] mb:w-[342px] lg:pt-20 mb:pt-16 mx-auto grid lg:grid-cols-[67%_30%] mb:grid-cols-[100%] justify-between pb-10">
        {/* left */}
        <div>
          <span className="text-xl flex mb-[1px] items-center justify-between pb-6">Giỏ hàng của bạn <p className="text-[#9D9EA2] lg:text-base mb:text-sm">(3)</p></span>
          {/* list items */}
          <Table className="bg-[#F5F5FA] text-gray-900">
            <TableHeader>
              <TableRow className="*:font-medium border-gray-500 *:text-gray-800 !hover:none">
                <TableHead>
                  <Checkbox checked={(data_item_next_order?.length == data?.items?.length && data?.items?.length > 0) ? true : false} />
                </TableHead>
                <TableHead className='w-[100px]'>Ảnh</TableHead>
                <TableHead />
                <TableHead>Đơn giá</TableHead>
                <TableHead className='text-center'>Số lượng</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead className="px-2 w-[30px] !text-red-600">
                  <AlertDialog>
                    {data_checked_true.length > 0 ?
                      <AlertDialogTrigger>
                        Xóa
                      </AlertDialogTrigger> :
                      <span className='cursor-pointer opacity-50'>Xóa</span>
                    }
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa {data_checked_true.length} sản phẩm trong giỏ?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500" onClick={remove_all_item_cart}>Xác nhận</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableHead>
              </TableRow>
            </TableHeader>
            {
              (typeof data == 'object') && (<>
                {(data?.items?.length > 0) ? (<>
                  {
                    <TableBody>
                      {
                        data?.items?.map((item: any) => {
                          return (
                            item?.quantity_by_item > 0 ?
                              <TableRow key={item._id} className="border-y border-gray-300">
                                <TableCell>
                                  <Checkbox checked={item?.status_checked && true} onClick={() => handle_Checkked(item?.product_id, item?.color_item, item?.size_attribute_item)} />
                                </TableCell>
                                <TableCell className="h-[120px]">
                                  <Link href={`/${item?.product_id?._id}`}> <img width={50} height={50} className="relative bg-[#f2f2f2f2] p-2 z-[1] w-full h-full duration-300" 
                                  src={item?.product_id?.gallery[0]} alt='loading...' /></Link>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col gap-y-2 md:text-base mb:text-xs max-w-[200px]">
                                    <Link href={`/${item?.product_id?._id}`}>
                                      <span className='line-clamp-1'>{item?.product_id?.short_name}</span>
                                    </Link>
                                    <div className='flex flex-col'>
                                      <span className='text-sm'>{item?.color_item}</span>
                                      <span className='text-sm'>{item?.size_attribute_item}</span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell><span className="md:text-base mb:text-xs text-red-600">{item?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></TableCell>
                                <TableCell>
                                  <div className="w-[90%] mx-auto grid grid-cols-3 *:text-gray-900 gap-x-1 items-center justify-around *:md:text-base *:mb:text-xs px-1 rounded-lg *:font-medium">
                                    <Btn_dow id_props={{ id_item: item?.product_id?._id, id_user: user?.check_email, quantity_item: item?.quantity, color: item?.color_item, size_attribute: item?.size_attribute_item }} />
                                    <strong className="cursor-default border h-full grid place-items-center rounded">{item?.quantity}</strong>
                                    <Btn_up id_props={{ id_item: item?.product_id?._id, id_user: user?.check_email, dataItems: item, color: item?.color_item, size_attribute: item?.size_attribute_item }} />
                                  </div>
                                </TableCell>
                                <TableCell><span className="md:text-base mb:text-xs text-red-600">{(item?.total_price_item)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></TableCell>
                                <TableCell>
                                  <Remove_Item_Cart id_props={{ item: item?._id, id_user: user?.check_email }} />
                                </TableCell>
                              </TableRow>
                              :
                              <TableRow key={item._id} className="border-y relative after:absolute after:w-[95%] after:h-full after:bg-gradient-to-r after:from-[#33333333] to-[#33333388] after:rounded after:z-[2] after:left-0">
                                <TableCell>
                                  <Checkbox checked={item?.status_checked && true} onClick={() => handle_Checkked(item?.product_id, item?.color_item, item?.size_attribute_item)} />
                                </TableCell>
                                <TableCell>
                                  <span className='absolute text-red-500 font-bold top-0 z-[3] py-6 whitespace-nowrap bg-[#ffffff22] px-4'>Hết hàng!</span>
                                  <img width={50} height={50} className="relative bg-[#f2f2f2f2] p-2 z-[1] w-full h-full duration-300" src={item?.product_id?.feature_product} alt='loading...' />
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col gap-y-2 md:text-base mb:text-xs max-w-[200px]">
                                    <Link href={`/products/${item?.product_id?._id}`}>
                                      <span className='line-clamp-1'>{item?.product_id?.short_name}</span>
                                    </Link>
                                    <div className='flex flex-col'>
                                      {
                                        item?.color_item && <span className='text-sm'>{item?.color_item}</span>
                                      }
                                      {
                                        item?.size_attribute_item && <span className='text-sm'>RAM : {item?.size_attribute_item} GB</span>
                                      }
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell><span className="md:text-base mb:text-xs text-red-500">{item?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></TableCell>
                                <TableCell>
                                  <div className="w-[80%] flex gap-x-4 items-center justify-around md:py-2 mb:py-1 *:md:text-base *:mb:text-xs px-1 rounded-lg *:font-medium">
                                    <Btn_dow id_props={{ item: item?.product_id?._id, id_user: user?.check_email }} />
                                    <strong className="cursor-default">{item?.quantity}</strong>
                                    <Btn_up id_props={{ item: item?.product_id?._id, id_user: user?.check_email, quantity_items_cart: item?.quantity }} />
                                  </div>
                                </TableCell>
                                <TableCell ><span className="md:text-base mb:text-xs text-red-500">{(item?.total_price_item)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></TableCell>
                                <TableCell>
                                  <Remove_Item_Cart id_props={{ item: item?.product_id?._id, id_user: user?.check_email }} />
                                </TableCell>
                              </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  }
                </>) :
                  <tbody className='flex items-center whitespace-nowrap my-4'>Chưa có sản phẩm nào trong giỏ ! <Link className='underline' href={'/products'}>Mua ngay</Link></tbody>}
              </>)
            }
          </Table>
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
            <button onClick={handle_next_order} type='button' className="bg-black hover:bg-white hover:text-black border border-black duration-300 px-10 h-14 rounded-[100px] text-white flex my-[13px] gap-x-4 place-items-center justify-center">
              <span>Thanh toán</span>
              |
              <span>{data?.total_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            </button>
            {/* payment */}
            <div className="flex flex-col gap-y-4 border-t mt-[3px] pt-[22px]">
              <span className="text-[#717378] text-sm">Thanh toán qua thẻ tín dụng (Chưa áp dụng)</span>
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
            <button onClick={handle_next_order} type='button' className="bg-black hover:bg-white hover:text-black border border-black duration-300 px-10 h-14 rounded-[100px] text-white flex my-[13px] gap-x-4 place-items-center justify-center">
              <span>Thanh toán</span>
              |
              <span>{data?.total_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            </button>
            {/* check out */}
            <div className="flex flex-col gap-y-4 border-t mt-[3px] pt-[22px]">
              <span className="text-[#717378] text-sm">Thanh toán qua thẻ tín dụng (Chưa áp dụng)</span>
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
'use client';

import React from 'react'
import Link from 'next/link';
import { Checkbox } from '@/src/app/_Components/ui/Shadcn/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/app/_Components/ui/alert-dialog";
import Image from 'next/image';
import Btn_dow from './btn_dow';
import Btn_up from './btn_up';
import Remove_Item_Cart from './remove';
import Het_hang from './het_hang';
import { convert_Slug } from '@/src/app/util/Slug';
import { Store } from 'lucide-react';

export default function Table_Cart({ dataProps }: any) {
    return (
        <div>
            {/* header table*/}
            <div className='hidden lg:block '>
                <div className='grid lg:grid-cols-[20px_100px_300px_150px_150px_160px_200px_50px] justify-between bg-white p-4 rounded-lg'>
                    {/* 88 */}
                    <Checkbox checked={(dataProps?.data_item_checkked?.length == dataProps?.data?.items?.length && dataProps?.data?.items?.length > 0) ? true : false} />
                    {/* 88 */}
                    <span>Sản phẩm</span>
                    {/* 88 */}
                    <span></span>
                    {/* 88 */}
                    <span></span>
                    {/* 88 */}
                    <span>Đơn giá</span>
                    {/* 88 */}
                    <span className='translate-x-[20%]'>Số lượng</span>
                    {/* 88 */}
                    <span>Tạm tính</span>
                    {/* 88 */}
                    <div className="px-2 !text-red-600">
                        <AlertDialog>
                            {dataProps?.data_checked_true.length > 0 ?
                                <AlertDialogTrigger>
                                    Xóa
                                </AlertDialogTrigger> :
                                <span className='cursor-pointer opacity-50'>Xóa</span>
                            }
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Xác nhận xóa {dataProps?.data_checked_true.length} sản phẩm trong giỏ?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-500" onClick={dataProps?.remove_all_item_cart}>Xác nhận</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
            {/* body table */}
            {
                (typeof dataProps?.data == 'object') && (<>
                    {(dataProps?.data?.items?.length > 0) ? (<>
                        {
                            dataProps?.data?.items?.map((item: any) => {
                                return (
                                    <div className="lg:grid lg:grid-cols-[20px_100px_300px_150px_150px_160px_200px_50px] p-4 rounded-lg bg-white my-4 justify-between 
                                    items-center py-4 relative flex flex-wrap gap-4" key={item._id}>
                                        <Het_hang dataProps={item} />
                                        {/* 88 */}
                                        <Checkbox checked={item?.status_checked && true} onClick={() => dataProps?.handle_Checkked(item?.product_id, item?.color_item, item?.size_attribute_item)} />
                                        {/* 88 */}
                                        <Link href={`/${convert_Slug(item?.product_id?.short_name)}.html?p=${item?.product_id?._id}`}>
                                            <Image width={150} height={150} className="relative bg-[#f2f2f2f2] z-[1] rounded w-20 h-20 lg:w-full lg:h-full duration-300"
                                                src={item?.product_id?.gallery[0]} alt='loading...' />
                                        </Link>
                                        {/* 88 */}
                                        <div className="flex flex-col gap-y-2 md:text-base mb:text-xs lg:w-[300px] w-[170px] h-full">
                                            <section className='flex gap-x-4 items-center *:truncate'>
                                                <span>{item?.product_id?.id_user_seller?.user_name}</span>
                                                <Link className='text-sm p-1 underline text-gray-700 rounded flex items-center hover:text-black'
                                                    href={`shops?id=${item?.product_id?.id_user_seller?._id}`}>
                                                    <Store className='h-4 text-gray-700' />Xem shop</Link>
                                            </section>
                                            <Link href={`/${convert_Slug(item?.product_id?.short_name)}.html?p=${item?.product_id?._id}`}>
                                                <span className='line-clamp-2'>{item?.product_id?.short_name}</span>
                                            </Link>
                                        </div>
                                        {/* 88 */}
                                        <div className="flex flex-col gap-y-2 md:text-base mb:text-xs lg:w-[150px] w-[70px]">
                                            {
                                                item?.color_item &&
                                                <div className='flex flex-col text-gray-600'>
                                                    <span className='mb-1 lg:mb-3'>Phân loại :</span>
                                                    <span className='text-xs'>{item?.color_item} ,</span>
                                                    <span className='text-xs'>{item?.size_attribute_item}</span>
                                                </div>
                                            }

                                        </div>
                                        {/* 88 */}
                                        <span className="md:text-base mb:text-xs text-red-600">{item?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                        {/* 88 */}
                                        <div className="w-[140px] grid grid-cols-3 *:text-gray-900 gap-x-1 items-center justify-around *:md:text-base *:mb:text-xs px-1 rounded-lg *:font-medium">
                                            <Btn_dow id_props={{ id_item: item?.product_id?._id, id_user: dataProps?.user, quantity_item: item?.quantity, color: item?.color_item, size_attribute: item?.size_attribute_item }} />
                                            <strong className="cursor-default border py-2 border-gray-300 grid place-items-center rounded">{item?.quantity}</strong>
                                            <Btn_up id_props={{ item: item, id_user: dataProps?.user }} />
                                        </div>
                                        {/* 88 */}
                                        <span className="md:text-base mb:text-xs text-red-600">{(item?.total_price_item)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                        {/* 88 */}
                                        <div className='w-full flex justify-center'>
                                            <Remove_Item_Cart id_props={{ item: item?._id, id_user: dataProps?.user }} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>) :
                        <div className='flex items-center whitespace-nowrap my-4'>Chưa có sản phẩm nào trong giỏ ! <Link className='underline' href={'/products'}>Mua ngay</Link></div>}
                </>)
            }
        </div>
    )
}
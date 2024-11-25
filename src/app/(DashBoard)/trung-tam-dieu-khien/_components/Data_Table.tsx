import { AlertDialog, AlertDialogCancel, AlertDialogTrigger } from '@/src/app/_Components/ui/alert-dialog'
import { AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/src/app/_Components/ui/dialog/alert-dialog'
import { ArchiveRestore, ChevronUp, FilePenLine, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Data_Table({ dataProps }: any) {
    return (<>
        <div className="grid text-gray-900 grid-cols-[70px_180px_150px_100px_150px_100px_150px_auto] gap-x-4 items-center justify-between p-4 text-sm whitespace-nowrap">
            <span>Ảnh</span>
            <span>Tên</span>
            <span>Thể loại</span>
            <span>Doanh số</span>
            <span>Giá tiền</span>
            <span>Số lượng</span>
            <span>Xuất xứ</span>
            <span>Thao tác</span>
        </div>
        {
            dataProps?.dataTable?.map((data: any) => {
                return (
                    <div key={data?._id} className="flex flex-col w-full text-gray-800 border-t border-gray-300 text-sm">
                        <div className="grid grid-cols-[70px_180px_150px_100px_150px_100px_150px_auto] gap-x-4 items-center justify-between p-4">
                            {/* image */}
                            <Image width={100} height={100} className="rounded border" src={data?.gallery[0]} alt="Loading..." />
                            {/* name */}
                            <span className="line-clamp-3">{data?.short_name}</span>
                            {/* category */}
                            <span className="line-clamp-2">{data?.category_id?.category_name}</span>
                            {/* sales */}
                            <span className="line-clamp-2">{!data?.attributes && data?.sale_quantity}</span>
                            {/* price */}
                            <span className="line-clamp-2 text-red-500">{data?.price_product?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                            {/* stock */}
                            <span className="line-clamp-2">{data?.stock}</span>
                            {/* made in */}
                            <span className="line-clamp-2">{data?.made_in}</span>
                            {/* options */}
                            <div className="flex justify-center items-center gap-x-2 *:duration-200">
                                {
                                    dataProps?.action === 'recycle' ?
                                        <button className="hover:scale-110" onClick={() => dataProps?.handle_Restore_or_Destroy(data?._id, 'restore')}>
                                            <ArchiveRestore className='h-5' />
                                        </button>
                                        :
                                        <Link href={`/adminstrations/products/${data?._id}`} className="*:hover:text-black ">
                                            <FilePenLine className='h-5 text-gray-700' />
                                        </Link>
                                }
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Trash2 className="text-red-500 w-5 h-5 hover:text-red-700" />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Xác nhận xóa sản phẩm?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                {
                                                    dataProps?.action === 'recycle' ?
                                                        `Bạn chắc chắn xóa sản phẩm mã ${data?._id} ? Điều này sẽ không thể khôi phục lại sản phẩm!` :
                                                        `Bạn chắc chắn xóa sản phẩm mã ${data?._id} ? Bạn có thể khôi phục tại thùng rác.`
                                                }
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                            {
                                                dataProps?.action === 'recycle' ?
                                                    <AlertDialogAction className="hover:scale-110 bg-red-500" onClick={() => dataProps?.handle_Restore_or_Destroy(data?._id, 'destroy')}>Xác nhận</AlertDialogAction>
                                                    :
                                                    <AlertDialogAction className="bg-red-500" onClick={() => dataProps?.handle_Remove({ id_item: data?._id, name_item: data?.short_name })}>Xác nhận</AlertDialogAction>
                                            }
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                        {/* options */}
                        {
                            data?.variant &&
                            <details className="group [&_summary::-webkit-details-marker]:hidden" open={true}>
                                <summary
                                    className="flex cursor-pointer items-center justify-between px-4 py-1 w-[100px] mx-auto ">
                                    <span className="group-open:block hidden">Đóng</span>
                                    <span className="group-open:hidden">Hiện</span>
                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <ChevronUp className="h-4" />
                                    </span>
                                </summary>
                                {
                                    data?.variant &&
                                    (
                                        data?.variant?.variants?.map((item: any) => (
                                            item?.value_variants?.map((value: any) => (
                                                <div key={item?._id} className="grid border-t duration-200 border-gray-300 gap-x-4 grid-cols-[100px_180px_150px_100px_150px_100px_150px_80px] 
                                                items-center text-start justify-between py-4">
                                                    <div></div>
                                                    {/* attributes */}
                                                    <div className="flex gap-x-2 w-full">
                                                        <span className="line-clamp-3">{item?.attribute}</span>
                                                        {value?.name_variant && ' - '}
                                                        <span className="line-clamp-3">{value?.name_variant}</span>
                                                    </div>
                                                    {/* div giả */}
                                                    <div></div>
                                                    {/* sales */}
                                                    <span>{value?.sales_item}</span>
                                                    {/* price */}
                                                    <span className="line-clamp-1 text-red-600">{value?.price_attribute?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                                    {/* quantity */}
                                                    <div>
                                                        {
                                                            value?.stock_variant > 0 ?
                                                                <span className="line-clamp-2">{value?.stock_variant}</span> :
                                                                <span className="line-clamp-2 text-red-500">Hết hàng!</span>
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        ))
                                    )
                                }
                            </details>
                        }
                    </div>
                )
            })
        }
    </>)
}

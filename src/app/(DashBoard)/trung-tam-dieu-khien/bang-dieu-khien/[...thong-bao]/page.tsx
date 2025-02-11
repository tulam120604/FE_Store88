'use client';

import { Mutation_Auth } from '@/src/app/_lib/Query_APIs/Auth/Auth_mutation';
import { Query_Notification } from '@/src/app/_lib/Query_APIs/Notification/Query_Notification';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { io } from 'socket.io-client';
import { AlertDialog } from '@/src/app/_Components/ui/alert-dialog';
import { Mutation_Notification } from '@/src/app/_lib/Query_APIs/Notification/Mutation_Notification';
import {
    AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/src/app/_Components/ui/dialog/alert-dialog';
import { CircleCheck } from 'lucide-react';
import React, { Suspense, useEffect } from 'react'
import Link from 'next/link';


export default function Page() {
    const socket = io('http://localhost:8888')
    let user: any;
    if (typeof window !== 'undefined') {
        user = JSON.parse(localStorage.getItem('account') || '{}') ?? ''
    }
    const data = Query_Notification();
    const mutate_notification = Mutation_Notification('SEND');
    function sendMessage(item: any) {
        if (!item?.status_message) {
            const data_body = {
                id_item: item,
                sender_id: user?.check_email?._id,
            }
            mutate_notification.mutate(data_body);
        }
    }

    useEffect(() => {
        socket.on('disconnect', () => {
            socket.disconnect()
        })
        return () => { socket.disconnect() }
    }, [socket])

    // cap quyen ban hang cho tai khoan
    const cap_quyen_tai_khoan = Mutation_Auth({
        action: 'SET_ROLE_USER_TO_SELLER'
    });

    function onSubmitGranting(dataForm: any) {
        const item = {
            id_user: dataForm,
            accessToken: ''
        }
        cap_quyen_tai_khoan?.onSubmit(item);
        sendMessage(item);
        socket.emit('xac_nhan_cap_quyen_tai_khoan', 'Đại vương có 1 thông báo mới!')
    }

    return (
        <Suspense>
            <div className='text-gray-900 py-4 !px-0'>
                {
                    cap_quyen_tai_khoan?.isLoading &&
                    <div className='fixed bg-[#33333333] w-screen h-screen top-0 z-[2] left-0'>
                        <Loading_Dots />
                    </div>
                }
                <ul className="space-y-2">
                    {
                        data?.data?.data_notification ?
                            (
                                data?.data?.data_notification?.map((item: any) => {
                                    return <AlertDialog key={item?._id}>
                                        <AlertDialogTrigger asChild onClick={() => (!item?.notes) && sendMessage(item)}>
                                            <li className='block h-full rounded-lg bg-white shadow-lg p-4 hover:shadow-xl cursor-pointer *:flex *:justify-between duration-200'>
                                                <div>
                                                    <strong className="font-medium text-gray-800">Từ {item?.sender_id?.user_name}</strong>
                                                    {item.status_message &&
                                                        <span className='text-sm flex gap-x-2 items-center font-medium text-gray-800'><CircleCheck className='w-4 text-green-500' />Đã xem </span>
                                                    }
                                                </div>
                                                <div>
                                                    <div>
                                                        <p className="mt-1 text-sm font-medium text-gray-800">
                                                            Nội dung: {item?.notification_message}
                                                        </p>
                                                        {item?.notes &&
                                                            <p className="mt-1 text-sm font-medium text-gray-800">
                                                                Địa chỉ: {item?.notes}
                                                            </p>}
                                                    </div>

                                                    <p className="mt-1 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                        {item?.createdAt?.slice(0, 10)}
                                                    </p>
                                                </div>
                                            </li>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='border-none text-gray-900'>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Từ {item?.sender_id?.user_name}</AlertDialogTitle>
                                                <AlertDialogDescription className='!text-gray-800'>
                                                    {item?.notification_message}
                                                    {
                                                        item?.link &&
                                                        <Link href={`/adminstrations/orders/detail_order?id=${item?.link}`} className='underline ml-1 text-sky-500'>Chi tiết</Link>
                                                    }
                                                </AlertDialogDescription>
                                                {item?.notes &&
                                                    <AlertDialogDescription className='!text-gray-800'>
                                                        Địa chỉ: {item?.notes}
                                                    </AlertDialogDescription>
                                                }
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className='flex !justify-between w-full items-end'>
                                                <AlertDialogDescription className='!text-gray-800'>- {item?.createdAt?.slice(0, 10)} -</AlertDialogDescription>
                                                <div className='flex gap-x-3'>
                                                    {
                                                        item?.notes &&
                                                        <AlertDialogCancel onClick={() => onSubmitGranting(item)} className='text-gray-100 border-none bg-green-600 hover:!bg-green-800 hover:!text-gray-200'>
                                                            Chấp nhận
                                                        </AlertDialogCancel>
                                                    }
                                                    <AlertDialogCancel className='text-gray-800' onClick={() => sendMessage(item)}>Đóng</AlertDialogCancel>
                                                </div>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                })
                            ) :
                            <span>Không có thông báo nào!</span>
                    }
                </ul>
            </div>
        </Suspense>

    )
}

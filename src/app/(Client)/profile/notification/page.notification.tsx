'use client'

import { Mutation_Notification } from '@/src/app/_lib/Tanstack_Query/Notification/Mutation_Notification'
import { Query_Notification } from '@/src/app/_lib/Tanstack_Query/Notification/Query_Notification'
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/src/app/_Components/ui/dialog/alert-dialog'
import { CircleCheck } from 'lucide-react'
import Image from 'next/image'
import { io } from 'socket.io-client'
import React, { useEffect } from 'react'
import { useToast } from '@/src/app/_Components/ui/use-toast'
import { ToastAction } from '@/src/app/_Components/ui/toast'
import Link from 'next/link'
import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User'


const Page_notification = () => {
  const data_user = useCheck_user();
  const { toast } = useToast()
  const user = data_user ?? '';
  const data = Query_Notification(user?.check_email?._id);
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
    const socket = io('http://localhost:8888')
    socket.on('notification_granting_premission_account', (data: string) => {
      console.log(data)
      toast({
        title: "Thông báo!",
        description: data,
        className: 'border border-gray-800',
        action: (
          <ToastAction altText="Goto schedule to undo">Ok</ToastAction>
        ),
      })
    })
  }, [])


  return (
    <div className='pl-4 lg:pl-10'>
      <strong className='text-lg'>Thông báo của bạn </strong>
      <div className='pb-10 pt-5'>
        {
          data?.isLoading &&
          <Loading_Dots />
        }
        <ul className="space-y-2">
          {
            (data?.data?.data_notification.length || data?.data?.data_notification.length?.length > 0) ?
              (
                data?.data?.data_notification?.map((item: any) => (
                  <AlertDialog key={item?._id}>
                    <AlertDialogTrigger asChild onClick={() => sendMessage(item)}>
                      <li className='block h-full rounded-lg border border-gray-300 p-4 hover:border-gray-500 cursor-pointer *:flex *:justify-between'>
                        <div>
                          <strong className="font-medium">Từ {item?.sender_id?.user_name}</strong>
                          {item.status_message &&
                            <span className='text-sm flex gap-x-2 items-center font-medium'><CircleCheck className='w-4 text-green-500' />Đã xem </span>
                          }
                        </div>
                        <div className='flex gap-x-10'>
                          <div>
                            <p className="mt-1 text-sm font-medium line-clamp-1">
                              Nội dung: {item?.notification_message}
                            </p>
                            {item?.notes &&
                              <p className="mt-1 text-sm font-medium ">
                                Địa chỉ: {item?.notes}
                              </p>}
                          </div>

                          <p className="mt-1 text-sm font-medium whitespace-nowrap">
                            {item?.createdAt?.slice(0, 10)}
                          </p>
                        </div>
                      </li>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='border-none'>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Từ {item?.sender_id?.user_name}</AlertDialogTitle>
                        <AlertDialogDescription>
                          Nội dung: {item?.notification_message}
                        </AlertDialogDescription>
                        {item?.notes &&
                          <AlertDialogDescription>
                            Địa chỉ: {item?.notes}
                          </AlertDialogDescription>
                        }
                      </AlertDialogHeader>
                      <AlertDialogFooter className='flex !justify-between w-full items-end'>
                        <AlertDialogDescription>- {item?.createdAt?.slice(0, 10)} -</AlertDialogDescription>
                        <div className='flex gap-x-3'>
                          {item?.notes &&
                            <AlertDialogCancel className='text-gray-100 border-none bg-indigo-600 hover:!bg-indigo-800 hover:!text-gray-200'>
                              <Link href={'/login'}>Đăng nhập lại</Link>
                            </AlertDialogCancel>
                          }
                          <AlertDialogCancel className='text-gray-800'>Đóng</AlertDialogCancel>
                        </div>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ))
              ) :
              <div className='grid place-items-center min-h-[50vh]'>
                <div className='flex flex-col items-center gap-y-6'>
                  <Image width={100} height={100} src='/Images/no_bell.png' alt=''></Image>
                  <span>Bạn không có thông báo gì !</span>
                </div>
              </div>
          }
        </ul>
      </div>
    </div>
  )
}

export default Page_notification
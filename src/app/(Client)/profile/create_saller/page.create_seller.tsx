'use client'

import { Mutation_Notification } from '@/src/app/_lib/Tanstack_Query/Notification/Mutation_Notification'
import { Button } from '@/src/app/_Components/ui/Shadcn/button'
import { Checkbox } from '@/src/app/_Components/ui/Shadcn/checkbox'
import { io } from 'socket.io-client'
import Link from 'next/link'
import React from 'react'
import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User'

export default function Page() {
    const data_user = useCheck_user();
    const socket = io('http://localhost:8888')
    const user = data_user ?? '';
    const mutate_notification = Mutation_Notification('ADD');
    function onSendMessage(dataForm: any) {
        const data_body = {
            sender_id: user?.check_email?._id,
            receiver_id: 'admin@admin.com',
            notification_message: dataForm?.note_shop,
            notes: dataForm?.address_shop,
            user_name: dataForm?.name_shop,
            email: dataForm?.email_shop,
            phone: dataForm?.phone_shop,
        }
        mutate_notification.mutate(data_body);
        socket.emit('create_seller_message', `Đại vương có 1 thông báo mới từ ${user?.check_email?.user_name}`)
    }
    return (
        <div className='pl-4'>
            <div className='text-center'>
                <strong className='text-lg'>Đăng kí kênh phân phối</strong>
            </div>
            <form onSubmit={mutate_notification.form_notification.handleSubmit(onSendMessage)} className='max-w-[600px] mx-auto mt-6'>
                <div className='flex flex-col gap-y-2 my-4'>
                    <label htmlFor="name_shop">Tên shop</label>
                    <input className='px-3 py-2 rounded outline-1 text-sm' id='name_shop' type="text" placeholder='Nhập'
                        {...mutate_notification.form_notification.register('name_shop', { required: 'Tên shop không được để trống!' })} defaultValue={user?.check_email?.user_name} />
                    {mutate_notification.errors.name_shop && <span className='text-red-500 text-sm'>{mutate_notification.errors.name_shop?.message}</span>}
                </div>
                <div className='flex flex-col gap-y-2 my-4'>
                    <label htmlFor="phone_shop">Số điện thoại</label>
                    <input className='px-3 py-2 rounded outline-1 text-sm' id='phone_shop' type="text" placeholder='Nhập'
                        {...mutate_notification.form_notification.register('phone_shop', { required: 'Tên shop không được để trống!' })} defaultValue={user?.check_email?.phone} />
                    {mutate_notification.errors.phone_shop && <span className='text-red-500 text-sm'>{mutate_notification.errors.phone_shop?.message}</span>}
                </div>
                <div className='flex flex-col gap-y-2 my-4'>
                    <label htmlFor="email_shop">Email</label>
                    <input className='px-3 py-2 rounded outline-1 text-sm' id='email_shop' type="text" placeholder='abc@gmail.com'
                        {...mutate_notification.form_notification.register('email_shop', { required: 'Email không được để trống!' })} defaultValue={user?.check_email?.email} />
                    {mutate_notification.errors.email_shop && <span className='text-red-500 text-sm'>{mutate_notification.errors.email_shop?.message}</span>}
                </div>
                <div className='flex flex-col gap-y-2 my-4'>
                    <label htmlFor="address_shop">Địa chỉ lấy hàng</label>
                    <textarea className='px-3 py-2 rounded outline-1 text-sm' id='address_shop' placeholder='Nhập' cols={6}
                        {...mutate_notification.form_notification.register('address_shop', { required: 'Địa chỉ lấy hàng không được để trống!' })} />
                    {mutate_notification.errors.address_shop && <span className='text-red-500 text-sm'>{mutate_notification.errors.address_shop?.message}</span>}
                </div>
                <div className='flex flex-col gap-y-2 my-4'>
                    <label htmlFor="note_shop">Ghi chú</label>
                    <textarea className='px-3 py-2 rounded outline-1 text-sm' id='note_shop' placeholder='Nhập' cols={6}
                        {...mutate_notification.form_notification.register('note_shop')}/>
                </div>
                <div className="flex items-center space-x-2 my-4">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Khi đăng kí đăng bán sản phẩm trên sàn Store88 của chúng tôi, bạn phải chấp nhận các <Link href={'/'} className='underline'>điều khoản</Link> của chúng tôi đề ra nhằm đảm bảo
                        quyền lợi của người mua và người bán!
                    </label>
                </div>
                <Button>Gửi yêu cầu</Button>
            </form>
        </div>
    )
}

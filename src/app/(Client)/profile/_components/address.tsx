import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots'
import { Button } from '@/src/app/_Components/ui/Shadcn/button'
import { Input } from '@/src/app/_Components/ui/Shadcn/input'
import { Label } from '@/src/app/_Components/ui/Shadcn/label'
import { Textarea } from '@/src/app/_Components/ui/textarea'
import { Mutation_Address } from '@/src/app/_lib/Tanstack_Query/Auth/Query_Address'
import React from 'react';
import { eventEmit } from '@/src/app/_Components/ui/Header/Event_emit'

export default function Address_component({ id_user }: { id_user?: string | number }) {
    const mutate_address = Mutation_Address('CREATE');

    function submit_Create_Address(dataForm: any) {
        const dataClient = {
            user_id: id_user,
            about_address: { 
                user_name : dataForm?.user_name,
                phone : dataForm?.phone,
                address : dataForm?.address
             }
        }
        mutate_address?.mutate(dataClient)
    }

    if (mutate_address?.isLoading) {
        return <Loading_Dots />
    }
    if (mutate_address?.status_api === 'call_ok') {
        eventEmit.emit('close_form_create_address');
    }

    return (
        <form onSubmit={mutate_address?.form_address?.handleSubmit(submit_Create_Address)}
            className="mx-auto w-[342px] p-4 bg-white rounded">
            <strong className="text-xl">Thêm địa chỉ</strong>
            <div className="grid gap-4 mt-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên :</Label>
                    <Input id="name" type="text" {...mutate_address?.form_address?.register('user_name', { required: true })} />
                    {mutate_address?.errorForm?.user_name && <span className='text-sm text-red-500'>
                        {mutate_address?.errorForm?.user_name?.message}</span>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Số điện thoại :</Label>
                    <Input id="phone" type="text" {...mutate_address?.form_address?.register('phone', { required: true })} />
                    {mutate_address?.errorForm?.phone && <span className='text-sm text-red-500'>
                        {mutate_address?.errorForm?.phone?.message}</span>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Địa chỉ :</Label>
                    <Textarea className='outline-none' id="address" {...mutate_address?.form_address?.register('address', { required: true })} />
                    {mutate_address?.errorForm?.address && <span className='text-sm text-red-500'>
                        {mutate_address?.errorForm?.address?.message}</span>}
                </div>
                <div className='flex justify-center'>
                    <Button>Thêm</Button>
                </div>
            </div>
        </form>
    )
}

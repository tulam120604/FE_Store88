'use client'

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots'
import { Button } from '@/src/app/_Components/ui/Shadcn/button'
import { Input } from '@/src/app/_Components/ui/Shadcn/input'
import { Label } from '@/src/app/_Components/ui/Shadcn/label'
import { Textarea } from '@/src/app/_Components/ui/textarea'
import { Mutation_Address, Query_Provinces } from '@/src/app/_lib/Query_APIs/Auth/Query_Address'
import React, { useState } from 'react';
import { eventEmit } from '@/src/app/_Components/ui/Header/Event_emit'

export default function Address_component({ id_user }: { id_user?: string | number }) {
    const [district, setDistrict] = useState<any>([]);
    const [wards, setWards] = useState<any>([]);
    const mutate_address = Mutation_Address('CREATE');
    const { data, isLoading, isError } = Query_Provinces();
    function get_District(e: any) {
        const data2 = data?.find((name: any) => name?.name === e.target.value);
        setDistrict(data2?.data2);
    }
    function get_Wards(e: any) {
        const data3 = district?.find((name: any) => name?.name === e.target.value);
        setWards(data3?.data3);
    }
    function submit_Create_Address(dataForm: any) {
        const provinces = dataForm?.wards + '-' + dataForm?.district + '-' + dataForm?.provinces;
        const dataClient = {
            user_id: id_user,
            about_address: {
                user_name: dataForm?.user_name,
                phone: dataForm?.phone,
                address: dataForm?.address,
                provinces: provinces
            }
        }
        mutate_address?.mutate(dataClient)
    }
    if (isLoading) {
        return <Loading_Dots />
    }
    if (mutate_address?.isLoading) {
        return <Loading_Dots />
    }

    if (mutate_address?.status_api === 'call_ok') {
        eventEmit.emit('close_form_create_address');
    }
    function close_form_create_address() {
        eventEmit.emit('close_form_create_address');
    }

    return (
        <form onSubmit={mutate_address?.form_address?.handleSubmit(submit_Create_Address)}
            className="mx-auto w-[342px] lg:w-[40vw] p-4 bg-white rounded">
            <strong className="text-lg tracking-[0.5px]">Thêm địa chỉ</strong>
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
                <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
                    {
                        isError && <span>Lỗi!</span>
                    }
                    <div>
                        <Label htmlFor="provinces">Tỉnh/thành :</Label>
                        <select id="provinces" className="border w-full rounded border-gray-300 text-gray-700 sm:text-sm py-1.5 px-2"
                            {...mutate_address?.form_address?.register('provinces', { required: true })} onChange={get_District}>
                            <option value="">-- Chọn --</option>
                            {
                                Array.isArray(data) && data?.map((value: any) => (<>
                                    <option value={value?.name}>{value?.name}</option>
                                </>))
                            }
                            {mutate_address?.errorForm?.provinces && <span className='text-sm text-red-500'>
                                {mutate_address?.errorForm?.provinces?.message}</span>}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="provinces">Quận/huyện :</Label>
                        <select id="provinces" className="border w-full rounded border-gray-300 text-gray-700 sm:text-sm py-1.5 px-2"
                            {...mutate_address?.form_address?.register('district', { required: true })} onChange={get_Wards}>
                            <option value="">-- Chọn --</option>
                            {
                                district && district?.map((value: any) => (<>
                                    <option value={value?.name}>{value?.name}</option>
                                </>))
                            }
                            {mutate_address?.errorForm?.district && <span className='text-sm text-red-500'>
                                {mutate_address?.errorForm?.district?.message}</span>}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="provinces">Phường/xã :</Label>
                        <select id="provinces" className="border w-full rounded border-gray-300 text-gray-700 sm:text-sm py-1.5 px-2"
                            {...mutate_address?.form_address?.register('wards', { required: true })}>
                            <option value="">-- Chọn --</option>
                            {
                                wards && wards?.map((value: any) => (<>
                                    <option value={value?.name}>{value?.name}</option>
                                </>))
                            }
                            {mutate_address?.errorForm?.wards && <span className='text-sm text-red-500'>
                                {mutate_address?.errorForm?.wards?.message}</span>}
                        </select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Địa chỉ cụ thể (số nhà, ngách,...):</Label>
                    <Textarea className='outline-none' id="address" {...mutate_address?.form_address?.register('address', { required: true })} />
                    {mutate_address?.errorForm?.address && <span className='text-sm text-red-500'>
                        {mutate_address?.errorForm?.address?.message}</span>}
                </div>
                <div className='flex justify-center gap-x-3'>
                    <Button onClick={close_form_create_address} className='bg-white hover:bg-[#F5F5FA] border border-gray-300 text-gray-800' type='button'>Hủy</Button>
                    <Button className='bg-[#597BFE]  hover:bg-[#6f8bfc]'>Thêm</Button>
                </div>
            </div>
        </form>
    )
}

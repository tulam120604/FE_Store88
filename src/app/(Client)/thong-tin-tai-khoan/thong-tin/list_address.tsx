'use client'

import Link from 'next/link';
import React from 'react';
import Alert_dialog from '../_components/alert_dialog';
import { List_Address, Mutation_Address } from '@/src/app/_lib/Query_APIs/Auth/Query_Address';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';

export default function User_address() {
    const mutate_address = Mutation_Address('REMOVE_OR_UPDATE_DEFAULT_ADDRESS');
    const { data, isLoading } = List_Address();

    return (
        <>
            {
                isLoading ? <Loading_Dots /> :
                    <div>
                        {data?.data && data?.data.length > 0 ?
                            data?.data?.map((item: any) => (
                                <div key={item?._id} className="py-4 lg:flex justify-between px-4 gap-x-6 border-b">
                                    <div className="text-sm flex flex-col gap-y-2 mb-2">
                                        <span className="text-gray-900 sm:col-span-2">{item?.about_address?.user_name}</span>
                                        <span className="text-gray-600 sm:col-span-2">
                                            (+84)
                                            &nbsp;
                                            {item?.about_address?.phone?.slice(1, 9)}
                                        </span>
                                        <span className="text-gray-600 sm:col-span-2">{item?.about_address?.address + ', ' + item?.about_address?.provinces}</span>
                                    </div>
                                    <div className='flex flex-col lg:items-end gap-y-1'>
                                        <div>
                                            <Link href={''} className="hover:underline text-sky-500 text-sm mx-2">Sửa</Link>
                                            {!item?.status_address &&
                                                <Alert_dialog dataProps={{
                                                    id_address: item?._id,
                                                    remove_address: mutate_address?.mutate,
                                                    action: 'remove'
                                                }} />
                                            }
                                        </div>
                                        <div className='order-first lg:order-last'>
                                            {(item?.status_address) ?
                                                    <span className='border-2 border-green-600 text-green-600 px-2 py-1 rounded text-xs'>
                                                        Mặc định
                                                    </span>
                                                 :
                                                <Alert_dialog dataProps={{
                                                    id_address: item?._id,
                                                    change_default_address: mutate_address?.mutate
                                                }} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            )) :
                            <div className='text-center'>Trống</div>
                        }
                    </div>
            }
        </>

    )
}

'use client'

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots'
import { ToastAction } from '@/src/app/_Components/ui/toast';
import { useToast } from '@/src/app/_Components/ui/use-toast';
import useFormAttributeCatalog from '@/src/app/_lib/Custome_Hooks/AttributeCatalog_Form';
import { SquarePen } from 'lucide-react'
import React, { useRef } from 'react'

export default function List_data_attribute_catalog({ dataProps }: any) {
    const { toast } = useToast();
    const btnEditNameVarriant = useRef<HTMLButtonElement>(null);
    const refKey = useRef<any>('')
    // edit value varriant 
    function handleEdit(e: string | number) {
        refKey.current = e;
        btnEditNameVarriant?.current?.classList?.add('block');
        btnEditNameVarriant?.current?.classList?.remove('hidden');
    }
    const { isLoading, isError, onSubmit, form_attributeCatalog } = useFormAttributeCatalog('UPDATE');

    if (isError) {
        toast({
            title: "Lỗi",
            description: "Có lỗi xảy ra, vui lòng thử lại sau!",
            action: (
                <ToastAction altText="Goto schedule to undo">OK</ToastAction>
            ),
        })
    }

    const update_name_varriant = (value: any) => {
        const data_request = {
            key: refKey.current,
            name_varriant: value?.name_varriant
        }
        onSubmit(data_request)
    }

    return (
        <div className='border rounded bg-[#F6F6F6]'>
            <div className='grid grid-cols-[50px_260px_auto_150px] gap-2 py-2 px-4 border-b *:text-sm'>
                <div></div>
                <span>Tên</span>
                <span>Loại</span>
                <span>Thao tác</span>
            </div>
            {
                (dataProps?.loadingAttributeCatalog || isLoading) && <div className='w-screen h-screen grid place-items-center'>
                    <Loading_Dots />
                </div>
            }
            {
                dataProps?.arr_attributeCatalog?.map((item: any) => (
                    <div key={item?.key} className='grid grid-cols-[50px_260px_auto_150px] items-center gap-2 my-4 py-2 px-4 *:text-sm'>
                        <div style={{ backgroundColor: item?.symbol_attribute }} className='w-6 h-6 rounded'></div>
                        <form className='flex items-center gap-2' onSubmit={form_attributeCatalog?.handleSubmit(update_name_varriant)}>
                            <input type="text" placeholder='Enter' defaultValue={item?.attribute}
                                {...form_attributeCatalog?.register('attribute')}
                                className='outline-none border rounded text-sm px-2 py-1 my-2 w-[180px]'
                                onChange={() => handleEdit(item?.key)} />
                            <button className='hidden' ref={btnEditNameVarriant}>
                                <SquarePen className='h-5 hover:scale-105 duration-200' />
                            </button>
                        </form>
                        <span>{item?.attribute_category}</span>
                        <div>
                            <button onClick={() => dataProps?.clearAttributeCatalog(item?.key)} className='text-rose-500 text-start'>Xóa</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
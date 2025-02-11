'use client'

import React, { useState } from 'react'
import { Button } from '../ui/Shadcn/button'
import { Plus, X } from 'lucide-react';

export default function Form_variant({ propsData }: any) {
    const [variant, setVariant] = useState<any>([{
        attribute: '',
        value_variants: [{
            name_variant: '',
            stock_variant: 0,
            price_variant: 0
        }]
    }]);



    function add_value_variant(i: any) {
        const add_value_variants = [...variant];
        add_value_variants[i].value_variants.push({
            name_variant: '',
            stock_variant: 0,
            price_variant: 0
        });
        setVariant(add_value_variants)
    }

    function add_variant() {
        setVariant([...variant, {
            attribute: '',
            value_variants: [{
                name_variant: '',
                stock_variant: 0,
                price_variant: 0
            }],
        }])
    }

    // remove variant
    function remove_Variant(index: number) {
        const new_variant = [...variant];
        new_variant.splice(index, 1);
        setVariant(new_variant);
    }

    // remove value variant
    function remove_value_variants(index: number, action: string) {
        if (action === 'tao_bien_the') {
            const remove_value_variant = [...variant];
            remove_value_variant[index].value_variants.splice(index, 1);
            setVariant(remove_value_variant);
        } else {
            // const remove_value_variant = [...value_variant];
            // remove_value_variant.splice(index, 1);
            // setValue_variant(remove_value_variant);
        }
    }

    return (
        <>
            <div className='flex flex-col text-gray-800 gap-y-2'>
                {variant?.map((item: any, i: any) => (<>
                    <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">Tên biến thể</label>
                    <div key={i} className='flex item-center gap-4 w-full text-sm flex-wrap'>
                        <input
                            type="text"
                            {...propsData?.my_Form?.register(`variant[${i}].attribute`, { required: true })}
                            className='outline-none py-2 px-4 border border-gray-300 rounded' key={i}
                            list="HeadlineActArtist"
                            id="HeadlineAct"
                        />
                        <Plus width={30} height={30} onClick={() => add_value_variant(i)} className='cursor-pointer rounded-full 
                                p-0.5 translate-y-0.5 text-sky-600 hover:bg-sky-500 hover:text-gray-50 duration-200'/>
                    </div>
                    {item?.value_variants?.map((e: any, j: any) => (<>
                        <div key={i} className='flex item-center gap-x-4 text-sm *:flex *:flex-col *:gap-y-1 mt-4'>
                            <div>
                                <label htmlFor='value_variant'>Kích thước (nếu có)</label>
                                <input
                                    id='value_variant'
                                    type="text"
                                    defaultValue={e?.name_size}
                                    {...propsData?.my_Form?.register(`variant[${i}].value_variants[${j}].name_variant`)}
                                    className='outline-none py-2 px-4 border border-gray-300 rounded'
                                />
                            </div>
                            <div>
                                <label htmlFor='price_variant'>Giá</label>
                                <input
                                    id='price_variant'
                                    type="text"
                                    defaultValue={e?.price_attribute}
                                    {...propsData?.my_Form?.register(`variant[${i}].value_variants[${j}].price_variant`, { required: true })}
                                    className='outline-none py-2 px-4 border border-gray-300 rounded'
                                />
                            </div>
                            <div>
                                <label htmlFor='stock_variant'>Số lượng</label>
                                <input
                                    id='stock_variant'
                                    type="text"
                                    defaultValue={e?.stock_item}
                                    {...propsData?.my_Form?.register(`variant[${i}].value_variants[${j}].stock_variant`, { required: true })}
                                    className='outline-none py-2 px-4 border border-gray-300 rounded'
                                />
                            </div>
                            {
                                item?.value_variants?.length > 1 &&
                                <X width={30} height={30} onClick={() => remove_value_variants(i, 'tao_bien_the')} className={`${j < 1 && 'invisible'} text-red-500 
                                        rounded-full cursor-pointer translate-y-7 hover:bg-red-500 hover:text-gray-50 duration-200 p-0.5`} />
                            }
                        </div>
                    </>
                    ))}
                    {
                        (variant?.length > 1 &&
                            <div className={`${i < 1 && 'invisible h-0'} mb-4`}>
                                <Button type='button' onClick={() => remove_Variant(i)} className='w-auto bg-red-500 hover:bg-red-600 duration-200'>Xóa</Button>
                            </div >
                        )
                    }
                </>))}
                <div>
                    <Button type='button' onClick={add_variant} className='px-4 bg-indigo-600 hover:bg-indigo-800 duration-200'>Thêm biến thể</Button>
                </div>
            </div>
        </>
    )
}

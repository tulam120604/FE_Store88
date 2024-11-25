'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/Shadcn/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '../ui/select'
import { ChevronDown, Plus, X } from 'lucide-react';
import { Get_AttributeCatalog_Seller } from '../../_lib/Tanstack_Query/Attribute_catalog/Query_attribute_catalog';
import { useLocalStorage, useSessionStorage } from '../../_lib/Custome_Hooks/UseStorage';

    export default function Form_variant({ propsData }: any) {
        const [user] = useLocalStorage('account', '');
        const { data, isLoading } = Get_AttributeCatalog_Seller(user?.check_email?._id);
        const [dataSession] = useSessionStorage('attribute_catalog', []);
        const [state_variant, setState_variant] = useState<string>('');
        const [state_detail, setState_detail] = useState(true)
        const [variant, setVariant] = useState<any>([{
            attribute: '',
            value_variants: [{
                name_variant: '',
                stock_variant: 0,
                price_variant: 0
            }]
        }]);


        // state biến thể nếu dùng thuộc tính để tạo biến thể
        const [state_variant_2, setState_variant_2] = useState<any>([]);

        useEffect(() => {
            if (data) {
                const dataAttribute = data?.concat(dataSession) ?? dataSession;
                const dataVariant = dataAttribute?.map((item: any) => (
                    {
                        ...item,
                        value_variants: [{
                            name_variant: '',
                            stock_variant: 0,
                            price_variant: 0
                        }]
                    }
                ));
                setState_variant_2(dataVariant);
            }
        }, [data, dataSession]);
        // child option
        function add_value_varriant(i: any, action: string) {
            if (action === 'tao_bien_the') {
                const add_value_variants = [...variant];
                add_value_variants[i].value_variants.push({
                    name_variant: '',
                    stock_variant: 0,
                    price_variant: 0
                })
                setVariant(add_value_variants)
            }
            else {
                const updatedVariants = [...state_variant_2];
                updatedVariants[i].value_variants.push({
                    name_variant: '',
                    stock_variant: 0,
                    price_variant: 0
                });
                setState_variant_2(updatedVariants);
                setState_detail(true)
            }
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

        if (isLoading) return <span>Loading...</span>
        return (
            <>
                <div className='w-1/4'>
                    <Select onValueChange={(value) => setState_variant(value)}>
                        <SelectTrigger className="!h-auto py-2 mt-1">
                            <SelectValue placeholder="Lựa chọn" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {/* <SelectItem value="tao_bien_the_tu_thuoc_tinh">Tạo biến thể từ các thuộc tính</SelectItem> */}
                                <SelectItem value="them_moi_bien_the">Thêm biến thể</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {
                    (state_variant.toString() === 'them_moi_bien_the') ?
                        <div className='flex flex-col text-gray-800 gap-y-2'>
                            {variant?.map((item: any, i: any) => (<>
                                <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">Tên biến thể</label>
                                <div key={i} className='flex item-center gap-4 w-full text-sm flex-wrap'>
                                    <input
                                        type="text"
                                        {...propsData?.my_Form?.register(`variant[${i}].attribute`, { required: true })}
                                        className='outline-none py-2 px-4 border border-gray-300 rounded'
                                        placeholder='...' key={i}
                                        list="HeadlineActArtist"
                                        id="HeadlineAct"
                                    />
                                    <Plus width={30} height={30} onClick={() => add_value_varriant(i, 'tao_bien_the')} className='cursor-pointer rounded-full 
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
                                                placeholder='...'
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
                                                placeholder='...'
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
                                                placeholder='...'
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
                                <Button type='button' onClick={add_variant} className='px-4 bg-indigo-600 hover:bg-indigo-800 duration-200'>Thêm</Button>
                            </div>
                        </div>
                        :
                        // tạo biến thể từ thuộc tính
                        (state_variant.toString() === 'tao_bien_the_tu_thuoc_tinh') &&
                        <div>
                            {
                                state_variant_2?.map((value: any, index: number) => (
                                    <details key={index} className="group [&_summary::-webkit-details-marker]:hidden border-b border-gray-400 pb-6 my-4" open={state_detail}>
                                        <summary
                                            className="cursor-pointer flex items-center gap-4">
                                            <ChevronDown className='group-open:-rotate-180 duration-200 hover:bg-gray-200 rounded-full' />
                                            <input
                                                type="text"
                                                {...propsData?.my_Form?.register(`variant[${index}].attribute`, { required: true })}
                                                className='outline-none py-2 px-4 border border-gray-300 rounded'
                                                placeholder='...' key={index}
                                                list="HeadlineActArtist"
                                                id="HeadlineAct"
                                                value={value?.attribute}
                                                readOnly />
                                            <Plus width={30} height={30} onClick={() => add_value_varriant(index, 'them_bien_the_tu_thuoc_tinh')} className='cursor-pointer rounded-full 
                                p-0.5 translate-y-0.5 text-sky-600 hover:bg-sky-500 hover:text-gray-50 duration-200'/>
                                        </summary>
                                        {value?.value_variants?.map((e: any, j: any) => (<>
                                            <div key={index} className='flex item-center gap-x-4 text-sm *:flex *:flex-col *:gap-y-1 mt-4 ml-10'>
                                                <div>
                                                    <label htmlFor='value_variant'>Kích thước (nếu có)</label>
                                                    <input
                                                        id='value_variant'
                                                        type="text"
                                                        defaultValue={e?.name_size}
                                                        {...propsData?.my_Form?.register(`variant[${index}].value_variants[${j}].name_variant`)}
                                                        className='outline-none py-2 px-4 border border-gray-300 rounded'
                                                        placeholder='...'
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor='price_variant'>Giá</label>
                                                    <input
                                                        id='price_variant'
                                                        type="text"
                                                        defaultValue={e?.price_attribute}
                                                        {...propsData?.my_Form?.register(`attributes[${index}].value_variants[${j}].price_variant`, { required: true })}
                                                        className='outline-none py-2 px-4 border border-gray-300 rounded'
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor='stock_variant'>Số lượng</label>
                                                    <input
                                                        id='stock_variant'
                                                        type="text"
                                                        defaultValue={e?.stock_item}
                                                        {...propsData?.my_Form?.register(`attributes[${index}].value_variants[${j}].stock_variant`, { required: true })}
                                                        className='outline-none py-2 px-4 border border-gray-300 rounded'
                                                    />
                                                </div>
                                                {
                                                    value?.value_variants?.length > 1 &&
                                                    <X width={30} height={30} onClick={() => remove_value_variants(index, 'them_bien_the_tu_thuoc_tinh')} className={`${j < 1 && 'invisible'} text-red-500 
                                        rounded-full cursor-pointer translate-y-7 hover:bg-red-500 hover:text-gray-50 duration-200 p-0.5`} />
                                                }
                                            </div>
                                        </>
                                        ))}
                                    </details>
                                ))
                            }
                        </div>
                }
            </>
        )
    }

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Tables/button';
import Link from 'next/link';
import Form_category from './form_category';
import { CircleMinus } from 'lucide-react';
import { useCustome_Hooks_Form } from '../../_lib/Custome_Hooks/MyForm';
import Loading_Dots from '../Loadings/Loading_Dots';


const MyForm: React.FC<any> = ({ mode }: any) => {
    const { my_Form, submitForm, isLoading, loading, data_Category, data_one_item } = useCustome_Hooks_Form({ mode });
    const [change_img, setChange_img] = useState([]);
    const [images, setImages] = useState<any[]>([]);
    const [category_form, setCategory_form] = useState<boolean>(false)
    const [attributes, setAttribute] = useState<any>([{
        color_item: '',
        size_item: [{
            name_size: '',
            stock_item: '',
            price_attribute: 0
        }],
    }]);
    useEffect(() => {
        if (mode) {
            if (data_one_item?.data) {
                if (data_one_item?.data?.gallery) {
                    setChange_img(data_one_item?.data?.gallery)
                    setImages(data_one_item?.data?.gallery);
                }
                let data_attr_detail;
                if (data_one_item?.data?.attributes) {
                    data_attr_detail = my_Form.getValues()?.attributes?.varriants?.map((item: any) => ({
                        color_item: item?.color_item,
                        size_item: item?.size_item
                    }));
                    setAttribute(data_attr_detail);
                }
                else {
                    setAttribute([])
                }
            }
        }
    }, [mode, data_one_item?.data]);

    function add_Attribute() {
        setAttribute([...attributes, {
            color_item: '',
            size_item: [{
                name_size: '',
                stock_item: '',
                price_attribute: 0
            }],
        }])
    }

    function remove_Attribute(index: number) {
        const updatedAttributes = [...attributes];
        updatedAttributes.splice(index, 1);
        setAttribute(updatedAttributes);

    }
    // child option
    function add_Size_Attribute(i: any) {
        const add_size_attribute = [...attributes];
        add_size_attribute[i].size_item.push({
            name_size: '',
            stock_item: '',
        })
        setAttribute(add_size_attribute)
    }

    function remove_size_Attribute(index: number) {
        const remove_size_Attributes = [...attributes];
        remove_size_Attributes[index].size_item.splice(index, 1);
        setAttribute(remove_size_Attributes);
    }

    function handle_category() {
        setCategory_form(!category_form);
    }

    function pushImage(e: any) {
        const file = e.target.files;
        if (file.length > 0) {
            setImages(preImg => [...preImg, ...Array.from(file)])
            const file_images = Array.from(file);
            const arr_file_images: any = [];
            file_images?.forEach((file: any) => {
                const reader_img = new FileReader();
                reader_img.onloadend = () => {
                    arr_file_images.push(reader_img.result as string);
                    if (arr_file_images.length === file_images.length) {
                        setChange_img((img: any) => {
                            if (img) {
                                return [...img, ...arr_file_images]
                            }
                            return arr_file_images
                        });
                    }
                }
                reader_img.readAsDataURL(file)
            })
        }
    };
    function handle_minus_image(uri: string, i: number) {
        const new_image_after_minus = change_img.filter((item: string) => item !== uri);
        setChange_img(new_image_after_minus);
        const new_images = images.filter((_: any, index: number) => index !== i)
        setImages(new_images)
    }

    // submit form
    function formSubmit(dataForm: any) {
        const data_form_item = {
            ...dataForm,
            gallery: images
        }
        submitForm(data_form_item);
    }
    useEffect(() => {
        if (!mode && loading === 'call_ok') {
            my_Form.reset();
            setChange_img([]);
            setAttribute([{
                color_item: '',
                size_item: [{
                    name_size: '',
                    stock_item: '',
                    price_attribute: 0
                }],
            }])
        }
    }, [mode, my_Form, loading])
    return (<>
        <section className="bg-white border border-gray-300 rounded-lg flex flex-col gap-y-6 py-6 rounded">
            {
                (loading === 'dang_call') &&
                (<div className='grid place-items-center fixed z-[3] *:z-[4] w-screen h-screen top-0 left-0 bg-[#10182488]'>
                    <Loading_Dots />
                </div>)
            }
            <div className='flex items-center justify-between'>
                <strong className="text-gray-900 lg:text-xl">{mode ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</strong>
                <Link className='text-white hover:text-gray-200 hover:underline' href={'/adminstrations/products/list'}>Quay lại</Link>
            </div>
            <div className='relative'>
                <button onClick={handle_category} type='button' className="border-none text-sm text-gray-100 h-full px-5 py-2.5 rounded bg-[#2563EB] hover:bg-indigo-800 duration-300">Thêm danh mục+</button>
                {category_form && (<>
                    <div onClick={handle_category} className='fixed w-screen h-screen bg-[#00000066] top-0 z-[6] left-0'></div>
                    <Form_category />
                </>)
                }
            </div>
            <form onSubmit={my_Form.handleSubmit(formSubmit)} className="w-full px-4 flex flex-col gap-y-10 py-4 rounded *:w-full">
                <div className='grid grid-cols-[auto_80%] text-gray-800 items-center justify-between'>
                    <label htmlFor="short_name">Tên sản phẩm :</label>
                    <input type="text" id='short_name' {...my_Form.register('short_name')}
                        className='outline-none py-1 px-4 border border-gray-300 rounded w-full' placeholder='Nhập tên sản phẩm ...' />
                </div>
                {isLoading ? <span className='text-gray-100'>Loa
                    ding ...</span> :
                    <div className='grid grid-cols-[auto_80%] text-gray-800 items-center'>
                        <label htmlFor="category_id">Danh mục sản phẩm : </label>
                        <div>
                            <select
                                id="category_id"
                                {...my_Form.register('category_id')}
                                className="outline-none py-1 px-4 border border-gray-300 rounded">
                                {
                                    data_Category?.data?.map((item: any) => (
                                        <option key={item?._id} value={item?._id}>{item?.category_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>}

                <div className='flex flex-col text-gray-800 gap-y-3'>
                    <label htmlFor="feature_product">Ảnh sản phẩm :</label>
                    <div className='flex flex-wrap gap-3'>
                        {
                            (change_img.length > 0) ?
                                change_img?.map((uri: any, i: number) => (
                                    <div key={uri} className='relative border border-gray-300 rounded'>
                                        <img className='w-[100px] h-[100px] rounded' src={uri} alt='' />
                                        <button className='absolute top-0 right-0 *:w-4 *:h-4 text-xs text-red-500 bg-white rounded-full hover:scale-110 duration-200'
                                            onClick={() => handle_minus_image(uri, i)} type='button'>
                                            <CircleMinus />
                                        </button>
                                    </div>
                                )) :
                                <div className='w-[100px] h-[100px] border rounded border-gray-300 text-sm grid place-items-center'>
                                    Trống!
                                </div>
                        }
                        <input type="file" accept='image/*' id='feature_product'
                            className='outline-none py-2 px-4 rounded cursor-pointer' onChange={pushImage} multiple />
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <label htmlFor="des_product">Mô tả sản phẩm :</label>
                    <textarea id='des_product' {...my_Form.register('des_product')}
                        className='outline-none py-2 px-4 border border-gray-300 rounded min-h-[300px]' placeholder='Mô tả sản phẩm ...' />
                </div>
                {
                    (attributes?.length < 1) && <div className='grid grid-cols-[auto_80%] text-gray-800 items-center'>
                        <label htmlFor="price_product">Giá sản phẩm :</label>
                        <div>
                            <input type="text" id='price_product' {...my_Form.register('price_product')}
                                className='outline-none py-2 px-4 border border-gray-300 rounded' placeholder='Giá sản phẩm ...' />
                        </div>
                    </div>
                }
                {
                    <div className='flex flex-col text-gray-800 gap-y-3'>
                        <label>Options sản phẩm (nếu có):</label>
                        {attributes?.map((item: any, i: any) => (<>
                            <div key={i} className='flex item-center gap-4 w-full text-sm flex-wrap'>
                                <input
                                    type="text"
                                    {...my_Form.register(`attributes[${i}].color_item`, { required: true })}
                                    defaultValue={item?.color_item}
                                    className='outline-none py-2 px-4 border border-gray-300 rounded'
                                    placeholder={`Thông số ${i + 1} (nếu có)...`} key={i}
                                />
                                <Button type='button' onClick={() => add_Size_Attribute(i)} className='w-20 bg-indigo-600 hover:bg-indigo-800 duration-200'>Thêm</Button>
                            </div>
                            {item?.size_item?.map((e: any, j: any) => (
                                <div key={i} className='flex item-center gap-x-4 text-sm'>
                                    <input
                                        type="text"
                                        defaultValue={e?.name_size}
                                        {...my_Form.register(`attributes[${i}].size_item[${j}].name_size`)}
                                        className='outline-none py-2 px-4 border border-gray-300 rounded'
                                        placeholder={`Thông số ${i + 2} (nếu có)...`}
                                    />
                                    <input
                                        type="text"
                                        defaultValue={e?.stock_item}
                                        {...my_Form.register(`attributes[${i}].size_item[${j}].stock_item`, { required: true })}
                                        className='outline-none py-2 px-4 border border-gray-300 rounded'
                                        placeholder='Số lượng (bắt buộc)...'
                                    />
                                    <input
                                        type="text"
                                        defaultValue={e?.price_attribute}
                                        {...my_Form.register(`attributes[${i}].size_item[${j}].price_attribute`, { required: true })}
                                        className='outline-none py-2 px-4 border border-gray-300 rounded'
                                        placeholder='Giá (bắt buộc)...'
                                    />
                                    {
                                        item?.size_item?.length > 1 &&
                                        <Button type='button' onClick={() => remove_size_Attribute(i)} className='w-20 bg-red-500 hover:bg-red-600 duration-200'>Xóa</Button>
                                    }
                                </div>
                            ))}

                            <Button type='button' onClick={() => remove_Attribute(i)} className='w-24 bg-red-500 hover:bg-red-600 duration-200'>Xóa options</Button>
                        </>))}
                        <div>
                            <Button type='button' onClick={add_Attribute} className='px-4 bg-indigo-600 hover:bg-indigo-800 duration-200'>Thêm options</Button>
                        </div>
                    </div>
                }

                {attributes?.length < 1 && <div className='grid grid-cols-[auto_80%] text-gray-800 items-center'>
                    <label>Số lượng :</label>
                    <div>
                        <input
                            type="text"
                            {...my_Form.register(`stock`)}
                            className='outline-none py-2 px-4 border border-gray-300 rounded'
                            placeholder='Số lượng ...'
                        />
                    </div>

                </div>}
                <div className='grid grid-cols-[auto_80%] text-gray-800 items-center'>
                    <label htmlFor="made_in">Xuất xứ sản phẩm :</label>
                    <div>
                        <input id='made_in' {...my_Form.register('made_in')}
                            className='outline-none py-2 px-4 border border-gray-300 rounded' placeholder='Xuất xứ sản phẩm ...' />
                    </div>

                </div>
                {loading === 'call_error' && <span className='text-red-500'>Vui lòng kiểm tra lại!!</span>}
                <div className='w-full'>
                    <Button type='submit' className={`text-sm font-medium text-white ${mode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-indigo-600 hover:bg-indigo-800'}`}>{mode ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}</Button>
                </div>
            </form>
        </section>
    </>)
}

export default MyForm
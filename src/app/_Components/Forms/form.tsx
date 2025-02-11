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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Form_variant from './form_variant';


const MyForm: React.FC<any> = ({ mode }: any) => {
    const { my_Form, submitForm, isLoading, loading, data_Category, data_one_item } = useCustome_Hooks_Form({ mode });
    const [change_img, setChange_img] = useState([]);
    const [images, setImages] = useState<any[]>([]);
    const [category_form, setCategory_form] = useState<boolean>(false);
    const [statusOptionsCategory, setStatusOptionsCategory] = useState<any>('Chọn');
    const [statusOptionsVariant, setStatusOptionsVariant] = useState<any>('no-variant');
    const [variant, setVariant] = useState<any>([{
        attribute: '',
        value_variant: [{
            name_variant: '',
            stock_variant: 0,
            price_variant: 0
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
                if (data_one_item?.data?.variant) {
                    data_attr_detail = my_Form.getValues()?.variant?.variants?.map((item: any) => ({
                        attribute: item?.attribute,
                        value_variant: item?.value_varriant
                    }));
                    setVariant(data_attr_detail);
                }
                else {
                    setVariant([])
                }
            }
        }
    }, [mode, data_one_item?.data]);

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
            setVariant([{
                name_varriant: '',
                value_varriant: [{
                    name_value: '',
                    stock_item: 0,
                    price_attribute: 0
                }],
            }])
        }
    }, [mode, my_Form, loading]);

    return (<>
        <section className="flex flex-col gap-y-6 py-6 rounded pr-4">
            {
                (loading === 'dang_call') &&
                (<div className='grid place-items-center fixed z-[3] *:z-[4] w-screen h-screen top-0 left-0 bg-[#10182488]'>
                    <Loading_Dots />
                </div>)
            }
            <div className='flex items-center justify-between'>
                <strong className="text-gray-900 lg:text-xl">{mode ? 'Cập nhật sản phẩm' : 'Tạo mới sản phẩm'}</strong>
                <Link className='text-gray-700 hover:text-gray-900 hover:underline text-sm' href={'/adminstrations/products/list'}>Quay lại</Link>
            </div>
            <div className='relative'>
                <button onClick={handle_category} type='button' className="border-none text-sm text-gray-100 h-full p-2 rounded 
                bg-[#2563EB] hover:bg-indigo-800 duration-300">Thêm danh mục +</button>
                {category_form && (<>
                    <div onClick={handle_category} className='fixed w-screen h-screen bg-[#00000066] top-0 z-[6] left-0'></div>
                    <Form_category />
                </>)
                }
            </div>
            <form onSubmit={my_Form.handleSubmit(formSubmit)} className="flex flex-col gap-y-10 py-4 rounded *:w-full text-base">
                <div className='text-gray-800 items-center justify-between'>
                    <label htmlFor="short_name">Tên sản phẩm</label>
                    <input type="text" id='short_name' {...my_Form.register('short_name')}
                        className='outline-none mt-2 py-2 px-4 border border-gray-300 rounded-sm w-full' />
                </div>
                {isLoading ? <span className='text-gray-100'>
                    Loading...</span> :
                    <div className='relative grid grid-cols-[auto_85%] text-gray-800 items-center mb-4'>
                        <label htmlFor="category_id">Danh mục sản phẩm</label>
                        <div className='*:w-auto'>
                            <Select onValueChange={(value) => {
                                my_Form.setValue('category_id', value)
                                setStatusOptionsCategory(value)
                            }}
                                {...my_Form.register('category_id')}>
                                <SelectTrigger className="!h-auto pt-2 mt-1">
                                    <SelectValue placeholder={statusOptionsCategory} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            data_Category?.data?.length > 0 ?
                                                data_Category?.data?.map((item: any) => (
                                                    <SelectItem key={item?._id} value={item?._id}>{item?.category_name}</SelectItem>
                                                )) :
                                                <SelectItem value=" ">Trống!</SelectItem>
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <span className='absolute text-sm text-red-500 whitespace-nowrap top-14'>Vui lòng chọn danh mục sản phẩm!</span>
                    </div>
                }
                <div className='flex flex-col text-gray-800 gap-y-3'>
                    <label htmlFor="feature_product">Ảnh sản phẩm</label>
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
                                <div className='w-[100px] h-[100px] rounded bg-white text-sm grid place-items-center'>
                                    Trống!
                                </div>
                        }
                        <div>
                            <input type="file" accept='image/*' id='feature_product'
                                className='outline-none rounded cursor-pointer max-w-[220px] pl-[105px] pr-1 py-0.5 mt-8 -translate-x-[105px]'
                                onChange={pushImage} multiple />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="des_product">Mô tả sản phẩm</label>
                    <textarea id='des_product' {...my_Form.register('des_product')}
                        className='outline-none py-2 px-4 border border-gray-300 rounded min-h-[200px]' />
                </div>
                <div className='w-full bg-white rounded *:p-4'>
                    <section className='w-full flex items-center gap-10'>
                        <span>Dữ liệu sản phẩm</span>
                        <div>
                            <Select value={statusOptionsVariant} onValueChange={(value) => setStatusOptionsVariant(value)}>
                                <SelectTrigger className="!h-auto pt-2 mt-1">
                                    <SelectValue placeholder="Sản phẩm đơn giản" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="no-variant">Sản phẩm đơn giản</SelectItem>
                                        <SelectItem value="variant">Sản phẩm có biến thể</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </section>
                    {/* --- */}
                    {((statusOptionsVariant === 'no-variant') || variant?.length < 1) &&
                        <>
                            <div className='grid grid-cols-[auto_90%] text-gray-800 items-center text-sm'>
                                <label htmlFor="price_product">Giá</label>
                                <div>
                                    <input type="text" id='price_product' {...my_Form.register('price_product')}
                                        className='outline-none py-2 px-4 border border-gray-300 rounded' />
                                </div>
                            </div>
                            <div className='grid grid-cols-[auto_90%] text-gray-800 items-center text-sm'>
                                <label htmlFor='stock'>Số lượng</label>
                                <div>
                                    <input id='stock'
                                        type="text"
                                        {...my_Form.register(`stock`)}
                                        className='outline-none py-2 px-4 border border-gray-300 rounded'
                                    />
                                </div>
                            </div>
                        </>
                    }
                    {
                        (statusOptionsVariant === 'variant') &&
                        <Form_variant propsData={{ my_Form }} />
                    }
                </div>

                <div className='grid grid-cols-[auto_85%] text-gray-800 items-center'>
                    <label htmlFor="made_in">Xuất xứ sản phẩm</label>
                    <div>
                        <input id='made_in' {...my_Form.register('made_in')}
                            className='outline-none py-2 px-4 border border-gray-300 rounded' />
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
'use client';

import React, { useEffect, useState } from 'react'
import { Mutation_Category } from '../../_lib/Query_APIs/Items/Mutation_category';
import { Button } from '../ui/Shadcn/button';
import Image from 'next/image';
import Loading_Dots from '../Loadings/Loading_Dots';

const Form_category = () => {
    const mutate_category = Mutation_Category('ADD');
    let mode;

    function onAdd_category(data_form: any) {
        const formData = new FormData();
        formData.append('category_name', data_form.category_name);
        formData.append('category_img', (typeof data_form.category_img == 'string') ? data_form.category_img : data_form.category_img[0]);
        mutate_category.on_Submit_category(formData);
    }

    const [uri_image_upload, setUri_image_upload] = useState('');
    function show_image_add(e: any) {
        if (e.target.files[0]) {
            const img_url = new FileReader();
            img_url.onloadend = () => {
                setUri_image_upload(img_url.result as string);
            }
            img_url.readAsDataURL(e.target.files[0])
        }
    }
    // category 
    return (<>
        {mutate_category.isLoading &&
            <div className='fixed w-screen h-screen bg-[#33333333] top-0 right-0 !z-[10] grid place-items-center'>
                <Loading_Dots />
            </div>
        }
        <form onSubmit={mutate_category.form_category.handleSubmit(onAdd_category)} className='flex bg-white flex-col text-gray-800 gap-y-3 fixed border border-gray-300 shadow
         z-[7] top-1/2 left-1/2 -translate-x-1/2 rounded  -translate-y-1/2 px-10 py-5 lg:px-20 lg:py-10'>
            <label htmlFor="category_name">Tên danh mục :</label>
            <input type="text" id='category_name' {...mutate_category.form_category.register('category_name')}
                className=' py-2 px-4 border border-gray-300 rounded' placeholder='Nhập danh mục sản phẩm ...' />
            <div className='flex flex-col text-gray-800 gap-y-3'>
                <label htmlFor="feature_product">Ảnh sản phẩm :</label>
                <div className='lg:flex'>
                    <Image className='border' width={100} height={100} src={uri_image_upload} alt="Loading..." />
                    <input type="file" accept='image/*' id='feature_product'  {...mutate_category.form_category.register('category_img')}
                        className=' outline-none py-2 px-4 rounded cursor-pointer' onChange={show_image_add} />
                </div>
            </div>
            {mutate_category.status_category === 'call_error' && <span className='text-red-500'>Vui lòng kiểm tra lại!!</span>}
            <Button type='submit' className={`text-sm font-medium text-white ${mode ? 'bg-yellow-600 active:bg-yellow-500' : 'bg-indigo-600'}`}>{mode ? "Cập nhật" : "Thêm"}</Button>
        </form>
    </>)
}

export default Form_category
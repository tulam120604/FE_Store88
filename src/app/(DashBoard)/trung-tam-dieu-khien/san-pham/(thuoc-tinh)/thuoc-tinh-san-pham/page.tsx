'use client'

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import React, { Suspense, useState } from 'react';
import { Auth_Wrap_Seller } from '../../../_Auth_Wrapper/Page';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import { Checkbox } from '@/src/app/_Components/ui/Shadcn/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/src/app/_Components/ui/select';
import useFormAttributeCatalog from '@/src/app/_lib/Custome_Hooks/AttributeCatalog_Form';
import { SketchPicker } from 'react-color';
import { useLocalStorage, useSessionStorage } from '@/src/app/_lib/Custome_Hooks/UseStorage';
import { Get_AttributeCatalog_Seller } from '@/src/app/_lib/Tanstack_Query/Attribute_catalog/Query_attribute_catalog';
import List_data_attribute_catalog from './_component/page';


export default function Page() {
  const { isLoading, isError, onSubmit, errorsForm, form_attributeCatalog } = useFormAttributeCatalog('CREATE_or_REMOVE_NAME_VARRIANT');
  const [statusChecked, setStatusChecked] = useState<any>(false);
  const [statusOptions, setStatusOptions] = useState<any>('');
  const [color, setColor] = useState<string>('');
  const [attributeCatalog, setAttributeCatalog] = useSessionStorage('attribute_catalog', []);
  const [user] = useLocalStorage('account', '');
  const { data, isLoading: loadingAttributeCatalog } = Get_AttributeCatalog_Seller(user?.check_email?._id);
  function handleSubmitForm(dataForm: any) {
    dataForm = {
      ...dataForm,
      attribute_category: statusOptions,
      symbol_attribute: color,
      id_account: user?.check_email?._id,
      action: 'create_varriant',
    }
    if (statusChecked) {
      onSubmit(dataForm)
    }
    // save sessionStorage
    else {
      dataForm = {
        ...dataForm,
        symbol_attribute: color,
        attribute_category: statusOptions,
      }
      let data_attributeCatalog = [
        dataForm
      ];
      if (attributeCatalog) {
        data_attributeCatalog = [
          ...attributeCatalog,
          dataForm
        ]
      }
      setAttributeCatalog(data_attributeCatalog);
    }
  }

  const handleSetColor = (color: any) => {
    setColor(color.hex);
    setStatusOptions('ux_color')
  }
  const arr_attributeCatalog: any = data?.concat(attributeCatalog) ?? [];
  function clearAttributeCatalog(item: any) {
    const check_location_value = attributeCatalog?.find((value: any) => value?.key === item);
    if (check_location_value) {
      const new_attributeCatalog = attributeCatalog?.filter((value: any) => value?.key !== item);
      setAttributeCatalog(new_attributeCatalog);
    }
    else {
      onSubmit({
        action: 'remove_name_varriant',
        id_account: user?.check_email?._id,
        id_item: item
      })
    }
  }


  return (
    <Suspense fallback={<div className="w-screen h-screen fixed 
    top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <Auth_Wrap_Seller>
        <div className='flex flex-col gap-y-6 py-6 h-full'>
          <strong className='text-xl'>Thuộc tính</strong>
          <section className='grid lg:grid-cols-[38%_auto] lg:gap-x-16 gap-x-8'>
            {
              isLoading &&
              <div className='w-screen h-screen grid place-items-center'>
                <Loading_Dots />
              </div>
            }
            {/* left */}
            <div>
              <strong className='text-gray-800'>Thêm mới thuộc tính</strong>
              <p className='text-gray-700 text-sm my-4'>Các thuộc tính bổ sung cho phép bạn xác định dữ liệu sản phẩm bổ sung. Bạn có thể sử dụng các thuộc tính đó
                trong thanh bên của cửa hàng bằng cách sử dụng các tiện ích điều hướng theo lớp.</p>
              <form onSubmit={form_attributeCatalog?.handleSubmit(handleSubmitForm)}>
                <label htmlFor="short_name">Tên:</label>
                <input type="text" id='short_name' {...form_attributeCatalog?.register('attribute', { required: true })}
                  className='outline-none py-1.5 px-4 border border-gray-300 rounded w-full text-sm my-1' placeholder='Enter ...' />
                {errorsForm && <p className='text-sm my-2 text-red-500'>{errorsForm?.attribute?.message}</p>}
                <p className='text-gray-800 text-sm'>Tên cho thuộc tính</p>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id="terms" onClick={() => setStatusChecked(!statusChecked)} />
                  <label htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Cho phép lưu trữ
                  </label>
                </div>
                <p className='text-sm text-gray-800'>Kích hoạt tính năng này nếu bạn muốn thuộc tính này có lưu trữ sản phẩm trong cửa hàng của bạn.</p>
                <div className='my-4'>
                  <Select onValueChange={(value) => setStatusOptions(value)}>
                    <span>Loại: </span>
                    <SelectTrigger className="w-[180px] !h-auto py-1 mt-1">
                      <SelectValue placeholder="Lựa chọn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ux_color">UX Color</SelectItem>
                        <SelectItem value="ux_label">UX Label</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {
                  (statusOptions === 'ux_color') &&
                  <div className='flex flex-col gap-y-2'>
                    <span>Chọn màu sắc:</span>
                    <div className='flex gap-4'>
                      <SketchPicker
                        color={color}
                        onChangeComplete={handleSetColor}
                      />
                      <div style={{
                        backgroundColor: color
                      }} className={`w-16 h-16 rounded border`}></div>
                    </div>
                  </div>
                }
                <Button className='py-1.5 h-auto my-4 bg-indigo-600 hover:bg-indigo-800'>Thêm</Button>
              </form>
              {
                isError &&
                <p className='text-red-500 text-sm'>Lỗi, vui lòng kiểm tra lại!</p>
              }
            </div>
            {/* right */}
            <div>
              <List_data_attribute_catalog
                dataProps={{
                  arr_attributeCatalog,
                  loadingAttributeCatalog,
                  clearAttributeCatalog
                }}
              />
            </div>
          </section>
        </div>
      </Auth_Wrap_Seller>
    </Suspense>
  )
}
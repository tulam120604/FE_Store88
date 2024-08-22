'use client';

import React, { Suspense, useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import Loading from './loading';
import { Input } from '../../_Components/ui/Shadcn/input';
import { useRouter } from 'next/navigation';
import { Button } from '../../_Components/ui/Shadcn/button';
import { useForm } from 'react-hook-form';
import { columns } from './_components/colum';
import { Mutation_Order } from '../../_lib/Tanstack_Query/Order/Mutation_order';
import { schemaValidateOrder } from '../../(Auth)/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { DataTable } from '../../_Components/ui/Tables/data_table';
import Loading_Dots from '../../_Components/Loadings/Loading_Dots';
import { useToast } from '../../_Components/ui/use-toast';
import { ToastAction } from '../../_Components/ui/toast';
import { useCheck_user } from '../../_lib/Custome_Hooks/User';
import { Label } from '@/src/app/_Components/ui/Shadcn/label'
import { RadioGroup, RadioGroupItem } from '../../_Components/ui/radio-group';
import Breadcrum from '../../_Components/breadcrum/breadcrum';
import { Mutation_Payment } from '../../_lib/Tanstack_Query/Payment/Query_Payment';

const Page = () => {
  const [check_payment, setCheck_payment] = useState<boolean>(true)
  const { toast } = useToast();
  const routing = useRouter();
  const [list_item_order, setList_item_order] = useState<any>();
  const user = useCheck_user() ?? undefined;
  useEffect(() => {
    if (!user) {
      routing.push('/')
    }
  }, [routing, user])
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaValidateOrder)
  });
  let action_mutation = ''
  if (list_item_order?.action === 'restore_buy_item') {
    action_mutation = list_item_order?.action
  }
  // notes_order
  const mutate_order = Mutation_Order('ADD_and_RESTORE_BUY_ITEM');
  function on_Order(infor_user_form: any) {
    const data_order = {
      user_id: user?.check_email?._id,
      action_mutate: action_mutation,
      action_order: list_item_order?.action,
      items_order: list_item_order?.items,
      notes_order: list_item_order?.notes_order,
      infor_user: {
        name_user: infor_user_form?.name_user,
        phone: infor_user_form?.phone,
        email_user: infor_user_form?.email_user,
        address: infor_user_form?.address,
      },
      id_order: list_item_order?.id_order
    }
    mutate_order.mutate(data_order);
  };
  if (mutate_order.status_api === 'call_ok') {
    routing.push('/')
  }

  // mutation payment
  const mutation_payment = Mutation_Payment('CREATE');
  function next_payment() {
    const total_price = list_item_order?.total_price ? list_item_order?.total_price : list_item_order?.items[0]?.total_price_item
    mutation_payment?.mutate(total_price);
  }
  // socket 
  useEffect(() => {
    const socket = io('http://localhost:8888')
    if (typeof window) {
      let data_session = JSON.parse(sessionStorage.getItem('item_order') || '{}');
      socket.on('res_message', (data: any) => {
        if (data_session) {
          sessionStorage.removeItem('item_order');
          data_session.items = data_session?.items?.filter((item: any) => (
            item?.product_id?._id !== data?.id_item && item
          ));
          sessionStorage.setItem('item_order', JSON.stringify(data_session));
          setList_item_order(data_session);
        }
        toast({
          title: "Thông báo!",
          description: `Rất tiếc, sản phẩm ${data?.name_item} không còn tồn tại!`,
          className: 'border border-gray-800',
          action: (
            <ToastAction altText="Goto schedule to undo">Ok</ToastAction>
          ),
        })
      })
      setList_item_order(data_session);
    }
  }, []);

  return (<Suspense fallback={<Loading />}>
    <div className='max-w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] mx-auto mt-2'>
      <Breadcrum textProps={{ name_item: 'Thanh toán' }} />
    </div>

    <form onSubmit={handleSubmit(on_Order)} className={`relative py-6 ${mutate_order.isLoading &&
      'after:fixed after:top-0 after:left-0 after:w-screen after:h-screen after:bg-[#33333366]'}`}>
      {
        mutate_order.isLoading &&
        <div className='fixed top-1/2 left-1/2'>
          <Loading_Dots />
        </div>
      }
      {/* item */}
      <div className='max-w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] mx-auto bg-white p-4 rounded'>
        {/* list items */}
        {list_item_order ? (<>
          <span className="flex mb-[1px] items-center justify-between pb-6">Đơn hàng của bạn</span>
          {
            list_item_order?.items ? (<div className='*:text-gray-800'>
              <DataTable columns={columns} data={list_item_order?.items} />
              <div className='flex justify-between whitespace-nowrap text-lg my-4'>
              </div>
              {
                list_item_order?.notes_order &&
                <div className='whitespace-normal text-base'>
                  <span>Ghi chú đơn hàng : </span>
                  <p>{list_item_order?.notes_order}</p>
                </div>
              }

            </div>) : routing.push('/')
          }
        </>) : <span>Không có đơn hàng nào!</span>}
      </div>
      {/* infor */}
      <div className="max-w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] grid grid-cols-2 gap-x-20 mx-auto mt-6 bg-white p-4 rounded">
        <div>
          <span className="flex mb-[1px] items-center justify-between pb-6">Thông tin nhận hàng</span>
          <div className='flex flex-col gap-y-5'>
            <div>
              <label htmlFor="name">Tên của bạn :</label>
              <Input {...register('name_user')} id='name' placeholder="Name" />
              {errors.name_user && <p className="text-red-500 md:text-sm text-xs">{errors.name_user.message}</p>}
            </div>
            <div>
              <label htmlFor="name">Số điện thoại :</label>
              <Input {...register('phone')} id='phone' placeholder="Phone" />
              {errors.phone && <p className="text-red-500 md:text-sm text-xs">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="name">Email :</label>
              <Input {...register('email_user')} id='email' placeholder="Email" />
              {errors.email_user && <p className="text-red-500 md:text-sm text-xs">{errors.email_user.message}</p>}
            </div>
            <div>
              <label htmlFor="name">Địa chỉ của bạn :</label>
              <Input {...register('address')} id='address' placeholder="Address" />
              {errors.address && <p className="text-red-500 md:text-sm text-xs">{errors.address.message}</p>}
            </div>
          </div>
        </div>
        <div>
          <div>
            <span className='text-gray-700'>Tổng tiền :</span>
            <span className='w-full ml-1 whitespace-nowrap text-red-600'>
              {(list_item_order?.total_price ? list_item_order?.total_price : list_item_order?.items[0]?.total_price_item)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </span>
          </div>
          <div className='my-2'>
            <span className='text-gray-700'>Phí vận chuyển :</span>
            <span className='w-full ml-1 whitespace-nowrap text-red-600'>
              {0?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </span>
          </div>
          <div>
            <span className='text-gray-700'>Voucher :</span>
            <span className='w-full ml-1 whitespace-nowrap text-red-600'>
              {0?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </span>
          </div>
          <div className='my-2'>
            <span className='text-gray-700'>Tổng thanh toán :</span>
            <span className='w-full ml-1 whitespace-nowrap text-red-600 text-2xl'>
              {(list_item_order?.total_price ? list_item_order?.total_price : list_item_order?.items[0]?.total_price_item)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </span>
          </div>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2 mt-4">
              <RadioGroupItem value="comfortable" id="r1" onClick={() => setCheck_payment(true)} />
              <Label htmlFor="r1">Thanh toán khi nhận hàng</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r2" onClick={() => setCheck_payment(false)} />
              <Label htmlFor="r2">Thanh toán bằng ZaloPay</Label>
            </div>
            {
              check_payment ?
                <Button className='bg-[#04BE04] hover:bg-green-600 mt-4' type='submit'>Thanh toán</Button> :
                <Button className='bg-[#04BE04] hover:bg-green-600 mt-4' type='button' onClick={next_payment}>
                  {mutate_order.isLoading ? <Loading_Dots /> : 'Đến cổng thanh toán'}
                </Button>
            }
          </RadioGroup>
        </div>
      </div>
    </form>
  </Suspense >)
}

export default Page
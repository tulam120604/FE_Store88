'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Input } from '../../../_Components/ui/Shadcn/input';
import { useRouter } from 'next/navigation';
import { Button } from '../../../_Components/ui/Shadcn/button';
import { useForm } from 'react-hook-form';
import { Mutation_Order } from '../../../_lib/Query_APIs/Order/Mutation_order';
import { schemaValidateOrder } from '../../../(Auth)/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import Loading_Dots from '../../../_Components/Loadings/Loading_Dots';
import { Label } from '@/src/app/_Components/ui/Shadcn/label'
import { RadioGroup, RadioGroupItem } from '../../../_Components/ui/radio-group';
import Breadcrum from '../../../_Components/breadcrum/breadcrum';
import { Mutation_Payment } from '../../../_lib/Query_APIs/Payment/Query_Payment';
import { List_Address } from '../../../_lib/Query_APIs/Auth/Query_Address';
import Table_item from './colum';
import { Textarea } from '../../../_Components/ui/textarea';
import { Get_Items_Cart } from '../../../_lib/Query_APIs/Cart/query';
import { filter_positive_Stock_Item } from '../../../_lib/Config/Filter_Cart_And_Order';
import { useToast } from '../../../_Components/ui/use-toast';
import { ToastAction } from '../../../_Components/ui/toast';
import Loading_Skeleton from '@/src/app/_Components/Loadings/Loading_Skeleton';

const Page_checkout = () => {
  const { toast } = useToast();
  const [check_payment, setCheck_payment] = useState<boolean>(true)
  const routing = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [checkStock, setCheckStock] = useState(true);
  // address
  const { data, isLoading } = List_Address();
  const { data: dataCart, isLoading: loadingCart } = Get_Items_Cart();
  const data_checked_true = dataCart?.items?.filter((item: any) => item?.status_checked && item);
  // lọc item số lượng lớn hơn 0
  const positive_Stock_Item = filter_positive_Stock_Item(data_checked_true);
  const total_price = positive_Stock_Item?.reduce((acc: number, cur: any) => acc + cur?.total_price_item, 0) || 0;
  // 
  useEffect(() => {
    if (!loadingCart && Array.isArray(positive_Stock_Item)) {
      setLoading(false);
    }
  }, [loadingCart, positive_Stock_Item]);
  //
  useEffect(() => {
    if (loading) return;
    if (!Array.isArray(positive_Stock_Item) || positive_Stock_Item?.length < 1) {
      routing.push('/')
    }
  }, [loading, routing, positive_Stock_Item]);
  // **
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaValidateOrder)
  });
  let action_mutation = ''
  function showToast(productName: string | number, stock: string | number) {
    toast({
      title: "Thông báo!",
      description: ` ${(+stock > 0) ? `Rất tiếc, sản phẩm ${productName} chỉ còn ${stock} chiếc. Vui lòng quay lại giỏ hàng giảm số lượng thanh toán!` :
        `Rất tiếc, sản phẩm ${productName} đã hết hàng. Vui lòng thanh toán sản phẩm khác!`}`,
      className: 'border border-gray-800',
      duration: 1500,
      action: (
        <ToastAction altText="Goto schedule to undo" onClick={() => routing.back()}>Ok</ToastAction>
      ),
    });
  }

  // check so luong trong kho
  function validate_stock_item() {
    // check so luong
    for (let i of positive_Stock_Item) {
      if (i?.product_id?.variant) {
        const check_attribute = i?.product_id?.variant?.variants?.find((value: any) => value?.attribute === i?.name_varriant);
        const check_name_variant = check_attribute?.value_variants?.find((value: any) =>
          i?.value_varriant === (value?.name_variant?.trim() ? value?.name_variant : undefined));
        if (check_attribute?.attribute === i?.name_varriant && check_name_variant?.name_variant === i?.value_varriant
          && i?.quantity > check_name_variant?.stock_variant) {
          showToast(i?.product_id?.short_name, check_name_variant?.stock_variant);
          setCheckStock(false)
          return false
        }
        if (check_attribute?.attribute === i?.name_varriant && i?.quantity > check_name_variant?.stock_variant) {
          showToast(i?.product_id?.short_name, check_name_variant?.stock_variant);
          setCheckStock(false)
          return false
        }
      }
      else if (i?.quantity > i?.product_id?.stock) {
        showToast(i?.product_id?.short_name, i?.product_id?.stock)
        setCheckStock(false)
        return false;
      }
    }
  }

  // notes_order
  const mutate_order = Mutation_Order('ADD_and_RESTORE_BUY_ITEM');
  const mutation_payment = Mutation_Payment('CREATE');
  function on_Checkout(infor_user_form: any) {
    validate_stock_item()
    const data_order = {
      action_mutate: action_mutation,
      items_order: positive_Stock_Item,
      // notes_order: list_item_order?.notes_order,
      infor_user: {
        name_user: infor_user_form?.name_user,
        phone: infor_user_form?.phone,
        email_user: infor_user_form?.email_user,
        address: infor_user_form?.address,
      },
      payment_method: check_payment ? 'COD' : 'PON'
    }
    if (checkStock) {
      if (check_payment) {
        mutate_order?.mutate(data_order);
      }
      else {
        // mutation payment
        mutation_payment?.mutate(data_order);
        // mutate_order.mutate(data_order);
      }
    }
  };
  if (mutate_order.status_api === '201') {
    routing.push('/thong-tin-tai-khoan/don-hang');
  }

  return (<Suspense fallback={<Loading_Skeleton number_elements={2} />}>
    {
      loadingCart ?
        <div className='max-w-[1440px] mx-auto w-[95vw] h-full'>
          <Loading_Skeleton number_elements={2} />
        </div>
        :
        <>
          <div className='max-w-[1440px] mx-auto w-[95vw] pt-2'>
            <Breadcrum textProps={{ name_item: 'Thanh toán' }} />
          </div>
          <form onSubmit={handleSubmit(on_Checkout)} className={`relative py-6 ${mutate_order.isLoading &&
            'after:fixed after:top-0 after:left-0 after:w-screen after:h-screen after:bg-[#33333366]'}`}>
            {
              mutate_order.isLoading &&
              <div className='fixed top-1/2 left-1/2'>
                <Loading_Dots />
              </div>
            }
            {/* item */}
            <div className='max-w-[1440px] mx-auto w-[95vw] rounded'>
              {/* list items */}
              {positive_Stock_Item ? (<>
                {
                  positive_Stock_Item ? (<div className='*:text-gray-800'>
                    <Table_item dataProps={positive_Stock_Item} />
                    <div className='flex justify-between whitespace-nowrap text-lg my-4'>
                    </div>
                  </div>) : routing.push('/')
                }
              </>) : <span>Không có đơn hàng nào!</span>}
            </div>
            {/* infor */}
            <div className="max-w-[1440px] mx-auto w-[95vw] grid lg:grid-cols-[auto_450px] gap-x-10 gap-y-6 *:bg-white *:p-4 *:rounded">
              <div>
                <span className="flex mb-[1px] items-center justify-between pb-6">Thông tin nhận hàng</span>
                <div className='flex flex-col gap-y-5'>
                  {
                    isLoading ? <span>Loading...</span> :
                      <>
                        <div>
                          <label htmlFor="name">Tên của bạn :</label>
                          <Input className='mt-2' {...register('name_user')} id='name' placeholder="Name" defaultValue={data?.default_address?.about_address?.user_name} />
                          {errors.name_user && <p className="text-red-500 md:text-sm text-xs">{errors.name_user.message}</p>}
                        </div>
                        <div>
                          <label htmlFor="name">Số điện thoại :</label>
                          <Input className='mt-2' {...register('phone')} id='phone' placeholder="Phone" defaultValue={data?.default_address?.about_address?.phone} />
                          {errors.phone && <p className="text-red-500 md:text-sm text-xs">{errors.phone.message}</p>}
                        </div>
                        <div>
                          <label htmlFor="name">Email :</label>
                          <Input className='mt-2' {...register('email_user')} id='email' placeholder="Email" defaultValue={data?.default_address?.about_address?.email} />
                          {errors.email_user && <p className="text-red-500 md:text-sm text-xs">{errors.email_user.message}</p>}
                        </div>
                        <div>
                          <label htmlFor="name">Địa chỉ của bạn :</label>
                          <Textarea className='mt-2' {...register('address')} id='address' placeholder="Address"
                            defaultValue={data?.default_address?.about_address?.address + ', ' + data?.default_address?.about_address?.provinces} />
                          {errors.address && <p className="text-red-500 md:text-sm text-xs">{errors.address.message}</p>}
                        </div>
                      </>
                  }
                </div>
              </div>
              <div>
                <div>
                  <span className='text-gray-700'>Tổng tiền :</span>
                  <span className='w-full ml-1 whitespace-nowrap text-red-600'>
                    {total_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
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
                    {total_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
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
                    total_price > 0 ?
                      (
                        check_payment ?
                          <Button className='bg-[#04BE04] hover:bg-green-600 mt-4' type='submit'>Thanh toán</Button> :
                          <Button className='bg-[#04BE04] hover:bg-green-600 mt-4'>
                            {mutate_order.isLoading ? <Loading_Dots /> : 'Đến cổng thanh toán'}
                          </Button>
                      ) :
                      (
                        check_payment ?
                          <Button className='bg-gray-500 hover:cursor-not-allowed hover:bg-gray-500 mt-4' type='button'>Thanh toán</Button> :
                          <Button className='bg-gray-500 hover:cursor-not-allowed hover:bg-gray-500 mt-4' type='button'>
                            Đến cổng thanh toán
                          </Button>
                      )
                  }
                </RadioGroup>
              </div>
            </div>
          </form>
        </>
    }

  </Suspense >)
}

export default Page_checkout
/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import React from 'react'
import { Custome_Hooks_Auth } from '../../_lib/Custome_Hooks/Auth_Form';
import Loading_Spin from '../Loadings/Loading_Spin';
import Image from 'next/image';
import { Input } from '../ui/Shadcn/input';
import { Button } from '../ui/Shadcn/button';

const Form_auth = ({ mode }: any) => {
    // console.log(mode);
    const { my_form, isLoading, status_Loading, onSubmit, errors, routing } = Custome_Hooks_Auth({ mode });
    if (status_Loading === 'call_ok') {
        if (mode !== "Register") {
            routing.push('/');
        }
        else {
            routing.push('/dang-nhap');
        }
    }
    return (
        <div className='lg:grid h-screen lg:place-items-center bg-[#F3F4F6] relative z-[10] overflow-hidden 
        before:w-[140vw] before:h-[130vh] before:absolute before:bg-[#0A68FF] before:rotate-[65deg] before:top-0 
        before:-left-1/2 before:z-[-1] before:hidden lg:before:block'>
            <div className="mx-auto max-w-[1440px] w-[95vw] flex gap-x-10 justify-center fixed top-0 mt-5">
                <Link href={'/'}>
                    <Image width={200} height={100} className='w-[150px] max-h-10'
                        src={'https://res.cloudinary.com/tulam120604/image/upload/v1736088077/k3jhx9ywkmepcp9tz1b1.png'} alt='Store88' />
                </Link>
            </div>
            <div className="lg:grid w-screen lg:w-[1000px] shadow-lg lg:grid-cols-2 gap-x-20 justify-between bg-white lg:p-6 py-20 rounded-lg h-screen lg:h-auto">
                <section className="hidden lg:block relative w-[500px] ">
                    <Link href={'/'} className='text-[#1770FF] text-sm underline'>Trang chủ</Link>
                    <Image
                        alt="login..."
                        width={700}
                        height={700}
                        src="/Images/login.jpg"
                        className="absolute h-3/4 w-3/4 object-cover opacity-80 bottom-0 left-1/2 -translate-x-1/2"
                    />
                </section>
                <main className="flex item-center">
                    <form onSubmit={my_form.handleSubmit(onSubmit)} className="flex flex-col w-full px-6 gap-y-2 bg-white rounded-lg">
                        <h3 className="mb-3 lg:text-2xl font-extrabold text-gray-900 text-center">
                            {mode === 'Register' ? 'Tạo tài khoản ' : "Đăng nhập"}
                        </h3>
                        {mode === 'Register' && <div className="mb-3">
                            <label htmlFor="user_name" className="mb-2 text-sm font-semibold text-gray-900 flex" >
                                Tên tài khoản *
                            </label>
                            <Input {...my_form.register('user_name')}
                                id="user_name"
                                type="text"
                                placeholder="Enter a user name" className='focus:ring-1 focus:ring-gray-400' />
                            {mode === 'Register' && errors.user_name && <p className="text-red-500 md:text-sm text-xs mt-1">{errors.user_name.message}</p>}
                        </div>}
                        <div className="mb-3">
                            <label htmlFor="email" className="mb-2 text-sm font-semibold text-gray-900 flex">Email *</label>
                            <Input {...my_form.register('email')}
                                id="email"
                                type="email"
                                placeholder="email@ahihi.com" className='rounded focus:ring-1 focus:ring-gray-400' />
                            {errors.email && <p className="text-red-500 md:text-sm text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="mb-2 text-sm font-semibold text-gray-900 flex">
                                Mật khẩu *
                            </label>
                            <Input {...my_form.register('password')}
                                id="password"
                                type="password"
                                placeholder="Enter a password" className='focus:ring-1 focus:ring-gray-400' />
                            {errors.password && <p className="text-red-500 md:text-sm text-xs mt-1">{errors.password.message}</p>}
                        </div>
                        {mode === 'Register' ? <div className='flex flex-col'>
                            {status_Loading === 'call_error' && <span className='text-center text-xs lg:text-sm my-1 text-red-500'>* Tài khoản đã đã tồn tại! *</span>}
                            <Button>{isLoading ? <Loading_Spin /> : 'Tạo tài khoản'}</Button>
                            <div className="flex items-center mb-3">
                                <hr className="flex-grow border-gray-300" />
                                <p className="mx-4 text-gray-600">or</p>
                                <hr className="flex-grow border-gray-300" />
                            </div>
                            <Link href={''} className="flex items-center justify-center w-full py-2 mb-6 text-sm font-medium text-gray-900 transition duration-300 border border-gray-200 bg-gray-50 rounded-lg hover:bg-gray-200">
                                <img width={20} height={50}
                                    className="h-5 mr-2"
                                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                    alt="Google Logo"
                                />
                                Đăng kí bằng Google
                            </Link>
                            <p className="text-sm text-gray-600 text-center">
                                Đã có tài khoản?{" "}
                                <Link
                                    href="/dang-nhap"
                                    className="font-bold text-blue-600 hover:underline"
                                >
                                    Đăng nhập
                                </Link>
                            </p>
                        </div> :
                            <div className='flex flex-col'>
                                <div className="flex flex-row justify-between my-2">
                                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                {status_Loading === 'call_error' && <span className='text-center text-xs lg:text-sm text-red-500 my-1'>* Thông tin tài khoản không chính xác! *</span>}
                                <Button>{isLoading ? <Loading_Spin /> : 'Đăng nhập'}</Button>
                                <div className="flex items-center mb-3">
                                    <hr className="flex-grow border-gray-300" />
                                    <p className="mx-4 text-gray-600">or</p>
                                    <hr className="flex-grow border-gray-300" />
                                </div>
                                <Link href={''} className="flex items-center justify-center w-full py-2 mb-6 text-sm font-medium text-gray-900 transition duration-300 border border-gray-200 bg-gray-50 rounded-lg hover:bg-gray-200">
                                    <img width={20} height={50}
                                        className="h-5 mr-2"
                                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                        alt="Google Logo"
                                    />
                                    Đăng nhập bằng Google
                                </Link>
                                <p className="text-sm text-gray-600 text-center">
                                    Chưa có tài khoản?{" "}
                                    <Link
                                        href="/dang-ki"
                                        className="font-bold text-blue-600 hover:underline"
                                    >
                                        Tạo tài khoản
                                    </Link>
                                </p>
                            </div>}
                    </form>
                </main>
            </div>
        </div>
    )
}

export default Form_auth
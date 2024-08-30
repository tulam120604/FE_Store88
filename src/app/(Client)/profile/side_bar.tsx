'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import { useToast } from "@/src/app/_Components/ui/use-toast";
import Bell_component from "../../_Components/Notification/Bell_component";
import { Box, Heart, User } from "lucide-react";
import { Mutation_Auth } from "../../_lib/Tanstack_Query/Auth/auth_mutation";
import { useToken } from "../../_lib/Custome_Hooks/User";
import { eventEmit } from "../../_Components/ui/Header/Event_emit";

const Side_bar = () => {
    const { toast } = useToast();
    const token = useToken();
    const mutation_auth = Mutation_Auth({
        action : 'LOGOUT'
    })
    const pathName = usePathname();
    function log_out() {
        Swal.fire({
            title: "Xác nhận đăng xuất?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xác nhận!",
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                toast({
                    title: "Đã đăng xuất",
                    className: 'w-[200px] bg-gray-100 fixed right-0 bottom-0 text-gray-900 h-10',
                    duration: 800
                })
                localStorage.removeItem('account');
                mutation_auth.onSubmit(token?.accessToken);
                eventEmit.emit('logout')
                // routing.push('/');
            }
        });
    }
    return (
        <div className="flex h-full flex-col justify-between bg-white">
            <div className="flex flex-col gap-y-2 rounded-b *:border *:border-white *:after:absolute *:after:top-0 *:after:left-0 *:relative *:after:h-full *:after:bg-[#1F2937]">
                <Link href={'/profile/infor'}
                    className={`${pathName === '/profile/infor' ? 'block after:w-2 !border-[#1F2937] px-4 py-2 lg:py-4 text-sm font-medium text-black flex items-center gap-x-4' : 'block duration-200 hover:border-[#1F2937] hover:text-black hover:after:w-2 px-4 py-2 lg:py-4 text-sm font-medium text-gray-700 flex items-center gap-x-4'} `}>
                    <User className="!w-5"/>
                    <span className="hidden lg:block">Thông tin tài khoản</span>
                </Link>
                <Link href={'/profile/notification'}
                    className={`${pathName === '/profile/notification' ? 'block after:w-2 !border-[#1F2937] px-4 py-2 lg:py-4 text-sm font-medium text-black flex items-center gap-x-4' : 'block duration-200 hover:border-[#1F2937] hover:text-black hover:after:w-2 px-4 py-2 lg:py-4 text-sm font-medium text-gray-700 flex items-center gap-x-4'} `}>
                    <div className="relative *:!text-gray-800">
                        <Bell_component />
                    </div>
                    <span className="hidden lg:block">Thông báo</span>
                </Link>
                <Link href={'/profile/like'}
                    className={`${pathName === "/profile/like" ? 'block after:w-2 !border-[#1F2937] px-4 py-2 lg:py-4 text-sm font-medium text-black flex items-center gap-x-4' : 'block duration-200 hover:border-[#1F2937] hover:text-black hover:after:w-2 px-4 py-2 lg:py-4 text-sm font-medium text-gray-700 flex items-center gap-x-4'} `}>
                    <Heart />
                    <span className="hidden lg:block">Yêu thích</span>
                </Link>
                <Link href={'/profile/orders'}
                    className={`${pathName === '/profile/orders' ? 'block after:w-2 !border-[#1F2937] px-4 py-2 lg:py-4 text-sm font-medium text-black flex items-center gap-x-4' : 'block duration-200 hover:border-[#1F2937] hover:text-black hover:after:w-2 px-4 py-2 lg:py-4 text-sm font-medium text-gray-700 flex items-center gap-x-4'} `}>
                    <Box />
                    <span className="hidden lg:block">Đơn hàng</span>
                </Link>
                <button onClick={log_out} className="block duration-200 relative after:absolute after:top-0 after:left-0 after:h-full hover:after:w-2 after:bg-[#1F2937] hover:border-[#1F2937] hover:text-black px-4 py-2 lg:py-4 text-sm font-medium text-gray-700 flex items-center gap-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-output"><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M4 7V4a2 2 0 0 1 2-2 2 2 0 0 0-2 2" /><path d="M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6" /><path d="m5 11-3 3" /><path d="m5 17-3-3h10" /></svg>
                    <span className="hidden lg:block">Đăng xuất</span>
                </button>
            </div>
        </div>
    )
}

export default Side_bar
'use client';

import { useCheck_user, useToken } from "@/src/app/_lib/Custome_Hooks/User";
import { List_Account } from "@/src/app/_lib/Tanstack_Query/Auth/Query_Auth";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { DataTable } from "@/src/app/_Components/ui/Tables/data_table";
import { ColumnDef } from "@tanstack/react-table";
import io from 'socket.io-client'
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { Auth_Wrap_Admins } from "../_Auth_Wrap/Page";


const CustomersAdmin = () => {
    const routing = useRouter();
    const token = useToken();
    const user = useCheck_user();
    const { data, isLoading } = List_Account(token.accessToken);

    if (isLoading) {
        return <Loading />
    }

    const columns: ColumnDef<any>[] = [
        {
            cell: ({ row }) => (<>
                <Image className="rounded" width={50} height={50} src={row?.original?.avatar ? row?.original?.avatar : '/Images/default_avatar.jpg'} alt="Loading..."></Image>
            </>),
            'header': 'Ảnh đại diện'
        },
        {
            'accessorKey': 'user_name',
            'header': 'Tên tài khoản'
        },
        {
            'accessorKey': 'email',
            'header': 'Email'
        },
        {
            cell: ({ row }) => (
                <span>{(row?.original?.role) === 'admin_global' ? 'Quản lí' : (row?.original?.role === 'admin_local') ? 'Nhân viên'
                : (row?.original?.role === 'seller') ? 'Người bán' : 'Người dùng'}</span>
            ),
            'header': 'Vai trò'
        },
        {
            cell: ({ row }) => (
                console.log(row?.original)
            ),
            'header': 'Options'

        }
    ]


    return (
        <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
            <Auth_Wrap_Admins>
                <div className="flex flex-col gap-y-6 py-4 rounded">
                    <strong className="text-gray-900 lg:text-xl">Khách hàng</strong>
                    <div className="border border-gray-300 rounded-lg px-4">
                        {
                            data?.data &&
                            <DataTable data={data?.data?.docs} columns={columns}/>
                        }
                    </div>
                </div>
            </Auth_Wrap_Admins>
        </Suspense>

    )
}

export default CustomersAdmin
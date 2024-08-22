'use client';

import { Contact, House, Package, Settings, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCheck_user, useToken } from "../_lib/Custome_Hooks/User";
import { service_check_token } from "./adminstrations/_Auth_Wrap/Page";
import Loading_Dots from "../_Components/Loadings/Loading_Dots";

const SideBarDashboard = () => {
    const token = useToken();
    const user = useCheck_user();
    const { data, isLoading } = service_check_token(user?.check_email?._id, token?.accessToken);
    if (isLoading) {
        <Loading_Dots />
    }

    const usePathName = usePathname();
    let arr = [
        {
            icon: <House strokeWidth={1.8} className="h-5"/>,
            name: 'Bảng điều khiển',
            pathName: '/adminstrations/dashboard/overview',
        },
        {
            icon: <Package strokeWidth={1.8} className="h-5"/>,
            name: 'Sản phẩm',
            pathName: '/adminstrations/list_products',
        },
        {
            icon: <Contact strokeWidth={1.8} className="h-5"/>,
            name: 'Khách hàng',
            pathName: '/adminstrations/customers',
        },
        {
            icon: <ShoppingBag strokeWidth={1.8} className="h-5"/>,
            name: 'Đơn hàng',
            pathName: '/adminstrations/orders'
        },
        {
            icon: <Trash2 strokeWidth={1.8} className="h-5"/>,
            name: 'Thùng rác',
            pathName: '/adminstrations/list_products/recycle',
        },
        {
            icon: <Settings strokeWidth={1.8} className="h-5"/>,
            name: 'Settings',
            pathName: '/adminstrations/settings'
        }
    ]
    if (data?.data?.role === 'seller') {
        arr = arr.filter((_: any, index: number) => [1, 3].includes(index))
    }
    return (
        <div className="*:relative flex flex-col text-gray-900 gap-y-4 *:flex *:items-center *:gap-x-2 *:rounded *:duration-300 px-2 *:whitespace-nowrap">
            {
                arr?.map((item) => {
                    return (
                        <Link key={item.pathName} href={item.pathName} className={`${usePathName === item.pathName ? 'group lg:px-4 lg:py-2 p-1.5 bg-[#2563EB] text-gray-100' :
                            'lg:px-4 lg:py-2 p-1.5 hover:bg-[#2563EB] hover:text-gray-100'}`}>
                            {item?.icon}
                            <span className="hidden lg:block text-sm">{item?.name}</span>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default SideBarDashboard
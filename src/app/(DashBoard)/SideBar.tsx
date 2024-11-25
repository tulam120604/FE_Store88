'use client';

import { ChevronDown, Contact, House, List, Package, Settings, Shapes, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCheck_user, useToken } from "../_lib/Custome_Hooks/User";
import { service_check_token } from "./trung-tam-dieu-khien/_Auth_Wrapper/Page";
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
            icon: <House strokeWidth={1.8} className="h-5" />,
            name: 'Bảng điều khiển',
            pathName: '/trung-tam-dieu-khien/bang-dieu-khien/tong-quan',
        },
        {
            icon: <Package strokeWidth={1.8} className="h-5" />,
            name: 'Sản phẩm',
            pathName: '/trung-tam-dieu-khien/san-pham',
            child_uri: [
                {
                    name: 'Danh sách',
                    path: '/trung-tam-dieu-khien/san-pham/danh-sach',
                },
                {
                    name: 'Tạo sản phẩm',
                    path: '/trung-tam-dieu-khien/san-pham/them-moi-san-pham',
                },
                {
                    name: 'Thuộc tính',
                    path: '/trung-tam-dieu-khien/san-pham/thuoc-tinh-san-pham',
                },
                {
                    name: 'Thùng rác',
                    path: '/trung-tam-dieu-khien/san-pham/thung-rac',
                },
            ]
        },
        {
            icon: <Contact strokeWidth={1.8} className="h-5" />,
            name: 'Khách hàng',
            pathName: '/trung-tam-dieu-khien/danh-sach-tai-khoan',
        },
        {
            icon: <ShoppingBag strokeWidth={1.8} className="h-5" />,
            name: 'Đơn hàng',
            pathName: '/trung-tam-dieu-khien/danh-sach-don-hang'
        },
        {
            icon: <Settings strokeWidth={1.8} className="h-5" />,
            name: 'Settings',
            pathName: '/trung-tam-dieu-khien/cai-dat'
        }
    ]
    if (data?.data?.role === 'seller') {
        arr = arr.filter((_: any, index: number) => ![2, 5].includes(index))
    }
    return (
        <div className="*:relative flex flex-col text-gray-900 gap-y-4 *:items-center *:whitespace-nowrap border-r border-gray-300">
            {
                arr?.map((item) => {
                    const isActive = usePathName.startsWith(item?.pathName);
                    return (
                        <details key={item?.pathName} className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer *:duration-300 *:flex *:items-center *:gap-x-2 justify-between *:w-full 
                                rounded text-gray-500">
                                {
                                    item?.child_uri ?
                                        <div className={`${(isActive) ? 'group lg:px-4 lg:py-2 p-1.5 bg-gray-300 text-gray-900' :
                                            'lg:px-4 lg:py-2 p-1.5 hover:bg-gray-300 hover:text-gray-900'}`}>
                                            <section className="flex items-center gap-x-2">
                                                {item?.icon}
                                                <span className="hidden lg:block text-sm">{item?.name}</span>
                                            </section>
                                            <ChevronDown className="group-open:-rotate-180 duration-200" />
                                        </div> :
                                        <Link href={item?.pathName} className={`${(isActive) ? 'group lg:px-4 lg:py-2 p-1.5 bg-gray-300 text-gray-900' :
                                            'lg:px-4 lg:py-2 p-1.5 hover:bg-gray-300 hover:text-gray-900'}`}>
                                            {item?.icon}
                                            <span className="hidden lg:block text-sm">{item?.name}</span>
                                        </Link>
                                }
                            </summary>
                            <ul className="*:duration-300 *:w-full text-gray-500 bg-gray-200
                            flex flex-col gap-y-2 items-end">
                                {
                                    item?.child_uri?.map((uri: any) => {
                                        const isChildActive = usePathName === uri.path;
                                        return (
                                            <Link key={uri?.path} href={uri?.path} className={`${(isChildActive) ? 'group lg:px-10 lg:py-2 p-1.5 text-gray-900' :
                                                'lg:px-10 lg:py-2 p-1.5 hover:text-gray-900 opacity-70 hover:opacity-100'}`}>
                                                <span className="hidden lg:block text-sm">{uri?.name}</span>
                                            </Link>
                                        )
                                    })
                                }
                            </ul>
                        </details>
                    )
                })
            }
        </div>
    )
}

export default SideBarDashboard

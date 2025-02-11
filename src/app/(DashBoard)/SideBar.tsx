'use client';

import { ChevronDown, Contact, House, Package, Settings, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loading_Dots from "../_Components/Loadings/Loading_Dots";
import Image from "next/image";
import { Infor_user } from "../_lib/Query_APIs/Auth/Query_Auth";

const SideBarDashboard = () => {
    const { data: data_user, isLoading: loading_user } = Infor_user();
    if (loading_user) {
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
    if (data_user?.data?.role === 'seller') {
        arr = arr.filter((_: any, index: number) => ![2, 5].includes(index))
    }
    return (
        <div>
            <div className="grid place-items-center w-full mb-6 text-gray-100">
                <Image className="rounded-[50%] border-2 border-gray-400 p-1" width={100} height={100} src={'/Images/avatar.jpg'} alt='avatar' />
            </div>
            <div className="*:relative flex flex-col text-gray-700 gap-y-1 *:items-center *:whitespace-nowrap font-regular px-2">
                {
                    arr?.map((item: any) => {
                        const isActive = usePathName.startsWith(item?.pathName);
                        return (
                            <details key={item?.pathName} open={isActive ? true : false} className='group [&_summary::-webkit-details-marker]:hidden'>
                                <summary
                                    className="flex cursor-pointer *:duration-300 *:flex *:items-center *:gap-x-2 justify-between *:w-full">
                                    {
                                        item?.child_uri ?
                                            <div className={`${isActive && 'bg-[#172850] text-gray-200'} lg:px-4 lg:py-2 p-1.5 hover:bg-[#172850] hover:text-gray-200 rounded justify-between`}>
                                                <section className="flex items-center gap-x-2">
                                                    {item?.icon}
                                                    <span className="hidden lg:block text-sm">{item?.name}</span>
                                                </section>
                                                <ChevronDown className="group-open:-rotate-180 duration-200" />
                                            </div> :
                                            <Link href={item?.pathName} className={`${(isActive) ? 'bg-[#172850] text-gray-200' :
                                                'hover:bg-[#172850] hover:text-gray-200'} lg:px-4 lg:py-2.5 p-1.5 rounded`}>
                                                {item?.icon}
                                                <span className="hidden lg:block text-sm">{item?.name}</span>
                                            </Link>
                                    }
                                </summary>
                                <ul className="*:duration-300 *:w-full bg-gray-200 flex flex-col gap-y-1 items-end">
                                    {
                                        item?.child_uri?.map((uri: any) => {
                                            const isChildActive = usePathName === uri.path;
                                            return (
                                                <Link key={uri?.path} href={uri?.path} className={`lg:pl-8 lg:py-2.5 p-1.5 rounded flex items-center gap-x-2`}>
                                                    <div className={`${isChildActive && 'bg-[#172850] border-[#172850]'} 
                                                    w-3 h-3 border border-[#172850] rounded-full`} />
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
        </div>
    )
}

export default SideBarDashboard
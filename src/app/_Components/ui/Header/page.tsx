'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Get_Items_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/query';
import Search_icon from '../../Icons/Search';
import { Search_Component_Client } from '../../Forms/search';
import Bell_component from '../../Notification/Bell_component';
import { ShoppingBag } from 'lucide-react';
import { eventEmit } from './Event_emit';
import useStoreZustand from '@/src/app/Zustand/Store';

const Header = () => {
    const { isVisible } = useStoreZustand();
    const routing = useRouter();
    const [checkLocal, setCheckLocal] = useState<boolean>(false)
    const toggleFixedHeader = useRef<HTMLHeadElement>(null);
    useEffect(() => {
        function handle_scroll_header() {
            (window.addEventListener('scroll', () => {
                if (toggleFixedHeader.current) {
                    (window.scrollY > 100) ?
                        (toggleFixedHeader.current.classList.add('animate-[animationScrollYHeader_1s]', '-translate-y-9', 'sticky')) :
                        (toggleFixedHeader.current.classList.remove('animate-[animationScrollYHeader_1s]', '-translate-y-9', 'sticky'));
                }
            }))
        }
        window.addEventListener('scroll', handle_scroll_header);
        return () => window.addEventListener('scroll', handle_scroll_header);
    }, []);
    // login
    useEffect(() => {
        const status_Storage = () => {
            if (!localStorage.getItem('account')) {
                setCheckLocal(false)
                routing.push('/');
            }
            else {
                setCheckLocal(true)
            }
        }
        eventEmit.on('logout', () => { setCheckLocal(false) })
        status_Storage();
        window.addEventListener('storage', status_Storage);
        return () => window.removeEventListener('storage', status_Storage);
    }, [checkLocal, routing])

    // cart :
    function handleCart() {
        if (!localStorage.getItem('account')) {
            routing.push('/login')
        }
        else {
            routing.push('/cart');
        }
    };
    console.count('re-rended :');

    function Count_Cart() {
        const [data_storage, set_data_storage] = useState();
        useEffect(() => {
            if (localStorage.getItem('account')) {
                const storage_acc = JSON.parse(localStorage.getItem('account') || '{}');
                set_data_storage(storage_acc?.check_email?._id);
            }
        }, [data_storage])
        const { data } = Get_Items_Cart(data_storage);
        let new_arr;
        if (data?.items) {
            new_arr = data?.items.filter((item: any) => (item?.product_id !== null) && item);
        }
        return (<>
            {data?.items && (<span className="z-[1] absolute bg-red-500 -top-[20%] -right-1/4 grid place-items-center rounded-[50%] w-5 h-5 text-xs text-white">{new_arr?.length}</span>)}
        </>
        )
    }

    return (
        <header ref={toggleFixedHeader} className="w-full bg-none z-[20] duration-300 top-0 lg:h-[103px] bg-gray-900 text-white">
            {/* top header */}
            <div className="w-full lg:h-[37px] mb:h-[34px] *:text-white flex justify-center items-center *:lg:text-sm *:mb:text-xs gap-x-4">
                <span className="opacity-80 lg:w-auto mb:w-[266px] mb:truncate">Xin chào đại vương, chúc đại vương có một trải nghiệm thoải mái.</span>
            </div>
            {/* logo, search and cart */}
            <div className="relative mx-auto max-w-[1440px] w-[95vw] lg:h-[66px] mb:h-[56px] flex justify-between *:flex *:items-center gap-x-20 items-center">
                <div className=''>
                    <Link className='lg:text-2xl text-lg font-extrabold' href={'/'}>
                        Store88
                    </Link>
                </div>
                {/* form search */}
                <div className='md:!block !hidden absolute md:w-[50%] w-[30%] left-1/2 -translate-x-1/2 z-[7]'>
                    <Search_Component_Client />
                </div>

                <div className="lg:gap-x-6 mb:gap-x-4 flex items-center">
                    <div className='md:hidden block'>
                        <div className='group *:text-white relative'>
                            <Search_icon />
                            <form className={`group-hover:block hidden absolute w-[200px] top-10 right-1/2 translate-x-1/2 *:h-[36px] gap-x-2 shadow-[0_35px_60px_100vh_rgba(0,0,0,0.3)] rounded-lg duration-300`}>
                                <input type="text" className="border rounded-lg w-full pl-5 pr-14 text-xs outline-none font-normal text-gray-700" placeholder="Đại vương muốn mua gì nào?" />
                            </form>
                        </div>
                    </div>
                    {/* bell */}
                    {
                        checkLocal &&
                        <Link href={'/profile/notification'} className='relative cursor-pointer'>
                            <Bell_component />
                        </Link>
                    }
                    {/* cart */}
                    <div className="h-[24px] relative group cursor-pointer">
                        <button onClick={handleCart} className='z-[1] relative' >
                            <ShoppingBag />
                            <Count_Cart />
                            {/* animation add cart */}
                            {
                                isVisible &&
                                <div className='animation_add_cart absolute w-4 h-4 lg:w-8 lg:h-8 rounded-full'>
                                    <Image width={40} height={40} className='rounded-full' src={isVisible} alt='.' />
                                </div>
                            }

                        </button>

                    </div>
                    <Link href={'/login'} className={`${checkLocal ? 'hidden' : 'block'} text-xs lg:text-sm hover:text-gray-300 cursor-pointer duration-300 whitespace-nowrap`}>Đăng nhập</Link>
                    <Link href={'/profile/infor'} className={`${checkLocal ? 'block' : 'hidden'} relative border-none p-0.5 cursor-pointer whitespace-nowrap group`}>
                        <Image className='hover:scale-[1.2] duration-200 rounded-[50%]' width={30} height={30} src={'/Images/avatar.jpg'} alt=''></Image>
                        <span className='hidden group-hover:block duration-200 text-xs absolute right-0 translate-x-0 top-full'>Hồ sơ của bạn</span>
                    </Link>
                </div>
            </div>
        </header>
    )
};

export default Header;
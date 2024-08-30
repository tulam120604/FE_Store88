'use client';

import Link from "next/link";
import Image from "next/image";
import SideBarDashboard from "./SideBar";
import { Search_Component_Dashboard } from "../_Components/Forms/search";
import { Query_Notification } from "../_lib/Tanstack_Query/Notification/Query_Notification";
import React, { useEffect, useState } from "react";
import { useToast } from "../_Components/ui/use-toast";
import Notification_Component from "../_Components/Notification/Notification";
import { useCheck_user } from "../_lib/Custome_Hooks/User";

const Layout_Admin = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  let user = useCheck_user() ?? '';
  const { toast } = useToast();
  const [count_bell, setCount_bell] = useState(0)
  const data = Query_Notification(user?.check_email?._id);

  useEffect(() => {
    if (!data?.isLoading && !data?.isError) {
      const message_not_send = data?.data?.data_notification?.filter((item: any) => !item?.status_message);
      let data_old = message_not_send ?? 0;
      if (count_bell < data_old) {
        toast({
          title: "Bạn có thông báo mới!",
          className: 'w-[250px] bg-gray-100 fixed right-0 bottom-0 border-none',
          duration: 1000
        })
        setCount_bell(data_old)
      }
    }
  }, [data?.data?.data_notification, count_bell]);

  let total_bell: any;
  if (data?.data?.data_notification) {
    total_bell = data?.data?.data_notification?.filter((item: any) => item?.status_message !== true) ?? ''
  }
  return (
    <div className="w-full min-h-screen bg-[#F9FBFD]">
      <div className="max-w-[3840px] md:w-[95vw] mx-auto">
        {/* header */}
        <div className="fixed w-screen top-0 left-0 bg-[#1F2936] z-[10]">
          <header className="max-w-[1440px] md:w-[95vw] z-[1] h-[70px] mx-auto flex items-center justify-between sticky top-0">
            <Link className='text-sm lg:text-xl font-extrabold font-sans text-gray-100' href={'/'}>
              Store88
            </Link>
            <Search_Component_Dashboard />
            {/* options */}
            <div className="flex items-center gap-x-8">
              {/* notification */}
              <Link href={'adminstrations/dashboard/notification'} className="cursor-pointer relative text-gray-100 group">
                <Notification_Component dataProps={{ data: data?.data, total_bell: total_bell }} />
              </Link>
              {/* logo account */}
              <div>
                <Image className="rounded-[50%] cursor-pointer hover:scale-110 duration-200" width={30} height={30} src={'/Images/avatar.jpg'} alt='avatar' />
              </div>
            </div>
          </header>
        </div>

        {/* side bar */}
        <main className="items-start gap-x-2 w-full mt-20 grid lg:grid-cols-[200px_auto] grid-cols-[50px_auto]">
          <div className="sticky top-20 -translate-y-20 pt-[80px] bg-white after:bg-white relative after:absolute after:w-full after:h-screen after:top-0 after:left-0 
          after:border-r after:border-gray-300 after:z-[-1] after:rounded">
            <SideBarDashboard />
          </div>
          <div className="min-h-screen !text-gray-900 rounded *:w-full *:px-4">
            {children}
          </div>
        </main>
        <footer className="text-white text-center py-4 relative mt-auto">@Copyright by Tu Lam</footer>
      </div>
    </div>
  )
}

export default Layout_Admin
'use client';

import SideBarDashboard from "./SideBar";
import { Query_Notification } from "../_lib/Query_APIs/Notification/Query_Notification";
import React, { useEffect, useState } from "react";
import { useToast } from "../_Components/ui/use-toast";
import { Auth_Provider } from "./trung-tam-dieu-khien/_Auth_Wrapper/Page";

const Layout_Admin = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { toast } = useToast();
  const [count_bell, setCount_bell] = useState(0);
  const data = Query_Notification();

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
  }, [data, count_bell]);

  
  return (
    <Auth_Provider>
      <div className="bg-[#F5F5FA] *:antialiased min-h-screen">
        {/* side bar */}
        <main className="items-start w-full grid lg:grid-cols-[200px_auto] grid-cols-[50px_auto] min-h-auto">
          <div className="sticky top-0 pt-6 bg-[#F7F9FB] after:bg-[#F7F9FB] after:absolute after:w-full after:h-screen after:top-0 after:left-0 
        after:z-[-1] shadow-lg after:shadow-lg">
            <SideBarDashboard />
          </div>
          <div className="min-h-screen flex flex-col justify-between">
            <div className="pl-6 pr-3">
              {children}
            </div>
            <footer className="text-gray-900 text-center pt-5 pb-4 mt-4 bg-gradient-to-r from-[#F7F9FB] to-white z-10 
          shadow-[3px_-0.5px_4px_1px_rgba(0,0,0,0.1)]">@Copyright by Tu Lam</footer>
          </div>
        </main>
      </div>
    </Auth_Provider>
  )
}

export default Layout_Admin
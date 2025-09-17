/* eslint-disable @next/next/no-img-element */
"use client";

import SideBarDashboard from "./SideBar";
import { Query_Notification } from "../_lib/Query_APIs/Notification/Query";
import React, { useEffect, useState } from "react";
import { useToast } from "../_Components/ui/use-toast";
import { Logs, User } from "lucide-react";
import { useAuthStore } from "../_lib/Zustand/Store";
import { ThemeToggle } from "../_Components/ui/toggleTheme";
import { Search_component } from "../_Components/Forms/search";
import Btn_logout from "../_Components/Btn/Btn_logout";

const Layout_Admin = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { toast } = useToast();
  const [count_bell, setCount_bell] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const data = Query_Notification();
  const { data: user } = useAuthStore();

  useEffect(() => {
    document.title = "Trung tâm điều khiển";
  }, []);

  useEffect(() => {
    if (!data?.isLoading && !data?.isError) {
      const message_not_send = data?.data?.data_notification?.filter(
        (item: any) => !item?.status_message
      );
      let data_old = message_not_send ?? 0;
      if (count_bell < data_old) {
        toast({
          title: "Bạn có thông báo mới!",
          className: "w-[250px] bg-gray-100 fixed right-0 bottom-0 border-none",
          duration: 1000,
        });
        setCount_bell(data_old);
      }
    }
  }, [data, count_bell]);

  return (
    <>
      <div className="bg-[#ECF1F2] dark:bg-[#020517] min-h-screen antialiased flex">
        {/* Sidebar chỉ hiển thị ở màn hình >= xl */}
        <aside className="hidden xl:block w-[200px] min-h-screen">
          <SideBarDashboard />
        </aside>

        {/* content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header
            className="sticky top-0 flex items-center justify-between 
                       px-6 xl:h-[57.5px] h-10 border-b-2 z-20 bg-[#ECF1F2] dark:bg-[#020517]"
          >
            {/* mobile */}
            <button className="xl:hidden" onClick={() => setOpen(!open)}>
              <Logs />
            </button>

            <div className="xl:hidden" onClick={() => setOpen(!open)}>
              <div
                className={`${
                  open ? "translate-x-0" : "-translate-x-[200%]"
                } fixed top-0 left-0 
              w-full h-full z-30 duration-300`}
              >
                <SideBarDashboard />
              </div>
              <div
                className={`${open ? "block" : "hidden"} fixed top-0 left-0 
              w-full h-full bg-gray-500 bg-opacity-50 z-20`}
              />
            </div>

            <div className="flex justify-between w-full">
              <div className="w-[50%] ml-10 xl:ml-0">
                <Search_component type="dashboard" />
              </div>

              <div className="flex gap-x-4">
                {/* toggle theme */}
                <ThemeToggle />

                {/* avatar */}
                {user?.avatar ? (
                  <div className="group relative cursor-pointer">
                    <img
                      width={50}
                      height={50}
                      src={user?.avatar}
                      className="rounded-full w-10 h-10"
                      alt="."
                    />
                    {user?.user_name && (
                      <div className="*:border *:text-sm">
                        <Btn_logout/>
                      </div>
                    )}
                  </div>
                ) : (
                  <User
                    strokeWidth={1.5}
                    className="relative mx-auto -translate-y-1/2 top-1/2"
                  />
                )}
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 px-6 py-4 w-screen xl:w-full">
            {children}
          </main>

          {/* Footer */}
          <footer className="text-center pt-5 pb-4 mt-4 z-10 text-sm text-gray-600">
            @Copyright by Tu Lam
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout_Admin;

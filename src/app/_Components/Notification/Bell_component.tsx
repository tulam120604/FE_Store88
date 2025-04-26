import React from "react";
import Notification_Component from "./Notification";
import { Query_Notification } from "@/src/app/_lib/Query_APIs/Notification/Query";
import { BellRing } from "lucide-react";

export default function Bell_component() {
  const data = Query_Notification();
  let total_bell: any;
  if (data?.data?.data_notification) {
    total_bell =
      data?.data?.data_notification?.filter(
        (item: any) => item?.status_message !== true
      ) ?? [];
  }
  
  return (
    <div className="relative">
      <BellRing className="lg:w-6 w-4 text-lg" />
      {data?.data && total_bell && total_bell?.length > 0 && (
        <span
          className="absolute rounded-full text-white flex items-center justify-center 
        -top-[40%] -right-1/2 bg-[#5B7FFB] px-1 py-0.5 text-[10px]"
        >
          {total_bell?.length < 99 ? "99+" : total_bell?.length}
        </span>
      )}
      {data?.data && (
        <span className="hidden whitespace-nowrap group-hover:block z-[10] fixed text-sm -translate-x-3/4 top-14 p-2 bg-[#111827] rounded">
          {total_bell?.length > 0
            ? `Bạn có ${total_bell?.length} thông báo!`
            : "Không có thông báo nào!"}
        </span>
      )}
    </div>
  );
}

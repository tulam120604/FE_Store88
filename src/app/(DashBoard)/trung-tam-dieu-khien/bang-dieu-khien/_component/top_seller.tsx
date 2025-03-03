"use client";

import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/app/_Components/ui/Chart/card";
import { UserRoundCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Top_seller({ dataProps }: any) {
  //   console.log(dataProps);

  //   sắp xếp giảm dần theo doanh thu
  for (let i = 0; i < dataProps?.length - 1; i++) {
    for (let j = 0; j < dataProps?.length - 1; j++) {
      if (dataProps[j]?.totalAmount < dataProps[j + 1]?.totalAmount) {
        let temp = dataProps[j];
        dataProps[j] = dataProps[j + 1];
        dataProps[j + 1] = temp;
      }
    }
  }
  //   console.log(dataProps);
  return (
    <div className="rounded-lg bg-white shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-base text-gray-700 tracking-[0.5]">
          Top doanh thu đối tác
        </CardTitle>
      </CardHeader>
      <CardContent className="grid overflow-y-auto hidden_scroll max-h-[85%]">
        <div className="flex items-center justify-between gap-4 font-medium text-xs border-b pb-3">
          <div className="flex gap-x-6 items-center">
            <span>#</span>
            <span>Đối tác</span>
          </div>
          <span>Tổng doanh thu</span>
        </div>
        {dataProps ? (
          Array.isArray(dataProps) &&
          dataProps?.map((item: any, i: number) => (
            <div key={item?._id} className="flex items-center gap-x-4 border-b py-3">
              <span className="text-xs">{i + 1}</span>
              <div className="h-9 w-9 grid place-items-center border rounded-full overflow-hidden">
                {item?.avatarSeller ? (
                  <Image
                    width={35}
                    height={35}
                    src={item?.avatarSeller}
                    alt=""
                  />
                ) : (
                  <UserRoundCheck stroke="#2563EB" />
                )}
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {item?.nameSeller}
                </p>
                <p className="text-muted-foreground text-xs">
                  {item?.emailSeller}
                </p>
              </div>
              <span className="ml-auto font-medium text-xs">
                {item?.totalAmount?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          ))
        ) : (
          <span>Trống!</span>
        )}
      </CardContent>
    </div>
  );
}

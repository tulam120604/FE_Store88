"use client";

import { Suspense } from "react";
import { Auth_Provider } from "../_Auth_Wrapper/Page";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";

const Setting_Admin = () => {
  return (
    <Suspense fallback={"Loading"}>
      <Auth_Provider>
        <Suspense
          fallback={
            <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center">
              <Loading_Dots />
            </div>
          }
        >
          <div className="flex flex-col gap-y-6 py-4 rounded text-gray-700 ">
            <span className="lg:text-xl">Cài đặt</span>
            <div className="grid place-content-center">Đang phát triển</div>
          </div>
        </Suspense>
      </Auth_Provider>
    </Suspense>
  );
};

export default Setting_Admin;

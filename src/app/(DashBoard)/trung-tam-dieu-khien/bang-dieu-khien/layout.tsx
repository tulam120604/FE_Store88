"use client";

import React, { Suspense } from "react";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { usePathname } from "next/navigation";

const Page = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathName = usePathname();

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center">
          <Loading_Dots />
        </div>
      }
    >
      <div className="py-4">
        <strong className="text-xl opacity-80">Tổng quan</strong>
        {children}
      </div>
    </Suspense>
  );
};

export default Page;

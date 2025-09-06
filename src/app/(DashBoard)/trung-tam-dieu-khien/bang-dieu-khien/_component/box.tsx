"use client";

import React from "react";

const Box = ({ dataProps }: any) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center relative">
        <span>{dataProps?.text} </span>
        <div
          className="absolute right-0 p-2 rounded-xl bg-[#E2EDFF] dark:bg-[#142652]"
        >
          {dataProps?.icon}
        </div>
      </div>
      <strong className="text-xl">
        {dataProps?.number ? dataProps?.number : 0}
      </strong>
    </div>
  );
};

export default Box;

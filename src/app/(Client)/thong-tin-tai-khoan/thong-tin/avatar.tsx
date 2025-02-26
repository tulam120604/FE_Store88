/* eslint-disable @next/next/no-img-element */
"use client";

import Loading_Overlay from "@/src/app/_Components/Loadings/Loading_Overlay";
import { Mutation_update_auth } from "@/src/app/_lib/Query_APIs/Auth/Auth_mutation";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Avatar_account({ data_user }: any) {
  const { submitForm, form_data, isLoading } = Mutation_update_auth();
  const [status_button, setStatus_button] = useState(false)
  const [uriImg, setUri_Img] = useState<any>("");
  useEffect(() => {
    setUri_Img(data_user?.data?.avatar);
  }, [data_user?.data?.avatar]);
  function pushImage(e: any) {
    const file = e?.target?.files[0];
    if (file && file?.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStatus_button(true)
        setUri_Img(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      window.alert("Vui lòng chọn đúng định dạng ảnh!");
    }
  }

  return (
    <div className="border-l grid place-content-center">
      <form
        onSubmit={form_data.handleSubmit(submitForm)}
        className="text-gray-500"
      >
        {
          isLoading && <Loading_Overlay/>
        }
        <div className="rounded-full bg-[#EFEFEF] grid place-content-center w-20 h-20">
          <>
            {uriImg ? (
              <img
                width={80}
                height={80}
                src={uriImg}
                className="rounded-full w-20 h-20"
                alt="loading"
              />
            ) : (
              <User fill="#EFEFEF" width={40} height={40} strokeWidth={1} />
            )}
          </>
        </div>
        <div className="flex flex-col gap-y-2 *:px-2 *:py-1 *:rounded *:border *:text-sm mt-4 relative">
          <button type="button" className="cursor-pointer">
            Chọn ảnh
          </button>
          <input
            {...form_data.register("new_avatar")}
            type="file"
            accept="image/*"
            className="opacity-0 absolute w-20 border cursor-pointer"
            onChange={pushImage}
          />
          <button
            type="submit"
            className={`${status_button ? 'block' : 'hidden'} bg-[#6F8BFC] hover:scale-105 text-gray-50`}
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}

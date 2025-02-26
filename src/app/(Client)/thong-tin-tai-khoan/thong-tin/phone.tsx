"use client";

import Loading_Overlay from "@/src/app/_Components/Loadings/Loading_Overlay";
import { Button } from "@/src/app/_Components/ui/Shadcn/button";
import { Input } from "@/src/app/_Components/ui/Shadcn/input";
import { Label } from "@/src/app/_Components/ui/Shadcn/label";
import { Mutation_update_auth } from "@/src/app/_lib/Query_APIs/Auth/Auth_mutation";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";

export default function Phone_account({ data_user }: any) {
  const { submitForm, form_data, isLoading, isSuccess } = Mutation_update_auth();
  const form_create_phone = useRef<HTMLDivElement>(null);
  const bg_overlay_form_create_phone = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isSuccess) {
      form_create_phone?.current?.classList?.add("scale-0");
      form_create_phone?.current?.classList?.remove("scale-100");
      bg_overlay_form_create_phone?.current?.classList?.add("hidden");
      bg_overlay_form_create_phone?.current?.classList?.remove("block");
    }
  }, [isSuccess])

  function handle_Show_Form_Create_Phone() {
    form_create_phone?.current?.classList?.add("scale-100");
    bg_overlay_form_create_phone?.current?.classList?.remove("hidden");
    bg_overlay_form_create_phone?.current?.classList?.add("block");
  }
  function handle_Close_Form_Create_Phone() {
    form_create_phone?.current?.classList?.add("scale-0");
    form_create_phone?.current?.classList?.remove("scale-100");
    bg_overlay_form_create_phone?.current?.classList?.add("hidden");
    bg_overlay_form_create_phone?.current?.classList?.remove("block");
  }
  return (
    <>
      {isLoading && <Loading_Overlay />}
      {data_user?.data && data_user?.data?.phone ? (
        <div className="text-gray-700">
          {data_user?.data && ("(+84) " + data_user?.data?.phone.slice(1, 10))}
          <button
          className="underline rounded text-sky-600 ml-4 !font-light text-sm"
          onClick={handle_Show_Form_Create_Phone}
        >
          Thay đổi
        </button>
        </div>
      ) : (
        <button
          className="underline rounded text-sky-600 font-light text-sm"
          onClick={handle_Show_Form_Create_Phone}
        >
          Thêm
        </button>
      )}
      {/* form add phone */}
      <div
        ref={form_create_phone}
        className="fixed -translate-x-1/2 -translate-y-1/2 scale-0 duration-200 top-1/2 left-1/2 z-[11]"
      >
        <form
          onSubmit={form_data?.handleSubmit(submitForm)}
          className="mx-auto w-[95vw] max-w-[400px] p-4 pt-8 bg-white rounded text-gray-700"
        >
          <button
            type="button"
            onClick={handle_Close_Form_Create_Phone}
            className="text-gray-700 absolute right-4 top-4"
          >
            <X />
          </button>
          <div className="mt-4">
            <div
              className="flex flex-col gap-2 *:text-xs *:lg:text-sm whitespace-nowrap"
            >
              <Label htmlFor="name">Số điện thoại mới:</Label>
              <Input
                id="name"
                type="text"
                {...form_data?.register("new_phone", { required: true })}
              />
            </div>
            <div className="flex justify-center gap-x-3 mt-4">
              <Button
                onClick={handle_Close_Form_Create_Phone}
                className="bg-white hover:bg-[#F5F5FA] border border-gray-300 text-gray-800"
                type="button"
              >
                Hủy
              </Button>
              <Button className="bg-[#597BFE] hover:bg-[#6f8bfc]">Thêm</Button>
            </div>
          </div>
        </form>
      </div>
      <div
        onClick={handle_Close_Form_Create_Phone}
        ref={bg_overlay_form_create_phone}
        className="fixed hidden w-screen h-screen top-0 left-0 z-[10] bg-[#33333355]"
      />
    </>
  );
}

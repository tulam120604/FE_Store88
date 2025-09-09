/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React from "react";
import Loading_Spin from "../Loadings/Loading_Spin";
import { Button } from "../ui/Shadcn/button";
import { useCustome_Hook_Auth } from "../../_lib/Custome_Hooks/Hook_auth";
import Btn_auth_with_google from "../Btn/Btn_authen_with_google";
import Field_Form from "./field_form";
import { message } from "../ui/message";
import { useRouter } from "next/navigation";

const Form_auth = ({ mode, setMode }: any) => {
  const router = useRouter();
  const { my_form, isLoading, mutateAsync } = useCustome_Hook_Auth({ mode });
  const submit = async (data: any) => {
    try {
      const result = await mutateAsync(data);
      if (result?.error) {
        message.error(result?.message);
        return;
      }
      router.push("/");
    } catch (error) {
      message.error("Đã xảy ra lỗi. Vui lòng thử lại!");
    }
  };
  return (
    <main className="w-full flex item-center bg-gray-100 dark:bg-[#0F1629] py-10">
      <form
        onSubmit={my_form.handleSubmit(submit)}
        className="w-[95vw] max-w-[550px] h-[600px] mx-auto flex flex-col p-6 lg:py-10 lg:px-16 gap-y-4 
        border rounded"
      >
        <div
          className="font-semibold text-gray-700 dark:text-gray-200 w-3/4 max-w-[200px] 
        flex items-center justify-between mx-auto *:uppercase"
        >
          <button
            type="button"
            onClick={() => setMode("Login")}
            className={`${mode === "Register" && "opacity-50"}`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => setMode("Register")}
            className={`${mode === "Login" && "opacity-50"}`}
          >
            Đăng ký
          </button>
        </div>
        {mode === "Register" && (
          <Field_Form
            props={{
              text_label: "Tên tài khoản *",
              htmlFor: "user_name",
              type: "text",
              registerValue: "user_name",
              my_form,
            }}
          />
        )}
        <Field_Form
          props={{
            text_label: "Email *",
            htmlFor: "email",
            type: "email",
            registerValue: "email",
            my_form,
          }}
        />
        <Field_Form
          props={{
            text_label: "Mật khẩu *",
            htmlFor: "password",
            type: "password",
            registerValue: "password",
            my_form,
          }}
        />
        <p className="text-xs opacity-80 leading-5 my-3">
          Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải nghiệm của bạn
          trên toàn bộ trang web này, để quản lý quyền truy cập vào tài khoản
          của bạn và cho các mục đích khác được mô tả trong chính sách bảo mật
          của chúng tôi.
        </p>
        {mode === "Register" ? (
          <div className="flex flex-col">
            {/* {status_Loading === "call_error" && (
                  <span className="text-center text-xs lg:text-sm my-1 text-red-500">
                    * Tài khoản đã đã tồn tại! *
                  </span>
                )} */}
            <Button>{isLoading ? <Loading_Spin /> : "Tạo tài khoản"}</Button>
            <div className="flex items-center my-1.5">
              <hr className="flex-grow border-gray-300" />
              <p className="mx-4 text-gray-600">hoặc</p>
              <hr className="flex-grow border-gray-300" />
            </div>
            <Btn_auth_with_google action="signup" />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-row justify-between my-2">
              <Link
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            {/* {status_Loading === "call_error" && (
                  <span className="text-center text-xs lg:text-sm text-red-500 my-1">
                    * Thông tin tài khoản không chính xác! *
                  </span>
                )} */}
            <Button>{isLoading ? <Loading_Spin /> : "Đăng nhập"}</Button>
            <div className="flex items-center my-1.5">
              <hr className="flex-grow border-gray-300" />
              <p className="mx-4 text-gray-600">hoặc</p>
              <hr className="flex-grow border-gray-300" />
            </div>
            <Btn_auth_with_google action="signin" />
          </div>
        )}
      </form>
    </main>
  );
};

export default Form_auth;

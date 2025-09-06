"use client";

import React, { useState } from "react";
import { Mutation_Category } from "../../_lib/Query_APIs/Items/Mutation_category";
import { Button } from "../ui/Shadcn/button";
import Loading_Dots from "../Loadings/Loading_Dots";
import Image from "next/image";
import { ImageUp } from "lucide-react";

const Form_add_category = ({ setCategory_form }: any) => {
  const [uri_image_upload, setUri_image_upload] = useState("");
  const [message, setMessage] = useState<string>("");
  const mutate_category = Mutation_Category("ADD");
  const { register, handleSubmit, watch, reset } =
    mutate_category.form_category;
  let mode;
  // check field form
  const categoryName = watch("category_name");
  const isFormValid = categoryName?.trim() && uri_image_upload;

  // 
  async function onAdd_category(data_form: any) {
    try {
      const formData = new FormData();
      formData.append("category_name", data_form.category_name);
      formData.append(
        "category_img",
        typeof data_form.category_img == "string"
          ? data_form.category_img
          : data_form.category_img[0]
      );
      const result: any = await mutate_category.on_Submit_category(formData);
      console.log(result?.status);
      if (result?.message === "OK") {
        setMessage("Đã thêm danh mục mới!");
        setCategory_form(false);
        reset();
        setUri_image_upload("");
      }
      if (result?.status === 400) {
        setMessage("Danh mục đã tồn tại!");
      } else {
        setMessage("Đã có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //
  function handleShowImage(e: any) {
    if (e.target.files[0]) {
      const img_url = new FileReader();
      img_url.onloadend = () => {
        setUri_image_upload(img_url.result as string);
      };
      img_url.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <>
      {mutate_category.isLoading && (
        <div className="fixed w-screen h-screen bg-[#33333333] top-0 right-0 !z-[10] grid place-items-center">
          <Loading_Dots />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onAdd_category)}
        className="flex bg-white dark:bg-[#0F1629] flex-col gap-y-3 fixed border border-gray-300 shadow
         z-[7] top-1/2 left-1/2 -translate-x-1/2 rounded-xl -translate-y-1/2 px-10 py-5 lg:px-20 lg:py-10"
      >
        <strong className="opacity-90 text-lg">
          Thêm mới danh mục sản phẩm
        </strong>
        <label htmlFor="category_name">Tên danh mục</label>
        <input
          type="text"
          id="category_name"
          {...register("category_name")}
          className=" py-2 px-4 border border-gray-300 rounded"
        />
        <div className="flex flex-col gap-y-3">
          <label htmlFor="category_img">Ảnh</label>
          <div className="flex justify-between">
            {uri_image_upload && (
              <Image
                className="border w-[100px] h-[100px] rounded"
                width={100}
                height={100}
                src={uri_image_upload}
                alt="Trống!"
              />
            )}

            <label
              htmlFor="category_img"
              className="w-[100px] border h-[100px] rounded text-sm grid place-items-center cursor-pointer"
            >
              <div className="flex flex-col items-center gap-y-2 text-gray-600">
                <ImageUp />
                Chọn ảnh
              </div>
            </label>
            <input
              type="file"
              {...register("category_img")}
              accept="image/*"
              id="category_img"
              className="outline-none rounded border w-full h-[100px] 
                  absolute opacity-0"
              onChange={handleShowImage}
              multiple
            />
          </div>
        </div>
        {message && <span className="text-red-500">{message}</span>}
        <Button
          disabled={!isFormValid}
          type="submit"
          className={`text-sm font-medium text-white ${
            mode ? "bg-yellow-600 active:bg-yellow-500" : "bg-indigo-600"
          }`}
        >
          {mode ? "Cập nhật" : "Thêm"}
        </Button>
      </form>
    </>
  );
};

export default Form_add_category;

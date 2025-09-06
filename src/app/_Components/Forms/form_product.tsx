/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/Tables/button";
import { CircleMinus, ImageUp } from "lucide-react";
import Loading_Dots from "../Loadings/Loading_Dots";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Form_variant from "./form_variant";
import { useRouter } from "next/navigation";
import Field_Form from "./field_form";
import { Query_Category } from "../../_lib/Query_APIs/Items/Query";
import { Controller } from "react-hook-form";

const Form_product: React.FC<any> = ({ props, type }: any) => {
  const {
    my_form,
    formSubmit,
    isLoading,
    images,
    preview,
    pushImage,
    removeImage,
    setImages,
    setPreview,
    category,
  } = props;
  const { data: data_Category, isLoading: loading_category } = Query_Category();
  const router = useRouter();
  const [statusVariant, setStatusVariant] = useState<any>("no-variant");
  useEffect(() => {
    if (type === "update") {
      const variant = my_form?.getValues("variant");
      if (!variant) return;

      if (variant?.length > 0) {
        my_form.setValue("statusVariant", "variant");
        setStatusVariant("variant");
        my_form?.unregister(["price_product", "stock"]);
      } else {
        my_form.setValue("statusVariant", "no-variant");
        my_form?.unregister("variant");
      }
    }
  }, [type, my_form.watch("variant")]);

  // render image local
  const renderImg = (e: any) => {
    pushImage(e);
    my_form?.setValue("gallery", [
      ...images,
      ...Array.from(e?.target?.files ?? []),
    ]);
  };

  return (
    <>
      <section className="flex flex-col gap-y-6 py-6 rounded pr-4 overflow-x-hidden">
        {isLoading && (
          <div className="grid place-items-center fixed z-[100] w-screen h-screen top-0 left-0 bg-[#10182488]">
            <Loading_Dots />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold opacity-90">
              {type === "update" ? "Cập nhật sản phẩm" : "Tạo mới sản phẩm"}
            </span>
            <span className="opacity-80 text-sm">
              {type === "update"
                ? "Chỉnh sửa lại sản phẩm trong cửa hàng của bạn"
                : "Thêm mới sản phẩm vào cửa hàng của bạn"}
            </span>
          </div>
          <button
            className="opacity-80 hover:underline text-sm flex items-center"
            onClick={() => router.back()}
          >
            Quay lại
          </button>
        </div>
        <form
          onSubmit={my_form.handleSubmit(formSubmit)}
          className="flex flex-col gap-y-10 p-6 rounded *:w-full text-base bg-white dark:bg-[#0F1629]"
        >
          <div className="grid xl:grid-cols-[2fr_1fr_1fr] gap-x-16 gap-y-6">
            <Field_Form
              props={{
                text_label: "Tên sản phẩm",
                htmlFor: "short_name",
                type: "text",
                registerValue: "short_name",
                my_form,
                errors: my_form?.formState?.errors?.short_name?.message,
              }}
            />
            {/* category */}
            <div className="relative items-center mb-4">
              <label htmlFor="category_id" className="mb-2 text-sm opacity-90">
                Danh mục
              </label>
              <div className="mt-2">
                <Controller
                  name="category_id"
                  control={my_form?.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục!" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {loading_category && "Loading..."}
                          {!loading_category &&
                            data_Category?.data?.map((item: any) => (
                              <SelectItem key={item._id} value={item._id}>
                                {item.category_name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <span className="absolute text-sm text-red-500 whitespace-nowrap top-[72px]">
                {my_form?.formState?.errors?.category_id &&
                  (my_form.formState.errors.category_id.message as string)}
              </span>
            </div>
            {/* brand */}
            <Field_Form
              props={{
                text_label: "Xuất xứ sản phẩm",
                htmlFor: "made_in",
                type: "text",
                registerValue: "made_in",
                my_form,
                errors: my_form?.formState?.errors?.made_in?.message,
              }}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="mb-2 text-sm opacity-90">Ảnh sản phẩm</label>
            <div className="flex flex-wrap gap-3 relative">
              {preview?.length > 0 &&
                preview?.map((uri: any, i: number) => (
                  <div
                    key={uri}
                    className="relative border border-gray-300 rounded"
                  >
                    <img
                      className="w-[100px] h-[100px] rounded"
                      src={uri}
                      alt="loading"
                    />
                    <button
                      className="absolute top-0 right-0 *:w-4 *:h-4 text-xs text-red-500 rounded-full hover:scale-110 duration-200"
                      onClick={() => removeImage(i)}
                      type="button"
                    >
                      <CircleMinus />
                    </button>
                  </div>
                ))}
              <div className="w-full border h-[100px] rounded text-sm grid place-items-center">
                <div className="flex flex-col items-center gap-y-2 text-gray-600">
                  <ImageUp />
                  Kéo và thả ảnh vào đây
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="feature_product"
                  className="outline-none rounded border cursor-pointer w-full h-[100px] 
                  absolute opacity-0"
                  onChange={renderImg}
                  multiple
                />
              </div>
            </div>
            <span className="text-sm text-red-500 whitespace-nowrap">
              {my_form?.formState?.errors?.gallery &&
                (my_form.formState.errors.gallery.message as string)}
            </span>
          </div>
          <Field_Form
            props={{
              text_label: "Mô tả sản phẩm",
              htmlFor: "description",
              type: "text",
              registerValue: "des_product",
              my_form,
              errors: my_form?.formState?.errors?.des_product?.message,
            }}
          />
          <div className="w-full rounded *:p-4 border">
            <section className="w-full flex items-center gap-10">
              <span className="mb-2 text-sm opacity-90">Dữ liệu sản phẩm</span>
              <div>
                <Select
                  value={statusVariant}
                  onValueChange={(value) => {
                    setStatusVariant(value);
                    my_form?.setValue("statusVariant", value);
                  }}
                >
                  <SelectTrigger className="!h-auto pt-2 mt-1">
                    <SelectValue
                      placeholder={
                        statusVariant === "no-variant"
                          ? " Sản phẩm đơn giản"
                          : "Sản phẩm có biến thể"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="no-variant">
                        Sản phẩm đơn giản
                      </SelectItem>
                      <SelectItem value="variant">
                        Sản phẩm có biến thể
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </section>
            {/* --- */}
            {statusVariant === "no-variant" && (
              <div className="flex gap-x-16">
                <Field_Form
                  props={{
                    text_label: "Giá",
                    htmlFor: "price_product",
                    type: "text",
                    registerValue: "price_product",
                    my_form,
                    errors: my_form?.formState?.errors?.price_product?.message,
                  }}
                />

                <Field_Form
                  props={{
                    text_label: "Số lượng",
                    htmlFor: "stock",
                    type: "text",
                    registerValue: "stock",
                    my_form,
                    errors: my_form?.formState?.errors?.stock?.message,
                  }}
                />
              </div>
            )}
            {statusVariant === "variant" && (
              <Form_variant propsData={{ my_form, type }} />
            )}
          </div>

          {/* {loading === "call_error" && (
            <span className="text-red-500">Lỗi! Vui lòng kiểm tra lại!!</span>
          )} */}
          <div className="w-full">
            <Button
              type="submit"
              className={`
                text-sm font-medium
                ${type === "create" && "bg-indigo-600 hover:bg-indigo-800"}
                ${type === "update" && "bg-yellow-600 hover:bg-yellow-800"}
                `}
            >
              {type === "create" && "Tạo sản phẩm mới"}
              {type === "update" && "Cập nhật sản phẩm"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Form_product;

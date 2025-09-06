"use client";

import React from "react";
import MyForm from "@/src/app/_Components/Forms/form_product";
import { Mutation_Items } from "@/src/app/_lib/Query_APIs/Items/Mutation_product";
import { useLocalUploader } from "@/src/app/_lib/Custome_Hooks/useImgUploader";
import { Mutation_variant } from "@/src/app/_lib/Query_APIs/Items/Mutation_variant";
import { Mutation_Upload } from "@/src/app/util/upload";
import { message } from "@/src/app/_Components/ui/message";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { images, preview, pushImage, removeImage, setImages, setPreview } =
    useLocalUploader();
  const {
    my_form,
    mutateAsync,
    isLoading: loading_mutate_item,
  } = Mutation_Items({
    action: "ADD",
  });
  const { mutateAsync: mutateUpload, isLoading: loadingUpload } =
    Mutation_Upload("multiple");

  const { mutateAsync: mutate_variant, isLoading: loading_mutate_variant } =
    Mutation_variant("CREATE");
  const isLoading =
    loading_mutate_item || loading_mutate_variant || loadingUpload;

  async function formSubmit(dataForm: any) {
    const urlGallery = await mutateUpload(images);
    const { statusOptionsVariant, gallery, ...rest } = dataForm;
    let payload = {
      ...rest,
      gallery: urlGallery,
    };
    if (dataForm?.variant) {
      const result = await mutate_variant(dataForm?.variant);
      payload = {
        ...payload,
        variant: result?.data?._id,
      };
    }
    const result = await mutateAsync(payload);
    if (!result?.error) {
      message.success(result?.message);
      router.push("/trung-tam-dieu-khien/san-pham/danh-sach");
    } else {
      message.error(result?.message);
    }
  }

  const props = {
    my_form,
    formSubmit,
    isLoading,
    images,
    preview,
    pushImage,
    removeImage,
    setImages,
    setPreview,
  };
  return <MyForm props={props} type="create" />;
};

export default Page;

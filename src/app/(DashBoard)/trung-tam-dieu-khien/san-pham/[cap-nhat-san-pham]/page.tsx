"use client";

import MyForm from "@/src/app/_Components/Forms/form_product";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { message } from "@/src/app/_Components/ui/message";
import { useLocalUploader } from "@/src/app/_lib/Custome_Hooks/useImgUploader";
import { Mutation_Items } from "@/src/app/_lib/Query_APIs/Items/Mutation_product";
import { Mutation_variant } from "@/src/app/_lib/Query_APIs/Items/Mutation_variant";
import { Detail_Item_Dashboard } from "@/src/app/_lib/Query_APIs/Items/Query";
import { Mutation_Upload } from "@/src/app/util/upload";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const param = useParams();
  const router = useRouter();
  const id_item = param["cap-nhat-san-pham"] as string;
  const [urlGalleryItem, setUrlGalleryItem] = useState<string[]>([]);
  const { mutateAsync: mutateUpload, isLoading: loadingUpload } =
    Mutation_Upload("multiple");
  const { images, preview, pushImage, removeImage, setImages, setPreview } =
    useLocalUploader();
  const { data, isLoading: loading_detail_item } = Detail_Item_Dashboard(
    String(id_item)
  );
  const variantId = data?.variant?._id;
  const { mutateAsync: update_variant, isLoading: loading_create_variant } =
    Mutation_variant("UPDATE");
  const { mutateAsync: remove_variant, isLoading: loading_remove_variant } =
    Mutation_variant("REMOVE");
  const {
    my_form,
    mutateAsync,
    isLoading: loading_update_item,
  } = Mutation_Items({
    action: "EDIT",
  });

  useEffect(() => {
    if (data) {
      my_form?.reset({
        ...data,
        variant: data?.variant?.variants || [],
      });
      setPreview(data?.gallery);
      setUrlGalleryItem(data?.gallery);
    }
  }, [data]);

  const removeGallery = (index: number) => {
    removeImage(index);
    setUrlGalleryItem((prev) => prev.filter((_, i) => i !== index));
  };

  async function formSubmit(dataForm: any) {
    let urlGallery = urlGalleryItem;
    if (images?.length > 0) {
      const urlUpload: any = await mutateUpload(images);
      urlGallery = [...urlGalleryItem, ...urlUpload];
    }
    console.log(urlGallery);
    let payload = {
      ...dataForm,
      gallery: urlGallery,
    };
    if (dataForm?.statusVariant === "variant") {
      const result = await update_variant(dataForm?.variant);
      payload = {
        ...payload,
        variant: result?.data?._id,
      };
    } else if (dataForm?.statusVariant === "no-variant") {
      await remove_variant(variantId);
    }
    const result = await mutateAsync(payload);
    if (!result?.error) {
      message.success(result?.message);
      router.push("/trung-tam-dieu-khien/san-pham/danh-sach");
    } else {
      message.error(result?.message);
    }
  }
  const isLoading =
    loading_update_item ||
    loading_create_variant ||
    loadingUpload ||
    loading_remove_variant;
  const props = {
    my_form,
    formSubmit,
    isLoading,
    images,
    preview,
    pushImage,
    removeImage: removeGallery,
    setImages,
    setPreview,
    category: data?.category_id?._id,
  };
  if (loading_detail_item) return <Loading_Dots />;
  return <MyForm props={props} type="update" />;
};

export default Page;

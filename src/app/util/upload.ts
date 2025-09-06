import { useMutation } from "@tanstack/react-query";

// upload single
async function uploadSingleImage(file: any) {
  try {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nextjs_ecommerce");
    formData.append("folder", "ecommerce-store88");
    const res = await fetch(url, {
      method: "post",
      body: formData,
    });
    if (!res.ok) {
      return {
        error : true,
        message : "Upload image fail!"
      };
    }
    const data = await res.json();
    return data?.secure_url as string;
  } catch (error) {
    return error;
  }
}

// upload multiple
async function uploadMultipleImage(file: any) {
  try {
    const urls = await Promise.all(
      file.map((img: any) => uploadSingleImage(img))
    );
    return urls;
  } catch (error) {
    return error;
  }
}

export function Mutation_Upload(action: "single" | "multiple") {
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (file: any) => {
      switch (action) {
        case "single":
          return await uploadSingleImage(file);
        case "multiple":
          return await uploadMultipleImage(file);
        default:
          return;
      }
    },
  });

  return { mutateAsync, ...rest };
}

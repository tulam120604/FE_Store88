import { useState } from "react";

export function useLocalUploader(initialImages: any[] = []) {
  const [images, setImages] = useState<any[]>(initialImages);
  const [preview, setPreview] = useState<any[]>(initialImages);

  function pushImage(e: any) {
    const files = Array.from(e?.target?.files || []);
    if (!files.length) return;

    setImages((prev) => [...prev, ...files]);

    const readers = files.map(
      (file : any) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader?.result as string);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((res) => {
      setPreview((prev) => [...prev, ...res]);
    });
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  }

  return { images, preview, pushImage, removeImage, setImages, setPreview };
}

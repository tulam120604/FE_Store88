"use client";

import { Input } from "../ui/Shadcn/input";

export default function Field_Form({ props }: any) {
  const {
    text_label,
    htmlFor,
    type,
    registerValue,
    my_form,
    errors,
    defaultValue,
  } = props;
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="mb-2 text-sm opacity-90">
        {text_label}
      </label>
      {htmlFor === "description" ? (
        <textarea
          id={htmlFor}
          {...my_form.register(registerValue)}
          className="outline-none py-2 px-4 border-transparent bg-[#F3F4F7] dark:bg-black/50 rounded w-full min-h-[200px]"
        />
      ) : (
        <Input
          {...my_form.register(registerValue)}
          id={htmlFor}
          type={type}
          className="border-transparent bg-[#F3F4F7] dark:bg-black/50 rounded"
          defaultValue={defaultValue}
        />
      )}

      {errors && (
        <div className="h-4 text-red-500 md:text-sm text-xs mt-1">
          {errors as string}
        </div>
      )}
    </div>
  );
}

import { useFieldArray } from "react-hook-form";
import Field_Form from "./field_form";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import { useEffect } from "react";
import { message } from "../ui/message";

export default function Form_variant({ propsData }: any) {
  const { my_form, type } = propsData;
  const {
    fields: variants,
    append,
    remove,
  } = useFieldArray({
    control: my_form.control,
    name: "variant", // trùng với field trong form
  });

  useEffect(() => {
    if (type === "create" && variants?.length === 0) {
      console.count("re-render");
      append({
        attribute: "",
        value_variants: [
          { name_variant: "", price_variant: "", stock_variant: "" },
        ],
      });
    }
    
  }, [type, append, variants?.length, my_form]);

  // add variant
  function add_variant() {
    if (variants?.length > 9) {
      message.warning("Biến thể sản phẩm tối đa là 10!");
      return;
    }
    append({
      attribute: "",
      value_variants: [
        { name_variant: "", price_variant: "", stock_variant: "" },
      ],
    });
  }


  return (
    <div className="flex flex-col text-gray-700 gap-y-6">
      {variants.map((variant, i) => (
        <div key={variant?.id}>
          <div className="flex gap-x-4">
            <Field_Form
              props={{
                text_label: "Tên biến thể",
                htmlFor: "attribute",
                type: "text",
                registerValue: `variant.${i}.attribute`,
                my_form,
              }}
            />

            <VariantValues my_form={my_form} nestIndex={i} />
          </div>
          {variants.length > 1 && (
            <Button
              type="button"
              onClick={() => remove(i)}
              className="bg-red-500 hover:bg-red-600 my-3"
            >
              Gỡ biến thể
            </Button>
          )}
        </div>
      ))}

      <div>
        <Button
          type="button"
          onClick={() => add_variant()}
          className="bg-green-600 hover:bg-green-800"
        >
          Thêm biến thể
        </Button>
      </div>
    </div>
  );
}

// render value variant
function VariantValues({ my_form, nestIndex }: any) {
  const { fields, append, remove } = useFieldArray({
    control: my_form.control,
    name: `variant.${nestIndex}.value_variants`,
  });

  // add value variant
  function add_value_variant() {
    if (fields?.length > 9) {
      message.warning("Giá trị trong biến thể tối đa là 10!");
      return;
    }
    append({ name_variant: "", price_variant: "", stock_variant: "" });
  }

  return (
    <div className="flex flex-col gap-y-3">
      {fields.map((field, j) => (
        <div key={field.id} className="flex gap-x-4 items-end">
          <Field_Form
            props={{
              text_label: "Kích thước",
              registerValue: `variant.${nestIndex}.value_variants.${j}.name_variant`,
              my_form,
            }}
          />
          <Field_Form
            props={{
              text_label: "Giá",
              registerValue: `variant.${nestIndex}.value_variants.${j}.price_variant`,
              my_form,
            }}
          />
          <Field_Form
            props={{
              text_label: "Số lượng",
              registerValue: `variant.${nestIndex}.value_variants.${j}.stock_variant`,
              my_form,
            }}
          />
          {fields.length > 1 && (
            <Button
              type="button"
              onClick={() => remove(j)}
              className="cursor-pointer bg-red-600 hover:bg-red-800 duration-150 "
            >
              Gỡ
            </Button>
          )}
          {j === fields.length - 1 && (
            <Button
              type="button"
              onClick={add_value_variant}
              className="cursor-pointer bg-green-600 hover:bg-green-800 duration-150 "
            >
              Thêm giá trị
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Mutation_Cart } from "../../../_lib/Query_APIs/Cart/Mutation";
import { CircleCheck, Minus, Plus } from "lucide-react";
import { io } from "socket.io-client";
import { useToast } from "@/src/app/_Components/ui/use-toast";
import { useAuthStore, useStoreAddToCart } from "@/src/app/_lib/Zustand/Store";

const So_luong_san_pham = ({ data_Item_Detail }: any) => {
  const routing = useRouter();
  const { data: data_user } = useAuthStore();
  const { toast } = useToast();
  const { setVisible } = useStoreAddToCart();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);
    socket.on("res_message_delete_item", (data: any) => {
      toast({
        title: "Thông báo!",
        description: `Rất tiếc, sản phẩm ${data?.name_item} không còn tồn tại!`,
        className: "border border-gray-800",
        duration: 3000,
      });
      const timeOut = setTimeout(() => {
        routing.push("/");
      }, 2000);
      return () => clearTimeout(timeOut);
    });
  }, [routing, toast]);

  const { mutate, isLoading } = Mutation_Cart("Add_Cart");

  const [name_attribute, setName_attribute] = useState<string | null>(null);
  const [variants_attribute, setVariants_attribute] = useState<any[]>([]);
  const [value_variant, setValue_variant] = useState<any[] | null>(null);
  const [name_variant, setName_variant] = useState<string | null>(null);
  const [quantity_attributes, setQuantity_attributes] = useState<number | null>(
    null
  );
  const [quantity, set_quantity] = useState(1);
  const [price_attr, set_price_attr] = useState(0);
  const ref_validate_attribute = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!data_Item_Detail) {
      routing.push("/");
      return;
    }

    if (
      Array.isArray(data_Item_Detail?.variant?.variants) &&
      data_Item_Detail.variant.variants.length > 0
    ) {
      const a: any[] = [];
      data_Item_Detail.variant.variants.forEach((item: any) => {
        const hasStock = item?.value_variants?.some(
          (data_attr: any) => data_attr?.stock_variant > 0
        );
        if (hasStock) a.push(item);
      });
      setVariants_attribute(a);
    } else {
      setQuantity_attributes(data_Item_Detail?.stock ?? 0);
    }
  }, [data_Item_Detail, routing]);

  function change_options_quantity(action: string) {
    switch (action) {
      case "dow":
        if (quantity > 1) set_quantity(quantity - 1);
        return;
      case "up":
        if (!quantity_attributes) {
          validate_message();
        } else {
          change_quantity();
        }
        return;
      default:
        return;
    }
  }

  function validate_message() {
    ref_validate_attribute.current?.classList.add("block");
    ref_validate_attribute.current?.classList.remove("hidden");
  }

  function change_quantity() {
    if (quantity_attributes && quantity < quantity_attributes) {
      set_quantity(quantity + 1);
    } else {
      Swal.fire("Đã đạt tối đa số lượng còn lại của sản phẩm!");
    }
  }

  function handle_attributes(action: string, item: any) {
    switch (action) {
      case "Color":
        setName_variant(null);
        setQuantity_attributes(null);
        set_quantity(1);
        variants_attribute.forEach((attr: any) => {
          if (attr.attribute === item) {
            ref_validate_attribute.current?.classList.add("hidden");
            setValue_variant(attr.value_variants ?? []);
          }
        });
        return setName_attribute(item);
      case "size_attribute":
        setQuantity_attributes(null);
        set_quantity(1);
        ref_validate_attribute.current?.classList.add("hidden");

        const check_attribute = variants_attribute?.find(
          (value: any) => value?.attribute === name_attribute
        );
        const check_values = check_attribute?.value_variants?.find(
          (value: any) => value?.name_variant === item
        );
        if (check_values) {
          setQuantity_attributes(check_values.stock_variant);
          set_price_attr(check_values.price_variant);
          setName_variant(item);
        }
        return;
      default:
        return;
    }
  }

  function add_To_Cart_or_Checkout_order(action: string) {
    if (!data_user) {
      routing.push("/tai-khoan");
      return;
    }

    let items: any = {
      product_id: data_Item_Detail?._id,
      price_item_attr: price_attr,
      attribute: name_attribute,
      quantity,
      name_variant,
    };

    if (action === "check_out") {
      items = { ...items, status_checked: true };
    }

    if (quantity_attributes && quantity > 0) {
      setVisible(data_Item_Detail?.gallery[0]);
      mutate(items);
      if (!isLoading && action === "check_out") {
        routing.push("/gio-hang");
      }
    } else {
      validate_message();
    }
  }

  const price = data_Item_Detail?.price_product * quantity;
  const price_item_attr = price_attr * quantity;

  // price range
  let min: number | undefined;
  let max: number | undefined;
  let unique_variants: any[] = [];

  if (Array.isArray(variants_attribute) && variants_attribute.length > 0) {
    const check_attribute = new Set();
    unique_variants = variants_attribute.filter((item: any) => {
      if (check_attribute.has(item?.attribute)) return false;
      check_attribute.add(item.attribute);
      return true;
    });

    min = unique_variants[0]?.value_variants[0]?.price_variant;
    max = unique_variants[0]?.value_variants[0]?.price_variant;

    for (let i of unique_variants) {
      for (let j of i.value_variants) {
        if (j.price_variant < min!) min = j.price_variant;
        if (j.price_variant > max!) max = j.price_variant;
      }
    }
  }

  return (
    <div>
      {/* --- PRICE DISPLAY --- */}
      <div className="flex gap-x-2 items-end font-medium text-[#EB2606] lg:text-2xl lg:font-normal mb:text-base mb-4">
        {data_Item_Detail?.price_product ? (
          <span className="text-[#EB2606]">
            {data_Item_Detail?.price_product?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        ) : (
          <div className="flex items-center gap-x-1 line-clamp-2">
            {price_attr ? (
              <span className="text-[#EB2606]">
                {price_attr?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            ) : min === max ? (
              <span className="text-[#EB2606]">
                {max?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            ) : (
              <>
                <span className="text-[#EB2606]">
                  {min?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
                -
                <span className="text-[#EB2606]">
                  {max?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* --- ATTRIBUTES --- */}
      {Array.isArray(unique_variants) && unique_variants.length > 0 && (
        <div className="flex flex-col gap-y-4 mb-1">
          <div className="flex flex-wrap items-center gap-x-4 *:relative *:border *:bg-transparent *:border-gray-700 
          *:px-3 *:py-1 *:text-sm *:rounded">
            {unique_variants.map((item: any) => (
              <button
                className={`text-gray-800 dark:text-gray-300 duration-200 ${
                  name_attribute === item?.attribute && "!border-[#0A68FF]"
                }`}
                key={item?.attribute}
                onClick={() => handle_attributes("Color", item?.attribute)}
              >
                {item?.attribute}
                {name_attribute === item?.attribute && (
                  <CircleCheck
                    className="w-4 h-4 absolute right-[-5px] top-[-5px]"
                    fill="#0A68FF"
                    color="#fff"
                  />
                )}
              </button>
            ))}
          </div>

          {Array.isArray(value_variant) && (
            <div className="flex flex-wrap items-center *:text-gray-800 *:dark:text-gray-300 *:bg-transparent 
            gap-x-4 *:relative *:border *:px-3 *:py-1 *:text-sm *:rounded *:border-gray-700">
              {value_variant.map((item: any) => (
                <button
                  className={`${
                    name_variant === item?.name_variant && "!border-[#0A68FF]"
                  }`}
                  key={item?.name_variant}
                  onClick={() =>
                    handle_attributes("size_attribute", item?.name_variant)
                  }
                >
                  {item?.name_variant}
                  {name_variant === item?.name_variant && (
                    <CircleCheck
                      className="w-4 h-4 absolute right-[-5px] top-[-5px]"
                      fill="#0A68FF"
                      color="#fff"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <span
        ref={ref_validate_attribute}
        className="hidden mt-2 text-xs md:text-sm text-red-500"
      >
        Vui lòng chọn phân loại hàng!
      </span>

      {/* --- QUANTITY + ADD CART --- */}
      <div className={unique_variants.length > 0 ? "relative top-3" : ""}>
        <div className="my-5 flex lg:flex-row mb:flex-col lg:gap-y-0 gap-y-[17px] gap-x-8 lg:items-center mb:items-start">
          <div className="*:text-xs flex items-center gap-x-3">
            <span>Số lượng</span>
            <div className="flex items-center *:grid *:h-9 *:place-items-center">
              <button
                onClick={() => change_options_quantity("dow")}
                className="border-y border-l rounded-l w-9"
              >
                <Minus className="w-5" />
              </button>
              {quantity_attributes ? (
                <input
                  className="text-center border w-12"
                  value={quantity}
                  onChange={(e: any) =>
                    set_quantity(
                      +e.target.value > quantity_attributes
                        ? quantity_attributes
                        : +e.target.value < 1
                        ? 1
                        : +e.target.value
                    )
                  }
                />
              ) : (
                <input className="text-center border w-12" value={quantity} readOnly />
              )}
              <button
                onClick={() => change_options_quantity("up")}
                className="border-y border-r rounded-r w-9"
              >
                <Plus className="w-5" />
              </button>
            </div>
            {quantity_attributes && (
              <span className="lg:tracking-[0.5px] opacity-80 pl-4">
                Còn lại {quantity_attributes} sản phẩm
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center font-medium lg:text-2xl lg:font-normal mb:text-base lg:gap-x-3 my-4 mb:gap-x-2">
          <span className="lg:text-xl">Tạm tính :</span>
          <span className="text-[#EB2606]">
            {(price ? price : price_item_attr)?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>

        <div className="flex items-center gap-x-5 mt-4 font-medium lg:text-base mb:text-sm *:duration-300 *:bg-white *:dark:bg-[#0F1629]">
          <button
            onClick={() => add_To_Cart_or_Checkout_order("add_cart")}
            className="hover:bg-gray-200 dark:hover:bg-black text-[#0A68FF] border border-[#0A68FF] duration-200 lg:w-[128px] lg:h-[40px] w-[100px] h-[30px] grid place-items-center rounded-md text-xs lg:text-sm"
          >
            Thêm vào giỏ
          </button>

          <button
            onClick={() => add_To_Cart_or_Checkout_order("check_out")}
            className="hover:bg-gray-200 dark:hover:bg-black text-[#0A68FF] border border-[#0A68FF] duration-200 lg:w-[128px] lg:h-[40px] w-[100px] h-[30px] grid place-items-center rounded-md text-xs lg:text-sm"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default So_luong_san_pham;

/* eslint-disable @next/next/no-img-element */
"use client";

import { Get_Items_Cart } from "@/src/app/_lib/Query_APIs/Cart/Query";
import { useStoreAddToCart } from "@/src/app/_lib/Zustand/Store";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Auth_actions = ({ props }: any) => {
  const { data, isLoading } = props;
  const routing = useRouter();
  const { isVisible } = useStoreAddToCart();
  function CountCart() {
    const { data } = Get_Items_Cart();
    let quantity_item_in_cart = [];
    if (data?.items) {
      quantity_item_in_cart = data?.items?.filter(
        (item: any) => item?.product_id !== null && item
      ) || [];
    }
    return (
      <>
        <span
          className="z-[1] absolute bg-[#fb5b60] -top-1/2 -right-[60%] 
                grid place-items-center rounded-[50%] text-[10px] text-white w-5 h-5"
        >
          {quantity_item_in_cart?.length < 99
            ? quantity_item_in_cart?.length
            : "99"}
        </span>
      </>
    );
  }

  // cart :
  function handleCart() {
    if (data?.user_name) {
      routing.push("/gio-hang");
    } else {
      routing.push("/tai-khoan");
    }
  }

  if (isLoading)
    return (
      <div className="gap-x-3 flex items-center *:rounded-full *:w-10 *:h-10">
        <div className="hidden lg:block"/>
        <div />
      </div>
    );

  return (
    <div className="gap-x-3 flex items-center *:w-10 *:h-10 *:rounded-full">
      {/* icon account */}
      <Link
        href={data?.user_name ? "/thong-tin-tai-khoan/thong-tin" : "/tai-khoan"}
        className="!hidden lg:!block gap-x-1 hover:bg-gray-100 
        rounded duration-200 border cursor-pointer whitespace-nowrap text-gray-600 
        hover:text-gray-950"
      >
        {data?.avatar ? (
          <img
            width={60}
            height={60}
            src={data?.avatar}
            className="rounded-full !w-10 !h-10"
            alt="."
          />
        ) : (
          <User strokeWidth={1.5} className="relative mx-auto -translate-y-1/2 top-1/2"/>
        )}
      </Link>

      {/* cart */}
      <button
        onClick={handleCart}
        className="flex gap-x-2 items-end relative group cursor-pointer bg-[#FFF1EE] dark:bg-[#141016] rounded 
        text-gray-600 p-2"
      >
        <div className="flex z-[1] relative rounded duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <CountCart />
          {isVisible && (
            <div className="animation_add_cart absolute w-4 h-4 lg:w-8 lg:h-8 rounded-full">
              <Image
                width={40}
                height={40}
                className="rounded-full"
                src={isVisible}
                alt="."
              />
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default Auth_actions;

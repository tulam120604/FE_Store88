"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { search_item } from "../../_lib/Services/Services_Items/Product";
import { usePathname, useRouter } from "next/navigation";


export function Search_component(props: { type: string }) {
  const [value_search, setValue_search] = useState<any>([]);
  const [key_search, setKey_search] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname;

    // Clear gợi ý mỗi khi URL thay đổi
  useEffect(() => {
    setValue_search([]);
  }, [pathname]);

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      if (!key_search) {
        return;
      } else {
        router.push(
          `/tim-kiem?key=${encodeURIComponent(e?.target?.key_search?.value)}`
        );
        setKey_search("");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    const time_search = setTimeout(() => {
      const fetchData = async () => {
        if (!key_search) {
          setValue_search([]);
          return;
        }

        try {
          const res = await search_item(key_search);
          setValue_search(res);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchData();
    }, 500);
    return () => clearTimeout(time_search);
  }, [key_search]);

  return (
    <div className="relative w-full">
      <form
        onSubmit={submit}
        className={`relative w-full *:h-10 gap-x-2 duration-300`}
      >
        <input
          type="text"
          name="key_search"
          className="border bg-white dark:bg-[#0F1629] rounded w-full px-3 text-sm !font-light outline-none opacity-90"
          placeholder="Tìm kiếm..."
          onChange={(e) => {
            setKey_search(e.target.value);
          }}
        />
        <button
          type="submit"
          className="hidden lg:block absolute top-[12%] right-0 !h-3/4 duration-300 cursor-pointer text-gray-800 border-l border-gray-300 px-4"
        >
          <Search color="#0A68FF" />
        </button>
      </form>
      {value_search.length > 0 && (
        <div
          className="bg-white dark:bg-[#0F1629] w-full absolute top-10 left-0 border py-2 px-5 rounded-lg 
        text-sm flex flex-col gap-y-3 shadow"
        >
          {value_search?.map((item: any) => (
            <Link
              href={
                props?.type === "client"
                  ? `/tim-kiem?key=${encodeURIComponent(item?.short_name)}`
                  : `/trung-tam-dieu-khien/san-pham/${item?._id}`
              }
              key={item?._id}
              className="hover:text-blue-500 duration-150 py-1"
              onClick={() => setValue_search([])}
            >
              {item?.short_name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

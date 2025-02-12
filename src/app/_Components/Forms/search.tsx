'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { SEARCH_item } from "../../_lib/Services/Services_Items/Product";


export const Search_Component_Dashboard = () => {
  return (
    <div className="relative w-1/2">
      <input
        type="text"
        id="Search"
        placeholder="Tìm kiếm..."
        className="w-full rounded-md text-gray-900 bg-transparent border border-gray-400 px-3 py-2 outline-none pe-10 shadow-sm sm:text-sm"
      />
      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="button" className="text-gray-700 hover:text-gray-300">
          <Search />
        </button>
      </span>
    </div>
  )
}

export function Search_Component_Client() {
  const [value_search, setValue_search] = useState<any>([]);
  const [key_search, setKey_search] = useState<string>('');
  useEffect(() => {
    const time_search = setTimeout(() => {
      if (key_search) {
        SEARCH_item(key_search).then((res) => setValue_search(res)).catch((error) => console.log(error))
      }
      else {
        setValue_search([])
      }
    }, 500);
    return () => clearTimeout(time_search);
  }, [key_search]);

  return (<div className="relative w-full">
    <form className={`relative w-full *:h-10 gap-x-2 duration-300`}>
      <input type="text" className="border border-gray-300 rounded w-full px-3 text-sm font-normal outline-none text-gray-700" placeholder="Tìm kiếm sản phẩm..."
        onChange={(e) => setKey_search(e.target.value)} />
      <button type='submit' className="absolute top-[12%] right-0 !h-3/4 duration-300 cursor-pointer text-gray-800 border-l border-gray-300 px-4">
        <Search color="#0A68FF" />
      </button>
    </form>
    {
      value_search.length > 0 &&
      <div className="bg-white w-[87vw] absolute py-2 px-5 rounded-lg text-gray-900 text-sm flex flex-col gap-y-3 shadow">
        {
          value_search?.map((item: any) => (
            <Link href={`/${item?._id}`} key={item?._id} className="grid grid-cols-[50px_auto] gap-x-4" onClick={() => setValue_search([])}>
              <Image key={item?.short_name} width={50} height={50} className="h-[50px] border" alt="Loading..." src={item?.gallery[0]} />
              <span>{item?.short_name}</span>
            </Link>
          ))
        }
      </div>
    }
  </div>)
}
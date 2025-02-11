'use client';

import { Mutation_Cart } from "@/src/app/_lib/Query_APIs/Cart/mutation_Cart";
import { useRouter } from "next/navigation";

const Btn_Add_Cart = ({ data_Btn }: any) => {
  const routing = useRouter();
  const { mutate } = Mutation_Cart('Add_Cart');

  function add_To_Cart() {
    if (localStorage.getItem('account')) {
      const {check_email} = JSON.parse(localStorage.getItem('account') || '');
      const items = {
        user_id : check_email._id,
        product_id : data_Btn?.id_item,
        color : data_Btn?.color_item,
        quantity : data_Btn?.quantity_item_add,
        size_attribute : data_Btn?.size_attribute_item,
      };
      mutate(items);
    } else {
      routing.push('/login');
    }
  }

  return (
    <button onClick={add_To_Cart} className="bg-black hover:bg-white hover:text-black border border-black duration-200 lg:w-[128px] lg:h-[40px] w-[100px] h-[30px] grid place-items-center rounded-md text-xs lg:text-sm text-white">
      Thêm vào giỏ
    </button>
  )
}

export default Btn_Add_Cart
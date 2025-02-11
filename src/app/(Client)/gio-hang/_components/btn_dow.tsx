'use client';

import Loading_Overlay from "@/src/app/_Components/Loadings/Loading_Overlay";
import { Button } from "@/src/app/_Components/ui/Shadcn/button";
import { Mutation_Cart } from "@/src/app/_lib/Query_APIs/Cart/mutation_Cart";
import Swal from "sweetalert2";

const Btn_dow = ({ id_props }: any) => {
  const { mutate, isLoading } = Mutation_Cart('DOW')
  function dow_quantity(id: any) {
    if (id_props.quantity_item === 1) {
      Swal.fire({
        title: "Xác nhận xóa sản phẩm?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận!",
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          const items = {
            product_id: id,
            attribute: id_props?.attribute,
            name_variant: id_props?.value_variant
          }
          mutate(items)
          Swal.fire({
            title: "Xóa thành công!",
            icon: "success"
          });
        }
      });
    }
    if (id_props.quantity_item > 1) {
      const items = {
        product_id: id,
        attribute: id_props?.attribute,
        name_variant: id_props?.value_variant
      }
      mutate(items)
    }
  }
  return (
    <>
      {
        isLoading ?
          <>
            <Loading_Overlay />
            <Button type="button" className='border-none bg-[#F5F5FA] px-2 hover:bg-gray-200 duration-200'>&#8722;</Button>
          </>
          :
          <Button type="button" onClick={() => dow_quantity(id_props.id_item)} className='border-none bg-[#F5F5FA] px-2 hover:bg-gray-200 duration-200'>&#8722;</Button>
      }
    </>
  )
}

export default Btn_dow
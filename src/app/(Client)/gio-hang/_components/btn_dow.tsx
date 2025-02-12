'use client';

import Loading_Overlay from "@/src/app/_Components/Loadings/Loading_Overlay";
import { Button } from "@/src/app/_Components/ui/Shadcn/button";
import { Mutation_Cart } from "@/src/app/_lib/Query_APIs/Cart/mutation_Cart";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/app/_Components/ui/alert-dialog";

const Btn_dow = ({ id_props }: any) => {
  const { mutate, isLoading } = Mutation_Cart('DOW');
  function dow_quantity(id: any) {
    const items = {
      product_id: id,
      attribute: id_props?.attribute,
      name_variant: id_props?.value_variant
    }
    mutate(items)
  };
  return (
    <>
      {
        isLoading ?
          <>
            <Loading_Overlay />
            <Button type="button" className='border-none bg-[#F5F5FA] px-2 hover:bg-gray-200 duration-200'>&#8722;</Button>
          </>
          :
          <>
            {
              id_props.quantity_item > 1 ?
                <Button type="button" onClick={() => dow_quantity(id_props.id_item)} className='border-none bg-[#F5F5FA] px-2 hover:bg-gray-200 duration-200'>&#8722;</Button>
                :
                <AlertDialog>
                  <AlertDialogTrigger className='h-full rounded border-none bg-[#F5F5FA] px-2 hover:bg-gray-200 duration-200'>
                    &#8722;
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-gray-700 font-normal">{` Xác nhận xóa sản phẩm 
                      ${(id_props?.name_item?.length > 10 ? (id_props?.name_item?.slice(0, 10) + '...') : id_props?.name_item)} 
                      trong giỏ? `}</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500" onClick={() => dow_quantity(id_props.id_item)}>Xác nhận</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            }
          </>
      }
    </>
  )
}

export default Btn_dow
'use client'

import { Mutation_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/mutation_Cart';
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/app/_Components/ui/alert-dialog";
import { Trash2 } from 'lucide-react';


const Remove_Item_Cart = ({ id_props }: any) => {
  const { mutate } = Mutation_Cart('REMOVE')
  function remove_item_cart(id_item: any) {
    const items = {
      user_id: id_props?.id_user?._id,
      item_id: id_item
    }
    mutate(items)
  }

  return (

    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className='text-red-500 h-5 hover:scale-105 duration-200'/>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa sản phẩm trong giỏ?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={() => remove_item_cart(id_props.item)}>Xác nhận</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>


  )
}

export default Remove_Item_Cart
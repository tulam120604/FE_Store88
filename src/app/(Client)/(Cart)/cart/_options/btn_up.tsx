'use client';

import { Button } from "@/src/app/_Components/ui/Shadcn/button";
import { Mutation_Cart } from "@/src/app/_lib/Tanstack_Query/Cart/mutation_Cart";
import Swal from "sweetalert2";

const Btn_up = ({ id_props }: any) => {
    // console.log(id_props)
    const { mutate, isLoading } = Mutation_Cart('UP');


    function up_quantity(product: any) {
        if (product?.dataItems?.product_id?.attributes) {
            if (product?.dataItems?.quantity < product?.dataItems?.quantity_by_item) {
                const items = {
                    user_id: id_props?.id_user?._id,
                    product_id: product.id_item,
                    color: product.color,
                    size_attribute: product.size_attribute
                }
                mutate(items)
            }
            else {
                Swal.fire("Đã đạt tối đa số lượng còn lại của sản phẩm!");
            }
        }
        else {
            if (product?.dataItems?.quantity < product?.dataItems?.product_id?.stock) {
                const items = {
                    user_id: id_props?.id_user?._id,
                    product_id: product.id_item,
                    color: product.color,
                    size_attribute: product.size_attribute
                }
                mutate(items)
            }
            else {
                Swal.fire("Đã đạt tối đa số lượng còn lại của sản phẩm!");
            }
        }

    }
    return (
        <Button type="button" onClick={() => up_quantity(id_props)} className='border-none bg-[#F5F5FA] px-2 hover:bg-gray-200 duration-200'>&#43;</Button>
    )
}

export default Btn_up
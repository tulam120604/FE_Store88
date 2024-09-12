'use client';

import { Button } from "@/src/app/_Components/ui/Shadcn/button";
import { Mutation_Cart } from "@/src/app/_lib/Tanstack_Query/Cart/mutation_Cart";
import Swal from "sweetalert2";

const Btn_up = ({ id_props }: any) => {
    const { mutate, isLoading } = Mutation_Cart('UP');
    function up_quantity(product: any) {
        let quantity_item: number = 0;
        const color = id_props?.item?.product_id?.attributes?.varriants?.find((data: any) => data?.color_item === product?.item?.color_item);
        const size = color?.size_item?.find((size: any) => (size?.name_size?.trim() ? size?.name_size : undefined) === product?.item?.size_attribute_item);
        quantity_item = size?.stock_item
        if (product?.item?.product_id?.attributes) {
            if (product?.item?.quantity < quantity_item) {
                const items = {
                    user_id: id_props?.id_user?._id,
                    product_id: product.item?.product_id?._id,
                    color: product?.item?.color_item,
                    size_attribute: product?.item?.size_attribute_item
                }
                mutate(items)
            }
            else {
                Swal.fire("Đã đạt tối đa số lượng còn lại của sản phẩm!");
            }
        }
        else {
            if (product?.item?.quantity < product?.item?.product_id?.stock) {
                const items = {
                    user_id: id_props?.id_user?._id,
                    product_id: product?.item?.product_id?._id,
                    color: product?.item?.color_item,
                    size_attribute: product?.item?.size_attribute_item
                }
                mutate(items)
            }
            else {
                Swal.fire("Đã đạt tối đa số lượng còn lại của sản phẩm!");
            }
        }

    }
    return (<>
        {
            isLoading ?
                <Button type="button" className='border-none bg-[#F5F5FA] px-2 hover:bg-gray-200 duration-200'>&#43;</Button > :
                <Button type="button" onClick={() => up_quantity(id_props)} className='border-none bg-[#F5F5FA] px-2 hover:bg-gray-200 duration-200'>&#43;</Button>
        }
    </>
    )
}

export default Btn_up
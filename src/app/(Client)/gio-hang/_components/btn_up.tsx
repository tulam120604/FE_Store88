'use client';

import Loading_Overlay from "@/src/app/_Components/Loadings/Loading_Overlay";
import { Button } from "@/src/app/_Components/ui/Shadcn/button";
import { Mutation_Cart } from "@/src/app/_lib/Query_APIs/Cart/mutation_Cart";
import Swal from "sweetalert2";

const Btn_up = ({ id_props }: any) => {
    const { mutate, isLoading } = Mutation_Cart('UP');
    function up_quantity(product: any) {
        let quantity_item: number = 0;
        const attribute = id_props?.item?.product_id?.variant?.variants?.find((data: any) => data?.attribute === product?.item?.name_varriant);
        const value_variants = attribute?.value_variants?.find((value: any) => (value?.name_variant?.trim() ? value?.name_variant : undefined) === product?.item?.value_varriant);
        quantity_item = value_variants?.stock_variant
        if (product?.item?.product_id?.variant) {
            if (product?.item?.quantity < quantity_item) {
                const items = {
                    product_id: product.item?.product_id?._id,
                    attribute: product?.item?.name_varriant,
                    name_variant: product?.item?.value_varriant
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
                    product_id: product?.item?.product_id?._id,
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
                <>
                    <Loading_Overlay />
                    <Button type="button" className='border-none bg-[#F5F5FA] px-2 hover:bg-gray-200 duration-200'>&#43;</Button>
                </>
                :
                <Button type="button" onClick={() => up_quantity(id_props)} className='border-none bg-[#F5F5FA] px-2 hover:bg-gray-200 duration-200'>&#43;</Button>
        }
    </>
    )
}

export default Btn_up
'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Detail_Item_Dashboard, Query_Category } from "../Query_APIs/Items/Query";
import { Mutation_Items } from "../Query_APIs/Items/Mutation_product";


export function useCustome_Hook_Product({ mode }: any) {
    const router = useRouter();
    const params = useParams();
    const id_item = params['cap-nhat-san-pham'] ?? params['cap-nhat-san-pham'];
    const [filed_form_data, setFiled_form_data] = useState<any>()
    // const id_item = use_Params?.cap-nhat-san-pham;
    // console.log(id_item)
    let data_detail_product: any;
    if (mode === 'edit' && mode) {
        data_detail_product = Detail_Item_Dashboard(String(id_item));
    };

    const { data: data_Category, isLoading } = Query_Category();
    const { my_Form, on_Submit, loading, query_client } = Mutation_Items({
        action: id_item ? "EDIT" : "ADD",
        onSuccess: () => {
            query_client.invalidateQueries({
                queryKey: ['Product_Key']
            })
            const text_alert = id_item ? `Sản phẩm mã ${id_item} đã được sửa!` : "Đã thêm sản phẩm!";
            toast.success(text_alert, { autoClose: 500 })
        },
    });
    useEffect(() => {
        if (id_item && mode) {
            my_Form.reset(data_detail_product.data);
        }
        // console.count('re-render')
    }, [my_Form, data_detail_product?.data, mode, id_item]);
    function submitForm(data_form: any) {
        try {
            const value_form_data = my_Form?.getValues();
            const check_field = Object.keys(value_form_data)
                .filter((filed: any) => !['stock', 'price_product', 'variant'].includes(filed) && !value_form_data[filed]);
            if (check_field?.length > 0) {
                setFiled_form_data(check_field);
            } else {
                const formData = new FormData();
                const arr_file_gallery = Array.isArray(data_form?.gallery) ? data_form?.gallery : 
                Object.values(data_form?.gallery);
                arr_file_gallery?.forEach((file: File) => {
                    formData.append('gallery', file)
                })
                const variantString = JSON.stringify(data_form.variant);
                formData.append('short_name', data_form.short_name);
                (data_form.price_product && formData.append('price_product', data_form.price_product))
                formData.append('des_product', data_form.des_product);
                formData.append('category_id', data_form.category_id && data_form.category_id);
                formData.append('made_in', data_form.made_in);
                (data_form.stock ? formData.append('stock', data_form.stock) : formData.append('variant', variantString))
                let dataAll: any = {
                    data_item: formData,
                }
                if (mode && id_item) {
                    dataAll = {
                        data_item: formData,
                        id_item: id_item
                    }
                }
                on_Submit(dataAll);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        my_Form,
        submitForm,
        router,
        isLoading,
        loading,
        data_Category,
        data_detail_product,
        filed_form_data,
    }
}
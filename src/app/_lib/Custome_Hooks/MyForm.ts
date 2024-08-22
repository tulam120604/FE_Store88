'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { Detail_Item_Dashboard, Query_Category } from "../Tanstack_Query/Items/query";
import { Mutation_Items } from "../Tanstack_Query/Items/mutationFn";
import { useCheck_user, useToken } from "./User";


export function useCustome_Hooks_Form({ mode }: any) {
    const user = useCheck_user();
    const token = useToken();
    const { update_item } = useParams();
    let data_one_item: any;
    if (mode === 'edit' && mode) {
        data_one_item = Detail_Item_Dashboard(String(update_item));
    }
    const routing = useRouter();

    const { data, isLoading } = Query_Category();
    const data_Category = data;
    const { my_Form, on_Submit, loading, query_client } = Mutation_Items({
        action: update_item ? "EDIT" : "ADD",
        onSuccess: () => {
            query_client.invalidateQueries({
                queryKey: ['Product_Key']
            })
            const text_alert = update_item ? `Sản phẩm mã ${update_item} đã được sửa !` : "Đã thêm sản phẩm !";
            toast.success(text_alert, { autoClose: 500 })
        },
        onSettled: () => {
            query_client.invalidateQueries({
                queryKey: ['Product_Key']
            });
        },
    });
    useEffect(() => {
        if (update_item && mode) {
            my_Form.reset(data_one_item.data);
        }
        // console.count('re-render')
    }, [my_Form, data_one_item?.data, mode, update_item]);
    function submitForm(data_form: any) {
        try {
            const formData = new FormData();
            const arr_file_gallery = Array.isArray(data_form?.gallery) ? data_form?.gallery : Object.values(data_form?.gallery);
            arr_file_gallery?.forEach((file: File) => {
                formData.append('gallery', file)
            })
            const attributesString = JSON.stringify(data_form.attributes);
            formData.append('short_name', data_form.short_name);
            (data_form.price_product && formData.append('price_product', data_form.price_product))
            formData.append('des_product', data_form.des_product);
            formData.append('id_user_seller', user?.check_email?._id)
            formData.append('category_id', data_form.category_id && data_form.category_id);
            formData.append('made_in', data_form.made_in);
            (data_form.stock ? formData.append('stock', data_form.stock) : formData.append('attributes', attributesString))
            let dataAll: any = {
                accessToken: token.accessToken,
                data_item: formData,
            }
            if (mode && update_item) {
                dataAll = {
                    accessToken: token.accessToken,
                    data_item: formData,
                    id_item: update_item
                }
            }
            on_Submit(dataAll);
        } catch (error) {
            console.error(error || "Lỗi rồi đại vương ơi!");
        }
    };

    return {
        my_Form,
        submitForm,
        routing,
        isLoading,
        loading,
        data_Category,
        data_one_item,
    }
}
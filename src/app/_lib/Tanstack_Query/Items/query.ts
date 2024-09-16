'use client';

import { GET_detail_item_dashboard, GET_item_dashboard, GET_recycle_item } from "../../Services/Services_Items/products";
import { detail_Categories, list_Categories } from "../../Services/Services_Items/categories";
import { useQuery } from "@tanstack/react-query";

// category
export function Query_Category(id?: string | number | undefined) {
    const key = id ? ['Category_Key', id] : ['Category_Key'];
    const { data, ...rest } = useQuery({
        queryKey: key,
        queryFn: async () => {
            return id ? await detail_Categories(id) : await list_Categories();
        }
    })
    return { data, ...rest }
}

// get list item admin
export function Query_List_Items_Dashboard(accessToken: any, page: number, limit_item: number, id_user?: string | number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key', page],
        queryFn: async () => {
            if (accessToken) {
                return await GET_item_dashboard(accessToken, page, limit_item, id_user);
            }
            return "Không thể xác minh tài khoản"
        },
        enabled: !!accessToken
    });
    return { data, ...rest };
}

// detail
export function Detail_Item_Dashboard(id: string | number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key', id],
        queryFn: () => GET_detail_item_dashboard(id)
    })
    return { data, ...rest }
}


// get the list in the trash
export function Query_Recycle_Items_Admin(accessToken: any, page?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key'],
        queryFn: async () => {
            if (accessToken) {
                return await GET_recycle_item(accessToken, page);
            }
            return "Không thể xác minh tài khoản"
        },
        enabled: !!accessToken
    });
    return { data, ...rest };
}
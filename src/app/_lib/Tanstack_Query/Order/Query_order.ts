import { useQuery } from "@tanstack/react-query";
import { detail_order, get_all_order, get_item_order, get_order_user } from "../../Services/Services_Order/Fn_Order";

export function Query_Order(id_user: any, page: number, limit: number, status_item_order?: any) {
    const { data, ...rest } = useQuery({
        queryKey: ['Key_Order', id_user, page, limit, status_item_order],
        queryFn: () => get_order_user(id_user, page, limit, status_item_order),
        enabled: !!id_user
    });
    return { data, ...rest };
}


export function List_Order_Dashboard(accessToken: string | undefined, id_seller: string | number | undefined) {
    const { data, ...rest } = useQuery({
        queryKey: ['Key_Order', accessToken],
        queryFn: async () => {
            if (accessToken) {
                return await get_all_order(accessToken, id_seller);
            }
            return 'Đại vương là giả mạo!!'
        }
    })
    return { data, ...rest };
}

export function Get_Item_Order(id_item_order: string | number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Key_Order', id_item_order],
        queryFn: async () => {
            if (id_item_order) {
                return await get_item_order(id_item_order);
            }
            return 'Không tìm thấy dữ liệu'
        },
        enabled: !!id_item_order
    })
    return { data, ...rest }
}

export function Query_Detail_Order(id: string, user_id?: string | number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Key_Order', id, user_id],
        queryFn: () => detail_order(id, user_id),
        enabled: !!id
    })
    return { data, ...rest }
}
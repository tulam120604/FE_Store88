import { useQuery } from "@tanstack/react-query";
import { detail_order, get_all_order, get_item_order, get_order_user } from "../../Services/Services_Order/Order";

export function Query_Order(page: number, limit: number, status_item_order?: any) {
    const { data, ...rest } = useQuery({
        queryKey: ['Key_Order', page, limit, status_item_order],
        queryFn: () => get_order_user(page, limit, status_item_order),
    });
    return { data, ...rest };
}


export function List_Order_Dashboard() {
    const { data, ...rest } = useQuery({
        queryKey: ['Key_Order'],
        queryFn: async () => {
            return await get_all_order();
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

export function Query_Detail_Order(id: string) {
    const { data, ...rest } = useQuery({
        queryKey: ['Key_Order', id],
        queryFn: () => detail_order(id),
        enabled: !!id
    })
    return { data, ...rest }
}
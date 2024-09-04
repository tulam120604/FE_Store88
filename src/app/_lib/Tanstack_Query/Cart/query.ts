'use client';

import { useQuery } from "@tanstack/react-query";
import { get_list_Cart } from "../../Services/Services_Cart/Cart";
import useStoreZustand from "@/src/app/Zustand/Store";


export function Get_Items_Cart(id_user: any) {
    const { setData } = useStoreZustand();
    const { data, ...rest } = useQuery({
        queryKey: ['Cart_Key', id_user],
        queryFn: async () => {
            if (id_user) {
                return await get_list_Cart(id_user)
            }
            return "không tìm thấy người dùng!"
        },
        enabled: !!id_user
    })
    return { data, ...rest };
}

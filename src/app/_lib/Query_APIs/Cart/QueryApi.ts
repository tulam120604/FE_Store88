'use client';

import { useQuery } from "@tanstack/react-query";
import { get_list_Cart } from "../../Services/Services_Cart/Cart";


export function Get_Items_Cart() {
    const { data, ...rest } = useQuery({
        queryKey: ['Cart_Key'],
        queryFn: async () => {
            return await get_list_Cart()
        },
    })
    return { data, ...rest };
}

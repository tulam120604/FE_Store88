'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { add_to_cart, checked_item_cart, dow_quantity, remove_all_item_cart, remove_item_cart, up_quantity } from "../../Services/Services_Cart/Cart";

type Action = 'Add_Cart' | 'UP' | 'DOW' | 'REMOVE' | 'CHECKED_AND_REMOVE_ALL';

export function Mutation_Cart(action: Action) {
    const query_client = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (item: any) => {
            switch (action) {
                case "Add_Cart":
                    return await add_to_cart(item);
                case "UP":
                    return await up_quantity(item);
                case "DOW":
                    return await dow_quantity(item);
                case "REMOVE":
                    return await remove_item_cart(item);
                case "CHECKED_AND_REMOVE_ALL":
                    if (item.key_action === 'remove_all') {
                        return await remove_all_item_cart(item);
                    }
                    else {
                        return await checked_item_cart(item);
                    }
                default: return;
            }
        },
        onSuccess: (i: any) => {
            if (i) {
                query_client.invalidateQueries({
                    queryKey: ['Cart_Key']
                })
            }
            else {
                console.error('Kiem tra lai server !')
            }
        },
        onError: (err: any) => {
            console.error(err)
        }
    });

    return { mutate, ...rest };
}
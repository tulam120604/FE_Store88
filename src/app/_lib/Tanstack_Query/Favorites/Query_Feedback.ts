import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { add_favorites, detail_item_in_favorite, list_favorites, remove_favorites } from "../../Services/Favorites/Favorites";

export function List_favorites(id_user: string | number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Favorite_Key', id_user],
        queryFn: () => list_favorites(id_user),
        enabled: !!id_user
    })
    return { data, ...rest }
}


export function Query_detail_favorites(id_user: string | number, id_item: string | number) {
    const key = id_item ? ['Favorite_Key', id_item] : ['Favorite_Key']
    const { data, ...rest } = useQuery({
        queryKey: key,
        queryFn: () => detail_item_in_favorite(id_user, id_item),
        enabled: !!id_user && !!id_item
    })
    return { data, ...rest }
}

type Actions = 'ADD_and_REMOVE';
export function Mutation_Favorite(action: Actions) {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (dataCLient: { id_user: string | number, id_item: string | number, action?: string | number }) => {
            switch (action) {
                case "ADD_and_REMOVE":
                    if (dataCLient?.action === 'add') {
                        return await add_favorites(dataCLient);
                    }
                    return await remove_favorites(dataCLient);
                default: return;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['Favorite_Key']
            })
        },
        onError: (error) => error
    });

    return { mutate, ...rest }
}
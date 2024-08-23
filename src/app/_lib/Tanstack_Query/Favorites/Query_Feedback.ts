import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { add_favorites, list_favorites, remove_favorites } from "../../Services/Favorites/Favorites";

export function List_favorites(id_user: string | number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Favorite_Key'],
        queryFn: () => list_favorites(id_user),
        enabled: !!id_user
    })
    return { data, ...rest }
}

type Actions = 'ADD' | 'REMOVE';
export function Mutation_Favorite(action: Actions) {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (dataCLient: { id_user: string | number, id_item: string | number }) => {
            switch (action) {
                case "ADD":
                    return await add_favorites(dataCLient);
                case "REMOVE":
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
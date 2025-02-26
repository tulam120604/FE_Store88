import { useQuery } from "@tanstack/react-query";
import { infor_user, list_Account } from "../../Services/Services_Auth/Auth";

export function List_Account() {
    const { data, ...rest } = useQuery({
        queryKey: ['List_Account_Key'],
        queryFn: async () => {
            return await list_Account();
        },
    })
    return { data, ...rest };
}

export function Infor_user() {
    const { data, ...rest } = useQuery({
        queryKey: ['Auth_Key'],
        queryFn: async () => {
            return await infor_user();
        },
    });
    return { data, ...rest };
}

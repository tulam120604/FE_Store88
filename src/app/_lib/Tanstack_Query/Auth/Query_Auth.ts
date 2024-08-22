import { useQuery } from "@tanstack/react-query";
import { check_token_expired, infor_user, list_Account } from "../../Services/Services_Auth/Authen";

export function List_Account(accessToken: any) {
    const { data, ...rest } = useQuery({
        queryKey: ['Account_Key'],
        queryFn: async () => {
            if (accessToken) {
                return await list_Account(accessToken);
            }
            return 'Không thể xác minh danh tính!!'
        },
        enabled: !!accessToken
    })
    return { data, ...rest };
}

export function Infor_user(id: string | number, accessToken: string) {
    const { data, ...rest } = useQuery({
        queryKey: ['Account_Key', id],
        queryFn: async () => {
            if (id) {
                return await infor_user(id, accessToken);
            };
            return 'Không thể xác minh danh tính!!'
        },
        enabled: !!id
    });
    return { data, ...rest };
}


// check expired
export function Check_token_expired(user: any) {
    const { data, ...rest } = useQuery({
        queryKey: ['Auth_Key', user],
        queryFn: () => check_token_expired(user),
        enabled : !!user?.accessToken
    })
    return { data, ...rest }
}
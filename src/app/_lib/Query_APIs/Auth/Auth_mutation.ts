import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidateRegister } from "@/src/app/(Auth)/validate";
import { create_Account, set_role_user_to_seller, logout, refesh_token, sign_In } from "../../Services/Services_Auth/Auth";
import { useCheck_user } from "../../Custome_Hooks/User";


type Actions = "LOGIN" | "REGISTER" | "SET_ROLE_USER_TO_SELLER" | "LOGOUT" | "REFESH_TOKEN";

export function Mutation_Auth({ action }: { action: Actions }) {
    const user = useCheck_user();
    let check_validate_register: any;
    if (action === 'REGISTER') {
        check_validate_register = yupResolver(schemaValidateRegister)
    }
    const [status_Loading, setStatus_Loading] = useState('no_call');
    const my_form = useForm({
        resolver: yupResolver(schemaValidateRegister)
    });
    const query_Client = useQueryClient();

    const { mutate, ...rest } = useMutation({
        mutationFn: async (dataClient: any) => {
            setStatus_Loading('pending_call')
            switch (action) {
                case "LOGIN":
                    return await sign_In(dataClient);
                case "REGISTER":
                    return await create_Account(dataClient);
                case "SET_ROLE_USER_TO_SELLER":
                    return await set_role_user_to_seller(dataClient);
                case "LOGOUT":
                    return await logout();
                case "REFESH_TOKEN":
                    return await refesh_token()
                default: return
            }
        }, onSuccess: (res: any) => {
            query_Client.invalidateQueries({
                queryKey: ['Auth_Key']
            });
            if (res.status === 201 || res.status === 200) {
                setStatus_Loading('call_ok');
            }
            else {
                setStatus_Loading('call_error');
            }
            if (res?.new_token) {
                const new_localStorage = {
                    ...user,
                    accessToken: res?.new_token,
                }
                localStorage.setItem('account', JSON.stringify(new_localStorage))
            }
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        mutate(data)
    }
    return { status_Loading, my_form, onSubmit, ...rest };
}
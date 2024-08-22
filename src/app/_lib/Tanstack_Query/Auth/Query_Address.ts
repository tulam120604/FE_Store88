import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create_address, get_address, remove_address, update_default_address } from "../../Services/Services_Auth/Address";
import { SubmitHandler, useForm } from "react-hook-form";
import { schemaValidateAddress } from "@/src/app/(Auth)/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export function List_Address(id_user: string | number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Address_Key', id_user],
        queryFn: async () => {
            return await get_address(id_user);
            return 'Không thể xác minh danh tính!!'
        },
        enabled: !!id_user
    })
    return { data, ...rest };
}

type Actions = 'CREATE' | 'EDIT' | 'REMOVE_OR_UPDATE_DEFAULT_ADDRESS';

export function Mutation_Address(action: Actions) {
    const [status_api, setStatus_api] = useState<string>('no_call')
    const queryClient = useQueryClient();
    const form_address = useForm({
        resolver: yupResolver(schemaValidateAddress)
    })
    const { mutate, ...rest } = useMutation({
        mutationFn: async (dataClient: any) => {
            switch (action) {
                case "CREATE":
                    return await create_address(dataClient);
                case "REMOVE_OR_UPDATE_DEFAULT_ADDRESS":
                    if (dataClient?.action === 'remove') {
                        return await remove_address(dataClient);
                    }
                    return await update_default_address(dataClient)
                default: return
            }
        },
        onSuccess: (res: any) => {
            if (res?.message === 'OK') {
                setStatus_api('call_ok')
                form_address.reset();
            }
            queryClient.invalidateQueries({
                queryKey: ['Address_Key']
            })
        },
        onError: (error) => {
            setStatus_api('call_error')
            console.log(error)
        }
    })
    const errorForm = form_address?.formState?.errors

    return { form_address, mutate, errorForm, status_api, ...rest }
}
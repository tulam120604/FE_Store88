'use client';

import { DESTROY_item, POST_item, PUT_item_dashboard, REMOVE_item, RESTORE_item } from "../../Services/Services_Items/products";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Action = 'ADD' | 'EDIT' | 'REMOVE' | 'RESTORE_OR_DESTROY';


export function Mutation_Items({ action, onSuccess, onError, onSettled }: { action: Action, onSuccess?: any, onError?: any, onSettled?: any }) {
    const [loading, setLoading] = useState<string>('no_call');
    // create form 
    const my_Form = useForm();

    const query_client = useQueryClient();
    const { mutate, ...rest } = useMutation({
        // retry: 3,
        mutationFn: async (dataClient: any) => {
            setLoading('dang_call');
            switch (action) {
                case 'ADD':
                    return await POST_item(dataClient);
                case 'EDIT':
                    return await PUT_item_dashboard(dataClient);
                case 'REMOVE':
                    return await REMOVE_item(dataClient);
                case 'RESTORE_OR_DESTROY':
                    if (dataClient?.action_mutation === 'restore') {
                        return await RESTORE_item(dataClient);
                    }
                    return await DESTROY_item(dataClient)
                default: return
            }
        },
        onSuccess: (res: any) => {
            query_client.invalidateQueries({
                queryKey: ['Product_Key']
            });
            if (res.status === 400 || res.status === 500) {
                setLoading('call_error');
            }
            else {
                setLoading('call_ok');
            }
        },
        onSettled: () => {
            query_client.invalidateQueries({
                queryKey: ['Product_Key']
            });
        },
        onError: (err) => {
            console.error(err)
        }
    })

    // form
    const on_Submit: SubmitHandler<any> = async (data) => {
        mutate(data);
    }

    return { mutate, my_Form, on_Submit, query_client, onSuccess, onError, loading, ...rest };
}

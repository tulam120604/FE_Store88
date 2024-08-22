'use client';


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { add_Categories } from "../../Services/Services_Items/categories";
import { useState } from "react";


type Actions = 'ADD' | 'EDIT' | 'REMOVE';

export function Mutation_Category (action : Actions) {
    const [status_category, setStatus_Category] = useState<string>('no_call');
    const queryClient = useQueryClient();
    const form_category = useForm();
    const {mutate, ...rest} = useMutation({
        mutationFn : async (data) => {
            setStatus_Category('dang_call');
            switch (action) {
                case "ADD" :
                    return await add_Categories(data);
                default : return;
            }
        },
        onSuccess : (res) => {
            queryClient.invalidateQueries({
                queryKey : ['Category_Key'],
            });
            if (res.status === 400 || res.status === 404) {
                setStatus_Category('call_error')
            }
            else {
                setStatus_Category('call_ok')
            }
        },
        onSettled : () => {
            queryClient.invalidateQueries({
                queryKey : ['Category_Key'],
            })
        },
        onError : (error : any) => {
            console.error(error);
        }
    });

    const on_Submit_category : SubmitHandler<any> = async (data) => {
        mutate(data);

    }
    return {on_Submit_category, status_category, form_category, ...rest};
}
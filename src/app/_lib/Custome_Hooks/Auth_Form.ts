'use client';

import { useRouter } from "next/navigation";
import { Mutation_Auth } from "../Query_APIs/Auth/Auth_mutation";


export function Custome_Hooks_Auth({ mode }: any) {
    const routing = useRouter();
    const { my_form, isLoading, status_Loading, onSubmit } = Mutation_Auth({
        action: mode === 'Register' ? 'REGISTER' : "LOGIN"
    })
    const {errors, isValidating}= my_form.formState;
    return {
        my_form, isLoading, status_Loading, onSubmit, errors, isValidating, routing
    }
}
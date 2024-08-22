import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_payment } from "../../Services/Payment/Payment";
import { useRouter } from "next/navigation";


export function Mutation_Payment(action: string) {
    const routing = useRouter();
    const queryClient = useQueryClient();

    const { mutate, ...rest } = useMutation({
        mutationFn: async (dataBody: any) => {
            switch (action) {
                case 'CREATE':
                    return await create_payment(dataBody)
            }
        },
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({
                queryKey: ['Payment_Key']
            });
            if (res?.data?.return_code === 1) {
                routing.push(res?.data?.order_url)
            }
        },
        onError: (error) => error
    })
    return { mutate, ...rest };
}
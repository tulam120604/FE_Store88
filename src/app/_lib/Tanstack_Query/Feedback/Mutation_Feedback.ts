import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { add_feedBack } from "../../Services/Service_Feedback/Feedback";
import { useRouter } from "next/navigation";


type Actions = 'ADD' | 'EDIT' | "REMOVE";

export function Mutation_Feedback(action: Actions) {
    const routing = useRouter();
    const queryClient = useQueryClient();
    const form_feedback = useForm();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (dataBody: IFeedback) => {
            switch (action) {
                case "ADD":
                    return await add_feedBack(dataBody);
                default: return;
            }
        },
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({
                queryKey: ['Feedback_Key'],
            });
            queryClient.invalidateQueries({
                queryKey: ['Key_Order']
            })
            if (res?.status !== 404 || res.status !== 500) {
                form_feedback.reset();
                routing.push('/profile/orders')
            }
        },
        onError: (res: any) => res
    });

    return { mutate, form_feedback, ...rest };
}
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form";
import { create_message, send_message } from "../../Services/Service_Notification/Fn_Notification";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidateNotification } from "@/src/app/(Auth)/validate";

type Actions = 'ADD' | 'SEND' | 'REMOVE'

export function Mutation_Notification(action: Actions) {
    const queryClient = useQueryClient();
    const form_notification = useForm({
        resolver: yupResolver(schemaValidateNotification)
    });
    const { errors } = form_notification.formState
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data_body: INotification) => {
            switch (action) {
                case 'ADD':
                    return await create_message(data_body);
                case 'SEND':
                    return await send_message(data_body);
                default: return;
            }
        },
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({
                queryKey: ['Notification_Key'],
            });

            if (res?.status !== 401 || res?.status !== 401 || res?.status !== 401) {
                form_notification.reset();
            }
        },
        onError: (res) => {
            return res
        }
    });
    return { mutate, form_notification, errors, ...rest }
}
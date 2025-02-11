import { useQuery } from "@tanstack/react-query";
import { get_notification } from "../../Services/Service_Notification/Fn_Notification";

export function Query_Notification() {
    const { data, ...rest } = useQuery({
        queryKey: ['Key_Notification_User'],
        queryFn: async () => {
            return await get_notification();
        },
    });
    return { data, ...rest }
}
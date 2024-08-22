import { useQuery } from "@tanstack/react-query";
import { get_notification } from "../../Services/Service_Notification/Fn_Notification";

export function Query_Notification(id_user : string | number) {
    const {data,... rest} = useQuery({
        queryKey : ['Notification_Key', id_user],
        queryFn : async () => {
            if (id_user) {
                return await get_notification(id_user);
            }
            return 'Không tìm thấy tài khoản!!'
        },
        enabled : !!id_user
    });
    return {data, ...rest}
}
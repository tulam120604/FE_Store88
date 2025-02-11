import React from 'react'
import Notification_Component from './Notification';
import { Query_Notification } from '@/src/app/_lib/Query_APIs/Notification/Query_Notification';

export default function Bell_component() {
    const data = Query_Notification();
    let total_bell: any;
    if (data?.data?.data_notification) {
        total_bell = data?.data?.data_notification?.filter((item: any) => item?.status_message !== true) ?? ''
    }
    return (
        <Notification_Component dataProps={{ data: data?.data, total_bell: total_bell }} />
    )
}

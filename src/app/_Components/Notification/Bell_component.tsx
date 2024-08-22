import React from 'react'
import Notification_Component from './Notification';
import { Query_Notification } from '@/src/app/_lib/Tanstack_Query/Notification/Query_Notification';

export default function Bell_component() {
    // bell
    let user: any;
    if (typeof window !== 'undefined') {
        user = JSON.parse(localStorage.getItem('account') || '{}') ?? ''
    }
    const data = Query_Notification(user?.check_email?._id);
    let total_bell: any;
    if (data?.data?.data_notification) {
        total_bell = data?.data?.data_notification?.filter((item: any) => item?.status_message !== true) ?? ''
    }
    return (
        <Notification_Component dataProps={{ data: data?.data, total_bell: total_bell }} />
    )
}

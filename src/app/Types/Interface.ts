interface IFeedback {
    user_id?: string | number,
    item_id?: string | number,
    item_order?: any,
    content_feedback?: string,
}

// notification
interface INotification {
    sender_id?: string | number,
    receiver_id?: string | number,
    notification_message?: any,
    notes?: string,
    user_name?: string,
    email?: string,
    phone?: string,
}

interface IForm_Notification {
    note_shop?: string,
    address_shop?: string,
    name_shop?: string,
    email_shop?: string,
    phone_shop?: string,
}
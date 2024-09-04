export interface IProduct {
    _id?: string | number,
    short_name?: string | number,
    gallery: string[],
    id_user_seller?: string | number,
    trending?: boolean | string,
    des_product?: string | number,
    category_id?: string | number,
    count_stock?: number | string,
    attributes?: string | number,
    made_in?: string,
    createAt?: string | number,
    updateAt?: string | number,
    deleted?: boolean | string,
    sale_quantity?: number | string,
}


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


export interface IDataPayment {
    product_id?: IProduct,
    quantity?: number | string,
    price_item?: number | string,
    total_price_item?: number | string,
    color_ite?: string,
    status_checked?: boolean,
    _id?: string
}

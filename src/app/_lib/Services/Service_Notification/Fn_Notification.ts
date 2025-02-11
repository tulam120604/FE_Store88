const apiURi = process.env.NEXT_PUBLIC_DB_HOST;
import { toast } from 'react-toastify'

export async function create_message(data_body: any) {
    try {
        const res = await fetch(`${apiURi}/create_notification/${data_body?.sender_id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_body)
        });
        if (!res.ok) {
            toast.error("Gửi thất bại, vui lòng thử lại!", { autoClose: 800 })
            return res
        }
        else {
            toast.success("Đã gửi!", { autoClose: 800 })
        };
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi server rồi đại vương ơi!'
    }
};


export async function get_notification() {
    try {
        const res = await fetch(`${apiURi}/get_message_notification`, {
            method: 'get',
            credentials: 'include'
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi server rồi đại vương ơi!'
    }
}


export async function send_message(data_body: any) {
    try {
        const res = await fetch(`${apiURi}/send_notification`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_body)
        });
        if (!res.ok) {
            return res
        }
        return res
    } catch (error) {
        return error || 'Lỗi server rồi đại vương ơi!'
    }
};
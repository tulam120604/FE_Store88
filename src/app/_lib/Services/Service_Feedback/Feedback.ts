
const apiURi = process.env.NEXT_PUBLIC_DB_HOST;
import { toast } from 'react-toastify'

export async function get_feedBack_in_item(id_item: string | number) {
    try {
        const res = await fetch (`${apiURi}/feedback/detail_item/${id_item}`);
        if (!res.ok) {
            return res;
        }
        const data = await res.json();
        return data
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}


export async function add_feedBack(data_client: IFeedback) {
    try {
        const res = await fetch(`${apiURi}/feedback`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_client)
        })
        if (!res.ok) {
            toast.error('Đánh giá thất bại, vui lòng kiểm tra hoặc thử lại sau!', {autoClose : 500})
            return res
        }
        else {
            toast.success('Đánh giá thành công', {autoClose : 500})
        }
        return res
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}
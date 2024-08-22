const apiURi = process.env.NEXT_PUBLIC_DB_HOST;
import { toast } from 'react-toastify'

export async function create_payment(total_price: any) {
    try {
        const res = await fetch(`${apiURi}/create_payment`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ total_price })
        });
        if (!res.ok) {
            toast.error('Có vẻ như hệ thống đang bảo trì, đại vương vui lòng chọn phương thức thanh toán khác', { autoClose: 800 })
            return res
        };
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}
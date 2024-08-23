const apiURi = process.env.NEXT_PUBLIC_DB_HOST;
import { toast } from 'react-toastify';


export async function list_favorites(id_user: string | number) {
    try {
        const res = await fetch(`${apiURi}/list_item_favorite/${id_user}`);
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error
    }
}


export async function add_favorites(dataClient: { id_user: string | number, id_item: string | number }) {
    try {
        const res = await fetch(`${apiURi}/add_item_favorite`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataClient)
        });
        if (!res.ok) {
            toast.error('Đã có lỗi xảy ra, hãy thử lại!', { autoClose: 800 })
            return res
        }
        toast.success('Đã thêm vào sản phẩm yêu thích.', { autoClose: 800 });
        return res
    } catch (error) {
        return error
    }
}


export async function remove_favorites(dataClient: { id_user: string | number, id_item: string | number }) {
    try {
        const res = await fetch(`${apiURi}/add_item_favorite`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataClient)
        });
        if (!res.ok) {
            toast.error('Đã có lỗi xảy ra, hãy thử lại!', { autoClose: 800 })
            return res
        }
        toast.success('Đã xóa khỏi sản phẩm yêu thích.', { autoClose: 800 });
        return res
    } catch (error) {
        return error
    }
}
const apiURi = process.env.NEXT_PUBLIC_DB_HOST;
import { toast } from 'react-toastify';


export async function list_favorites() {
    try {
        const res = await fetch(`${apiURi}/list_item_favorite`, {
            method: 'get',
            credentials: 'include'
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error
    }
}

export async function view_item_in_favorite(id_item: string | number) {
    try {
        const res = await fetch(`${apiURi}/view_item_favorite`, {
            method: 'get',
            credentials: 'include',
            headers: {
                'id_item': `${id_item}`
            }
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error
    }
}


export async function add_favorites(dataClient: { id_item: string | number }) {
    try {
        const res = await fetch(`${apiURi}/add_item_favorite`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
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


export async function remove_favorites(dataClient: { id_item: string | number }) {
    try {
        const res = await fetch(`${apiURi}/remove_item_favorite`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
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
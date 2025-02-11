const apiURi = process.env.NEXT_PUBLIC_DB_HOST;
import { toast } from 'react-toastify'

export async function get_address() {
    try {
        const res = await fetch(`${apiURi}/address/get`, {
            method: 'get',
            credentials: 'include',
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!'
    }
}


export async function create_address(item: { user_id: string | number, about_address: any }) {
    try {
        const res = await fetch(`${apiURi}/address/create`, {
            method: 'post',
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify(item),
            credentials: 'include',
        });
        if (!res.ok) {
            toast.success('Lỗi, không thể thêm địa chỉ, vui lòng thử lại.', { autoClose: 500 })
            return res
        }
        else {
            toast.success('Đã thêm địa chỉ mới.', { autoClose: 500 })
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!'
    }
}

export async function edit_address(item: { id_user: string | number, address: string | number }) {
    try {
        const res = await fetch(`${apiURi}/address/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item?.address),
            credentials: 'include'
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!'
    }
}


export async function remove_address(dataClient: { id_address: string | number }) {
    try {
        const res = await fetch(`${apiURi}/address/remove/${dataClient?.id_address}`, {
            method: 'delete',
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!'
    }
}

export async function update_default_address(dataClient: { id_address?: string | number }) {
    try {
        const res = await fetch(`${apiURi}/address/update_default_address/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataClient),
            credentials: 'include'
        });
        if (!res.ok) {
            toast.success('Lỗi, không thể cập nhật địa chỉ, vui lòng thử lại.', { autoClose: 500 })
            return res
        };
        return res;
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!'
    }
}

// lay data cac tinh thanh
export async function get_provinces() {
    try {
        const res = await fetch('https://esgoo.net/api-tinhthanh/4/0.htm');
        console.log(res?.status)
        if (!res.ok) {
            return res
        }
        const { data } = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!'
    }
}

import { toast } from "react-toastify";

const apiURi = process.env.NEXT_PUBLIC_DB_HOST;

// danh sach
export async function list_category() {
    try {
        const res = await fetch(`${apiURi}/category`);
        const data = await res.json();
        return data
    } catch (error) {
        return error
    }
}

// chi tiet
export async function view_detail_category(id: any) {
    try {
        const res = await fetch(`${apiURi}/category/${id}`);
        const { data } = await res.json();
        return data
    } catch (error) {
        return error
    }
}

// add
export async function create_category(item: any) {
    try {
        const res = await fetch(`${apiURi}/category`, {
            method: 'post',
            headers: {
                // 'Content-Type': 'application/json'
            },
            body: item
        });
        if (!res.ok) {
            return res
        }
        if (res.status === 200) {
            toast.success('Thêm thành công danh mục', { autoClose: 500 })
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error
    }
}

// edit
export async function PUT_category(item: any) {
    try {
        const res = await fetch(`${apiURi}/category/${item.id}}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        const data = await res.json();
        return data
    } catch (error) {
        return error
    }
}

// remove
export async function DELETE_category(id: any) {
    try {
        const res = await fetch(`${apiURi}/category/${id}}`, {
            method: 'delete',
        });
        const { data } = await res.json();
        return data
    } catch (error) {
        return error
    }
}

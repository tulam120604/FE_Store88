
import { toast } from "react-toastify";

const apiURi = process.env.NEXT_PUBLIC_DB_HOST;

// danh sach
export async function GET_category() {
    try {
        const res = await fetch(`${apiURi}/category`);
        if (!res.ok) {
            console.warn('Call data failer!')
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// chi tiet
export async function GET_one_category(id: any) {
    try {
        const res = await fetch(`${apiURi}/category/${id}`);
        if (!res.ok) {
            console.warn('Call data failer!')
            return res
        }
        const { data } = await res.json();
        return data
    } catch (error) {
        return error || '<span>Lỗi rồi đại vương ơi!!</span>'
    }
}

// add
export async function POST_category(item: any) {
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
        return error || '<span>Lỗi rồi đại vương ơi!!</span>'
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
        if (!res.ok) {
            console.warn('Call data failer!')
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || '<span>Lỗi rồi đại vương ơi!!</span>'
    }
}

// remove
export async function DELETE_category(id: any) {
    try {
        const res = await fetch(`${apiURi}/category/${id}}`, {
            method: 'delete',
        });
        if (!res.ok) {
            console.warn('Call data failer!')
            return res
        }
        const { data } = await res.json();
        return data
    } catch (error) {
        return error || '<span>Lỗi rồi đại vương ơi!!</span>'
    }
}

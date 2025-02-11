const apiURi = 'http://localhost:2000/v1';
import { toast } from "react-toastify";



export async function add_order(item: any) {
    try {
        const res = await fetch(`${apiURi}/order/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        if (!res.ok) {
            toast.error('Đặt hàng không thành công!', { autoClose: 500 });
            return res
        } else {
            toast.success('Đặt hàng thành công!', { autoClose: 500 });
        }
        await res.json();
        return res
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
};

export async function get_order_user(page: number, limit: number, status_item_order?: string | number) {
    try {
        let uri = `${apiURi}/order_by_user?_page=${page}&_limit=${limit}`;
        if (status_item_order) {
            uri += `&_status_item=${status_item_order}`
        }
        const res = await fetch(uri, {
            method: 'get',
            credentials: 'include'
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}

// list order admin and seller
export async function get_all_order() {
    try {
        let uri = `${apiURi}/list_orders`
        const res = await fetch(uri, {
            method: 'get',
            credentials: 'include'
        });
        if (!res.ok) {
            toast.error('Lỗi, vui lòng kiếm tra lại!', { autoClose: 500 });
            console.log('Lỗi rồi đại vương ơi!');
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}


export async function update_status_order(dataClient: { item: any, action?: string }) {
    try {
        const res = await fetch(`${apiURi}/order/update_status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(dataClient.item)
        })
        if (!res.ok) {
            if (dataClient?.action === 'admin') {
                toast.error('Cập nhật không thành công!', { autoClose: 800 });
                console.log('Lỗi rồi đại vương ơi!')
            }
            else {
                toast.error('Hủy đơn không thành công!', { autoClose: 800 });
                console.log('Lỗi rồi đại vương ơi!')
            }
            return res
        } else {
            if (dataClient?.action === 'admin') {
                toast.success('Cập nhật trạng thái đơn hàng thành công!', { autoClose: 500 });
            }
            else {
                if (+dataClient?.item?.status_item_order !== 7) {
                    toast.success('Hủy đơn hàng thành công!', { autoClose: 500 });
                }
            }
        }
        await res.json();
        return res
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}


export async function restore_buy_order(dataClient: any) {
    try {
        const res = await fetch(`${apiURi}/order/buy_again`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(dataClient)
        })
        if (!res.ok) {
            toast.error('Đặt lại đơn không thành công!', { autoClose: 500 });
            console.log('Lỗi rồi đại vương ơi!')
            return res
        } else {
            toast.success('Đặt lại đơn thành công!', { autoClose: 500 });
        }
        await res.json();
        return res
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}

// feedback detail item in order
export async function get_item_order(id_item: string | number) {
    try {
        const res = await fetch(`${apiURi}/order/feedback/${id_item}`);
        if (!res.ok) {
            toast.error('Có lỗi xảy ra, vui lòng kiểm tra lại!', { autoClose: 500 });
            return res
        };
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}

export async function detail_order(id: string) {
    try {
        let uri = `${apiURi}/detail_order?id=${id}`
        const res = await fetch(uri, {
            method: 'get',
            credentials: 'include'
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}
'use client';

const apiURi = process.env.NEXT_PUBLIC_DB_HOST;

export async function get_list_Cart() {
    try {
        const res = await fetch(`${apiURi}/list_items_cart`, {
            method: 'get',
            credentials: 'include'
        });
        if (!res.ok) {
            return res.status
        };
        const data = await res.json();
        return data.cart
    } catch (error) {
        console.error(error);
        return (error || '<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// add cart
export async function add_to_cart(item: any) {
    try {
        const res = await fetch(`${apiURi}/add_to_cart`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            console.warn('Kiem tra lai server !');
        }
        await res.json();
        return res;
    } catch (error) {
        console.error(error);
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// up
export async function up_quantity(item: any) {
    try {
        const res = await fetch(`${apiURi}/cart/up`, {
            method: 'post',
            headers: {
                "Content-Type": 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            console.warn('Kiem tra lai server !')
        };
        await res.json();
        return res;
    } catch (error) {
        console.error(error);
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// dow
export async function dow_quantity(item: any) {
    try {
        const res = await fetch(`${apiURi}/cart/dow`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            console.warn('Kiem tra lai server!');
        };
        await res.json();
        return res
    } catch (error) {
        console.error(error);
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// count total price
export async function checked_item_cart(item: any) {
    try {
        const res = await fetch(`${apiURi}/cart/check_item_cart`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            console.warn('Kiem tra lai server!');
        };
        await res.json();
        return res
    } catch (error) {
        console.error(error);
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// remove_item_cart
export async function remove_item_cart(item: any) {
    try {
        const res = await fetch(`${apiURi}/cart/remove_item_cart`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            console.warn('Kiem tra lai server!');
        };
        return res
    } catch (error) {
        console.error(error);
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// remove_item_cart
export async function remove_all_item_cart(item: any) {
    try {
        const res = await fetch(`${apiURi}/cart/remove_all_item_cart`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            console.warn('Kiem tra lai server!');
        };
        await res.json();
        return res
    } catch (error) {
        console.error(error);
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}
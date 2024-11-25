import { toast } from "react-toastify";
const apiURi = process.env.NEXT_PUBLIC_DB_HOST;

// login
export async function sign_In(item: any) {
    try {
        const res = await fetch(`${apiURi}/login`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            return res
        }
        else if (res.status === 200) {
            const data = await res.json();
            // console.log(data.check_email)
            localStorage.setItem('account', JSON.stringify(data));
        }
        return res
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!!'
    }
}

// register


export async function create_Account(item: any) {
    try {
        const res = await fetch(`${apiURi}/register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            toast.error('Tạo tài khoản thất bại!', { autoClose: 500 })
            return res
        }
        if (res.status === 201) {
            toast.success("Đăng kí tài khoản thành công!", { autoClose: 500 });
        }
        return res
    } catch (error) {
        return 'Lỗi rồi đại vương ơi!!'
    }
}

// infor
export async function infor_user(id: string | number, accessToken: string) {
    try {
        const res = await fetch(`${apiURi}/infor/${id}`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return 'Lỗi rồi đại vương ơi!!'
    }
}

// get
export async function list_Account(accessToken: string) {
    try {
        const res = await fetch(`${apiURi}/account`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (!res.ok) {
            return res
        };
        const data = await res.json();
        return data
    } catch (error) {
        return 'Lỗi rồi đại vương ơi!!'
    }
}

// granting_premissions
export async function granting_premissions(dataForm: { id_user: string | number, accessToken: string }) {
    try {
        const res = await fetch(`${apiURi}/granting_premissions`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dataForm?.accessToken}`
            },
            body: JSON.stringify(dataForm?.id_user)
        });
        if (!res.ok) {
            toast.error('Cấp quyền thất bại!', { autoClose: 500 });
            return res
        }
        else {
            toast.success('Cấp quyền thành công!', { autoClose: 500 })
        }
        return res
    } catch (error) {
        return 'Lỗi rồi đại vương ơi!!'
    }
}


// log out
export async function logout(token: string) {
    try {
        const res = await fetch(`${apiURi}/logout`, {
            method: 'post',
            headers: {
                'Authorization': `${token}`
            }
        });
        if (!res.ok) {
            toast.error('Đăng xuất thất bại, vui lòng thử lại sau!', { autoClose: 500 });
            return res;
        };
        return res
    } catch (error) {
        return 'Lỗi rồi đại vương ơi!!'
    }
}

// refesh token 
export async function refesh_token(token: { refeshToken: string }) {
    try {
        const res = await fetch(`${apiURi}/refesh_token`, {
            method: 'post',
            headers: {
                'Authorization': token?.refeshToken
            }
        })
        if (!res.ok) {
            toast.error('Không thể xác minh danh tính, vui lòng đăng nhập và thử lại sau!', { autoClose: 500 });
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return 'Lỗi rồi đại vương ơi!!' || error
    }
}


// check token expired 
export async function check_token_expired(user: { id: string, accessToken: string }) {
    try {
        const res = await fetch(`${apiURi}/check_token_expired/${user?.id}`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${user?.accessToken}`
            }
        });
        if (!res.ok) {
            const { message } = await res.json();
            if (message === 'Token het han !') {
                return res
            }
            return res;
        }
        const data_user = await res.json()
        return data_user
    } catch (error) {
        return 'Lỗi rồi đại vương ơi!!' || error
    }
}

// infor
export async function infor_shop(id?: string | number) {
    try {
        const res = await fetch(`${apiURi}/inforshop/${id}`);
        console.log(res)
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return 'Lỗi rồi đại vương ơi!!'
    }
}
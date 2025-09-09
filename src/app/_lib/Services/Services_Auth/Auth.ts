import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const apiURi = process.env.NEXT_PUBLIC_API;

// login
export async function sign_In(item: any) {
  try {
    const res = await fetch(`${apiURi}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return error;
  }
}

// register
export async function create_Account(item: any) {
  try {
    const res = await fetch(`${apiURi}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return error;
  }
}

// authentication with google
export async function authenticate_with_google(data: any) {
  try {
    const res = await fetch(`${apiURi}/authenticate_with_google`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return res;
  } catch (error: any) {
    return error;
  }
}

// infor
export async function infor_user() {
  try {
    const res = await fetch(`${apiURi}/infor_account`, {
      method: "get",
      credentials: "include",
    });
    const response = await res.json();
    const data = {
      ...response,
      status: res?.status,
    };
    return data;
  } catch (error: any) {
    return error;
  }
}

// list account
export async function list_Account() {
  try {
    const res = await fetch(`${apiURi}/account`, {
      method: "get",
      credentials: "include",
    });
    if (!res.ok) {
      return res;
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    return error;
  }
}

// cap quyen cho user
export async function set_role_user_to_seller(dataForm: {
  id_user: string | number;
}) {
  try {
    const res = await fetch(`${apiURi}/set_role_user_to_seller`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm?.id_user),
      credentials: "include",
    });
     const data = await res.json();
    return data;
  } catch (error: any) {
    return error;
  }
}

// dang xuat
export async function logout() {
  try {
    const res = await fetch(`${apiURi}/logout`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
         localStorage.removeItem("account");
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    return error;
  }
}

// refesh token
export async function refesh_token() {
  try {
    const res = await fetch(`${apiURi}/refesh_token`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return error;
  }
}

// thong tin nha ban hang
export async function infor_shop(id?: string | number) {
  try {
    const res = await fetch(`${apiURi}/inforshop/${id}`);
    if (!res.ok) {
      return res;
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    return error;
  }
}

// cap nhat thong tin tai khoan
export async function update_profile_account(data: any) {
  try {
    const res = await fetch(`${apiURi}/account/update`, {
      method: "PATCH",
      body: data,
      credentials: "include",
    });
    return res;
  } catch (error) {
    return error;
  }
}

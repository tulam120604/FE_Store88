const apiURi = "http://localhost:2000/v1";

export async function add_order(item: any) {
  try {
    const res = await fetch(`${apiURi}/order/add`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(item),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function get_order_user(
  page: number,
  limit: number,
  status_item_order?: string | number
) {
  try {
    let uri = `${apiURi}/order_by_user?_page=${page}&_limit=${limit}`;
    if (status_item_order) {
      uri += `&_status_item=${status_item_order}`;
    }
    const res = await fetch(uri, {
      method: "get",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// list order admin and seller
export async function get_all_order() {
  try {
    let uri = `${apiURi}/list_orders`;
    const res = await fetch(uri, {
      method: "get",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function update_status_order(dataClient: {
  item: any;
  action?: string;
}) {
  try {
    const res = await fetch(`${apiURi}/order/update_status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dataClient.item),
    });
    if (!res.ok) {
      if (dataClient?.action !== "admin") {
        return "Cập nhật đơn hàng không thành công!";
      } else {
        return "Hủy đơn hàng không thành công!";
      }
    } else {
      if (dataClient?.action === "admin") {
        return "Cập nhật trạng thái đơn hàng thành công!";
      } else {
        if (+dataClient?.item?.status_item_order !== 7) {
          return "Hủy đơn hàng thành công!";
        }
      }
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function restore_buy_order(dataClient: any) {
  try {
    const res = await fetch(`${apiURi}/order/buy_again`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dataClient),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

// feedback detail item in order
export async function get_item_order(id_item: string | number) {
  try {
    const res = await fetch(`${apiURi}/order/feedback/${id_item}`);
    if (!res.ok) {
      return "Có lỗi xảy ra, vui lòng kiểm tra lại!";
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function detail_order(id: string) {
  try {
    let uri = `${apiURi}/detail_order?id=${id}`;
    const res = await fetch(uri, {
      method: "get",
      credentials: "include",
    });
    if (!res.ok) {
      return res;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

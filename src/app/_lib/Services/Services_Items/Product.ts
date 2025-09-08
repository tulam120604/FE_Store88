// PRODUCTS
const apiURi = process.env.NEXT_PUBLIC_DB_HOST;

// list item client
export async function list_product_client(
  page: number,
  count_item: number,
  bestSeller?: any,
  seller?: any
) {
  try {
    let uri = `${apiURi}/list_products/client?_page=${page}&_limit=${count_item}`;
    if (bestSeller) {
      uri += `&_bestseller=${bestSeller}`;
    }
    let res = await fetch(uri);
    if (seller) {
      res = await fetch(uri, {
        method: "get",
        headers: {
          id_user_seller: seller,
        },
      });
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// limit item
export async function list_product_with_limit(countItem: number) {
  try {
    const res = await fetch(
      `${apiURi}/list_products/client?&_limit=${countItem}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    const message = {
      error,
      status: 500,
    };
    return message;
  }
}

// detail
export async function view_detail_product(id: number | string) {
  try {
    const res = await fetch(`${apiURi}/products/${id}`);
    const data = await res.json();
    return data?.data;
  } catch (error) {
    return error;
  }
}

// detail dashboard
export async function view_detail_product_dashboard(id: number | string) {
  try {
    const res = await fetch(`${apiURi}/products/dashboard/${id}`);
    const data = await res.json();
    return data?.data;
  } catch (error) {
    return error;
  }
}

// list items dashboard
export async function list_product_dashboard(page: number, limit_item: number) {
  try {
    let uri = `${apiURi}/list_products/admin?_page=${page}&_limit=${limit_item}`;
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

// add
export async function create_product(item: any) {
  try {
    const res = await fetch(`${apiURi}/create_product`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// xoa mem
export async function hidden_or_restore_product(item: any) {
  try {
    const res = await fetch(
      `${apiURi}/products/admin/${item.path}/${item.id_item}`,
      {
        method: item.method,
        credentials: "include",
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

// recycle items adminstration
export async function list_product_in_recycle(
  page: Number,
  limit_item?: Number
) {
  try {
    let uri = `${apiURi}/products/admin/trash?_page=${page}&_limit=${limit_item}`;
    const res = await fetch(uri, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

// xoa item vinh vien ( no restore )
// export async function delete_product_permanent(dataClient: any) {
//   console.log(dataClient?.id_item);
//   try {
//     let uri = `${apiURi}/products/destroy_item/${dataClient.id_item}`;
//     const res = await fetch(uri, {
//       method: "delete",
//       credentials: "include",
//     });
//     if (!res.ok) {
//       toast.error(`Xóa sản phẩm mã ${dataClient.id_item} thất bại!`, {
//         autoClose: 500,
//       });
//       console.warn("Call data failer");
//     } else {
//       toast.success(`Xóa sản phẩm mã ${dataClient.id_item} thành công!`, {
//         autoClose: 500,
//       });
//     }
//     console.log("Restore Success !");
//   } catch (error) {
//     return error;
//   }
// }

// update
export async function update_product_dashboard(dataClient?: any) {
  try {
    let uri = `${apiURi}/products/admin/${dataClient?._id}`;
    const res = await fetch(uri, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataClient),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get item by category :
export async function list_product_by_category(
  page?: any,
  id_category?: any,
  id_current_product?: any
) {
  try {
    let uri = `${apiURi}/products/category/${id_category}`;
    if (page) {
      uri += `?_page=${page}`;
    }
    let res = await fetch(uri);
    if (id_current_product) {
      res = await fetch(uri, {
        method: "get",
        headers: {
          id_current_product: id_current_product,
        },
      });
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// search
export async function search_item(item?: any) {
  try {
    let uri = `${apiURi}/products/search`;
    if (item) {
      uri += `?&_search=${item}`;
    }
    const res = await fetch(uri);
    const { data } = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function list_product_search(item?: any) {
  try {
    let uri = `${apiURi}/products/list_product_search`;
    if (item) {
      uri += `?&_search=${item}`;
    }
    const res = await fetch(uri);
    const { data } = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}


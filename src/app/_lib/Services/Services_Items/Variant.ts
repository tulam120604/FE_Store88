const apiURi = process.env.NEXT_PUBLIC_API;

//create
export async function create_variant(item: any) {
  try {
    const res = await fetch(`${apiURi}/product/variant/create`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variant: item,
      }),
    });
    if (!res.ok) {
      return res;
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

// update
export async function update_variant(item: any) {
  try {
    const res = await fetch(`${apiURi}/product/variant/update`, {
      method: "put",
      credentials: "include",
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      return res;
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

// remove
export async function remove_variant(id: any) {
  try {
    const res = await fetch(`${apiURi}/product/variant/remove/${id}`, {
      method: "delete",
      credentials: "include",
    });
    if (!res.ok) {
      return res;
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

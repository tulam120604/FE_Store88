const apiURi = process.env.NEXT_PUBLIC_API;

export async function caculate_revenue() {
  try {
    const res = await fetch(`${apiURi}/analytics/caculate_revenue`, {
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

// count product, user, category,...
export async function summary() {
  try {
    const res = await fetch(`${apiURi}/analytics/summary`, {
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

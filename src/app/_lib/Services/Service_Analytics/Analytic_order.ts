const apiURi = process.env.NEXT_PUBLIC_API;

export async function analytic_orders(year: number | undefined) {
  try {
    const res = await fetch(`${apiURi}/analytics/order?year=${year}`, {
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

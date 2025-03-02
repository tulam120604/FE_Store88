const apiURi = process.env.NEXT_PUBLIC_DB_HOST;

export async function caculate_revenue () {
    try {
        const res = await fetch (`${apiURi}/analytics/caculate_revenue`, {
            credentials : 'include'
        });
        if (!res.ok){
            return res
        }
        const result = await res.json();
        return result
    } catch (error) {
        return error
    }
}
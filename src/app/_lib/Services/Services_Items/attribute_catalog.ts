const apiURi = process.env.NEXT_PUBLIC_DB_HOST;

// get attribute by item
export async function get_attributeCatalog_by_item(id_item?: string | number) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/${id_item}`);
        if (!res.ok) {
            return res
        }
        const { data_attribute } = await res.json();
        return data_attribute
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

// get attribute by seller
export async function get_attributeCatalog_by_seller(id_seller?: string | number) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/seller/${id_seller}`);
        if (!res.ok) {
            return res;
        }
        const { data } = await res.json();
        return data
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}


export async function create_attributesCatalog(value: any) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        return res
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

export async function create_value_attributeCatalog(value: any) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/create_value`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        return res
    } catch (error) {
        return error
    }
}

export async function remove_value_varriant_attributeCatalog(value: any) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/remove/${value?.id_account}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        console.log(res)
        return res
    } catch (error) {
        return error
    }
}

export async function update_attribute_catalog(value: { key: string | number, name_varriant: string | number }) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/update/${value?.key}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        return res
    } catch (error) {
        return error
    }
}
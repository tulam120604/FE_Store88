export function filter_positive_Stock_Item(data_checked_true: any) {
    const positive_Stock_Item: any = [];
    data_checked_true?.map((value: any) => {
        if (value?.product_id?.variant?.variants) {
            const attribute = value?.product_id?.variant?.variants?.find((data: any) => data?.attribute === value?.name_varriant);
            const value_variant = attribute?.value_variants?.find((size: any) => (size?.name_variant?.trim() ? size?.name_variant : undefined) === value?.value_varriant);
            if (value?.size_attribute_item && value?.size_attribute_item === value_variant?.name_variant && value_variant?.stock_variant > 0) {
                positive_Stock_Item.push(value)
            }
            else {
                if (value_variant?.stock_variant > 0) {
                    positive_Stock_Item.push(value)
                }
            }
        }
        else {
            if (value?.product_id?.stock > 0) {
                positive_Stock_Item.push(value)
            }
        }
    });
    return positive_Stock_Item
}
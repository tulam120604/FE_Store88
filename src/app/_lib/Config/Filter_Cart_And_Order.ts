export function filter_positive_Stock_Item(data_checked_true: any) {
    const positive_Stock_Item: any = [];
    data_checked_true?.map((value: any) => {
        if (value?.product_id?.attributes?.varriants) {
            const color = value?.product_id?.attributes?.varriants?.find((data: any) => data?.color_item === value?.color_item);
            const size = color?.size_item?.find((size: any) => (size?.name_size?.trim() ? size?.name_size : undefined) === value?.size_attribute_item);
            if (value?.size_attribute_item && value?.size_attribute_item === size?.name_size && size?.stock_item > 0) {
                positive_Stock_Item.push(value)
            }
            else {
                if (size?.stock_item > 0) {
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
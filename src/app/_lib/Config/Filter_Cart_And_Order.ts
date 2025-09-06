export function loc_san_pham_trong_kho_lon_hon_0(data_checked_true: any[]) {
  const positive_Stock_Item: any[] = [];

  data_checked_true?.forEach((value: any) => {
    const product = value?.product_id;

    // --- Sản phẩm không có biến thể ---
    if (!product?.variant) {
      positive_Stock_Item.push(value);
      return; // có stock rồi thì khỏi check tiếp
    }

    // --- Sản phẩm có biến thể ---
    const variants = product?.variant?.variants;
    if (variants?.length) {
      const attribute = variants.find(
        (data: any) => data?.attribute === value?.name_varriant
      );

      const value_variant = attribute?.value_variants?.find(
        (size: any) => size?.name_variant?.trim() === value?.value_varriant
      );

      if (value_variant?.stock_variant > 0) {
        positive_Stock_Item.push(value);
      }
    }
  });

  return positive_Stock_Item;
}

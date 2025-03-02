"use client";

import {
  view_detail_product_dashboard,
  list_product_dashboard,
  list_product_in_recycle,
} from "../../Services/Services_Items/Product";
import {
  view_detail_category,
  list_category,
} from "../../Services/Services_Items/Category";
import { useQuery } from "@tanstack/react-query";

// danh muc
export function Query_Category(id?: string | number) {
  const key = id ? ["Category_Key", id] : ["Category_Key"];
  const { data, ...rest } = useQuery({
    queryKey: key,
    queryFn: async () => {
      return id ? await view_detail_category(id) : await list_category();
    },
  });
  return { data, ...rest };
}

// get list item admin
export function Query_List_Items_Dashboard(page: number, limit_item: number) {
  const { data, ...rest } = useQuery({
    queryKey: ["Product_Key", page],
    queryFn: async () => {
      return await list_product_dashboard(page, limit_item);
    },
  });
  return { data, ...rest };
}

// Chi tiet san pham
export function Detail_Item_Dashboard(id: string | number) {
  const { data, ...rest } = useQuery({
    queryKey: ["Product_Key", id],
    queryFn: () => view_detail_product_dashboard(id),
  });
  return { data, ...rest };
}

// lay danh sach san pham trong thung rac
export function Query_Recycle_Items_Admin(page: number, limit_item?: number) {
  const { data, ...rest } = useQuery({
    queryKey: ["Product_Key"],
    queryFn: async () => {
      return await list_product_in_recycle(page, limit_item);
    },
  });
  return { data, ...rest };
}

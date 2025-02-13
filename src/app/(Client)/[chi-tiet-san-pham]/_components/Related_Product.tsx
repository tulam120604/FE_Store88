import List_Products from "@/src/app/_Components/Products/List_Products";
import { GET_item_by_category } from "@/src/app/_lib/Services/Services_Items/Product";
import { unstable_noStore as noStore } from "next/cache";

const Related_Product =  async ({dataProps} : any) => {
  noStore();
  const data = await GET_item_by_category('',dataProps)
  return (
    <List_Products data={data?.data?.docs}/>
  )
}

export default Related_Product
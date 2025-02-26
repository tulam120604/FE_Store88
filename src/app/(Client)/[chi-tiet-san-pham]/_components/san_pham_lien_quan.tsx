import List_Products from "@/src/app/_Components/Products/List_Products";
import { list_product_by_category } from "@/src/app/_lib/Services/Services_Items/Product";
import { unstable_noStore as noStore } from "next/cache";

const San_pham_lien_quan = async ({ dataProps }: any) => {
  noStore();
  const data = await list_product_by_category(
    "",
    dataProps?.id_category,
    dataProps?.id_current_product
  );
  return (
    <div className="mt-4">
      <List_Products data={data?.data?.docs} />
    </div>
  );
};

export default San_pham_lien_quan;

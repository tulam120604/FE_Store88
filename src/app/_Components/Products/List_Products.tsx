import Product_Item from "./Product_Item"

const List_Products = ({ data }: any) => {
    // const isClient = typeof window !== 'undefined';
    // console.log(isClient);
    return (
        <div className="grid py-4 lg:grid-cols-6 md:grid-cols-3 gap-x-4 grid-cols-2 justify-between lg:gap-y-8 mb:gap-y-[29px]">
            {Array.isArray(data) &&
                data?.map((item: any) => {
                    return (
                        <Product_Item key={item._id} dataProps={item} />
                    )
                })
            }
        </div>
    )
}

export default List_Products
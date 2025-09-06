import Product_Item from "./Product_Item"

const List_Products = ({ data, cols }: any) => {
    // const isClient = typeof window !== 'undefined';
    // console.log(isClient);
    return (
        <div className={`grid lg:grid-cols-${cols} md:grid-cols-3 grid-cols-2 justify-between gap-y-4 gap-x-1`}>
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
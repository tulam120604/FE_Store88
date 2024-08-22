/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

const Product_Item = ({ dataProps }: any) => {
    let min;
    let max;
    if (dataProps?.attributes) {
        min = dataProps?.attributes?.varriants[0]?.size_item[0].price_attribute;
        max = dataProps?.attributes?.varriants[0]?.size_item[0].price_attribute;
        for (let i of dataProps?.attributes?.varriants) {
            for (let j of i.size_item) {
                if (j.price_attribute < min) {
                    min = j.price_attribute;
                }
                if (j.price_attribute > max) {
                    max = j.price_attribute;
                }
            }
        }
    }
    return (
        <Link href={`/${dataProps?._id}`} className="flex flex-col w-full snap-center border-[1.5px] hover:shadow-xl bg-white border-none relative duration-150 cursor-pointer h-full rounded overflow-hidden">
            {/* Image */}
            <div className="relative group w-full lg:h-[200px] sm:h-[160px] h-[120px] bg-[#F4F4F4] overflow-hidden rounded grid place-items-center">
                <Image loading='lazy' width={300} height={300} className="w-full h-full cursor-pointer" src={dataProps?.gallery[0]} alt='Loading...' />
                {/* <section className="absolute top-0 lg:text-base sm:text-sm text-xs cursor-default left-0 bg-[#F2BC1B] px-3 lg:py-1 rounded py-0.5 text-white">- 20%
                </section> */}
            </div>
            {/* about */}
            <div className="w-full p-4 flex flex-col gap-y-1.5 items-start h-[120px] justify-between">
                <strong className="lg:text-base text-start w-full text-sm line-clamp-2 font-normal text-[#1A1E26]">{dataProps.short_name}</strong>
                <div className="flex items-center gap-x-2 w-full">
                    {
                        dataProps?.price_product ?
                            <span className="text-[#EB2606]">{(dataProps?.price_product)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> :
                            <div className="flex items-center gap-x-1 line-clamp-2">
                                {
                                    (min === max) ?
                                        <span className="text-[#EB2606]">{(max)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> :
                                        <>
                                            <span className="text-[#EB2606]">{(min)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> -
                                            <span className="text-[#EB2606]">{(max)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                        </>
                                }
                            </div>
                    }
                    {/* <Btn_Add_Cart data_Btn={dataProps?._id} /> */}
                </div>
            </div>
        </Link>
    )
}

export default Product_Item
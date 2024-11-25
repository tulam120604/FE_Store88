/* eslint-disable @next/next/no-img-element */
import { convert_Slug } from "@/src/app/util/Slug";
import Image from "next/image";
import Link from "next/link";

const Product_Item = ({ dataProps }: any) => {
    let min;
    let max;
    if (dataProps?.variant) {
        min = dataProps?.variant?.variants[0]?.value_variants[0].price_variant;
        max = dataProps?.variant?.variants[0]?.value_variants[0].price_variant;
        for (let i of dataProps?.variant?.variants) {
            for (let j of i.value_variants) {
                if (j.price_variant < min) {
                    min = j.price_variant;
                }
                if (j.price_variant > max) {
                    max = j.price_variant;
                }
            }
        }
    }
    return (
        <Link href={`/${convert_Slug(dataProps?.short_name)}.html?p=${dataProps?._id}`} className="flex flex-col border w-full 
        snap-center rounded-lg hover:shadow-[0_5px_20px_-5px_rgba(0,0,0,0.3)] bg-white relative duration-150 cursor-pointer h-full overflow-hidden">
            {/* Image */}
            <div className="relative group w-full lg:h-[200px] sm:h-[160px] h-[120px] overflow-hidden rounded grid place-items-center">
                <Image loading='lazy' width={300} height={300} className="w-full h-full cursor-pointer object-contain" src={dataProps?.gallery[0]} alt='store88' />
                {/* <section className="absolute top-0 lg:text-base sm:text-sm text-xs cursor-default left-0 bg-[#F2BC1B] px-3 lg:py-1 rounded py-0.5 text-white">- 20%
                </section> */}
            </div>
            {/* about */}
            <div className="w-full py-4 px-2 flex flex-col gap-y-1.5 items-start h-[120px] justify-between">
                <strong className="text-start w-full text-sm line-clamp-2 font-normal text-[#1A1E26]">{dataProps.short_name}</strong>
                <div className="flex items-center gap-x-2 w-full">
                    {
                        dataProps?.price_product ?
                            <span className="text-[#EB2606]">{(dataProps?.price_product)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> :
                            <div className="flex items-center gap-x-1 line-clamp-2">
                                {
                                    (min === max) ?
                                        <span className="text-[#EB2606]">{(max)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> :
                                        <span className="text-[#EB2606]">{(min)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                }
                            </div>
                    }
                </div>
            </div>
        </Link>
    )
}

export default Product_Item
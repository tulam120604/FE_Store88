import { Heart } from "lucide-react";
import Quantity_Items_Detail from "./quantity_Items";

const Infor_Detail_Product = ({ dataProps }: any) => {
  // const isClient = typeof window !== 'undefined';
  // console.log(isClient);
  return (
    <div className="w-full *:w-full lg:mt-0 mb:mt-[42px] bg-white lg:px-10 px-2 py-2 rounded">
      <div className="flex flex-col gap-y-2 lg:gap-y-6">
        {/* row 1 */}
        <div className="flex flex-col lg:gap-y-4 gap-y-2 ">
          <strong className="lg:text-2xl lg:mt-[1px] mb:mt-3.5 mb:text-xl lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]">{dataProps?.data?.short_name}</strong>
          <section className="lg:w-[163px] mb:w-[157px] mb:mt-[8px] lg:mt-0 h-[21px] *:lg:text-sm *:mb:text-xs flex justify-between items-start">
            <div className="flex items-start lg:gap-x-0 mb:gap-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <strong>4.6/5</strong>
            </div>
            <div className="flex gap-x-2">
              <strong>( {dataProps?.data_feedback?.data_feedback ? dataProps?.data_feedback?.data_feedback?.totalDocs : 0} )</strong>
              <span className="text-gray-700">Đánh giá</span>
            </div>
          </section>
          <div className="flex items-center gap-x-2">
            <Heart className="text-red-500 cursor-pointer h-5" />
            <span>Thêm vào yêu thích</span>
          </div>
        </div>
        {/* quantity */}
        <Quantity_Items_Detail data_Item_Detail={dataProps?.data} />
        {/* different */}
        <span className="flex items-center gap-x-10 text-[#717378]">Xuất xứ<p className="text-[#060709]">:&nbsp;&nbsp;&nbsp; Việt Nam</p></span>
      </div>
    </div>
  )
}

export default Infor_Detail_Product
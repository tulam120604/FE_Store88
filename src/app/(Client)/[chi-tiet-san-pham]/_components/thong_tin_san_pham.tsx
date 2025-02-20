import So_luong_san_pham from "./so_luong_san_pham";
import Them_vao_san_pham_yeu_thich from "./them_vao_yeu_thich";

const Thong_tin_san_pham = ({ dataProps }: any) => {
  // const isClient = typeof window !== 'undefined';
  // console.log(isClient);
  return (
    <div className="w-full *:w-full lg:mt-0 mb:mt-[42px] bg-white lg:px-10 px-2 py-2">
      <div className="flex flex-col gap-y-2 lg:gap-y-6">
        {/* row 1 */}
        <div className="flex flex-col lg:gap-y-4 gap-y-2 text-gray-700">
          <span className="lg:text-2xl lg:mt-[1px] mb:mt-3.5 mb:text-xl lg:tracking-[-1.2px] lg:leading-[38.4px]">
            {dataProps?.data?.short_name}
          </span>
          <section className="mb:mt-[8px] lg:mt-0 *:lg:text-sm *:mb:text-xs flex lg:gap-x-4 gap-x-2 items-start">
            <div className="flex items-center gap-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>4.6/5</span>
            </div>
            <div className="flex gap-x-2">
              <span>({dataProps?.data_feedback?.data_feedback ? dataProps?.data_feedback?.data_feedback?.totalDocs : 0})</span>
              <span>Đánh giá</span>
            </div>
            <div className="flex gap-x-2">
              <span>({dataProps?.data?.sale_quantity ? dataProps?.data?.sale_quantity : 0})</span>
              <span>Đã bán</span>
            </div>
          </section>
          <Them_vao_san_pham_yeu_thich dataProps={dataProps?.data?._id} />
        </div>
        {/* quantity */}
        <So_luong_san_pham data_Item_Detail={dataProps?.data} />
        {/* different */}
        <span className="flex items-center gap-x-10 text-[#717378]">Xuất xứ<p className="text-[#060709]">:&nbsp;&nbsp;&nbsp; Việt Nam</p></span>
      </div>
    </div>
  )
}

export default Thong_tin_san_pham
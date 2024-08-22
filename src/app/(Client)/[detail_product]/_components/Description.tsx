
import Image from 'next/image'
import React from 'react'
import { Button } from '../../../_Components/ui/Shadcn/button'
import { get_feedBack_in_item } from '../../../_lib/Services/Service_Feedback/Feedback'

const Description = async ({ dataProps }: any) => {
    const data = await get_feedBack_in_item(dataProps?._id);
    // console.log(data?.data_feedback?.docs)
    const formattedDescription = dataProps?.des_product.replace(/\n/g, '<br />');
    return (
        <>
            {/* description */}
            <div className="flex flex-col rounded max-w-[1440px]">
                {/* menu description */}
                <div className='p-4 rounded bg-white'>
                    <span className="text-xl">Mô tả</span>
                    {/* text description */}
                    <div dangerouslySetInnerHTML={{ __html: formattedDescription }} className="show_description my-4">
                    </div>
                </div>
                {/* detail comment */}
                <section className="show_review mt-8 rounded p-4 bg-white">
                    <span className="text-xl flex gap-x-2">Đánh giá
                        <p>({data?.data_feedback ? data?.data_feedback?.totalDocs : 0})</p>
                    </span>
                    <div className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 py-4">
                        {/* content comment 1 */}
                        {
                            data?.data_feedback &&
                            data?.data_feedback?.docs?.map((item: any) => (
                                <div key={item?._id} className="border-t lg:p-6 mb:p-5">
                                    {/* user and time comment */}
                                    <div className="flex items-center *:flex *:items-center gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                                        <Image width={36} height={36} src="/Images/vikki_user_icon.png" alt='' />
                                        <div className='w-full flex items-center justify-between'>
                                            <div>
                                                <div className="flex items-center text-base text-[#1A1E26] gap-x-4 whitespace-nowrap">
                                                    <span> {item?.user_id?.user_name}</span> &#10073;
                                                    <span className='flex gap-x-2'><p>{item?.item_order?.color_item}</p>
                                                        <p>{item?.item_order?.size_attribute_item}</p></span>
                                                </div>
                                                <span className="text-sm font-light block lg:hidden mt-1">{item?.createdAt?.slice(0, 10)}</span>
                                            </div>
                                            <span className="text-sm font-light hidden lg:block">{item?.createdAt?.slice(0, 10)}</span>
                                        </div>

                                    </div>
                                    {/* text comment */}
                                    <p className="text-[#1A1E26] text-base">{item?.content_feedback}</p>
                                </div>

                            ))
                        }
                        {/*btn show more */}
                        {
                            data?.data_feedback && (data?.data_feedback?.totalDocs > 0) ?
                                (data?.data_feedback?.totalDocs > 10 &&
                                    <div className="flex justify-center my-1">
                                        <Button>Xem thêm</Button>
                                    </div>) :
                                <span className='text-center text-base'>Chưa có đánh giá nào!</span>
                        }

                    </div>
                </section>
            </div>
        </>
    )
}

export default Description
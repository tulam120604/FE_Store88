'use client'

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/src/app/_Components/ui/pagination'
import { Button } from '@/src/app/_Components/ui/Shadcn/button'
import { useRouter } from 'next/navigation'
import React from 'react'

interface dataProps {
    totalPages: number,
    page: number
}

const Paginate_order = ({ totalPages, page }: dataProps) => {
    const routing = useRouter();
    function changePage(item: string) {
        switch (item) {
            case 'back':
                if (page > 1) {
                    const pre = page - 1
                    routing.push(`?_page=${pre}`)
                }
                return;
            case 'next':
                if (page < totalPages) {
                    const next = page + 1;
                    routing.push(`?_page=${next}`)
                }
                return
            default: return
        }
    }
    function handlePage(item: number) {
        routing.push(`?_page=${item}`)
    }
    return (
        <Pagination>
            {
                totalPages > 1 &&
                <PaginationContent>
                    <Button className={`${page === 1 && 'cursor-not-allowed'} bg-white hover:bg-[#F1F5F9] text-gray-800`} onClick={() => changePage('back')}>&#10094;</Button>
                    {
                        Array.from({ length: totalPages }, (_: any, i: any) =>
                            <PaginationItem className='cursor-pointer' key={i}>
                                <PaginationLink className={`${i + 1 === page && 'border border-gray-400'} hover:border`} onClick={() => handlePage(i + 1)}>
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                    {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                    <Button className={`${page === totalPages && 'cursor-not-allowed'} bg-white hover:bg-[#F1F5F9] text-gray-800`} onClick={() => changePage('next')}>&#10095;</Button>
                </PaginationContent>
            }

        </Pagination>
    )
}

export default Paginate_order
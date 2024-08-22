'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/src/app/_Components/ui/pagination';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import { useRouter } from 'next/navigation';
import React from 'react'

const Paginate_item = ({ totalPages, page }: any) => {
    const routing = useRouter();
    function handlePage(action: string) {
        switch (action) {
            case 'pre':
                if (page > 1) {
                    const pre = page - 1
                    routing.push(`?_page=${pre}`);
                }
                return;
            case 'next':
                if (page <= totalPages) {
                    const pre = page + 1
                    routing.push(`?_page=${pre}`);
                }
                return;
            default: return;
        }

    }
    function changePage(i: any) {
        routing.push(`?_page=${i}`);
    }
    return (
        <Pagination>
            {
                totalPages > 1 &&
                <PaginationContent>
                    <Button className={`${page === 1 && 'cursor-not-allowed'} bg-white hover:bg-[#F1F5F9] text-gray-800`} onClick={() => handlePage('pre')} >&#10094;</Button>
                    {
                        Array.from({ length: totalPages }, (_: any, i) =>
                            <PaginationItem className='cursor-pointer' key={i}>
                                <PaginationLink className={`${i + 1 === page && 'border border-gray-400'}`} onClick={() => changePage(i + 1)}>
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                    {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                    <Button className={`${page === totalPages && 'cursor-not-allowed'} bg-white hover:bg-[#F1F5F9] text-gray-800`} onClick={() => handlePage('next')} >&#10095;</Button>
                </PaginationContent>
            }

        </Pagination>
    )
}

export default Paginate_item
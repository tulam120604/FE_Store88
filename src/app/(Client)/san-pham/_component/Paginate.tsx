'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/src/app/_Components/ui/pagination';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const Paginate_item = ({ totalPages, page }: any) => {
    const routing = useRouter();

    // Function to handle page navigation
    function handlePage(action: string) {
        switch (action) {
            case 'pre':
                if (page > 1) {
                    const pre = page - 1;
                    routing.push(`?_page=${pre}`);
                }
                return;
            case 'next':
                if (page < totalPages) {
                    const next = page + 1;
                    routing.push(`?_page=${next}`);
                }
                return;
            default:
                return;
        }
    }

    // Function to change page
    function changePage(i: any) {
        routing.push(`?_page=${i}`);
    }

    // Calculate the range of pages to show
    const pagesToShow = 4;
    const pageList = [];
    let startPage = Math.max(1, page - 1); // Start page (1 before current page)
    let endPage = Math.min(totalPages, page + 3); // End page (3 pages after current page)

    // Adjust the range if near the start or end
    if (startPage <= 1) {
        endPage = Math.min(pagesToShow, totalPages); // Show only the first few pages if near the start
    } else if (endPage >= totalPages) {
        startPage = Math.max(totalPages - pagesToShow + 1, 1); // Show last few pages if near the end
    }

    // Generate list of pages to show
    for (let i = startPage; i <= endPage; i++) {
        pageList.push(i);
    }

    return (
        <Pagination>
            {totalPages > 1 && (
                <PaginationContent>
                    <Button
                        className={`${page === 1 && 'cursor-not-allowed'} bg-white hover:bg-[#F1F5F9] text-gray-800`}
                        onClick={() => handlePage('pre')}
                    >
                        &#10094;
                    </Button>

                    {/* Previous page ellipsis */}
                    {startPage > 2 && (
                        <>
                            <PaginationItem className="cursor-pointer">
                                <PaginationLink onClick={() => changePage(1)}>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="cursor-pointer">
                                <PaginationLink>...</PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    {/* Show pages */}
                    {pageList.map((pageNumber) => (
                        <PaginationItem className="cursor-pointer" key={pageNumber}>
                            <PaginationLink
                                className={`${pageNumber === page && 'border border-gray-400'}`}
                                onClick={() => changePage(pageNumber)}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Next page ellipsis */}
                    {endPage < totalPages - 1 && (
                        <>
                            <PaginationItem className="cursor-pointer">
                                <PaginationLink>...</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="cursor-pointer">
                                <PaginationLink onClick={() => changePage(totalPages)}>{totalPages}</PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    <Button
                        className={`${page === totalPages && 'cursor-not-allowed'} bg-white hover:bg-[#F1F5F9] text-gray-800`}
                        onClick={() => handlePage('next')}
                    >
                        &#10095;
                    </Button>
                </PaginationContent>
            )}
        </Pagination>
    );
};

export default Paginate_item;

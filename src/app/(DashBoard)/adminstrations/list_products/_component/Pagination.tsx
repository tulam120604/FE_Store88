import { Button } from '@/src/app/_Components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/src/app/_Components/ui/pagination';
import { useRouter } from 'next/navigation';


export default function Pagination_Component({ totalPages, currentPage }: any) {
    const routing = useRouter();
    function handle_page(i: number) {
        routing.push(`/adminstrations/list_products?_page=${i}`);
    }
    function changePage(action: string) {
        switch (action) {
            case 'pre':
                if (currentPage > 1) {
                    routing.push(`/adminstrations/list_products?_page=${currentPage - 1}`);
                }
                return;
            case 'next':
                if (currentPage <= totalPages) {
                    routing.push(`/adminstrations/list_products?_page=${currentPage + 1}`);
                }
                return;
            default: return
        }
    }
    return (
        <Pagination>
            <PaginationContent>
                <Button className={`${currentPage === 1 && 'cursor-not-allowed'} bg-white border hover:bg-[#F1F5F9] text-gray-900`} onClick={() => changePage('pre')}>&#10094;</Button>
                {
                    Array.from({ length: totalPages }, (_: any, i) =>
                        <PaginationItem className='cursor-pointer text-gray-900 border rounded' key={i}>
                            <PaginationLink className={`${(i + 1) === currentPage && 'border border-gray-500'}`} onClick={() => handle_page(i + 1)}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )
                }
                {/* <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem> */}
                <Button className={`${currentPage === totalPages && 'cursor-not-allowed'} bg-white hover:bg-[#F1F5F9] border text-gray-900`} onClick={() => changePage('next')}>&#10095;</Button>
            </PaginationContent>
        </Pagination>
    )
}

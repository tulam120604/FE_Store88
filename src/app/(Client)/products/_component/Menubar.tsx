'use client'

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/src/app/_Components/ui/menubar";
import { useRouter, useSearchParams } from "next/navigation";

export default function Menu_bar() {
    const routing = useRouter();
    const searchParams = useSearchParams();
    const query_params = (searchParams.get('_bestseller') === 'true')
    const text_menu = query_params ? 'Sản phẩm bán chạy' : 'Tất cả sản phẩm';

    function filter_item(action: string) {
        switch (action) {
            case 'all':
                routing.push(`/products`);
                return;
            case 'best_seller':
                routing.push(`?_page=1&_bestseller=true`);
                return;
            case 'price_larger_to_small':
                routing.push(`?_page=1`);
                return;
            case 'price_small_to_larger':
                routing.push(`?_page=1`);
                return;
            default:
                return
        }
    }

    return (
        <Menubar className="w-[165px]">
            <MenubarMenu>
                <MenubarTrigger className="whitespace-nowrap mx-auto">
                    {text_menu}
                </MenubarTrigger>
                <MenubarContent className="z-[8]">
                    {
                        !query_params &&
                        <MenubarItem onClick={() => filter_item('best_seller')}>
                            Sản phẩm bán chạy
                        </MenubarItem>
                    }
                    {
                        query_params &&
                        <MenubarItem onClick={() => filter_item('all')}>Tất cả sản phẩm</MenubarItem>
                    }
                    <MenubarItem onClick={() => filter_item('price_larger_to_small')}>Giá: Cao đến thấp</MenubarItem>
                    <MenubarItem onClick={() => filter_item('price_small_to_larger')}>Giá: Thấp đến cao</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

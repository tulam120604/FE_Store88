import React from 'react'
import type { Metadata } from 'next';
import Cart from './_components/page.cart';

export const metadata: Metadata = {
    title: 'Giỏ hàng'
}
export default function page() {
    return (
        <Cart />
    )
}

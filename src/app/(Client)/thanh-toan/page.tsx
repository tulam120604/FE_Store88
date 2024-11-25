import React from 'react';
import Page_checkout from './_components/page.checkout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thanh toán'
}
export default function Page() {
    return (
        <Page_checkout />
    )
}

import React from 'react';
import Page_infor from './page.infor';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thông tin tài khoản'
}

export default function Page() {
    return (
        <Page_infor />
    )
}

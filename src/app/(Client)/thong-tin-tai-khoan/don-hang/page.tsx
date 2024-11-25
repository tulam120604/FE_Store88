import React from 'react';
import Page_order from './_component/page.order';
import type { Metadata } from 'next';

export const metadata : Metadata = {
    title : 'Đơn hàng của bạn'
}

export default function Page() {
  return (
    <Page_order/>
  )
}

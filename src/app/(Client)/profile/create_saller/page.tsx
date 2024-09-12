import React from 'react';
import Page_create_seller from '../feedback/page';
import type { Metadata } from 'next';

export const metadata : Metadata = {
    title : 'Đăng kí nhà phân phối'
}

export default function Page() {
  return (
    <Page_create_seller/>
  )
}

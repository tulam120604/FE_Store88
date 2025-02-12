import React from 'react';
import type { Metadata } from 'next';
import Page_create_seller from './page.create_seller';

export const metadata : Metadata = {
    title : 'Đăng kí nhà phân phối'
}

export default function Page() {
  return (
    <Page_create_seller/>
  )
}

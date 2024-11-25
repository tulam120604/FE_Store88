import React from 'react';
import Page_favorite from './page.favorite';
import type { Metadata } from 'next';

export const metadata : Metadata = {
    title : "Sản phẩm yêu thích"
}

export default function Page() {
  return (
    <Page_favorite/>
  )
}

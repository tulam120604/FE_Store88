import React from 'react';
import Page_notification from './page.notification';
import type { Metadata } from 'next';

export const metadata : Metadata = {
    title : 'Thông báo'
}

export default function Page() {
  return (
    <Page_notification/>
  )
}

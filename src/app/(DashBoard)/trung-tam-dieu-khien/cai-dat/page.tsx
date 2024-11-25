'use client';

import { Suspense } from "react"
import { Auth_Wrap_Admins } from "../_Auth_Wrapper/Page";

const Setting_Admin = () => {
  return (
    <Suspense fallback={'Loading'}>
      <Auth_Wrap_Admins>
        <div>page</div>
      </Auth_Wrap_Admins>
    </Suspense>
  )
}

export default Setting_Admin
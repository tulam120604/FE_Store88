'use client';

import { Suspense } from "react"
import { Auth_Provider } from "../_Auth_Wrapper/Page";

const Setting_Admin = () => {
  return (
    <Suspense fallback={'Loading'}>
      <Auth_Provider>
        <div>page</div>
      </Auth_Provider>
    </Suspense>
  )
}

export default Setting_Admin
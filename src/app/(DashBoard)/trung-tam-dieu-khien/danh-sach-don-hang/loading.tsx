'use client';

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import React from 'react';

const Loading = () => {
  return (
    <div className='w-full min-h-screen grid place-items-center'>
      <Loading_Dots/>
    </div>
  )
}

export default Loading
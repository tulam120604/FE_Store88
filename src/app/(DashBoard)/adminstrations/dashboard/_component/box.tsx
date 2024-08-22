'use client'

import React from 'react'

const Box = ({dataProps} : any) => {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex justify-between items-center'>
        <span>{dataProps?.text} </span>
        <div className='*:h-4'>
          {dataProps?.icon}
        </div>
      </div>
        <strong className='text-xl'>{dataProps?.number}</strong>
    </div>
  )
}

export default Box
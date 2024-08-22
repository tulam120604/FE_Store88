import React from 'react'

const Loading_Dots = () => {
  return (
    <div className='w-full h-full flex items-center justify-center gap-x-1 *:w-3.5 *:h-3.5 *:rounded-[50%] *:bg-orange-500'>
        <div className='dot_1'></div>
        <div className='dot_2'></div>
        <div className='dot_3'></div>
        <div className='dot_4'></div>
        <div className='dot_5'></div>
    </div>
  )
}

export default Loading_Dots
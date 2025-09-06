import React from 'react'
import Loading_Dots from './Loading_Dots'

export default function Loading_Overlay() {
    return (
        <div className='w-screen h-screen bg-[#3333338e] fixed top-0 left-0 z-[10000] overflow-hidden'>
            <Loading_Dots />
        </div>
    )
}

import React from 'react'

const Feedback = () => {
  return (
    <div className='fixed lg:w-[600px] w-[90vw] h-[200px] border rounded'>
        <form>
            <label htmlFor="content_feeback"/>
            <textarea name="" id="content_feedback"></textarea>
        </form>
    </div>
  )
}

export default Feedback
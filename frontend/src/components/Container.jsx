import React from 'react'

function Container({children}) {
  return (
    <div className='max-w-7xl mx-auto my-16 flex justify-center'>
        <div className='max-w-xl w-96 '>{children}</div>
    </div>
  )
}

export default Container
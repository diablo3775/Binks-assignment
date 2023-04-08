import React from 'react'

const Contact = ({ src, name}) => {
  return (
    <div className='flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer rounded-xl'>
        <img className='rounded-full h-10 w-10 object-cover' src={src} />
        <p>{name}</p>
        <div className='absolute bottom-1 left-4 bg-green-400 h-2 w-2 rounded-full' />
    </div>
  )
}

export default Contact
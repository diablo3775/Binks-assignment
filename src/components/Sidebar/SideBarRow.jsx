import React from 'react'

const SideBarRow = ({ src, Icon, title}) => {
  return (
    <div className='flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer'>
        {src && (
            <img
              className="rounded-full w-30 h-30"
              src={src}
              width={30}
              height={30}
             />
        )}
        {Icon && <Icon className='h-8 w-8 text-blue-500' />}
        <p className='hidden sm:inline-flex font-medium'>
            {title}
        </p>
    </div>
  )
}

export default SideBarRow
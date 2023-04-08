import React from 'react'
import Contact from './Contact'
import { VideoCameraIcon } from '@heroicons/react/outline'
import { DotsHorizontalIcon, SearchIcon } from '@heroicons/react/solid'

const contacts = [
    {src: "https://links.papareact.com/kxk", name: "Elon Musk"},
    {src: "https://staticg.sportskeeda.com/editor/2022/10/fd2b9-16652598039107-1920.jpg", name: "Zoro"},
    {src: "https://staticg.sportskeeda.com/editor/2022/03/e5a1b-16487500456711-1920.jpg", name: "Sanji"},
    {src: "https://staticg.sportskeeda.com/editor/2022/09/50f3f-16630098590220-1920.jpg", name: "Nami"},
    {src: "https://staticg.sportskeeda.com/editor/2022/03/669db-16477247716001-1920.jpg", name: "Robin"},
]

const Widgets = () => {
  return (
    <div className='hidden lg:flex flex-col w-60 p-2 mt-5'>
        <div className='flex justify-between items-center text-gray-500 mb-t'>
            <h2 className='text-xl'>Contacts</h2>
            <div className='flex space-x-2'>
                <VideoCameraIcon className='h-6' />
                <SearchIcon className='h-6' />
                <DotsHorizontalIcon className='h-6' />
            </div>
        </div>

        {contacts.map((contact) => (
            <Contact key={contact.src} src={contact.src} name={contact.name} />
        ))}
    </div>
  )
}

export default Widgets
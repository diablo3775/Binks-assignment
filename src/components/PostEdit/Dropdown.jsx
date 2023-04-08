import Modal from './Modal'
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useUserAuth } from '../../context/UserAuthContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ id, deletePost, posts, setPosts,message,image,userName }) {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUserAuth();
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <>
                    {user.email === userName ? (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        <div className='flex items-center space-x-2' onClick={() => setShowModal(true)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          <div>Edit</div>
                        </div>
                      </a>
                    ) : (
                      <a
                        href="#"
                        className={classNames(
                          'text-gray-400',
                          'block px-4 py-2 text-sm'
                        )}
                        disabled
                      >
                        <div className='flex items-center space-x-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          <div>Edit</div>
                        </div>
                      </a>
                    )}
                  </>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <>
                  {user.email === userName ? (
                    <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <div className='flex items-center space-x-2' onClick={() => deletePost(id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <div>Delete</div>
                    </div>
                  </a>
                  ) : (
                    <a
                    href="#"
                    className={classNames(
                      'text-gray-400',
                      'block px-4 py-2 text-sm'
                    )}
                    disabled
                  >
                    <div className='flex items-center space-x-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <div>Delete</div>
                    </div>
                  </a>
                  )
                }
                  </>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {/* Modal */}
      {
        <>
          {showModal ? (
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              posts={posts}
              setPosts={setPosts}
              message={message}
              userName={userName}
              id={id}
              image={image}
            />
          ) : null}
        </>
      }
    </>
  )
}

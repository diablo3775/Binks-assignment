import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { storage } from "../../firebase";
import React, { useEffect, useState } from 'react'
import { removeGmailSuffix } from '../../utils/helpers';
import { Audio } from 'react-loader-spinner'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CameraIcon } from '@heroicons/react/solid';

export default function Modal({ setShowModal, message, id, setPosts, posts, image, userName }) {
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const USER_NAME = removeGmailSuffix(userName).toUpperCase()

  useEffect(() => {
    setNewName(message);
    setNewImage(image);
  }, [message, image]);

  const handleSubmit = async (postId, newName, newImage) => {
    try {
      setIsLoading(true);
      let imageUrl = null;
      if (newImage && newImage.type && newImage.type.startsWith('image/')) {
        // Upload the new image to Firebase Storage
        const imageId = uuidv4();
        const storageRef = ref(storage, `images/${imageId}`);
        const uploadTask = uploadBytesResumable(storageRef, newImage);
        uploadTask.on('state_changed',(snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },(error) => {
            console.log(error);
          },() => {
            // Get the download URL of the new image
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log('File available at', url);
              imageUrl = url;
              // Update the post data on the backend with the new message and image URL
              axios.patch(`https://social-media-binks-default-rtdb.firebaseio.com/posts/${postId}.json`, {
                message: newName,
                imageUrl: imageUrl,
              });
              setPosts(
                posts.map((post) => {
                  if (post.id === postId) {
                    return { ...post, message: newName, imageUrl: imageUrl };
                  }
                  return post;
                })
              );
              setIsLoading(false);
              setShowModal(false);
            });
          }
        );
      } else {
        // If there is no new image, keep the previous imageUrl value
        const post = posts.find((post) => post.id === postId);
        imageUrl = post.imageUrl;
        // Update the post data on the backend with the new message and (existing) imageUrl
        axios.patch(`https://social-media-binks-default-rtdb.firebaseio.com/posts/${postId}.json`, {
          message: newName,
          imageUrl: imageUrl,
        });
        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              return { ...post, message: newName, imageUrl: imageUrl };
            }
            return post;
          })
        );
        setIsLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {USER_NAME}
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    X
                  </span>
                </button>
              </div>

              {/*body*/}
              {/*Update Post*/}
              <div className="relative p-6 flex-auto">
                <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
                  <div className='flex space-x-4 p-4 items-center'>
                    <form className='flex flex-1 items-center' onSubmit={(e) => { e.preventDefault(), handleSubmit(id, newName, newImage) }}>
                      <input
                        className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                      <label className='inputIcon'>
                        <CameraIcon className='h-7 text-green-400' />
                        <p className='text-xs sm:text-sm xl:text-base'>Upload Photo</p>
                        <input type="file" onChange={(e) => setNewImage(e.target.files[0])} className="hidden" />
                      </label>
                      <button className='px-2 bg-blue-500 p-2 rounded-full text-white' type="submit">Update</button>
                      {isLoading && <div className="spinner-container">
                        <div className="loading-spinner">
                        </div>
                      </div>}
                    </form>
                  </div>
                </div>
              </div>

              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
}
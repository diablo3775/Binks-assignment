import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react'
import { storage } from "../../firebase";
import { CircularProgress } from '@material-ui/core';
import { CameraIcon, EmojiHappyIcon, VideoCameraIcon } from '@heroicons/react/outline';
import { useUserAuth } from "../../context/UserAuthContext"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const InputBox = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUserAuth();

  const handleImageUpload = (file) => {
    setLoading(true);
    const imageId = uuidv4();
    const storageRef = ref(storage, `images/${imageId}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    }, (error) => {
      console.log(error);
      setLoading(false);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        const postData = {
          message: name,
          imageUrl: url,
          userName: user.email,
          likes: 0,
          likeColor: false,
          timestamp: {
            '.sv': 'timestamp',
          },
        }
        console.log('File available at', url);
        axios.post('https://social-media-binks-default-rtdb.firebaseio.com/posts.json', postData);
        setImageUrl(url);
        setLoading(false);
      });
    });
    setName("")
    setImageUrl(null);
    setImage(null);
  };

  const handlePostSubmit = () => {
    const postData = {
      message: name,
      imageUrl: null,
      userName: user.email,
      likes: 0,
      likeColor: false,
      timestamp: {
        '.sv': 'timestamp',
      },
    };

    axios.post('https://social-media-binks-default-rtdb.firebaseio.com/posts.json', postData)
      .then(() => {
        setImageUrl(null);
        setImage(null);
        setName('');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Please enter a message.');
      return;
    }
    if (image) {
      handleImageUpload(image);
    } else {
      handlePostSubmit();
    }
  };

  //For displaying the first letter of the userName
  let USER_NAME = user.email && user.email.charAt(0).toUpperCase();

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
      <div className='flex space-x-4 p-4 items-center'>
        <div className="rounded-full bg-gray-200 h-10 w-10 px-5 flex items-center justify-center text-black">{USER_NAME}</div>
        <form className='flex flex-1 items-center' onSubmit={handleSubmit}>
          <input
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className='px-2 sm:px-3 md:px-2 bg-blue-500 p-1 sm:p-2 md:p-3 rounded-full text-white ml-2' type="submit">Submit</button>
          {loading && <CircularProgress />}
        </form>
      </div>

      <div className='flex justify-evenly p-3 border-t'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
        </div>
        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
        </div>
        <label className='inputIcon'>
          <CameraIcon className='h-7 text-green-400' />
          <p className='text-xs sm:text-sm xl:text-base'>Upload Photo</p>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="hidden" />
        </label>
        {image && <img className='h-12 w-12 object-cover rounded-md' src={URL.createObjectURL(image)} alt="selected" />}
      </div>
    </div>
  )
}

export default InputBox


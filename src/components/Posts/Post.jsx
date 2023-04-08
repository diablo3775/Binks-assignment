import axios from 'axios';
import Dropdown from '../PostEdit/Dropdown'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React, {  useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { removeGmailSuffix } from "../../utils/helpers";
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/solid";
import { useUserAuth } from '../../context/UserAuthContext';

const Post = ({ message, image, id, deletePost, userName, posts, setPosts, comments, likes, likeColor,likedPosts }) => {
  const [likedPost, setLikedPost] = useState(likedPosts)
  const [isLoading, setIsLoading] = useState(true);
  const [numLikes, setNumLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(likeColor);
  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState()
  const {user} = useUserAuth()

  const USER_NAME = removeGmailSuffix(userName);
  let FIRST_LETTER = USER_NAME && USER_NAME.charAt(0).toUpperCase()
  const formattedName = USER_NAME?.charAt(0).toUpperCase() + USER_NAME.slice(1).toLowerCase()

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
       axios.post(`https://social-media-binks-default-rtdb.firebaseio.com/posts/${id}/comments.json`, {
        messagebot: comment,
        userName: user.email,
        id: uuidv4()
      });
      setComment("");
    } catch (err) {
      console.error(err);
    }
    setEditId("")
  };

  const handleLike = async () => {
    try {
      const likedPosts = likedPost || !likedPost;
      console.log(likedPosts)
      if (!likedPosts[user.email]) {
        const response = await axios.patch(`https://social-media-binks-default-rtdb.firebaseio.com/posts/${id}.json`, { likes: numLikes + 1, likeColor: true });
        setNumLikes(response.data.likes);
        setIsLiked(true);
        setLikedPost( {[user.email]: true })
      } else {
        const response = await axios.patch(`https://social-media-binks-default-rtdb.firebaseio.com/posts/${id}.json`, { likes: numLikes - 1, likeColor: false });
        setNumLikes(response.data.likes);
        setIsLiked(false);
        setLikedPost( {[user.email]: false })
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header of Post */}
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xl">
            <div className="rounded-full bg-gray-200 h-9 w-9 flex items-center justify-center text-black">{FIRST_LETTER}</div>
            <div>{formattedName}</div>
          </div>
          <Dropdown deletePost={deletePost} id={id} setPosts={setPosts} posts={posts} message={message} image={image} userName={userName} />
        </div>
        <p className="pt-4">{message}</p>
      </div>

      {/* Image Post */}
      {image ? (
        <div className="relative">
          {isLoading && <Skeleton className="h-96" />}
          <img
            src={image}
            style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block' }}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      ) : null}

      {/* Footer of post */}
      <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
        <div className="inputIcon rounded-none rounded-bl-2xl" onClick={handleLike}>
          <ThumbUpIcon className={`h-4 like-button ${likeColor ? ' text-blue-500' : 'text-gray-400'}`} />
          <span className="likes-counter">{`Like ${likes}`}</span>
        </div>

        {/* Selecting comment will show the inputfield to add comment */}
        {id === editId ? (
          <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
            <form onSubmit={handleSubmit} className="inputIcon rounded-none ">
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="text-sm rounded-full h-10 px-5 bg-gray-100 flex-grow outline-none"
              />
              <button type="submit" disabled={!comment} className='bg-blue-500 rounded-full p-2'>
                Post Comment
              </button>
              <button className='bg-blue-500 rounded-full p-2' onClick={() => setEditId("")}>
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <div className="inputIcon rounded-none" onClick={() => setEditId(id)}>
            <ChatAltIcon className="h-4" />
            <p className="text-xs sm:text-base">Comment</p>
          </div>
        )}
        <div className="inputIcon rounded-none rounded-br-2xl">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>

      {/* Comment messages */}
      <div className="p-3 pt-0 m-3">
        {comments && Object?.values(comments)?.map((comment) => (
          <div key={comment.id} className="flex items-center space-x-2 mb-2 ml-3 pl-2 border border-l-black">
            <div className="rounded-full bg-gray-200 h-9 w-9 flex items-center justify-center text-black">{removeGmailSuffix(comment.userName.charAt(0).toUpperCase())}</div>
            <div className="flex flex-col ">
              <div className="text-sm font-medium">{removeGmailSuffix(comment.userName.charAt(0).toUpperCase() + comment.userName.slice(1).toLowerCase())}</div>
              <div className="text-sm">{comment.messagebot}</div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default Post;



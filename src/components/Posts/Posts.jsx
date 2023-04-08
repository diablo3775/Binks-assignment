import axios from 'axios'
import Post from "./Post";
import { database } from '../../firebase';
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { ref as dbRef, onValue, off } from "firebase/database";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useUserAuth();
  const postsRef = dbRef(database, 'posts');

  useEffect(() => {
    getPosts();
    // Listen for changes to the 'posts' ref
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const postList = Object.keys(data).map((key) => ({
        id: key,
        message: data[key].message,
        image: data[key].imageUrl,
        userName: data[key].userName,
        timestamp: data[key].timestamp,
        likes: data[key].likes,
        likeColor: data[key].likeColor,
        comments: data[key].comments,
        comment: data[key].comment,
        likedPosts: data[key].likedPosts
      }));
      postList.sort((a, b) => b.timestamp - a.timestamp);
      setPosts(postList);
    });

    return () => {
      // Unsubscribe from 'posts' ref changes when the component unmounts
      off(postsRef);
    }
  }, []);

  async function getPosts() {
    const response = await axios.get('https://social-media-binks-default-rtdb.firebaseio.com/posts.json');
    const data = response.data;
    const postList = Object.keys(data).map((key) => ({
      id: key,
      message: data[key].message,
      image: data[key].imageUrl,
      userName: data[key].userName,
      timestamp: data[key].timestamp,
      likes: data[key].likes,
      likeColor: data[key].likeColor,
      comments: data[key].comments,
      comment: data[key].comment,
      likedPosts: data[key].likedPosts
    }));
    postList.sort((a, b) => b.timestamp - a.timestamp);
    setPosts(postList);
  }

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://social-media-binks-default-rtdb.firebaseio.com/posts/${postId}.json`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <div>
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                userName={post.userName}
                message={post.message}
                image={post.image}
                likes={post.likes}
                likeColor={post.likeColor}
                likedPosts={post.likedPosts}
                comments={post.comments}
                timestamp={post.timestamp}
                deletePost={handleDelete}
                posts={posts}
                setPosts={setPosts}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Posts


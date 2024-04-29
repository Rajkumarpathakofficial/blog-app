// src/components/BlogList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the list of blog posts from the backend API
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;

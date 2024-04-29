// src/components/EditPost.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPost = ({ postId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch the details of the post to be edited
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        const { title, content } = response.data;
        setTitle(title);
        setContent(content);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/posts/${postId}`, { title, content });
      alert('Blog post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;

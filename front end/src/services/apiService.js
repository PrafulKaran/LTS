import api from './api'

// User API calls
export const userAPI = {
  // Register a new user
  register: (userData) => api.post('/users/register', userData),
  
  // Get all users
  getAllUsers: (skip = 0, limit = 10) =>
    api.get('/users/', { params: { skip, limit } }),
  
  // Get specific user
  getUserById: (userId) => api.get(`/users/${userId}`),
  
  // Update user profile
  updateUser: (userId, userData) => api.put(`/users/${userId}`, userData),
  
  // Delete user
  deleteUser: (userId) => api.delete(`/users/${userId}`),
}

// Post API calls
export const postAPI = {
  // Create a post
  createPost: (userId, postData) =>
    api.post('/posts/', { user_id: userId, ...postData }),
  
  // Get all posts
  getAllPosts: (skip = 0, limit = 10) =>
    api.get('/posts/', { params: { skip, limit } }),
  
  // Get specific post
  getPostById: (postId) => api.get(`/posts/${postId}`),
  
  // Get user's posts
  getUserPosts: (userId, skip = 0, limit = 10) =>
    api.get(`/posts/user/${userId}`, { params: { skip, limit } }),
  
  // Update post
  updatePost: (postId, postData) => api.put(`/posts/${postId}`, postData),
  
  // Delete post
  deletePost: (postId) => api.delete(`/posts/${postId}`),
}

// Comment API calls
export const commentAPI = {
  // Create a comment
  createComment: (postId, userId, commentData) =>
    api.post('/comments/', {
      post_id: postId,
      user_id: userId,
      ...commentData,
    }),
  
  // Get all comments
  getAllComments: (skip = 0, limit = 10) =>
    api.get('/comments/', { params: { skip, limit } }),
  
  // Get post comments
  getPostComments: (postId) => api.get(`/comments/post/${postId}`),
  
  // Delete comment
  deleteComment: (commentId) => api.delete(`/comments/${commentId}`),
}

// Like API calls
export const likeAPI = {
  // Like a post
  likePost: (postId, userId) => api.post(`/likes/${postId}?user_id=${userId}`),
  
  // Unlike a post
  unlikePost: (postId, userId) =>
    api.delete(`/likes/${postId}?user_id=${userId}`),
  
  // Get post likes
  getPostLikes: (postId) => api.get(`/likes/${postId}`),
}

export default {
  userAPI,
  postAPI,
  commentAPI,
  likeAPI,
}

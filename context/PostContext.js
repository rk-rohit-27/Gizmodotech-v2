'use client';
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

// Context to hold posts data and functionality
const PostsContext = createContext();

// Helper function to fetch GraphQL data
const fetchGraphQL = async (query) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL, { query });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data from GraphQL:', error);
    throw new Error('Error fetching data from GraphQL: ' + (error.response?.data || error.message));
  }
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);  // All posts
  const [displayedPosts, setDisplayedPosts] = useState([]);  // Posts to display (for pagination)
  const [post, setPost] = useState(null);  // Single post (for individual post fetching)
  const [searchResults, setSearchResults] = useState([]);  // Search results
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [isFetchingMore, setIsFetchingMore] = useState(false);  // For infinite scrolling

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const query = `
      query {
        posts(first: 10) { 
          nodes {
            id
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
              }
            }
          }
        }
      }
    `;
    try {
      const data = await fetchGraphQL(query);
      setPosts(data.posts.nodes);
      setDisplayedPosts(data.posts.nodes.slice(0, 6)); // Show the first 6 posts initially
    } catch (err) {
      setError(`Error fetching posts: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search posts by query string
  const searchPosts = useCallback(async (query) => {
    setLoading(true);
    const gqlQuery = `
      query {
        posts(where: { search: "${query}" }) {
          nodes {
            id
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `;
    try {
      const data = await fetchGraphQL(gqlQuery);
      setSearchResults(data.posts.nodes);
    } catch (err) {
      setError(`Error searching posts: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Infinite scroll logic: load more posts when needed
  const loadMorePosts = () => {
    if (isFetchingMore || displayedPosts.length >= posts.length) return;
    setIsFetchingMore(true);
    setTimeout(() => {
      const nextPosts = posts.slice(displayedPosts.length, displayedPosts.length + 6); // Load 6 more posts
      setDisplayedPosts((prev) => [...prev, ...nextPosts]);
      setIsFetchingMore(false);
    }, 1000); // Simulate a delay for fetching more
  };

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostsContext.Provider value={{
      posts,
      displayedPosts,
      post,
      searchResults,
      loading,
      error,
      isFetchingMore,
      fetchPosts,
      searchPosts,
      loadMorePosts,
    }}>
      {children}
    </PostsContext.Provider>
  );
};

// Custom hook to use the PostsContext
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

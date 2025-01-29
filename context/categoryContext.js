'use client';

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

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

// CategoryContext to hold category-specific posts and functionality
const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categoriesPosts, setCategoriesPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch posts by category dynamically
  const fetchPostsByCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);

    const query = `
      query {
        posts(where: { categoryName: "${category}" }) {
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
      const data = await fetchGraphQL(query);
      setCategoriesPosts((prevState) => ({
        ...prevState,
        [category]: data.posts.nodes,
      }));
    } catch (err) {
      console.error('Error fetching posts for category:', category, err);
      setError(`Error fetching posts by category: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch posts for 'best-phones' and 'technews' categories
  const fetchBestPhoneAndTechNewsPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const query = `
      query {
        bestPhones: posts(where: { categoryName: "best-phones" }) {
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
        techNews: posts(where: { categoryName: "technews" }) {
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
      const data = await fetchGraphQL(query);
      setCategoriesPosts({
        bestPhones: data.bestPhones.nodes,
        techNews: data.techNews.nodes,
      });
    } catch (err) {
      console.error('Error fetching posts for categories:', err);
      setError(`Error fetching posts: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CategoryContext.Provider value={{
      categoriesPosts,
      loading,
      error,
      fetchPostsByCategory,
      fetchBestPhoneAndTechNewsPosts,
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to use the CategoryContext
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    console.error('useCategory must be used within a CategoryProvider');
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

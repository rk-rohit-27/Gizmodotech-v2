import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";

// GraphQL queries
const GET_POSTS_QUERY = `
  query GetPosts {
    posts {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

const SEARCH_POSTS_QUERY = (query) => `
  query SearchPosts {
    posts(where: {search: "${query}"}) {
      nodes {
        id
        title
        slug
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

const GET_POST_BY_SLUG_QUERY = (slug) => `
  query GetPostBySlug {
    postBy(slug: "${slug}") {
      id
      title
      content
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

// GraphQL fetch function
const fetchGraphQL = async (query) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL, { query });

    if (response.data.errors) {
      console.error("GraphQL Errors:", response.data.errors);
      throw new Error("GraphQL query failed: " + JSON.stringify(response.data.errors));
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching data from GraphQL:", error);
    throw new Error("Error fetching data from GraphQL: " + (error.response?.data || error.message));
  }
};

const CompareContext = createContext();

export const useCompare = () => {
  return useContext(CompareContext);
};

export const CompareProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [deviceDetails, setDeviceDetails] = useState({
    device1: null,
    device2: null,
    device3: null,
  });

  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [searchQuery3, setSearchQuery3] = useState("");

  const [selectedDevice1, setSelectedDevice1] = useState(null);
  const [selectedDevice2, setSelectedDevice2] = useState(null);
  const [selectedDevice3, setSelectedDevice3] = useState(null);

  // Fetch all posts (devices)
  const fetchPosts = async () => {
    try {
      const data = await fetchGraphQL(GET_POSTS_QUERY);
      setPosts(data.posts.nodes);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch device details by slug
  const fetchDeviceDetails = async (deviceSlug, index) => {
    if (deviceDetails[`device${index}`]) return;

    try {
      const data = await fetchGraphQL(GET_POST_BY_SLUG_QUERY(deviceSlug));
      setDeviceDetails((prevState) => ({
        ...prevState,
        [`device${index}`]: data.postBy,
      }));

      if (index === 1) setSelectedDevice1(data.postBy);
      else if (index === 2) setSelectedDevice2(data.postBy);
      else if (index === 3) setSelectedDevice3(data.postBy);
    } catch (error) {
      console.error(`Error fetching device details for ${deviceSlug}:`, error);
    }
  };

  // Debounced search handler
  const handleSearch = (query) => {
    if (query) {
      const filteredResults = posts.filter((device) =>
        device.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const debouncedSearch = useCallback(debounce((query) => handleSearch(query), 500), []);

  // Search posts based on a query (to query via GraphQL)
  const searchPosts = async (query) => {
    try {
      const data = await fetchGraphQL(SEARCH_POSTS_QUERY(query));
      setSearchResults(data.posts.nodes);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  const resetSearchQuery = (index) => {
    if (index === 1) setSearchQuery1("");
    else if (index === 2) setSearchQuery2("");
    else setSearchQuery3("");
  };

  // Initial fetch of posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <CompareContext.Provider
      value={{
        posts,
        searchResults,
        deviceDetails,
        selectedDevice1,
        selectedDevice2,
        selectedDevice3,
        searchQuery1,
        searchQuery2,
        searchQuery3,
        setSearchQuery1,
        setSearchQuery2,
        setSearchQuery3,
        setDeviceDetails,
        fetchPosts,
        fetchDeviceDetails, 
        debouncedSearch,
        searchPosts,
        resetSearchQuery,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

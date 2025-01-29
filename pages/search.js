'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // For accessing query params in App Router
import { usePosts } from '../context/PostContext'; // PostContext for managing posts
import Loader from '../components/Loader'; // Assuming Loader is a component
import Image from 'next/image';
import Link from 'next/link';

function SearchPageContent() {
  const searchParams = useSearchParams(); // Get search params from the URL
  const query = searchParams.get('q'); // Extract 'q' parameter from URL

  const { searchResults, loading, error, searchPosts } = usePosts(); // Using PostContext for posts

  useEffect(() => {
    if (query) {

      searchPosts(query); // Fetch posts based on query parameter
    }
  }, [query, searchPosts]); // Run effect whenever 'query' changes

  return (
    <div className="max-w-[1200px] mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">Search Results</h1>

      {/* Loader or error message */}
      {loading && <div className='grid sm:grid-cols-2 md:grid-cols-3'><Loader /><Loader /><Loader /></div>}
      {error && <p>Error: {error}</p>}

      {/* Display search results */}
      {!loading && !error && searchResults?.length === 0 && (
        <p>No results found for "{query}"</p>
      )}

      {!loading && !error && searchResults?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((post) => {
            return (
              <div
                key={post.id}
                className="bg-white dark:bg-transparent dark:border-[#ffffff61] border p-6 rounded-lg shadow-md"
              >
                <div className="w-full h-[200px] my-3">
                  <Image
                    src={post.featuredImage.node.sourceUrl} // Image source URL
                    alt={post.title} // Alt text for the image
                    width={150}
                    height={100}
                    priority={false}
                    className="w-full h-full object-contain img-pos" // Maintain the aspect ratio and object containment
                  />
                </div>
                <h2 className="text-xl font-semibold my-2">
                  <Link
                    href={`/${post.slug}`}
                    className="hover:underline dark:text-white"
                  >
                    {post.title}
                  </Link>
                </h2>
                <div
                  className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 text-wrap"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                ></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SearchPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchPageContent />
    </Suspense>
  );
}

export default SearchPage;

'use client';
import React, { useEffect } from "react";
import { useCategory } from "../context/categoryContext"; // Import the useCategory hook from CategoryContext
import Link from "next/link"; // Using Link from Next.js
import SkeletonCard from "./SkeltonCard"; // Assuming this is a placeholder component
import Image from "next/image"; // Next.js image optimization

function Featured({ heading }) {
  const { categoriesPosts, loading, error, fetchPostsByCategory } = useCategory();

  // Determine the category dynamically (use 'heading' prop here)
  const category = heading.toLowerCase();

  // Fetch posts by category on component mount
  useEffect(() => {
    fetchPostsByCategory(category); // Fetch posts for the category
  }, [fetchPostsByCategory, category]);

  if (loading) {
    return (
      <div className="w-full md:w-[40%]">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 dark:text-white border-b pb-2 dark:border-[#ffffff61]">
          Featured
        </h2>
        <div className="flex flex-col gap-6">
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> {/* Placeholder skeleton */} 
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full md:w-[40%]">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 dark:text-white border-b pb-2 dark:border-[#ffffff61]">
          Featured
        </h2>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Fetch the posts for the current category
  const postsForCategory = categoriesPosts[category] || [];

  // Slice to get the first 3 posts
  const limitedPosts = postsForCategory.slice(0, 3);

  return (
    <div className="w-full md:w-[40%]">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 dark:text-white border-b pb-2 dark:border-[#ffffff61]">
        {heading}
      </h2>
      <div className="flex flex-col gap-6">
        {limitedPosts.length === 0 ? (
          <div>No posts available in this category.</div>
        ) : (
          limitedPosts.map((item) => (
            <Link
              href={`/${item.slug}`} // Use Next.js <Link> with the correct href
              key={item.id} // Use item.id as the key for better performance
              className="overflow-hidden shadow-md flex py-2 gap-4 items-center border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition duration-300 ease-in-out"
            >
              <div className="block w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.featuredImage.node.sourceUrl}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform ease-in-out duration-200"
                  loading="lazy"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <div
                  className="text-sm text-gray-600 dark:text-gray-300 leading-snug max-h-14 overflow-hidden text-ellipsis"
                  dangerouslySetInnerHTML={{ __html: item.excerpt }}
                ></div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Featured;

'use client';

import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { useCategory } from "../context/categoryContext";
import Link from "next/link";


function Sidebar({ categories }) {
  const category = categories.nodes;
  const { categoriesPosts, loading, error, fetchPostsByCategory } = useCategory();
  const router = useRouter();

  useEffect(() => {
    if (category && category.length > 0) {
      fetchPostsByCategory(category[1]?.name); // safely access the second category
    }
  }, [category, fetchPostsByCategory]);

  return (
    <div className="static sm:sticky top-[5rem] p-3 sm:p-4 w-full bg-[#fafafae6] dark:bg-[#2f2d433d] dark:border-[#333146] dark:shadow-lg border px-4 sm:px-5 py-8 border-[#eaeaea] rounded-xl">
      <div className="text-lg md:text-2xl font-semibold mb-4 border-b dark:border-[#333146] pb-3">
        You may also like
      </div>
      <div className="flex flex-col text-wh">
          <Link
            href="https://gizmodotech.com/samsung-galaxy-s24-plus"
            className="inline-block  py-2 "
          >
            Samsung Galaxy S24 Plus
          </Link>
          <Link
            href="https://gizmodotech.com/xiaomi-redmi-note-13-pro-plus"
            className="inline-block  py-2 "
          >
            Redmi Note 13 Pro Plus
          </Link>
          <Link
            href="https://gizmodotech.com/realme-13-5g-specification-and-price"
            className="inline-block  py-2 "
          >
            Realme 13 5G
          </Link>
        </div>

      {loading && (
        <div
          key="skeleton"
          className="flex flex-col items-center bg-white dark:bg-[#2f2d433d] p-2 rounded-md w-24 animate-pulse"
        >
          <div className="bg-gray-300 dark:bg-[#444444] w-full h-24 rounded-md"></div> {/* Placeholder for image */}
          <div className="bg-gray-300 dark:bg-[#444444] w-3/4 h-4 mt-2 rounded-md"></div> {/* Placeholder for title */}
        </div>
      )}
      {error && <div>Error: {error}</div>}

      <div className="my-8">
        <div className="text-lg md:text-xl font-semibold mb-4 border-b dark:border-[#333146] pb-3">
          Related Post
        </div>
        <div className="w-full flex flex-wrap gap-y-4 gap-x-2 ">
          {categoriesPosts[category[1]?.name]?.slice(1, 5).map((post) => (
            <div
              key={post.id}
              className="flex flex-col items-center w-[82px] sm:w-[100px] transition-transform transform hover:scale-105"
            >
              <div className="block overflow-hidden">
                <img
                  className="w-full object-contain h-16 "
                  src={post.featuredImage?.node?.sourceUrl}
                  alt={post.title}
                />
              </div>
              <button
                className="text-sm mt-2 dark:text-white line-clamp-2 w-fit leading-5 text-center transition-colors hover:underline"
                onClick={() => router.push(`/${post.slug}`)}
              >
                {post.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

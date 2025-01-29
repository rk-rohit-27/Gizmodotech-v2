'use client'

import React from "react";
import Link from "next/link"; // Import Next.js Link component
import Image from "next/image"; // Import Next.js Image component

function PostCard({ blog }) {
  return (
    <div className="dark:bg-transparent dark:border-[#ffffff61] bg-white rounded-xl pt-2 my-3 border transition-shadow ease-in-out duration-300 w-full p-4">
      <div className="relative h-[250px] w-full rounded-lg overflow-hidden">
        <Image
          src={blog.featuredImage ? blog.featuredImage.node.sourceUrl : "https://via.placeholder.com/400x250"}
          alt={blog.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust size based on viewport width
          priority // Add this for images above the fold
          style={{ objectFit: 'contain' }} // Use style instead of objectFit
          className="rounded-lg transform hover:scale-105 transition-transform ease-in-out duration-200"
          fill // This will make the image fill the parent container
        />
      </div>
      <div className="py-4">
        <span className="text-[#0D8888] text-xs font-medium my-3">
          {new Date(blog.date).toLocaleDateString()}
        </span>
        <div className="flex justify-between items-center gap-2 mb-2">
          <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
            <Link href={`/${blog.slug}`} className="hover:underline dark:text-white">
              {blog.title}
            </Link>
          </h3>
        </div>

        <div
          className="text-sm text-gray-600 dark:text-gray-300 font-normal max-h-[43px] overflow-hidden text-ellipsis text-wrap"
          dangerouslySetInnerHTML={{ __html: blog.excerpt }}
        ></div>
      </div>
    </div>
  );
}

export default PostCard;

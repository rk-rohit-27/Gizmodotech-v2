"use client";
import React from "react";
import Link from "next/link"; // Import Next.js Link component
import Image from "next/image";

function Card({ blog }) {
  // Format the date for better readability
  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
 
  
  return (
    <div
      className="dark:bg-transparent dark:border-[#ffffff61] bg-white rounded-xl pt-2 my-3 border transition-shadow ease-in-out duration-300 min-w-[310px] sm:min-w-[330px] w-full p-4"
      key={blog.id}
    >
      <div className="relative h-[250px] rounded-lg">
        <Image
          src={blog.featuredImage.node.sourceUrl}
          alt={blog.title}
          fill 
          
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className=" w-full h-full object-contain img-pos" />
      </div>
      <div className="py-4">
        <span className="text-[#0D8888] text-sm font-medium my-3">
          {formattedDate}
        </span>
        <div className="flex justify-between items-center gap-2 mb-2">
          <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
            {/* Use Next.js Link component */}
            <Link
              href={`/${blog.slug}`}
              className="hover:underline dark:text-white"
            >
              {blog.title}
            </Link>
          </h3>
        </div>

        <div
          className="text-sm text-gray-600 dark:text-gray-300 font-normal line-clamp-3 text-wrap"
          dangerouslySetInnerHTML={{ __html: blog.excerpt }}
        ></div>
      </div>
    </div>
  );
}


export default Card;

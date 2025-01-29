import React from "react";
import Link from "next/link"; // Importing Next.js Link component
import Image from "next/image"; // Importing Next.js Image component

function Comparecard({ device, specifications }) {
  // Ensure the device prop is passed correctly
  if (!device) {
   
    return null; // If no device is passed, return nothing
  }
 
 
  

  // Extract content from the HTML string
  const content = specifications.content || "";

  // Use regex to find the price in the content
  const pricePattern = /Price in India<\/td><td>(₹[\d,]+)/;
  const priceMatch = content.match(pricePattern);
  const price = priceMatch ? priceMatch[1] : "Price not available"; // Default if no match is found

  return (
    <div className="bg-white dark:bg-[#1d1c2a] border dark:border-[#ffffff61] rounded-lg shadow-sm p-2 my-4 flex flex-1 ">
      <div className="flex flex-col flex-1 p-3">
        <div className="flex justify-center w-full">
          <span className="block w-32 h-[140px] relative">
            {/* Use Next.js Image component */}
            <Image
              src={specifications.featuredImage?.node?.sourceUrl || "/placeholder.jpg"} // Fallback to a placeholder image if no image exists
              alt={specifications.title}
              width={120} // Adjusted width (e.g., 128px)
              height={120}
              priority // Adjusted height (e.g., 128px)
              className="object-contain"
            />
          </span>
        </div>
        <div className="py-3">
          {/* Next.js Link component for routing */}
          <Link href={`/${device.slug}`}>
            
              <h3 className="font-semibold text-[16px] text-wrap hover:underline">{specifications.title}</h3>
            
          </Link>
          <p className="text-sm text-gray-800">Price: {price}</p>
        </div>
      </div>
    </div>
  );
}

export default Comparecard;

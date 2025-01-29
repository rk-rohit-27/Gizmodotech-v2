import React from 'react';

function SkeletonCard() {
  return (
    <div className="overflow-hidden shadow-md flex py-2 gap-4 items-center border-b dark:border-gray-700 rounded-lg animate-pulse">
      <div className="block w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700"></div>
      <div className="flex-grow">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;

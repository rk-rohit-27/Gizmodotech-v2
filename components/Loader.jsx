import React from 'react';

function Loader() {
  return (
    <div className="dark:bg-transparent dark:border-[#ffffff61] bg-white rounded-xl pt-2 my-3 mx-2 border transition-shadow ease-in-out duration-300 min-w-[330px] w-full p-4">
      <div className="relative h-[250px] rounded-lg skeleton-image"></div>
      <div className="py-4">
        <div className="skeleton-text w-3/4 h-6 mb-2"></div>
        <div className="skeleton-text w-1/2 h-6 mb-2"></div>
        <div className="skeleton-text w-full h-6"></div>
      </div>
    </div>
  );
}

export default Loader;

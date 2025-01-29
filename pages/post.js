'use client'

import { useEffect } from 'react';
import { usePosts } from '../context/PostContext';
import Loader from '../components/Loader';
import PostCard from '../components/PostCard';

function PostGrid() {
  const {
    displayedPosts,
    loading,
    error,
    isFetchingMore,
    loadMorePosts,
  } = usePosts();

  const hasPosts = Array.isArray(displayedPosts) && displayedPosts.length > 0;

  // Debounced scroll handling
  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      if (isFetchingMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        timeoutId = setTimeout(() => {
          loadMorePosts();
        }, 200); // Delay to avoid too frequent calls
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the timeout and event listener on component unmount
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMorePosts, isFetchingMore]);

  if (loading) {
    return (
      <div className="flex justify-center w-full mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[1200px]">
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!hasPosts) {
    return <div className="text-center">No posts available.</div>;
  }

  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex justify-center w-full">
        <div className="max-w-[1200px]">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            All Posts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedPosts.map((blog) => (
              <PostCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
      {isFetchingMore && (
        <div className="flex justify-center w-full mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[1200px]">
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      </div>
      )}
    </div>
  );
}

export default PostGrid;

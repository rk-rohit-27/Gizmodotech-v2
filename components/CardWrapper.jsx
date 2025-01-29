import React, { useEffect, useMemo, useCallback } from "react";
import Card from "./Card";
import { useCategory } from "../context/categoryContext";
import Loader from "./Loader";

function CardWrapper({ heading }) {
  const { categoriesPosts, loading, error, fetchPostsByCategory } = useCategory();

  const fetchPosts = useCallback(() => {
    if (heading) {
      fetchPostsByCategory(heading);
    }
  }, [heading, fetchPostsByCategory]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const blogsToShow = useMemo(() => {
    if (!heading || loading) {
      return [];
    }
    const postsForCategory = categoriesPosts?.[heading] || [];
    return postsForCategory.slice(0, 5);
  }, [categoriesPosts, heading, loading]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="mb-8 border-t mt-4 dark:border-[#ffffff61]">
      <h2 className="text-lg sm:text-2xl font-semibold my-6 text-gray-800 dark:text-white">
        {heading}
      </h2>

      {blogsToShow.length > 0 ? (
        <div className="flex whitespace-nowrap overflow-auto justify-start gap-3 scrollbar-hidden">
          {blogsToShow.map((blog) => (
            <Card key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        !loading && <p>No {heading} blogs available.</p>
      )}
    </section>
  );
}

export default CardWrapper;

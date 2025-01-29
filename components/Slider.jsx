'use client';

import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useCategory } from '../context/categoryContext';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';

const SliderItem = memo(({ slide, currentIndex, index }) => {
  if (!slide?.slug) {
    console.error('Missing slug for slide:', slide);
    return null;
  }

  const imageUrl = slide?.featuredImage?.node?.sourceUrl;

  return (
    <Link
      href={`blog/${slide.slug}`}
      className={`${
        index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100%]'
      } transition-all duration-500 ease-in-out absolute inset-0`}
      aria-label={`Read more about ${slide.title}`}
      aria-hidden={index !== currentIndex}
    >
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={imageUrl}
          alt={slide.title || 'Slide Image'}
          className="w-full h-full transition-transform duration-500 ease-in-out transform scale-100 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        <div className="text-white absolute bottom-0 left-0 p-5 bg-gradient-to-b from-transparent to-[#00000080]">
          <h3 className="text-base sm:text-[18px] font-semibold">{slide.title || 'Untitled'}</h3>
          <div
            className="text-sm text-white dark:text-white font-normal max-h-[43px] overflow-hidden text-ellipsis slider-content"
            dangerouslySetInnerHTML={{ __html: slide.excerpt || 'No description available.' }}
          />
        </div>
      </div>
    </Link>
  );
});

SliderItem.displayName = 'SliderItem';

function Slider() {
  const { fetchBestPhoneAndTechNewsPosts, loading, error, categoriesPosts } = useCategory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState([]);

  const intervalRef = useRef(null);

  // Fetch data when component mounts
  useEffect(() => {
    const getPosts = async () => {
      await fetchBestPhoneAndTechNewsPosts();
    };

    getPosts();
  }, [fetchBestPhoneAndTechNewsPosts]);

  useEffect(() => {
    if (categoriesPosts?.bestPhones && categoriesPosts?.techNews) {
      // Combine bestPhones and techNews and limit to the first 5 posts
      const combinedPosts = [...categoriesPosts.bestPhones, ...categoriesPosts.techNews].slice(0, 5);
      setSlidesToShow(combinedPosts); // Set the slides data
    }
  }, [categoriesPosts]);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (slidesToShow.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesToShow.length);
      }, 5000);

      return () => clearInterval(intervalRef.current); // Cleanup when component unmounts or blogs change
    }
  }, [slidesToShow.length]);

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesToShow.length) % slidesToShow.length);
  };

  // Navigate to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesToShow.length);
  };

  // Show the loader if the content is still loading
  if (loading) {
    return (
      <div className="flex flex-col md:w-[68%]">
        <h2 className="text-lg sm:text-2xl font-semibold mb-3">Recent Posts</h2>
        <div className="h-[350px] md:h-[450px] relative w-full overflow-hidden rounded-md shadow-lg animate-pulse bg-gray-300 dark:bg-gray-700">
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700"></div>
          <div className="absolute bottom-0 left-0 p-5 w-full bg-gradient-to-b from-transparent to-[#f0f8ff] dark:to-gray-800 text-black dark:text-white">
            <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error message if there is an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col w-full md:w-[68%]">
      <h2 className="text-lg sm:text-2xl font-semibold mb-3">Recent Posts</h2>
      <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-md shadow-lg">
        {slidesToShow.map((slide, index) => (
          <SliderItem
            key={index}
            slide={slide}
            currentIndex={currentIndex}
            index={index}
          />
        ))}
        {/* Navigation buttons */}
        <button
          className="prev absolute top-1/2 transform -translate-y-1/2 left-0 text-black dark:text-white hover:bg-opacity-75 transition-all"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <IoIosArrowBack size="30px" />
        </button>
        <button
          className="next absolute top-1/2 transform -translate-y-1/2 right-0 text-black dark:text-white hover:bg-opacity-75 transition-all"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <IoIosArrowForward size="30px" />
        </button>
      </div>
    </div>
  );
}

export default Slider;

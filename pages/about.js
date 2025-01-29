'use client';
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image"; // If using images

function About() {
  const seoTitle = "About Us - GizmodoTech";
  const seoDescription = "Learn about GizmodoTech, your source for tech news, gadgets, reviews, and insights into the latest trends in technology.";

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      {/* Meta Tags for SEO */}
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://gizmodotech.com/about" />
        <meta property="og:image" content="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png" />
        <link rel="canonical" href="https://gizmodotech.com/about" />
      </Head>

      {/* Section Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 dark:text-white">About Us</h1>

      <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
        Welcome to <strong><Link href="https://gizmodotech.com/" className="text-[#0D8888] hover:underline" title="GizmodoTech Home">GizmodoTech</Link></strong>, your go-to source for the latest in technology, gadgets, and mobile news. We are dedicated to providing our readers with insightful articles, expert reviews, and up-to-date information on all things tech.
      </p>

      <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
        Whether you're a tech enthusiast or someone who just loves to stay informed, our blog covers a wide range of topics from the hottest gadgets to the latest mobile trends. We aim to make tech accessible for everyone!
      </p>

      {/* Our Mission */}
      <div className=" p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-4">Our Mission</h2>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
          Our mission is to provide high-quality, honest, and unbiased reviews of the latest tech products and services. We strive to bring you the most relevant information to help you make informed decisions when it comes to technology.
        </p>
      </div>

      {/* Author Section */}
      <div className="flex items-center justify-start bg-gray-100 dark:bg-[#1d1c28] p-6 rounded-lg shadow-lg mb-12">
      <div
          className="w-24 h-24 rounded-full bg-gray-500 flex items-center justify-center text-white"
          aria-label="Author Avatar"
        >
          <span className="text-xl font-bold">R</span>{" "}
          {/* Placeholder for Author Avatar */}
        </div>
        <div className="ml-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">Rohit Kumar</h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-white">Founder & Lead Writer</p>
          <p className="text-sm text-gray-600 dark:text-white my-2">
            Email: <a href="mailto:rohit@gizmodotech.com" className="text-[#0D8888] font-semibold hover:underline">rohit@gizmodotech.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

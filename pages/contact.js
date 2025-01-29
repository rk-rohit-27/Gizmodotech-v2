"use client"
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaTimes } from "react-icons/fa"; // Import the close icon
import Head from "next/head"; // For dynamic meta tags

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(null); // State to track success or error message

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_9pxptm8", "template_7bqpebq", form.current, {
        publicKey: "sq9A5vr69Kk9ppDiE",
      })
      .then(
        () => {
          setStatus({ type: "success", message: "Message sent successfully!" });
          // Clear the form fields after successful submission
          form.current.reset();
        },
        (error) => {
          setStatus({ type: "error", message: `Failed to send message: ${error.text}` });
        }
      );
  };

  const closeMessage = () => {
    setStatus(null); // Close the success/error message
  };

  return (
    <div className="max-w-lg mx-auto py-10 p-4">
      {/* Meta Tags for SEO */}
      <Head>
        <title>Contact Us - GizmodoTech</title>
        <meta
          name="description"
          content="Contact GizmodoTech for inquiries, feedback, or support. Get in touch with our team for tech advice or reviews."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us - GizmodoTech" />
        <meta
          property="og:description"
          content="Contact GizmodoTech for inquiries, feedback, or support. Get in touch with our team for tech advice or reviews."
        />
        <meta property="og:url" content="https://gizmodotech.com/contact" />
        <meta property="og:image" content="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - GizmodoTech" />
        <meta
          name="twitter:description"
          content="Contact GizmodoTech for inquiries, feedback, or support. Get in touch with our team for tech advice or reviews."
        />
        <meta name="twitter:image" content="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png" />
      </Head>

      <h1 className="text-lg sm:text-2xl font-semibold mb-6">Contact Us</h1>

      {/* Success/Error Message */}
      {status && (
        <div
          className={`mb-4 p-4 rounded-md text-center flex justify-between items-center ${
            status.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
          role="alert" // Adds screen reader support
        >
          <p>{status.message}</p>
          {/* Close Button */}
          <button onClick={closeMessage} className="text-xl ml-4" aria-label="Close message">
            <FaTimes />
          </button>
        </div>
      )}

      {/* Contact Form */}
      <form
        ref={form}
        onSubmit={sendEmail}
        className="border border-gray-300 rounded-lg shadow-lg p-6"
        aria-labelledby="contact-form"
      >
        <div className="mb-4">
          <label
            htmlFor="user_name"
            className="block text-sm font-semibold text-gray-700 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0D8888] dark:text-black"
            aria-required="true"
            aria-describedby="name-helper-text"
          />
          <small id="name-helper-text" className="text-xs text-gray-500">
            Please enter your full name.
          </small>
        </div>

        <div className="mb-4">
          <label
            htmlFor="user_email"
            className="block text-sm font-semibold text-gray-700 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0D8888] dark:text-black"
            aria-required="true"
            aria-describedby="email-helper-text"
          />
          <small id="email-helper-text" className="text-xs text-gray-500">
            We will never share your email.
          </small>
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700 dark:text-white"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0D8888] dark:text-black"
            aria-required="true"
            aria-describedby="message-helper-text"
          />
          <small id="message-helper-text" className="text-xs text-gray-500">
            Write your message here.
          </small>
        </div>

        <div className="mb-4">
          <input
            type="submit"
            value="Send"
            className="w-full py-2 bg-[#0D8888] text-white font-semibold rounded-md hover:bg-[#0d6e6e] transition duration-300 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default Contact;

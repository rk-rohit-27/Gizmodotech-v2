import React from "react";
import { FaFacebook, FaTelegram } from "react-icons/fa"; // Import social media icons from react-icons
import Link from "next/link"; // Use Next.js's Link component for navigation
import Image from "next/image"; // Use Next.js's Image component for images

function Footer() {
  return (
    <footer className="bg-white dark:bg-[#1d1c28] text-white py-2">
      <div className="mx-auto px-4 max-w-[1200px] py-8 border-t dark:border-[#ffffff61]">
        {/* Footer Content */}
        <div className="flex flex-wrap flex-col sm:flex-row justify-between gap-10 my-4">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4 w-full sm:w-[40%]">
            <Image
              src="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png" // Make sure the image is in the "public" folder
              alt="Tech Blog Logo"
              width={150} 
              height={40}
              
            />
            <div className="text-sm dark:text-white text-[#1a1a1a]">
              Welcome to Tech Blog, your one-stop destination for the latest in
              tech news, reviews, and insights. Stay updated with our expert
              articles and community discussions.
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-between flex-row gap-8 sm:w-fit w-full text-[#1a1a1a] dark:text-white">
            {/* Menu Links */}
            <div className="w-full sm:w-fit">
              <span className="text-base font-semibold">Menu</span>
              <ul className="flex flex-col gap-3 text-sm flex-wrap mt-2">
                <li>
                  <Link href="/" passHref className="dark:text-white hover:text-[#0D8888]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" passHref className="dark:text-white hover:text-[#0D8888]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/about" passHref className="dark:text-white hover:text-[#0D8888]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" passHref className="dark:text-white hover:text-[#0D8888]">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" passHref className="dark:text-white hover:text-[#0D8888]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <span className="text-base font-semibold">Follow Us</span>
              <div className="flex gap-2 mt-2">
                <a
                  href="https://www.facebook.com/gizmodotech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="Visit our Facebook page"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://t.me/gizmodotech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                  aria-label="Visit our Telegram page"
                >
                  <FaTelegram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-sm dark:border-[#ffffff61] mb-8">
          {/* Additional footer links or information can go here */}
        </div>

        {/* Copyright */}
        <div className="text-center text-black mt-6 text-xs dark:text-white">
          <p>&copy; 2024 Tech Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

'use client'
import React from "react";
import Head from "next/head"; // Import Next.js Head for dynamic meta tags

function Terms() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* SEO Metadata */}
      <Head>
        <title>Terms of Service - GizmodoTech</title>
        <meta
          name="description"
          content="Read the terms of service for GizmodoTech. By using our website, you agree to comply with these terms and conditions."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Terms of Service - GizmodoTech" />
        <meta
          property="og:description"
          content="Read the terms of service for GizmodoTech. By using our website, you agree to comply with these terms and conditions."
        />
        <meta property="og:url" content="https://gizmodotech.com/terms" />
        <meta property="og:image" content="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service - GizmodoTech" />
        <meta
          name="twitter:description"
          content="Read the terms of service for GizmodoTech. By using our website, you agree to comply with these terms and conditions."
        />
        <meta name="twitter:image" content="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png" />
      </Head>

      <h1 className="text-xl sm:text-3xl font-semibold mb-4">Terms of Service</h1>

      <p className="text-xs sm:text-sm mb-3 sm:mb-4">
        Welcome to <a href="https://gizmodotech.com/">Gizmodotech</a>. By using
        our website, you agree to the following terms and conditions:
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="general-terms">
        1. General Terms
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        By accessing or using our website, you agree to comply with our terms
        and conditions.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="use-of-content">
        2. Use of Content
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        You may not copy, modify, or distribute content without prior written
        consent from Gizmodotech.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="user-responsibilities">
        3. User Responsibilities
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        You are responsible for maintaining the confidentiality of your account
        information and for all activities that occur under your account.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="termination">
        4. Termination
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        Gizmodotech may terminate or suspend your access to the site if you
        violate our terms of service.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="limitation-of-liability">
        5. Limitation of Liability
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        Gizmodotech is not responsible for any damages arising from your use of
        the website, including but not limited to loss of data or other
        intangible losses.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="changes-to-terms">
        6. Changes to the Terms
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        Gizmodotech reserves the right to modify or update our terms of service
        at any time. You will be notified of any significant changes via the
        website.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="contact-us">
        7. Contact Us
      </h2>
      <p className="text-xs sm:text-sm">
        If you have any questions about these terms, please contact us at:
      </p>
      <ul className="list-disc pl-6 sm:mb-6 mb-3 text-xs sm:text-sm">
        <li>
          <p>
            Email:{" "}
            <a
              className="text-[#0D8888] font-semibold"
              href="mailto:rohit@gizmodotech.com"
            >
              Email us
            </a>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Terms;

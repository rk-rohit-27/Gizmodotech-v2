'use client'
import React from "react";
import Head from "next/head"; // Import Next.js Head for dynamic meta tags

function Policy() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* SEO Metadata */}
      <Head>
        <title>Privacy Policy - GizmodoTech</title>
        <meta
          name="description"
          content="Read the privacy policy of GizmodoTech, detailing how we collect, use, and protect your personal information."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Policy - GizmodoTech" />
        <meta
          property="og:description"
          content="Read the privacy policy of GizmodoTech, detailing how we collect, use, and protect your personal information."
        />
        <meta property="og:url" content="https://gizmodotech.com/privacy-policy" />
        <meta property="og:image" content="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy - GizmodoTech" />
        <meta
          name="twitter:description"
          content="Read the privacy policy of GizmodoTech, detailing how we collect, use, and protect your personal information."
        />
        <meta name="twitter:image" content="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png" />
      </Head>

      <h1 className="text-xl sm:text-3xl font-semibold mb-4">Privacy Policy</h1>
      <p className="text-xs sm:text-sm mb-3 sm:mb-4">Last updated: November 26, 2024</p>
      <p className="text-xs sm:text-sm mb-3 sm:mb-4">
        This <a href="https://gizmodotech.com/" className="text-[#0D8888] font-semibold">Privacy Policy</a> describes Our policies and procedures on the
        collection, use, and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="information-we-collect">
        1. Information We Collect
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        We collect various types of information to improve our service to you:
      </p>
      <ul className="list-disc pl-6 sm:mb-6 mb-3 text-xs sm:text-sm">
        <li>Personal information (such as your name, email address, etc.) when you subscribe or sign up.</li>
        <li>Usage data to analyze how users interact with our site.</li>
        <li>Cookies to improve site functionality and user experience.</li>
      </ul>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="how-we-use-your-information">
        2. How We Use Your Information
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        We may use your personal data for the following purposes:
      </p>
      <ul className="list-disc pl-6 sm:mb-6 mb-3 text-xs sm:text-sm">
        <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
        <li>To manage Your Account and provide access to services available to registered users.</li>
        <li>To communicate with You about updates, offers, and security information.</li>
        <li>To evaluate and improve our Service, products, and marketing strategies.</li>
      </ul>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="data-protection">
        3. Data Protection
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        We take reasonable steps to protect your personal data. However, please
        note that no method of transmission over the internet is 100% secure,
        and we cannot guarantee absolute security.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="cookies">
        4. Cookies
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        We use cookies and other tracking technologies to improve your
        experience and analyze how our services are used. You can manage cookie
        preferences through your browser settings.
      </p>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">These cookies may include:</p>
      <ul className="list-disc pl-6 sm:mb-6 mb-3 text-xs sm:text-sm">
        <li>Essential cookies for website functionality.</li>
        <li>Preference cookies to remember your settings and choices.</li>
        <li>Analytics cookies to track user behavior and improve the website.</li>
      </ul>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="your-rights">
        5. Your Rights
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">You have the right to:</p>
      <ul className="list-disc pl-6 sm:mb-6 mb-3 text-xs sm:text-sm">
        <li>Access, update, or delete your personal information.</li>
        <li>Opt-out of receiving promotional emails and communications.</li>
        <li>Request a copy of the data we hold about you.</li>
      </ul>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="business-transactions">
        6. Business Transactions
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        In the event of a merger, acquisition, or asset sale, your personal data
        may be transferred. We will notify users of such changes.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="transfer-of-personal-data">
        7. Transfer of Your Personal Data
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        Your data may be processed outside your jurisdiction, and we will take
        necessary steps to ensure your data is handled securely.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="childrens-privacy">
        8. Children’s Privacy
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        Our service does not address anyone under the age of 13. If we learn
        that we have collected personal data from children under the age of 13,
        we will take steps to delete that information.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="changes-to-privacy-policy">
        9. Changes to This Privacy Policy
      </h2>
      <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated "Last updated" date.
      </p>

      <h2 className="text-lg sm:text-2xl font-semibold mt-8 mb-4" id="contact-us">
        10. Contact Us
      </h2>
      <p>
        If you have any questions about this Privacy Policy, you can contact us:
      </p>
      <ul className="list-disc pl-6 sm:mb-6 mb-3 text-xs sm:text-sm">
        <li>
          <p>
            By email:{" "}
            <a className="text-[#0D8888] font-semibold" href="mailto:rohit@gizmodotech.com">
              rohit@gizmodotech.com
            </a>
          </p>
        </li>
        <li>
          <p>
            By visiting this page on our website:{" "}
            <a
              className="text-[#0D8888] font-semibold"
              href="https://gizmodotech.com/contact"
              rel="external nofollow noopener"
              target="_blank"
            >
              Contact Us
            </a>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Policy;

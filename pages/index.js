import CardWrapper from "../components/CardWrapper";
import Featured from "../components/Featured";
import Slider from "../components/Slider";
import React from "react";
import Head from "next/head";

function home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Explore the latest tech gadgets, mobile reviews, and technology news. Stay updated with insights on Realme, Samsung, Xiaomi, and more at Gizmodotech."
        />
        <meta
          name="keywords"
          content="Gadgets, Mobile Specificatins, Realme, Samsung, Xiaomi, Tech News, Mobile Trends, Smartphone Specifications, Technology Articles, Gadgets Specifications"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Gizmodotech - Latest Gadgets, Mobile Reviews, and Tech News"
        />
        <meta
          property="og:description"
          content="Stay updated with the latest gadgets, mobile reviews, and tech news at Gizmodotech."
        />
        <meta property="og:url" content="https://gizmodotech.com" />
        <meta
          property="og:image"
          content="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Gizmodotech - Latest Gadgets, Mobile Reviews, and Tech News"
        />
        <meta
          name="twitter:description"
          content="Stay updated with the latest gadgets, mobile reviews, and tech news at Gizmodotech."
        />
        <meta
          name="twitter:image"
          content="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png"
        />
        <meta name="twitter:image:alt" content="Gizmodotech Logo" />
        <link
          rel="icon"
          href="https://admin.gizmodotech.com/wp-content/uploads/2024/11/favicon.png"
        />
        <title>
          Gizmodotech - Latest Gadgets, Mobile Reviews, and Tech News
        </title>

        {/* Structured Data for Website */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Gizmodotech",
            "url": "https://gizmodotech.com",
            "description": "Stay up-to-date with Gizmodotech, your ultimate online destination for the latest tech gadgets, mobile reviews, and technology news.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://gizmodotech.com/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}
        </script>
        {/* End Structured Data */}
      </Head>

      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col md:flex-row gap-6 justify-between w-full my-3 py-8">
          <Slider />
          <Featured heading="Vivo" />
        </div>
        <section>
          <h2 style={{ display: "none" }}>Realme</h2>
          <CardWrapper heading="Realme" />
        </section>

        <section>
          <h2 style={{ display: "none" }}>Samsung</h2>
          <CardWrapper heading="Samsung" />
        </section>

        <section>
          <h2 style={{ display: "none" }}>Xiaomi</h2>
          <CardWrapper heading="Xiaomi" />
        </section>
      </div>
    </>
  );
}

export default home;

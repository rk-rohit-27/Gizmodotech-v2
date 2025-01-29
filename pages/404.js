import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
  return (
    <div className="w-full min-h-screen flex justify-center py-10 px-4">
      <Head>
        <title>404 Error - Page Not Found | GizmodoTech</title>
        <meta
          name="description"
          content="404 Error - The page you're looking for does not exist. Please return to the homepage."
        />
        <meta property="og:title" content="404 Error - Page Not Found | GizmodoTech" />
        <meta
          property="og:description"
          content="The page you're looking for could not be found. Return to the homepage of GizmodoTech."
        />
        <meta name="robots" content="noindex, nofollow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "404 Error - Page Not Found",
            "url": "https://gizmodotech.com/404",
            "description":
              "404 Error - The page you're looking for does not exist. Please return to the homepage of GizmodoTech.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://gizmodotech.com/404",
            },
          })}
        </script>
      </Head>

      <main className="max-w-[1200px] mx-auto text-center dark:bg-[#1d1c28] p-8 w-full">
        <section className="space-y-6">
          <h1 className="text-6xl font-extrabold text-red-600">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4 dark:text-white">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.
          </p>
          <p className="mt-6 text-gray-600">
            You can go back to the{" "}
            <Link href="/" passHref
              className="text-[#0D8888] dark:text-[#0D8888] transition-all duration-300 ml-1 font-semibold">
                Home Page
              
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

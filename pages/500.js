import Head from 'next/head';
import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="w-full min-h-screen flex justify-center py-10 px-4">
      <Head>
        <title>500 Error - Internal Server Error | GizmodoTech</title>
        <meta
          name="description"
          content="500 Error - Something went wrong on our end. Please return to the homepage."
        />
        <meta property="og:title" content="500 Error - Internal Server Error | GizmodoTech" />
        <meta
          property="og:description"
          content="Something went wrong on our end. Return to the homepage of GizmodoTech."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="max-w-[1200px] mx-auto text-center dark:bg-[#1d1c28] p-8 w-full">
        <section className="space-y-6">
          <h1 className="text-6xl font-extrabold text-red-600">500</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4 dark:text-white">
            Internal Server Error
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Sorry, something went wrong on our end. Please try again later.
          </p>
          <p className="mt-6 text-gray-600">
            You can go back to the{" "}
            <Link href="/" 
               className="text-[#0D8888] dark:text-[#0D8888] transition-all duration-300 ml-1 font-semibold">
                Home Page
              
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

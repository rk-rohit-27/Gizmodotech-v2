import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { FaTwitter, FaLinkedin, FaWhatsapp, FaCopy } from 'react-icons/fa';
import { TiSocialFacebook } from 'react-icons/ti';
import Sidebar from '../../components/Sidebar';
import { MdCompare } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Toc from '../../components/Toc';



// Function to fetch GraphQL data
const fetchGraphQL = async (query) => { try { const response = await axios.post(process.env.NEXT_PUBLIC_API_URL, { query }); if (response.data.errors) { console.error('GraphQL Errors:', response.data.errors); throw new Error('GraphQL query returned errors'); } return response.data.data; } catch (error) { console.error('Error fetching data from GraphQL:', error); throw new Error('Error fetching data from GraphQL: ' + (error.response?.data || error.message)); } };

// Post Component
const CustomPost = ({ post }) => {
  const { title, content, excerpt, featuredImage, seo, slug, images } = post || {};
  const [currentImage, setCurrentImage] = useState(null);
  const [contentWithIds, setContentWithIds] = useState("");


  const publishedDate = new Date(post?.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const publishedTime = new Date(post?.date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Social media share URLs
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://gizmodotech.com/${slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=https://gizmodotech.com/${slug}&text=${title}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=https://gizmodotech.com/${slug}&title=${title}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=Check%20this%20out:%20https://gizmodotech.com/${slug}`;

  // Copy to Clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://gizmodotech.com/${slug}`);
    alert('Link copied to clipboard!');
  };

  // Redirect to compare page with the device slug
  const handleCompareRedirect = () => {
    window.location.href = `/compare?device1=${slug}`;
  };

  if (!post) {
    return <div>Post not found</div>;
  }
  const handleImageClick = (image) => {
    setCurrentImage(image);

  };
  
   
   
  
  useEffect(() => {
    if (content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");

      // Select all headings
      const headers = doc.querySelectorAll("h2.wp-block-heading, h3.wp-block-heading, h4.wp-block-heading");

      headers.forEach((header, index) => {
        let sanitizedText = header.textContent.trim().replace(/\s+/g, "-").toLowerCase();

        if (!sanitizedText) {
          sanitizedText = `heading-${index + 1}`;
        }

        const id = header.id || sanitizedText + `-${index}`;
        header.id = id;


      });

      const updatedContent = doc.body.innerHTML;
      setContentWithIds(updatedContent);

    }
  }, [content]);


  return (
    <>
      <Head>
        {/* General Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* SEO Meta Tags */}
        <title>{seo?.title || title}</title>
        <meta name="description" content={seo?.metaDesc || excerpt} />
        <link rel="canonical" href={`https://gizmodotech.com/${slug}`} />

        {/* Open Graph Tags */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seo?.opengraphTitle || title} />
        <meta property="og:description" content={seo?.opengraphDescription || excerpt} />
        <meta property="og:url" content={`https://gizmodotech.com/${slug}`} />
        <meta property="og:site_name" content="GizmoTech" />
        <meta property="og:image" content={seo?.opengraphImage?.sourceUrl || featuredImage?.node?.sourceUrl} />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="949" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* Author and Twitter Tags */}
        <meta name="author" content="seo.author" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="seo.author" />
        <meta name="twitter:label2" content="Est. reading time" />
        <meta name="twitter:data2" content="12 minutes" />

        {/* Schema Markup for Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Article",
                  "@id": `https://gizmodotech.com/${slug}/#article`,
                  "isPartOf": {
                    "@id": `https://gizmodotech.com/${slug}/`
                  },
                  "author": {
                    "name": seo?.opengraphAuthor || "rk27rohit@gmail.com", // Dynamically populated author name
                    "@id": seo?.opengraphAuthor || "https://gizmodotech.com/author/default-author/" // Dynamically populated author URL
                  },
                  "headline": title,
                  "datePublished": seo.opengraphPublishedTime,
                  "dateModified": seo.opopengraphModifiedTime,
                  "mainEntityOfPage": {
                    "@id": `https://gizmodotech.com/${slug}/`
                  },

                  "publisher": {
                    "@id": "https://gizmodotech.com/about"
                  },
                  "image": {
                    "@id": featuredImage?.node?.sourceUrl || "default-image.jpg"
                  },
                  "thumbnailUrl": featuredImage?.node?.sourceUrl || "default-image.jpg",
                  "articleSection": ["Tech", "SEO"],
                  "inLanguage": "en-US",
                }
              ]
            })
          }}
        />
      </Head>

      <div className="w-full flex justify-center my-6">
        <div className="max-w-[1200px] gap-3 md:gap-5 grid-column mx-3">
          <article className="overflow-y-auto rounded-xl">
            <div className="bg-gard h-1"></div>
            <div className="bg-[#fafafae6] dark:bg-[#1d1c28] dark:border-[#333146] dark:shadow-lg border px-4 sm:px-5 py-8 border-[#eaeaea]">
              <div className="flex flex-col-reverse justify-between">
                <div className="">
                  
                  <h1 className="text-4xl font-bold mb-2 leading-[1.15]">
                  {title}
                  </h1>
                  {/* Blog Meta Information */}
                  <ul className="text-sm text-[#292929] my-2 flex flex-wrap gap-x-2">
                    <li className="dark:text-[#b3b3b6]">
                      Published on{" "}
                      <span className="text-[#0D8888] font-medium text-sm">
                        {publishedDate}
                      </span>
                    </li>
                    <li>
                      <span className="text-[#0D8888] font-medium text-sm">
                        {publishedTime}
                      </span>
                    </li>
                  </ul>

                  {/* Social Share Buttons */}

                  <div className="flex items-center gap-2 my-4 flex-wrap">
                    <a
                      href={facebookShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-6 bg-[#3b5998] text-white flex items-center rounded-md py-1"
                    >
                      <span className="w-[2.5em] flex justify-center">
                        <span className="bg-white w-[17px] h-[17px] items-end flex justify-center rounded-full">
                          <TiSocialFacebook className="text-[#3b5998]" />
                        </span>
                      </span>
                      <span className="gard leading-4 text-xs pr-3 font-medium h-full flex items-center">
                        Share
                      </span>
                    </a>
                    <a
                      href={twitterShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-6 bg-[#1da1f2] text-white flex items-center rounded-md py-1"
                    >
                      <span className="w-[2.5em] flex justify-center">
                        <FaTwitter />
                      </span>
                      <span className="gard leading-4 text-xs pr-3 font-medium h-full flex items-center">
                        Tweet
                      </span>
                    </a>
                    <a
                      href={linkedinShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-6 bg-[#0077b5] text-white flex items-center rounded-md py-1"
                    >
                      <span className="w-[2.5em] flex justify-center">
                        <FaLinkedin />
                      </span>
                      <span className="gard leading-4 text-xs pr-3 font-medium h-full flex items-center">
                        Share
                      </span>
                    </a>
                    <a
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-6 bg-[#25d366] text-white flex items-center rounded-md py-1"
                    >
                      <span className="w-[2.5em] flex justify-center">
                        <FaWhatsapp />
                      </span>
                      <span className="gard leading-4 text-xs pr-3 font-medium h-full flex items-center">
                        Share
                      </span>
                    </a>
                    <button
                      onClick={copyToClipboard}
                      className="h-6 bg-gray-600 text-white flex items-center rounded-md py-1"
                      aria-label="Copy the device link to clipboard"
                    >
                      <span className="w-[2.5em] flex justify-center">
                        <FaCopy />
                      </span>
                      <span className="gard leading-4 text-xs pr-3 font-medium h-full flex items-center">
                        Copy Link
                      </span>
                    </button>

                    <button
                      onClick={handleCompareRedirect}
                      className="flex items-center py-1 rounded-md gap-2 px-3 bg-[#0d8888] text-white font-semibold text-xs transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#096f6f] focus:outline-none"
                      aria-label="Compare this device with others"
                    >
                      <MdCompare size={20} />
                      Compare This Device
                    </button>
                  </div>
                </div>
                
                

                <div className="overflow-hidden mb-3 w-full rounded-md">
                  <Image
                    src={currentImage || featuredImage}
                    alt={title}
                    className="w-full h-full object-contain"

                    width={1000}
                    height={300}
                    priority
                    onClick={() =>
                      handleImageClick(currentImage || featuredImage)
                    }
                  />
                </div>
              </div>
              {/* Table of Contents */}
              <Toc content={contentWithIds} />

              <section className="content mt-4">
                {contentWithIds ? (
                  <div
                    className="custom-blog"
                    dangerouslySetInnerHTML={{ __html: contentWithIds }}
                  />
                ) : (
                  <p>No content available.</p>
                )}
              </section>

            </div>
          </article>
          <Sidebar categories = {post.categories}/>
        </div>
      </div>
    </>
  );
};
export async function getStaticPaths() {
  const query = `
    query AllSlugs {
      posts {
        nodes {
          slug
        }
      }
    }
  `;

  try {
    // Fetch the list of slugs (you might need to adjust this query based on your GraphQL schema)
    const data = await fetchGraphQL(query);
    const posts = data?.posts?.nodes || [];

    // Generate paths for each slug
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));

    return {
      paths, // The paths that should be statically generated
      fallback: 'blocking', // You can set this to 'false', 'true', or 'blocking'
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking', // Handle errors gracefully
    };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const query = `
    query PostBySlug {
      post(id: "${slug}", idType: SLUG) {
        id
        title
        excerpt
        slug
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
        }
        tags {
          nodes {
            name
          }
        }
        author {
          node {
            name
          }
        }
          categories {
          nodes {
            name
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL(query);
    const post = data?.post;

    if (!post) {
      return { notFound: true };
    }

    

    // Return the fetched post data as props to the component
    const postWithDetails = {
      ...post,
      featuredImage: post.featuredImage?.node?.sourceUrl,
      imageAlt: post.featuredImage?.node?.altText,
      tags: post.tags?.nodes.map((tag) => tag.name),
      author: post.author?.node?.name,
      
    };

    return {
      props: {
        post: postWithDetails,
      },
      revalidate: 60, // Optional: Re-generate page at most once every 60 seconds
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}


export default CustomPost;

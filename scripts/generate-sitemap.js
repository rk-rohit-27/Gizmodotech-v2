const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Your site URL
const SITE_URL = 'https://gizmodotech.com';

// Define the GraphQL query to fetch posts
const POST_QUERY = `
  query {
    posts(first: 100) {
      edges {
        node {
          title
          slug
          modified
        }
      }
    }
  }
`;

// Function to fetch post URLs using GraphQL
async function fetchPostUrls() {
  try {
    const response = await axios.post('https://admin.gizmodotech.com/graphql', {
      query: POST_QUERY,
    });

    // Extract post slugs and modified dates, and return as objects
    const posts = response.data.data.posts.edges;
    return posts.map(post => ({
      url: `${SITE_URL}/post/${post.node.slug}`,
      lastModified: post.node.modified,
    }));
  } catch (error) {
    console.error('Error fetching posts from GraphQL:', error);
    return [];
  }
}

// Create the function to generate the sitemap
async function generateSitemap() {
  const staticPages = [
    '',        // Homepage
    '/about',  // Static pages
    '/contact',
    '/terms',
    '/privacy',
    '/compare',
    "/post"
  ];

  // Fetch dynamic post URLs and their modified dates using GraphQL
  const postUrls = await fetchPostUrls();

  // Combine static and dynamic URLs
  const allUrls = staticPages.map(page => ({
    url: `${SITE_URL}${page}`,
    lastModified: new Date().toISOString(), // Use the current date for static pages
  })).concat(postUrls);

  // Start building the XML structure for the sitemap
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add each URL to the sitemap
  allUrls.forEach(({ url, lastModified }) => {
    sitemapXml += `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>`;
  });

  // Close the XML structure
  sitemapXml += `</urlset>`;

  // Ensure the public directory exists
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Write the XML to a file in the public directory
  const filePath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(filePath, sitemapXml, 'utf8');
  console.log('Sitemap generated successfully!');
}

// Run the function
generateSitemap().catch(error => {
  console.error('Error generating sitemap:', error);
});

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/playground",
    },
    sitemap: "https://linksamarelos.com/sitemap.xml",
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "rw1qqgsmaxclw3vy.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "i.ytimg.com" },
      { hostname: "i9.ytimg.com" },
      { hostname: "yt3.ggpht.com" },
    ],
  },
};

export default nextConfig;

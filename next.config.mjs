/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/ticko/:path*", // Frontend API route
        destination: "http://104.197.183.167/ticko/:path*", // Backend API URL
      },
    ];
  },
};

export default nextConfig;

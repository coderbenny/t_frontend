/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/ticko/:path*", // Frontend API route
        destination: "http://34.35.77.253/ticko/:path*", // Backend API URL
        // destination: "http://127.0.0.1:5555/ticko/:path*", // Backend API URL
      },
    ];
  },
};

export default nextConfig;

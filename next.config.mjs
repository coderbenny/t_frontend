/** @type {import('next').NextConfig} */
const nextConfig = {
    sync rewrites() {
        return [
          {
            source: '/ticko/:path*', // Frontend API route
            destination: 'http://34.46.249.52:9001/ticko/:path*', // Backend API URL
          },
        ];
      },
};

export default nextConfig;

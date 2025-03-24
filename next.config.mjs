/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        port: '',
        pathname: '/b/**/*',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'cryqteehsbqplnvtmyvf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/athena/**/*',
        search: '',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  }
};

export default nextConfig;

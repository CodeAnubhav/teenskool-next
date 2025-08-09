/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'miro.medium.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'styles.redditmedia.com',
          pathname: '/**',
        },
        // ADD THIS NEW OBJECT FOR YOUTUBE
        {
          protocol: 'https',
          hostname: 'img.youtube.com',
          pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'placehold.co',
            pathname: '/**',
          },
      ],
    },
  };

export default nextConfig;

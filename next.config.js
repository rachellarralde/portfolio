/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'a.storyblok.com',
      'shop.output.com',
      'output.com',
      'images.unsplash.com',
      'missingbrontosaur.us'
    ],
    unoptimized: true,
  },
  output: 'export',
};

module.exports = nextConfig;

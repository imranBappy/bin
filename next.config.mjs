/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "w3storage.s3-ap-south-1.amazonaws.com"],
  },
};

export default nextConfig;

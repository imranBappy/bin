import nextPWA from "@ducanh2912/next-pwa";
const withPWA = nextPWA({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
  fallbacks: {
    document: "/offline",
  },
  workboxOptions: {
    disableDevLogs: true,
  },
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["picsum.photos", "w3storage.s3-ap-south-1.amazonaws.com"],
  },
};

export default withPWA(nextConfig);

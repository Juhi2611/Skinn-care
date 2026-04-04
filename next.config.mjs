/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/cart",
        destination: "/ritual-cart",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

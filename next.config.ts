import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net", pathname: "/user_3LZ8my4o5R9prXx0ZTCU28u6qVU/**" }],
  },
  async redirects() {
    return [
      { source: "/", destination: "/es", permanent: false },
      { source: "/:lang(es|en)/noticias", destination: "/:lang/blog", permanent: true },
    ];
  },
};

export default nextConfig;

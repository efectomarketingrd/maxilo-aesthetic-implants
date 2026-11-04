import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/es", permanent: false },
      { source: "/:lang(es|en)/noticias", destination: "/:lang/blog", permanent: true },
    ];
  },
};

export default nextConfig;

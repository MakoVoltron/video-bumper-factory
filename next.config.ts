import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "font-src 'self' https://js.stripe.com",
              "script-src 'self' https://js.stripe.com",
              "frame-src https://js.stripe.com",
              "connect-src 'self' https://api.stripe.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

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
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://js.stripe.com`,
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' https://js.stripe.com",
              "frame-src https://js.stripe.com",
              "connect-src 'self' https://api.stripe.com https://res.cloudinary.com",
              "img-src 'self' blob: data: https://*.stripe.com https://res.cloudinary.com",
              "media-src 'self' blob: https://res.cloudinary.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

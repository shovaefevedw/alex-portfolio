import type { NextConfig } from "next";

const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? "/alex-portfolio" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(pages
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
      }
    : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    ...(pages
      ? {
          loader: "custom" as const,
          loaderFile: "./image-loader.ts",
        }
      : {}),
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

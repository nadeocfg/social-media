import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(path.resolve(), "styles")],
    prependData: `@import "variables.module.scss";`,
  },
};

export default nextConfig;

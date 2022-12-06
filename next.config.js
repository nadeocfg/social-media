import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(path.resolve(), "styles")],
    prependData: `@import "variables.module.scss";`,
  },
};

export default nextConfig;

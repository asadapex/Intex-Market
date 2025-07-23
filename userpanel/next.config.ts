import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["3.87.71.145"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

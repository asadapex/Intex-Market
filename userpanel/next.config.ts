import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["18.184.169.185"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

const nextConfig = {
  output: "export",
  distDir: "out",
  reactStrictMode: true,
  swcMinify: true,
  images: { unoptimized: true },
  transpilePackages: [
    "@ionic/react",
    "@ionic/core",
    "@stencil/core",
    "ionicons",
  ],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, os: false, path: false };

    return config;
  },
};

module.exports = nextConfig;

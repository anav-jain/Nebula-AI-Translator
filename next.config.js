/** @type {import('next').NextConfig} */
const nextConfig = {
    // Override the default webpack config to exclude node-specific modules from the client bundle
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "sharp$": false,
            "onnxruntime-node$": false,
        }
        return config;
    },
};

module.exports = nextConfig;

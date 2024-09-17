/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
        serverActions: {
            bodySizeLimit: '3mb'
        }
    }
};

export default nextConfig;

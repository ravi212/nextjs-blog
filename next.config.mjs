/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
        serverActions: {
            bodySizeLimit: '3mb'
        }
    },
    images: {
        domains: ['blog.rainaspace.com']
    }
};

export default nextConfig;

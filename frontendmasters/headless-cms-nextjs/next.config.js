const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors. This was instructed as part of the course.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
}

module.exports = nextConfig

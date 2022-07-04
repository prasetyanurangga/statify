/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLIENT_ID_SPOTIFY:process.env.CLIENT_ID_SPOTIFY,
    BASE_URI:process.env.BASE_URI,
    STATE:process.env.STATE
  },
}

module.exports = nextConfig

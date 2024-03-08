/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/github',
        destination: 'https://github.com/Natchii59/nextjs-starter',
        permanent: true
      }
    ]
  }
}

export default nextConfig

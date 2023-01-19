/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images:{
    domains: ['scontent.fsaw1-11.fna.fbcdn.net', 'platform-lookaside.fbsbx.com']
  },
  experimental:{
    // urlImports: ['https://scontent.fsaw1-11.fna.fbcdn.net'],
    appDir: true
  }
}

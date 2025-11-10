
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.alegretetudo.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.furg2-1.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent-*.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'logodownload.org',
      },
      {
        protocol: 'https',
        hostname: 'www.gov.br',
      },
      {
        protocol: 'https',
        hostname: 'www.taiyampa.com.br',
      },
      {
        protocol: 'https',
        hostname: 'gauchazh.clicrbs.com.br',
      },
      {
        protocol: 'https',
        hostname: 'www.detran.rs.gov.br',
      },
      {
        protocol: 'https',
        hostname: 'www.sefaz.rs.gov.br',
      },
      {
        protocol: 'https',
        hostname: 'www.tre-rs.jus.br',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      }
    ],
  },
};

export default nextConfig;

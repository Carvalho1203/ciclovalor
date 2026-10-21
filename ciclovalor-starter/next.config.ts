import type { NextConfig } from 'next';
// Services needs request-time server rendering. Local static exports remain available.
const config: NextConfig = {
  ...(process.env.VERCEL === '1' ? {} : { output: 'export' as const }),
  allowedDevOrigins: ['terminal.local'],
  images: { unoptimized: true },
  trailingSlash: true,
};
export default config;

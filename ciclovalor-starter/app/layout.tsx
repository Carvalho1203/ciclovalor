import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'CicloValor · Pequenas atitudes. Novos ciclos.', description: 'Uma nova forma de conectar reciclagem, comunidade e cuidado com Vassouras. Conheça a proposta inicial do CicloValor.', applicationName: 'CicloValor', manifest: '/manifest.webmanifest', icons: {icon:'/icon.svg',apple:'/icon.svg'} };
export const viewport: Viewport = {themeColor:'#174c3a',width:'device-width',initialScale:1};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { return <html lang="pt-BR"><body>{children}</body></html>; }

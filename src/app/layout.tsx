import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LegalStock - Contratos Legales Profesionales',
  description: 'Accede a una biblioteca completa de contratos legales en México'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

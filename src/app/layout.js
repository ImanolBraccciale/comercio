"use client"
import { Inter } from 'next/font/google';
import StoreProvider from './utils/storeProvider';
 

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <StoreProvider >
        <html lang="es">
          <body  >{children}</body>
        </html>
    </StoreProvider>
  );
}
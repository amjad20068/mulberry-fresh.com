import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import { Navbar } from '@/components/Navbar';
import { SideCart } from '@/components/SideCart';
import { Footer } from '@/components/Footer';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: 'Mulberry Fresh | Premium Halal Fresh Meat',
  description: 'Premium Halal Fresh Meat Delivered Daily. Fresh Beef, Mutton, and Farm Fresh Chicken. Mulberry Fresh.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body className={outfit.className}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <SideCart />
        </CartProvider>
      </body>
    </html>
  );
}

// app/layout.jsx
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SupabaseProvider } from '@/contexts/SupabaseContext';

export const metadata = {
  title: 'TeenSkool',
  description: 'Empowering youth through learning and innovation',
  icon: '/favicon.ico',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SupabaseProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

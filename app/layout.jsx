// app/layout.jsx
import './globals.css';
import Script from 'next/script';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SupabaseProvider } from '@/contexts/SupabaseContext';
import PostHogProvider from '@/components/analytics/PostHogProvider';

export const metadata = {
  title: 'TeenSkool',
  description: 'Empowering youth through learning and innovation',
  icon: '/favicon.ico',
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-KK33TLG6';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <PostHogProvider>
          <ThemeProvider>
            <SupabaseProvider>
              <Navigation />
              <main>{children}</main>
              <Footer />
              <Toaster />
            </SupabaseProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}

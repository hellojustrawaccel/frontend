import '@/app/global.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { Karla, Ysabeau } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';

import Background from '@/components/Background';
import DesktopNav from '@/components/nav/DesktopNav';
import MobileNav from '@/components/nav/MobileNav';
import PreChildrenDiv from '@/components/PreChildrenDiv';
import { SITE_URL } from '@/constants/env.constant';
import NextAuthProvider from '@/providers/NextAuthProvider';

const ysabeau = Ysabeau({ subsets: ['latin'], style: 'italic', variable: '--font-ysabeau' });
const karla = Karla({ subsets: ['latin'], variable: '--font-karla' });

const helveticaNeue = localFont({
  weight: '300',
  src: [
    {
      path: '../../public/fonts/helvetica-neue/HelveticaNeueLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica-neue/HelveticaNeueRoman.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica-neue/HelveticaNeueMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica-neue/HelveticaNeueBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica-neue/HelveticaNeueItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/helvetica-neue/HelveticaNeueMediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-helvetica-neue',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'justrawaccel',
    template: '%s — justrawaccel',
  },
  description: 'backend engineer & pianist',
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={`${helveticaNeue.variable} ${ysabeau.variable} ${karla.variable} @container/screen h-full w-full font-sans antialiased`}
    >
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <NextAuthProvider>
          <Background />

          <DesktopNav />
          <MobileNav />

          <PreChildrenDiv>
            {children}

            <SpeedInsights />
            <Analytics />
          </PreChildrenDiv>
        </NextAuthProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default HomeLayout;

import './globals.css';
import { Analytics } from '@vercel/analytics/next';

const siteUrl = 'https://www.renew360cleaning.com';

const title =
  'Renew 360 Cleaning Company LLC | Residential, Commercial & Construction Cleaning';

const description =
  'Renew 360 Cleaning Company LLC provides residential, office, commercial and construction cleaning, including deep cleaning, move-in and move-out cleaning, cleanouts and haul-off preparation. Request a free estimate from Rebecca Turner.';

/** @type {import('next').Metadata} */
export const metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: 'Renew 360 Cleaning Company LLC',

  title: {
    default: title,
    template: '%s | Renew 360 Cleaning Company LLC',
  },

  description,

  keywords: [
    'Renew 360 Cleaning Company LLC',
    'Renew 360 Cleaning',
    'Hot Springs cleaning company',
    'Hot Springs Arkansas cleaning services',
    'residential cleaning',
    'commercial cleaning',
    'office cleaning',
    'construction cleanup',
    'construction site cleaning',
    'deep cleaning',
    'move-in cleaning',
    'move-out cleaning',
    'cleanouts',
    'haul-off preparation',
    'junk removal help',
  ],

  authors: [
    {
      name: 'Renew 360 Cleaning Company LLC',
      url: siteUrl,
    },
  ],

  creator: 'Renew 360 Cleaning Company LLC',
  publisher: 'Renew 360 Cleaning Company LLC',
  category: 'Cleaning Services',

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Renew 360 Cleaning Company LLC',
    title,
    description:
      'Clean spaces. Renewed lives. Residential, commercial and construction cleaning from Renew 360 Cleaning Company LLC.',
    images: [
      {
        url: '/images/openings-available-square.jpg',
        alt: 'Renew 360 Cleaning Company LLC cleaning services',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title,
    description:
      'Residential, commercial, construction, deep cleaning, move-in and move-out cleaning, cleanouts and haul-off help.',
    images: ['/images/openings-available-square.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  verification: {
    google: '97kp9Tzd4pV0i6adBrlENhf6f-VSCtazt-MaHHHDKjc',
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#072b58',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
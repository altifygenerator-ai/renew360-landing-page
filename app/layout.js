import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Renew 360 Cleaning Company LLC | Residential, Commercial & Construction Cleaning',
  description:
    'Renew 360 Cleaning Company LLC provides residential, office, construction, deep cleaning, move-in and move-out cleaning, cleanouts and haul-off help. Call or text Rebecca Turner for a free estimate.',
  keywords: [
    'Renew 360 Cleaning Company LLC',
    'residential cleaning',
    'commercial cleaning',
    'construction cleanup',
    'deep cleaning',
    'move out cleaning',
    'office cleaning',
    'cleanouts'
  ],
  openGraph: {
    title: 'Renew 360 Cleaning Company LLC',
    description: 'Clean spaces. Renewed lives. Glorifying God in all we do.',
    type: 'website',
    images: ['/images/renew360-official-flyer.jpg']
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

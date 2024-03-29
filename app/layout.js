import Navbar from './components/navbar';
import NextTopLoader from 'nextjs-toploader';
import './globals.css'
import { Lato } from 'next/font/google';
import { Providers } from './components/providers';

const inter = Lato({ subsets: ['latin'], weight: ['100', '300', '400', '700', '900'] })

export const metadata = {
  title: 'WeatherApp',
  description: 'Instant weather updates for any city with our WeatherApp. Accurate forecasts at your fingertips. Plan your day with confidence!',
  generator: 'Next.js',
  applicationName: 'WeatherApp',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Jakub Czyszczoń', url: 'https://github.com/JCzyszczon' }],
  creator: 'Jakub Czyszczoń',
  keywords: ['Weather', 'Weather App', 'WeatherApp', 'Weahter Poland', 'Poland', 'Check weather'],
  alternates: {
    canonical: 'https://weather.jczyszczon.pl',
  },
  themeColor: '#0095ff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader color='#0095ff'/>
          <div className="w-full md:h-screen min-h-screen flex sm:flex-row flex-col lg:p-12 px-4 py-8 lg:gap-6 gap-2 text-[#202b3b] bg-[#f5f5f5] dark:text-[#e0ecff] dark:bg-[#222222] duration-500">
            <Navbar/>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Edulab',
  description: 'Edulab is an online learning website',
}


import { ThemeProvider } from '@/provider/theme'
import { Toaster } from "@/provider/toaster"
import Navbar from '@/components/navbar/Navbar'
import getuser from '@/lib/getuser'
import Footer from '@/components/Footer/Footer'
import UseStoreInitializer from '@/components/navbar/storeuser'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const fetchUser = async () => {
    const response = await fetch(`${process.env.backend}/auth/getuser`,
      {
        method: "post",
        credentials: 'include',
      });
  };

  await fetchUser();
  let user = await getuser();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css'></link>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/katex.min.css'></link>

      </head>
      <body className={inter.className + ' h-screen m-0'}>
        <div className='h-screen flex flex-col justify-between'>
          {
            user ? (
              <UseStoreInitializer name={user.name} email={user.email} image={user.image} createdAt={user.createdAt} updatedAt={user.updatedAt} mobile_number={user.mobile_number} isauthenticated={user.isauthenticated} />
            ) : (
              <UseStoreInitializer name='' email='' image='' mobile_number='' isauthenticated={false} createdAt={new Date} updatedAt={new Date} />
            )
          }
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <div className="flex-1">
              {children}

            </div>
            <Toaster />
          </ThemeProvider>

          <Footer />
        </div>
      </body>
    </html>
  )
}

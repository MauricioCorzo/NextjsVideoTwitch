/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: 'Twitch Clone',
    description: 'Coded By Mauricio Corzo',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang='en'>
                <head>
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={''} />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800&family=Poppins:wght@400;600;700&display=swap'
                        rel='stylesheet'
                    />
                </head>
                <body className={`font-[Montserrat] text-sm md:text-base`}>
                    <ThemeProvider attribute='class' storageKey='gamehub-theme' forcedTheme='dark'>
                        <Toaster theme='light' position='bottom-center' richColors />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}

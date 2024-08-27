import { Logo } from './_components/Logo';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`grid place-items-center py-10 space-y-4 [&>div>div>div:last-of-type]:hidden`}>
            <Logo />
            {children}
        </div>
    );
}

"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLandingPage = pathname === "/" || pathname === "";

    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                {isLandingPage ? (
                    <main className="min-h-screen bg-black text-white">
                        {children}
                    </main>
                ) : (
                    <AppShell>{children}</AppShell>
                )}
            </body>
        </html>
    );
}

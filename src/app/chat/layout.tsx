
import { TopNav } from "@/components/top-nav";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="whatsapp">
            <body>
                <TopNav />
                {children}
            </body>
        </html>
    );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'AI Translator',
    description: 'Browser-based AI translation powered by Transformers.js',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

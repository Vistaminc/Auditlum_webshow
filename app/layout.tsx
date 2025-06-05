import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://auditluma.com'),
  title: 'AuditLuma - AI驱动的代码安全审计工具',
  description: 'AuditLuma是一款强大的代码安全审计工具，基于双后端架构，帮助开发者自动发现和修复代码中的安全漏洞。',
  authors: [{ name: 'AuditLuma Team' }],
  keywords: ['代码审计', '安全检测', 'AI代码修复', '安全漏洞检测', '代码质量'],
  icons: {
    icon: '/icon/facvion.png',
    shortcut: '/icon/facvion.png',
    apple: '/icon/facvion.png',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://auditluma.com',
    title: 'AuditLuma - AI驱动的代码安全审计工具',
    description: 'AuditLuma是一款强大的代码安全审计工具，基于双后端架构，帮助开发者自动发现和修复代码中的安全漏洞。',
    siteName: 'AuditLuma',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AuditLuma Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuditLuma - AI驱动的代码安全审计工具',
    description: 'AuditLuma是一款强大的代码安全审计工具，基于双后端架构，帮助开发者自动发现和修复代码中的安全漏洞。',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

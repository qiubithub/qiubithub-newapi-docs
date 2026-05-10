import type {Metadata} from 'next';
import './globals.css';

const siteTitle = '丘比特 API | AI 编程工具 API 服务';
const siteDescription = '让 Claude Code、Codex、Gemini CLI、OpenCode 在国内稳定可用，一个账号管理 Key、余额和调用记录。';
const defaultBrandLogoUrl =
  'https://qiubithub-1396711629.cos.ap-guangzhou.myqcloud.com/qiubitHub-icon.png';
const brandLogoUrl =
  process.env.NEXT_PUBLIC_BRAND_LOGO_URL ??
  process.env.NEXT_PUBLIC_GATEWAY_LOGO_URL ??
  defaultBrandLogoUrl;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL('https://www.qiubithub.com'),
  icons: {
    icon: brandLogoUrl,
    shortcut: brandLogoUrl,
    apple: brandLogoUrl,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://www.qiubithub.com',
    siteName: '丘比特 API',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

import { ThemeProvider } from '@/providers/theme-provider'
import NextAuthSessionProvider from './sessionProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextAuthSessionProvider>
  )
}

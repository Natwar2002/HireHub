
import {HeroUIProvider, ToastProvider} from '@heroui/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";

export default function HeroProvider({children}) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
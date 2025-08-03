import { useTheme as useNextTheme } from "next-themes"

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()
  
  return {
    theme,
    setTheme,
    systemTheme,
    resolvedTheme: theme === "system" ? systemTheme : theme
  }
} 
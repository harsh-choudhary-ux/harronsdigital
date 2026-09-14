import { useState, useRef, useEffect } from 'react'

/**
 * Manages isDark state, syncs the body class, and exposes a ref
 * for use inside RAF loops without stale closure issues.
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)
  const isDarkRef = useRef(false)

  useEffect(() => {
    isDarkRef.current = isDark
    if (isDark) {
      document.body.classList.add('hero-cosmic-dark')
    } else {
      document.body.classList.remove('hero-cosmic-dark')
    }
    return () => {
      document.body.classList.remove('hero-cosmic-dark')
    }
  }, [isDark])

  return { isDark, setIsDark, isDarkRef }
}

import { useState, useEffect } from 'react'

const ROLES = ['UI UX Designer', 'CRO Designer', 'Product Designer']

/**
 * Cycles through the provided roles array every `intervalMs` milliseconds.
 * Returns the currently active role string.
 */
export function useRoleRotator(roles = ROLES, intervalMs = 5000) {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [roles.length, intervalMs])

  return roles[roleIndex]
}

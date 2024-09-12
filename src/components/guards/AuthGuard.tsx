"use client"
// ** React Imports
import { useEffect } from 'react'

// ** Hooks Import
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const AuthGuard = props => {
  const { children, fallback } = props
  const session = useSession()
  const router = useRouter();
  const pathName = usePathname()
  useEffect(
    () => {
      if (session.status == 'unauthenticated') {
        if (pathName !== '/') {
          router.replace('/signin')
        } else {
          router.replace('/admin')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathName, session.status]
  )
  
  if (session.status !== 'authenticated') {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard

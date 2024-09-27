'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button, type ButtonProps } from './ui/button'

export function ButtonLogout(props: ButtonProps) {
  const router = useRouter()

  return (
    <Button
      {...props}
      onClick={async () => {
        await signOut({ redirect: false })
        router.replace('/login')
      }}
    >
      Logout
    </Button>
  )
}

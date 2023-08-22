'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function UserLinks() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const handleSignOut = () => {
    signOut()
    router.push('/')
  }
  return (
    <div>
      {status === 'authenticated' ? (
        <>
          <Link
            href='/orders'
            className='ml-2'>
            Orders
          </Link>
          <span
            className='mx-4 cursor-pointer'
            onClick={handleSignOut}>
            Logout
          </span>
        </>
      ) : (
        <Link href='/login'>Login</Link>
      )}

      {session?.user.isAdmin && <Link href='/add'>Add Product</Link>}
    </div>
  )
}

export default UserLinks

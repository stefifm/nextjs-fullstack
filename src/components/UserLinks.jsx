'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function UserLinks() {
  const { status } = useSession()
  return (
    <div>
      {status === 'authenticated' ? (
        <>
          <Link href='/add'>Add Product</Link>
          <Link
            href='/orders'
            className='ml-2'>
            Orders
          </Link>
          <span
            className='ml-4 cursor-pointer'
            onClick={() => signOut()}>
            Logout
          </span>
        </>
      ) : (
        <Link href='/login'>Login</Link>
      )}
    </div>
  )
}

export default UserLinks

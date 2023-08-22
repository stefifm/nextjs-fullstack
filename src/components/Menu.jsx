'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import CartIcon from './CartIcon'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const links = [
  { id: 1, title: 'HomePage', url: '/' },
  { id: 2, title: 'Menu', url: '/menu' },
  { id: 3, title: 'Working Hours', url: '/' },
  { id: 4, title: 'Contact', url: '/' }
]

function Menu() {
  const [open, setOpen] = useState(false)

  const { data: session, status } = useSession()

  const router = useRouter()

  const handleSignOut = () => {
    signOut()
    router.push('/')
  }
  return (
    <div>
      {!open ? (
        <Image
          src='/open.png'
          alt='menu open icon'
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
          onClick={() => setOpen(!open)}
        />
      ) : (
        <Image
          src='/close.png'
          alt='menu close icon'
          width='20'
          height='20'
          onClick={() => setOpen(!open)}
        />
      )}
      {open && (
        <div className='bg-red-500 text-white absolute left-0 top-24 h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl w-full z-10'>
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              onClick={() => setOpen(!open)}>
              {link.title}
            </Link>
          ))}
          {status === 'unauthenticated' ? (
            <Link
              href='/login'
              onClick={() => setOpen(!open)}>
              Login
            </Link>
          ) : (
            <>
              <Link
                href='/orders'
                onClick={() => setOpen(!open)}>
                Orders
              </Link>

              {session?.user.isAdmin && (
                <Link
                  href='/add'
                  onClick={() => setOpen(!open)}>
                  Add Product
                </Link>
              )}

              <span
                className='mx-4 cursor-pointer'
                onClick={handleSignOut}>
                Logout
              </span>

              <Link
                href='/cart'
                onClick={() => setOpen(!open)}>
                <CartIcon />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Menu

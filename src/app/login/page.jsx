'use client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <div className='p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center'>
      {/* BOX */}
      <div className='h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-[50%]'>
        {/* IMAGE CONTAINER */}
        <div className='relative h-1/3 w-full md:h-full md:w-1/2'>
          <Image
            src='/loginBg.png'
            alt='login image'
            fill
            className='object-cover'
            sizes='(min-width: 768px) 50vw, 100vw'
            priority={true}
          />
        </div>
        {/* FORM CONTAINER */}
        <div className='p-10 flex flex-col gap-8 md:w-1/2'>
          <h1 className='uppercase font-bold text-xl xl:text-3xl'>welcome</h1>
          <p>Log into your account or create a new one using social accounts</p>
          <button
            className='flex gap-4 p-4 ring-1 ring-orange-100 rounded-md'
            onClick={() => signIn('google')}>
            <Image
              src='/google.png'
              alt='google logo'
              width={20}
              height={20}
              className='object-contain'
            />
            <span>Sign in with Google</span>
          </button>
          <p className='text-sm'>
            Have a problem?{' '}
            <Link
              className='underline'
              href='/'>
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

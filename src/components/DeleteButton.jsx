'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

function DeleteButton({ id }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (session === 'unauthenticated' || !session?.user.isAdmin) {
    return
  }

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE'
    })

    if (res.status === 200) {
      router.push('/menu')
      toast.success('Product deleted successfully')
    } else {
      const data = await res.json()
      toast.error(data.message)
    }
  }

  return (
    <button
      className='bg-red-400 text-white p-2 rounded-full absolute top-4 right-4'
      onClick={handleDelete}>
      <Image
        src='/delete.png'
        alt='delete img'
        width={20}
        height={20}
      />
    </button>
  )
}

export default DeleteButton

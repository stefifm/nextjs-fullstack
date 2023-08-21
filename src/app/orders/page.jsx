'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

function OrdersPage() {
  const { data: session, status } = useSession()

  const router = useRouter()

  if (status === 'unauthenticated') {
    router.push('/')
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch('http://localhost:3000/api/orders').then((res) => res.json())
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ id, status }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(status)
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    }
  })

  const handleUpdate = (e, id) => {
    e.preventDefault()
    const form = e.target
    const input = form.elements[0]
    const status = input.value

    mutation.mutate({ id, status })
    toast.success('The order status has been updated successfully')
  }

  if (isLoading || status === 'loading') return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className='p-4 lg:px-20 xl:px-40'>
      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr className='text-left'>
            <th className='hidden md:block'>Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className='hidden md:block'>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              className={`${item.status !== 'delivered' && 'bg-red-50'}`}
              key={item.id}>
              <td className='hidden md:block py-6 px-1'>{item.id}</td>
              <td className='py-6 px-1'>{item.createdAt.toString().slice(0, 10)}</td>
              <td className='py-6 px-1'>{item.price}</td>
              {item.products.map((product, index) => (
                <td
                  className='hidden md:flex py-3  px-1'
                  key={index}>
                  {product.title}
                </td>
              ))}

              {session.user.isAdmin ? (
                <td>
                  <form
                    action=''
                    className='flex items-center justify-center gap-4'
                    onSubmit={(e) => handleUpdate(e, item.id)}>
                    <input
                      placeholder={item.status}
                      className='p-2 ring-1 ring-red-100 rounded-md'
                    />
                    <button className='bg-red-400 p-2 rounded-full'>
                      <Image
                        src='/edit.png'
                        alt='edit button'
                        width={20}
                        height={20}
                      />
                    </button>
                  </form>
                </td>
              ) : (
                <td className='py-6 px-1'>{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersPage

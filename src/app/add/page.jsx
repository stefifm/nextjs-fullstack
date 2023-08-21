'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function AddPage() {
  const { data: session, status } = useSession()
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    img: '',
    price: 0,
    catSlug: ''
  })

  const [option, setOption] = useState({
    title: '',
    additionalPrice: 0
  })

  const [options, setOptions] = useState([])

  const router = useRouter()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated' || !session?.user.isAdmin) {
    router.push('/')
  }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const changeOption = (e) => {
    const { name, value } = e.target
    const newValue = name === 'additionalPrice' ? parseFloat(value) : value
    setOption((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formattedOptions = options.map((opt) => ({
        ...opt,
        additionalPrice: parseFloat(opt.additionalPrice)
      }))

      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify({ ...inputs, options: formattedOptions })
      })

      const data = await res.json()
      router.push(`/product/${data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form
        className='shadow-lg flex flex-wrap gap-4 p-8'
        onSubmit={handleSubmit}>
        <h1>Add New Product</h1>
        <div className='w-full flex flex-col gap-2'>
          <label>Title</label>
          <input
            type='text'
            name='title'
            className='ring-1 ring-red-200 rounded-sm'
            onChange={handleChange}
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label>Image</label>
          <input
            type='text'
            name='img'
            className='ring-1 ring-red-200 rounded-sm'
            onChange={handleChange}
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label>Description</label>
          <textarea
            name='desc'
            className='ring-1 ring-red-200 rounded-sm'
            onChange={handleChange}></textarea>
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label>Price</label>
          <input
            type='number'
            name='price'
            className='ring-1 ring-red-200 rounded-sm'
            onChange={handleChange}
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label>Category</label>
          <input
            type='text'
            name='catSlug'
            className='ring-1 ring-red-200 rounded-sm'
            onChange={handleChange}
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label>Options</label>
          <div>
            <input
              type='text'
              placeholder='Title'
              name='title'
              className='ring-1 ring-red-200 rounded-sm'
              onChange={changeOption}
            />
            <input
              type='number'
              placeholder='Additional Price'
              name='additionalPrice'
              className='ring-1 ring-red-200 rounded-sm'
              onChange={changeOption}
            />
          </div>
          <div
            className='w-52 bg-red-500 text-white p-2'
            onClick={() => setOptions((prev) => [...prev, option])}>
            Add Option
          </div>
        </div>

        <div>
          {options.map((item) => (
            <div
              className='ring-1 p-2 ring-red-500 rounded-md cursor-pointer'
              key={item.tile}
              onClick={() => setOptions(options.filter((option) => option.title !== item.title))}>
              <span>{item.title}</span>
              <span>${item.additionalPrice}</span>
            </div>
          ))}
        </div>

        <button
          type='submit'
          className='w-full bg-red-500 text-white p-2'>
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddPage

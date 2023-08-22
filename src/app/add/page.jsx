'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function AddPage() {
  const { data: session, status } = useSession()
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    price: 0,
    catSlug: ''
  })

  const [option, setOption] = useState({
    title: '',
    additionalPrice: 0
  })

  const [options, setOptions] = useState([])
  const [file, setFile] = useState()

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

  const handleChangeImage = (e) => {
    const target = e.target
    const item = target.files[0]
    setFile(item)
  }

  const upload = async () => {
    try {
      const dataForm = new FormData()
      dataForm.append('file', file)
      dataForm.append('upload_preset', 'restaurant')

      const res = await fetch('https://api.cloudinary.com/v1_1/stefigallery/image/upload', {
        method: 'POST',
        body: dataForm
      })

      if (!res.ok) {
        throw new Error('Upload image failed', await res.text())
      }
      const dataImage = await res.json()
      return dataImage.url
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const imageUrl = await upload()
      const formattedOptions = options.map((opt) => ({
        ...opt,
        additionalPrice: parseFloat(opt.additionalPrice)
      }))

      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify({ img: imageUrl, ...inputs, options: formattedOptions })
      })

      const data = await res.json()
      router.push(`/product/${data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-4 my-9 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-red-500'>
      <form
        className='shadow-lg flex flex-wrap gap-4 p-8'
        onSubmit={handleSubmit}>
        <h1 className='text-4xl mb-2 text-gray-300 font-bold'>Add New Product</h1>
        <div className='w-full flex flex-col gap-2'>
          <label>Title</label>
          <input
            type='text'
            name='title'
            className='ring-1 ring-red-200 rounded-sm p-2'
            onChange={handleChange}
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label>Image</label>
          <input
            type='file'
            id='file'
            name='file'
            className='ring-1 ring-red-200 rounded-sm p-2'
            onChange={handleChangeImage}
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
            step='0.01'
            className='ring-1 ring-red-200 rounded-sm p-2'
            onChange={handleChange}
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label>Category</label>
          <input
            type='text'
            name='catSlug'
            className='ring-1 ring-red-200 rounded-sm p-2'
            onChange={handleChange}
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label>Options</label>
          <div className='flex gap-3'>
            <input
              type='text'
              placeholder='Title'
              name='title'
              className='ring-1 ring-red-200 rounded-sm p-2'
              onChange={changeOption}
            />
            <input
              type='number'
              placeholder='Additional Price'
              name='additionalPrice'
              className='ring-1 ring-red-200 rounded-sm p-2'
              onChange={changeOption}
            />
          </div>
          <input
            className='w-52 bg-red-500 text-white p-2 cursor-pointer'
            type='button'
            value='Add Option'
            onClick={() => setOptions((prev) => [...prev, option])}
          />
        </div>

        <div>
          {options.map((item, index) => (
            <div
              className='ring-1 p-2 ring-red-500 rounded-md cursor-pointer flex gap-2'
              key={index}
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

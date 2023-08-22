'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const data = [
  {
    id: 1,
    title: 'always fresh & alwas crispy & alwas hot',
    image: '/slide1.png'
  },
  {
    id: 2,
    title: 'we deliver your order wherever you are in NY',
    image: '/slide2.png'
  },
  {
    id: 3,
    title: 'the best pizza to share with your family and friends',
    image: '/slide3.jpg'
  }
]

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      5000
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50'>
      {/* TEXT CONTAINER */}
      <div className='flex flex-1 items-center justify-center flex-col gap-8 text-red-500 font-bold'>
        <h1 className='text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl'>
          {data[currentSlide].title}
        </h1>
        <button className='bg-red-500 text-white py-4 px-8'>Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className='w-full flex-1 relative'>
        <Image
          src={data[currentSlide].image}
          alt={data[currentSlide].title}
          fill
          className='object-cover'
          sizes='(min-width: 768px) 50vw, 100vw'
          priority={true}
        />
      </div>
    </div>
  )
}

export default Slider

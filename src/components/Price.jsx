'use client'

import { useCartStore } from '@/utils/store'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Price({ product }) {
  const [total, setTotal] = useState(product.price)
  const [quantity, setQuantity] = useState(1)
  const [selected, setSelected] = useState(0)

  const { addToCart } = useCartStore()

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      ...(product.options?.length && { optionTitle: product.options[selected] }),
      quantity: quantity
    })
    toast.success('Added to cart')
  }

  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    if (product.options?.length) {
      setTotal(quantity * product.price + product.options[selected].additionalPrice)
    }
  }, [quantity, selected, product])

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>{total}</h2>
      {/* OPTIONS CONTAINER */}
      <div className='flex gap-4'>
        {product.options?.length &&
          product.options?.map((option, index) => (
            <button
              className='min-w-[6rem]  p-2 ring-1 ring-red-400 rounded-md'
              key={option.title}
              style={{
                background: selected === index ? 'rgb(248 113 113)' : 'white',
                color: selected === index ? 'white' : 'red'
              }}
              onClick={() => setSelected(index)}>
              {option.title}
            </button>
          ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className='flex justify-between items-center'>
        {/* QUANTITY */}
        <div className='flex justify-between w-full p-3 ring-1 ring-red-500 xl:gap-4'>
          <span>Quantity</span>
          <div className='flex gap-4 items-center'>
            <button onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}>+</button>
          </div>
        </div>
        {/* CART BUTTON */}
        <div>
          <button
            className='uppercase w-56 text-white bg-red-500 p-3 ring-1 ring-red-500'
            onClick={handleCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Price

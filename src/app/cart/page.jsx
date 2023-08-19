'use client'

import { useCartStore } from '@/utils/store'
import Image from 'next/image'
import { useEffect } from 'react'

function CartPage() {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore()

  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  return (
    <div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row'>
      {/* PRODUCT CONTAINER */}
      <div className='flex-1 p-4 flex flex-col justify-center overflow-auto lg:px-20 xl:px-40'>
        {/* SINGLE ITEM CONTAINER */}

        {products.map((product) => (
          <div
            className='flex items-center justify-between mb-4'
            key={product.id}>
            <Image
              src={product.img}
              alt={product.title}
              width={0}
              height={0}
              sizes='100vw'
              className='w-[100px] h-[100px]'
            />
            <div className=''>
              <h1 className='uppercase text-xl font-bold'>
                {product.title} x {product.quantity}
              </h1>
              <span>{product.optionTitle.title}</span>
            </div>
            <h2 className='font-bold'>${product.price}</h2>
            <span
              className='cursor-pointer'
              onClick={() => removeFromCart(product)}>
              X
            </span>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className='flex-1 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center  lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6'>
        <div className='flex justify-between'>
          <span className=''>Subtotal ({totalItems} items)</span>
          <span className=''> ${totalPrice} </span>
        </div>
        <div className='flex justify-between'>
          <span className=''>Service Cost</span>
          <span className=''> $0.00 </span>
        </div>
        <div className='flex justify-between'>
          <span className=''>Delivery Cost</span>
          <span className='text-green-500 uppercase'> Free </span>
        </div>
        <hr className='my-2' />
        <div className='flex justify-between'>
          <span className='uppercase'>Total (incl. vat) </span>
          <span className='font-bold'> ${totalPrice} </span>
        </div>
        <button className='bg-red-500 text-white uppercase p-3 rounded-md w-1/2 self-end'>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default CartPage

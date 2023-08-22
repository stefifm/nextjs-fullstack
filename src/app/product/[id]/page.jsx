import DeleteButton from '@/components/DeleteButton'
import Price from '@/components/Price'
import Image from 'next/image'

const getSingleProduct = async (id) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}

export const revalidate = 0

async function SingleProductPage({ params }) {
  const { id } = params
  const singleProduct = await getSingleProduct(id)

  return (
    <div className='p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative'>
      {/* IMAGE CONTAINER */}

      <div className='relative w-full h-1/2 md:h-[70%]'>
        <Image
          src={singleProduct.img}
          alt={singleProduct.title}
          className='object-contain'
          fill
          sizes='(min-width: 768px) 50vw, 100vw'
          priority={true}
        />
      </div>

      {/* TEXT CONTAINER */}
      <div className='h-1/2 w-full mt-6 flex flex-col gap-4 md:mt-0 md:h-[70%] md:justify-center md:gap-6 xl:gap-8'>
        <h1 className='text-3xl font-bold uppercase xl:text-5xl'>{singleProduct.title}</h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>
      <DeleteButton id={singleProduct.id} />
    </div>
  )
}

export default SingleProductPage

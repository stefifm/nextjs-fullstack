import Image from 'next/image'
import Link from 'next/link'

const getProductsByCategory = async (category) => {
  const res = await fetch(`http://localhost:3000/api/products?cat=${category}`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

async function CategoryPage({ params }) {
  const products = await getProductsByCategory(params.category)
  return (
    <div className='flex flex-wrap text-red-500'>
      {products.map((item) => (
        <Link
          key={item.id}
          href={`/product/${item.id}`}
          className='w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group even:bg-fuchsia-50'>
          {/* IMAGE CONTAINER */}
          <div className='relative h-[80%]'>
            <Image
              src={item.img}
              alt={item.title}
              fill
              className='object-contain'
            />
          </div>
          {/* TEXT CONTAINER */}
          <div className='flex items-center justify-between font-bold'>
            <h1 className='text-2xl uppercase p-2'>{item.title}</h1>
            <h2 className='group-hover:hidden text-xl'>$ {item.price}</h2>
            <button className='hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md'>
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryPage

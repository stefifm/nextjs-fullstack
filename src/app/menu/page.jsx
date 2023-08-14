import Link from 'next/link'

const getCategories = async () => {
  const res = await fetch('http://localhost:3000/api/categories', {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

async function MenuPage() {
  const menu = await getCategories()
  return (
    <div className='p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center'>
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className='w-full h-1/3 bg-cover p-8 md:h-1/2'
          style={{ backgroundImage: `url(${category.img})` }}>
          <div className={`text-${category.color} w-1/2`}>
            <h1 className='uppercase font-bold text-3xl'>{category.title}</h1>
            <p className='text-sm my-8'>{category.desc}</p>
            <button
              className={`hidden 2xl:block text-${
                category.color === 'black' ? 'white' : 'red-500'
              } py-2 px-4 rounded-md`}
              style={{ backgroundColor: category.bg }}>
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MenuPage

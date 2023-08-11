import Link from 'next/link'

function Footer() {
  return (
    <div className='h-12 md:h-24 p-4 lg:p-20 xl:p-40 text-red-500 flex items-center justify-between'>
      <Link
        href='/'
        className='font-bold text-xl'>
        MASSIMO
      </Link>
      <p> &#169; ALL RIHTS RESERVED </p>
    </div>
  )
}

export default Footer

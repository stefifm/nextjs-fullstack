'use client'

import CheckoutForm from '@/components/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function PayPage({ params }) {
  const [clientSecret, setClientSecret] = useState('')

  const { id } = params

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/create-intent/${id}`, {
          method: 'POST'
        })

        console.log(res)

        const data = await res.json()

        setClientSecret(data.clientSecret)
      } catch (err) {
        console.log(err)
      }
    }

    makeRequest()
  }, [id])

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe'
    }
  }

  return (
    <>
      {clientSecret && (
        <Elements
          options={options}
          stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}

export default PayPage

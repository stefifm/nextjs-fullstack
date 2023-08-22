import { AddressElement } from '@stripe/react-stripe-js'

function AddressForm() {
  return (
    <>
      <h3>Address</h3>
      <AddressElement
        options={{ mode: 'shipping' }}
        onChange={(event) => {
          if (event.complete) {
            const address = event.value.address
          }
        }}
      />
    </>
  )
}

export default AddressForm

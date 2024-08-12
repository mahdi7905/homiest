import React from 'react'
import { useSearchParams } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

import "./checkout.css"
import CheckoutForm from './CheckoutForm';
const PUBLIC_KEY = "pk_test_51OuSNaAjavyPtfEB537khzJc727jmJl3j8mGj775Mib1aZ8T9S2OviqVRLrfiiFv0Z8vMZegM2WuNuBQlsmqsnLz00G9XYqZca"
const stripe = loadStripe(PUBLIC_KEY)

const Checkout = () => {
    const [searchParams] = useSearchParams()
    const booking_id = searchParams.get('booking_id')
    
  return (
    <div className='checkout-page'>
      <Elements stripe={stripe}>
        <CheckoutForm bookingID={booking_id}/>
      </Elements>
    </div>
  )
}

export default Checkout
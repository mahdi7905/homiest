import React from 'react'
import { useSearchParams } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';
import "./packageCheckout.css"

const PUBLIC_KEY = "pk_test_51OuSNaAjavyPtfEB537khzJc727jmJl3j8mGj775Mib1aZ8T9S2OviqVRLrfiiFv0Z8vMZegM2WuNuBQlsmqsnLz00G9XYqZca"
const stripe = loadStripe(PUBLIC_KEY)

const CheckoutPackages = () => {
  const [searchParams] = useSearchParams()
    const package_id = searchParams.get('package_id')
  return (
    <div className='checkout-page'>
      <Elements stripe={stripe}>
        <CheckoutForm package_id={package_id}/>
      </Elements>
    </div>
  )
}

export default CheckoutPackages
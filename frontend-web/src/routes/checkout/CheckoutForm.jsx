import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { useElements, useStripe,CardElement } from '@stripe/react-stripe-js'
import axios from "axios"

import "./checkout.css"
import { BookingContext } from '../../context/bookingContext'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#00726f",
			color: "#00726f",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#00726f" },
			"::placeholder": { color: "#00726f" }
		},
		invalid: {
			iconColor: "#fb0f36",
			color: "#fb0f36"
		}
	}
}

const CheckoutForm = ({bookingID}) => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const {dispatch} = useContext(BookingContext)

   const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const {data} = await axios.post("http://localhost:4000/api/checkout", {
                _id:bookingID,
                id
            })

            if(data.success) {
                console.log("Successful payment", data)
                dispatch({type:"BOOKING_CHECKOUT", payload:data.booking})
                navigate("/", {replace:true})
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}
 
  return (
    <div className='checkout-form'>
      <h2 className="checkout-header">Enter Card Details</h2>
      <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className='pay-btn'>Pay</button>
        </form>
    </div>
  )
}

export default CheckoutForm
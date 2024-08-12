import React, { useContext } from 'react'
import './booking.css'
import BookingCard from '../../components/bookingCard/BookingCard'
import { BookingContext } from '../../context/bookingContext'

const Booking = () => {
  const {bookings}= useContext(BookingContext)
  const sorted = bookings.map((booking, index) => ({
      sort: index,
      booking,
    }))
    .sort((a, b) => b.sort - a.sort)
    .map((item) => item.booking);

  return (
    <div className='booking-container'>
      {
        sorted.map(booking => <BookingCard key={booking._id} booking={booking}/>)
      }

    </div>
  )
}

export default Booking
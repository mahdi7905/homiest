import React from 'react'
import './bookingCard.css'
import { Link } from 'react-router-dom'

const BookingCard = ({booking}) => {
  const date = new Date(booking.schedule)
  return (
    <div className='booking-card'>
        <Link to=''>
      <img src={booking.service.avatar} alt="avatar" className='service-avatar' />
      </Link>
      <div className="service-card-contents">
        <div className="row-name">
          <Link to=''>
          <p className='name'>{booking.service.firstName} {booking.service.surName}</p>
          </Link>
          
        </div>
        <div className="row-profession">
          <p className='profession'>{booking.service.profession}</p>
        </div>
        <div className="row-profession">
          <p className='label'>Cost: <span>N {booking.charge}</span></p>
        </div>
        <div className="row-profession">
          <p className='label'>Date: <span>{date.getDate()}-{date.getMonth()}-{date.getFullYear()}</span></p>
        </div>
        <div className="row-profession">
          <p className='label'>Time: <span>{date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:
            {date.getMinutes() >= 10
              ? date.getMinutes()
              : `0${date.getMinutes()}`}{" "}
            {date.getHours() < 12 ? "AM" : "PM"}</span></p>
        </div>
        <div className="row-profession">
          <p className='label'>Duration: <span>{booking.duration} hours</span></p>
        </div>
        <div className="row-profession">
          <p className='label'>Location: <span>{booking.address.city}</span></p>
        </div>
        <div className="row-profession">
          <p className='label'>Acknowledgment: <span>{booking.acknowledgment ? "Acknowledged" : "Pending"}</span></p>
        </div>
        <div className="row-action-btn">
          <button className='view-booking'>View</button>
          {
            booking.paymentStatus.toLowerCase() === "pending" && (
              <>
                <button className='pay-booking'>Pay Now</button>
                <button className='pay-booking'>Pay With Coins</button>
                <button className='cancel-booking'>Cancel</button>
              </>
            )
          }
        </div>
        </div>
    </div>
  )
}

export default BookingCard
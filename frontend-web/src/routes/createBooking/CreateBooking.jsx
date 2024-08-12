import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import './createBooking.css'
import { ServiceContext } from '../../context/serviceContext'
import { AuthContext } from '../../context/authContext';
import { BookingContext } from '../../context/bookingContext';

const CreateBooking = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const {serviceMen} = useContext(ServiceContext)
    const {user, dispatch:userDispatch} = useContext(AuthContext)
    const {dispatch} = useContext(BookingContext)
    const service_id = searchParams.get('user_id')
    const service = serviceMen.filter(item => item._id === service_id)[0]

    const [booking, setBooking] = useState({
        service: `${service._id}`,
        user:`${user._id}`,
        phone: '',
        address: {
            city: '',
            block:''
        },
        schedule: '',
        duration: 0,
        charge:0

    })
    
    const handledurationChange = (e) => {
        setBooking({...booking, duration: e.target.value, charge: e.target.value * service.charge})
    }

    const handlePaymentProceed = async ()=>{
        try {
        const { data } = await axios.post("http://localhost:4000/api/create-booking", booking);
        dispatch({ type: "CREATE_BOOKING", payload: data });
        navigate(`/checkout?booking_id=${data._id}`)
      } catch (error) {
        console.log(error);
      }
    }
    const handleCoinPayment = async ()=> {
        if (user.wallet.balance >=booking.charge) {
            try {
                const { data } = await axios.post("http://localhost:4000/api/create-booking", booking);
                if (data) {
                    const {data:item} = await axios.post("http://localhost:4000/api/checkout-with-coins", {_id: data._id})
                    if (item.success){
                        dispatch({ type: "CREATE_BOOKING", payload: item.booking });
                        userDispatch({ type: "HOMIE_COIN", payload: item.wallet });
                        navigate("/bookings")
                    }
                } else{
                    alert("Payment was not successiful")
                }
            } catch (error) {
                console.log(error);
            }
        } else{
            alert(`Insufficient coins ${user.wallet.balance}`);
        }
    }
    const handlePayLater = async ()=>{
        try {
        const { data } = await axios.post("http://localhost:4000/api/create-booking", booking);
        dispatch({ type: "CREATE_BOOKING", payload: data });
        navigate(`/bookings`)
      } catch (error) {
        console.log(error);
      }
    }
    
  return (
    <div className='create-booking-container'>
        <div className="create-booking-card">
            <div className="service-info">
                <img src={service.avatar} alt="avatar" className='service-info-avatar' />
                <div className="service-info-col">
                    <div className="service-info-row mt-service-info">
                        <p className='service-info-name'>{service.firstName} {service.surName}</p>
                        <p className='service-info-price'>N {booking.charge}</p>
                    </div>
                    <div className="service-info-row">
                        <p className='service-info-profession'>{service.profession}</p>
                        <p className='service-info-location'>{service.location}</p>
                    </div>
                </div>
            </div>
            <div className="booking-form">
                <div className="form-row">
                    <input value={booking.phone} onChange={(e) => setBooking({...booking, phone: e.target.value})} type="text" placeholder='Phone' className='form-input'/>
                    <input value={booking.address.city} onChange={(e) => setBooking({...booking, address: {...booking.address, city: e.target.value}})} type="text" placeholder='State' className='form-input'/>
                </div>
                <div className="form-row">
                    <input value={booking.duration} onChange={handledurationChange} type="number" placeholder='Duration in hours' className='form-input'/>
                    <input value={booking.schedule} onChange={(e) => setBooking({...booking, schedule: e.target.value})} type="datetime-local" className='form-input'/>
                </div>
                <textarea value={booking.address.block} onChange={(e) => setBooking({...booking, address: {...booking.address, block: e.target.value}})} className='booking-address' placeholder='Address'/>
                <div className="booking-form-actions">
                    <button className='proceed-to-payment' onClick={handlePaymentProceed}>Proceed to Payment</button>
                    <button className='pay-later' onClick={handlePayLater}>Create Booking and pay later</button>
                    <button className='homie-coin' onClick={handleCoinPayment}>Pay with HomieCoin</button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default CreateBooking
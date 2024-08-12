import React, {useContext} from 'react'
import './serviceCard.css'
import StarRating from '../StarRating'
import Btn from '../button/Btn'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const ServiceCard = ({service}) => {
    const {user} = useContext(AuthContext)
  return (
    <div className='service-card'>
      <Link to={`/service-details/${service._id}`}>
      <img src={`${service.avatar}`} alt="avatar" className='service-avatar' />
      </Link>
      <div className="service-card-contents">
        <div className="row-name">
          <Link to={`/service-details/${service._id}`}>
          <p className='name'>{service.firstName} {service.surName}</p>
          </Link>
          <p className='charge'>{`N ${service.charge} / h`}</p>
        </div>
        <div className="row-profession">
          <p className='profession'>{service.profession}</p>
          <p className='location'>{service.location}</p>
        </div>
        <div className="row-star">
          <StarRating rating={service.rating}/>
        </div>
        {
          user.role === "consumer" && (
          <div className="row-buttons">
            <Btn round={true} size='big' title='Book Now' route={`create-booking?user_id=${service._id}`} variant='contained'/>
            <Btn round={true} size='big' title='Message' route='messages' variant='outlined'/>
        </div>
          )
        }
      </div>
    </div>
  )
}

export default ServiceCard
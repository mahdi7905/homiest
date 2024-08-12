import React from 'react'
import './popularCard.css'
import StarRating from '../StarRating'
import Btn from '../button/Btn'
import { Link } from 'react-router-dom'

const PopularCard = ({item}) => {
  return (
    <span>
      <div className='popular-card'>
        <Link to={`/service-details/${item._id}`} className='img-link'>
        
          <img src={item.avatar} alt="avatar" className='popular-avatar' />
        </Link>
      <div className="popular-card-content">
        <span>
          <Link to={`/service-details/${item._id}`}>
          <p className='name'>{item.firstName} {item.surName}</p>
          </Link>
          <p className='profession'>{item.profession}</p>
          <span className='rating'>
            <StarRating rating={item.rating}/>
          </span>
          <p className='location'>{item.location}</p>
        </span>
        <div className='button-area'>
          <Btn title='Book Now' size='regular' variant='contained' route={`create-booking?user_id=${item._id}`}/>
          <Btn title='Message' size='regular' variant='outlined' route='messages'/>
        </div>
      </div>
    </div>
    </span>
    
  )
}

export default PopularCard
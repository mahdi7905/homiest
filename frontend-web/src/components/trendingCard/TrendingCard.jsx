import React from 'react'
import {Link} from 'react-router-dom'
import './trendingCard.css'

const TrendingCard = ({item}) => {
  return (
      <Link to={`/service-details/${item._id}`}>
      <img src={item.avatar} alt="trending service"  className='trending-img'/>
      </Link>
    
  )
}

export default TrendingCard
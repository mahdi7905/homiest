import React from 'react'
import { useNavigate } from 'react-router-dom'

const PackageCard = ({item}) => {
    const navigate = useNavigate()
  return (
    <div className='packageCard'>
        <p className='coins'>{item.coins} Coins</p>
        <p className='price'>For <span>N {item.price}</span></p>
        <button className='purchase' onClick={()=>navigate(`/checkout-packages?package_id=${item._id}`)}>Purchase</button>
    </div>
  )
}

export default PackageCard
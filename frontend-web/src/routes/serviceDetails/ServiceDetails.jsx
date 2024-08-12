import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import './serviceDetails.css'
import { ServiceContext } from '../../context/serviceContext'

import StarRating from '../../components/StarRating'

import sampleIMG from '../../assets/samplePics/me1.jpg'
import Btn from '../../components/button/Btn'

const ServiceDetails = () => {
  const {serviceMen} = useContext(ServiceContext)
  const {serviceId} = useParams()
  const service = serviceMen.filter(item => item._id === serviceId)[0]
  return (
    <div className='service-details-container'>
      <div className="media-bio">
        <img src={service.avatar} alt="avatar" className='bio-avatar'/>
        <div className="name-charge">
          <div className="bio-name">{service.firstName} {service.surName}</div>
          <div className="bio-name">N {service.charge}</div>

        </div>
        <div className="service-action-area">
          <Btn size='big' title='Book Now' route={`create-booking?user_id=${service._id}`} variant='contained'/>
          <Btn size='big' title='Message' route='messages' variant='outlined'/>
        </div>
        <div className="bio-card">{service.bio}</div>
      </div>
      <div className="info-recommendations">
        <div className="inner-info">
          <p className="service-info">Profession: <span>{service.profession}</span></p>
          <span className="service-info">
          <StarRating rating={service.rating} />
          </span>
          <p className="service-info">Location: <span>{service.location}</span></p>
        </div>
        <div className="recommendation">
          <h2 className="recomendation-header">Recommendations</h2>
          { service.recommendations.length > 0 &&
            service.recommendations.map(item => <div className="recommendation-card">
              <img src={sampleIMG} alt="avatar" className='recommendation-avatar' />
              <span>{item.comment}</span>
            </div>)
          }
          { service.recommendations.length <= 0 &&
            <p style={{fontFamily:"interMedium", color:"var(--font-name)"}}>Service has no recommendations yet.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails
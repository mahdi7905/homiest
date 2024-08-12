import React, {useContext} from 'react'
import ServiceCard from '../../components/serviceCard/ServiceCard';
import { ServiceContext } from '../../context/serviceContext';


const AdminServices = () => {
  const { state } = useContext(ServiceContext);
  const { serviceMen } = state;
  return (
    <div className='admin-services-container'>
      <div className="inner-admin-services">

        {
          serviceMen.map(item => <ServiceCard key={item._id} service={item}/> )
        } 
      </div>
    </div>
  )
}

export default AdminServices
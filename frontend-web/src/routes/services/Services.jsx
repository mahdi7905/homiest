import React, {useContext} from 'react'
import './service.css'
import ServiceCard from '../../components/serviceCard/ServiceCard'
import { ServiceContext } from '../../context/serviceContext';
import { useSearchParams } from 'react-router-dom';

const Services = () => {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('searchTerm')
    const { serviceMen } = useContext(ServiceContext);
    if (searchTerm && searchTerm.length > 3) {
        var searchResult = serviceMen.filter((service) =>
        service.profession.toLowerCase().includes(`${searchTerm.toLowerCase()}`)
        );
    } else {
        searchResult = [];
    }
  return (
    <div className='service-list-container'>
        {searchTerm && searchResult.length > 0 ? (
          searchResult.map(item => <ServiceCard service={item}/>)
        ) : searchTerm && searchResult.length === 0 ? (
            <p
              style={{
                color: 'var(--font-accent)',
                fontFamily: "InterSemiBold",
                fontSize: '18px',
              }}
            >
              No result found
            </p>
        ) : (
          
            serviceMen.map(serviceMan => <ServiceCard key={serviceMan._id} service={serviceMan}/>)
        )}
        
    </div>
  )
}

export default Services
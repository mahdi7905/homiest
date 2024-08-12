import React, {useContext} from 'react'
import "./home.css";
import TrendingCard from '../../components/trendingCard/TrendingCard';
import PopularCard from '../../components/popularCard/PopularCard';
import ServiceCard from '../../components/serviceCard/ServiceCard';
import { Link } from 'react-router-dom';
import { ServiceContext } from '../../context/serviceContext';

const Home = () => {
  const { serviceMen } = useContext(ServiceContext);
  const trending = serviceMen.filter((man) => man.rating >= 4);
  const popular = serviceMen.slice(25, 40);
  const services = serviceMen.slice(0, 30)
  return (
    <div className='home'>
      <section className="trending">
        <h2 className="header">Most Rated</h2>
        <div className="inner-container">
          {
            trending.map(item => <TrendingCard key={item._id} item={item}/> )
          }
        </div>
      </section>
      <section className="popular">
        <h2 className="header">Popular</h2>
        <div className="inner-container">
          {
            popular.map(item => <PopularCard key={item._id} item={item}/> )
          }          
        </div>
      </section>
      <section className="services">
        <span style={{display:'flex', justifyContent:'space-between', alignItems:"center"}}>
          <h2 className="header">Services</h2>
        <Link to='/services' style={{fontFamily:'interRegular', color:'var(--font-link)', fontSize:'14px'}}>See More</Link>
        </span>
        <div className="service-container">
          {
            services.map(item => <ServiceCard key={item._id} service={item}/> )
          } 
        </div>
      </section>
    </div>
  )
}

export default Home
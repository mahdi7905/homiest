import React, {useState, useEffect} from 'react';
import axios from "axios"
import './package.css'
import PackageCard from '../../components/packageCard/PackageCard';

const Packages = () => {
    const [packages, setPackages] = useState([])

    useEffect(() =>{
        const fetchPackages = async () =>{
            try {
            const {data} = await axios.get("http://localhost:4000/api/homie-coins-packages")
            setPackages(data) 
        } catch (error) {
            console.log(error.message)
        }
        }
        fetchPackages()
    },[])
  return (
    <div className='package-container'>
        {
            packages.length > 0 && packages.map((item) => <PackageCard key={item._id} item={item}/>)
        }
        {
            packages.length <= 0 && <p style={{fontFamily:"interMedium", fontSize:"20px"}}>No packages available</p>
        }
        
    </div>
  )
}

export default Packages
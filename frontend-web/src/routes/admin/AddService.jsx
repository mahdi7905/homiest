import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import FileBase from "react-file-base64"
import axios from 'axios'
import './admin.css'

const AddService = () => {
  const navigate = useNavigate()
  const [service, setService] = useState({
    firstName: '',
    surName: '',
    profession: '',
    location: '',
    rating:0,
    charge: 0,
    avatar: "",
    bio: "",
    role: 'service',
  })

  const submitService = async () =>{
    try {
      const {data} = await axios.post("http://localhost:4000/api/add-service", service)
      console.log(data)
      navigate("/admin/admin-services")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='add-service'>
      <div className="add-service-card">
        <h2>Add a Service</h2>
          <img src={service.avatar} alt="avatar" className="add-service-avatar" />
        <FileBase type='file' multiple={false} onDone={({base64}) => setService({...service, avatar:base64})} />
        <div className="row">
          <input type="text" value={service.firstName} onChange={(e) => setService({...service, firstName:e.target.value})} placeholder="First name"/>
          <input type="text" value={service.surName} onChange={(e) => setService({...service, surName:e.target.value})} placeholder="Surname"/>
        </div>
        <div className="row">
          <input type="text" value={service.profession} onChange={(e) => setService({...service, profession:e.target.value})} placeholder="Profession"/>
          <input type="text" value={service.location} onChange={(e) => setService({...service, location:e.target.value})} placeholder="Location"/>
        </div>
        <div className="row">
          <input type="number" value={service.rating} onChange={(e) => setService({...service, rating:e.target.value})} placeholder="Rating (on a scale of 5)" min={0} max={5}/>
          <input type="number" value={service.charge} onChange={(e) => setService({...service, charge:e.target.value})} placeholder="charge"/>
        </div>
        <textarea placeholder='Bio' value={service.bio} onChange={(e) => setService({...service, bio:e.target.value})}/>
        <button onClick={submitService}>Add Service</button>
      </div>
    </div>
  )
}

export default AddService
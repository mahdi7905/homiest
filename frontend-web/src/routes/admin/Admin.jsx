import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './admin.css'
import useAuth from '../../hooks/useAuth'

const Admin = () => {
    const {Logout} = useAuth()    
  return (
    <div className='admin-page'>
        <div className="admin-nav">
            <section className="profile">
                <img src="http://localhost:4000/public/samplePics/avatar.jpg" alt="avatar" />
                <p>@Admin</p>
            </section>
            <nav>
                <ul className="admin-links">
                    <li className="admin-list-item">
                        <NavLink to='add-service'>Add a Service</NavLink>
                    </li>
                    <li className="admin-list-item">
                        <NavLink to='admin-services'>Services</NavLink>
                    </li>
                    <li className="admin-list-item">
                        <NavLink to='admin-bookings'>Bookings</NavLink>
                    </li>
                    <li className="admin-list-item">
                        <button onClick={()=>Logout()}>Logout</button>
                    </li>
                </ul>
            </nav>
            
        </div>
        <div className="admin-content">
            <Outlet/>
        </div>
    </div>
  )
}

export default Admin
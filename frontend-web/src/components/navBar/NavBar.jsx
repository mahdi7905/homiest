import React, {useContext, useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuIcon from "@mui/icons-material/Menu";
import './navBar.css'
import '../../constants/utility.css'
import { DrawerContext } from '../../context/drawerContext';

const NavBar = () => {
    const {setDrawerOpen} = useContext(DrawerContext)
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('') 

    const handleSearch = () => {
        navigate(`${searchTerm ? `/services?searchTerm=${searchTerm}` : '/'}`)
        setSearchTerm('')
    }
  return (
    <section className='navbar'>
        <nav className="container nav-sm">
            <span className='burger' onClick={() => setDrawerOpen(true)}>
                <MenuIcon sx={{marginTop: "10px", width:"30px", height:"30px"}}/>
            </span>
            <div className="nav-sm-wrapper">
            <div className='search-sm'>
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search' className='search-input'/>
                <button className='search-btn' onClick={handleSearch}>
                    <SearchIcon sx={{color: 'var(--secondary-bg)'}}/>
                </button>
                </div>
            <ul className='links'>
                <li><NavLink to='/'><HomeIcon sx={{width:"30px", height: "30px"}}/></NavLink></li>
                <li><NavLink to='/categories'><CategoryIcon sx={{width:"30px", height: "30px"}}/></NavLink></li>
                <li><NavLink to='/bookings'><AssignmentIcon sx={{width:"30px", height: "30px"}}/></NavLink></li>
                <li><NavLink to='/messages'><ChatIcon sx={{width:"30px", height: "30px"}}/></NavLink></li>
                
            </ul>
            </div>
            
        </nav>
        <nav className="container nav">
            <h1 className='logo'>Homiest</h1>
            
            <ul className='links'>
                <li><NavLink to='/'><HomeIcon sx={{width:"30px", height: "30px"}}/></NavLink></li>
                <li><NavLink to='/categories'><CategoryIcon sx={{width:"30px", height: "30px"}}/></NavLink></li>
                <li><NavLink to='/bookings'><AssignmentIcon sx={{width:"30px", height: "30px"}}/></NavLink></li>
                <li><NavLink to='/messages'><ChatIcon sx={{width:"30px", height: "30px"}}/></NavLink></li>
                <li><NavLink to='/notifications'><NotificationsIcon sx={{width:"30px", height: "30px"}}/></NavLink></li>
            </ul>
            
                 
                <div className='search'>
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search' className='search-input'/>
                <button className='search-btn' onClick={handleSearch}>
                    <SearchIcon sx={{color: 'var(--secondary-bg)'}}/>
                </button>
                </div>
            
        </nav>
    </section>
  )
}

export default NavBar